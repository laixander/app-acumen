import { defineStore } from 'pinia'
import { MOCK_DASHBOARD_STATS } from '~/constants/dashboard'
import { useActivityLogStore } from './activityLogStore'
import { useCourseStore } from './courseStore'

export interface RecommendedCourse {
    title: string
    tag: string
    icon: string
}

export const useDashboardStore = defineStore('dashboardStore', {
    state: () => ({
        recommendedCourses: [] as RecommendedCourse[]
    }),

    getters: {
        stats() {
            const activityStore = useActivityLogStore()
            const courseStore = useCourseStore()

            const getTodayStr = () => new Date().toISOString().split('T')[0] ?? ''
            const getYesterdayStr = () => {
                const d = new Date()
                d.setDate(d.getDate() - 1)
                return d.toISOString().split('T')[0] ?? ''
            }

            const todayStr = getTodayStr()
            const yesterdayStr = getYesterdayStr()
            
            const logsForDate = (dateStr: string) =>
                activityStore.logs.filter(log => new Date(log.completedAt).toISOString().split('T')[0] === dateStr)

            const todayLogs = logsForDate(todayStr)
            const yesterdayLogs = logsForDate(yesterdayStr)

            const formatTrend = (today: number, yesterday: number, unit = '', percent = false) => {
                const diff = today - yesterday
                if (diff === 0) return { trendValue: `±0${unit}`, trend: 'neutral' }
                const sign = diff > 0 ? '+' : ''
                if (percent && yesterday > 0) {
                    const pct = Math.round((diff / yesterday) * 100)
                    return { trendValue: `${sign}${pct}%`, trend: diff > 0 ? 'up' : 'down' }
                }
                return { trendValue: `${sign}${diff}${unit}`, trend: diff > 0 ? 'up' : 'down' }
            }

            return MOCK_DASHBOARD_STATS.map(baseStat => {
                let value = '0'
                let trendValue = ''
                let trend: 'up' | 'down' | 'neutral' = baseStat.trend as 'up' | 'down' | 'neutral'

                if (baseStat.key === 'streak') {
                    value = activityStore.currentStreak.toString()
                    const todayActive = todayLogs.length > 0
                    const yesterdayStreak = todayActive ? Math.max(0, activityStore.currentStreak - 1) : activityStore.currentStreak
                    const result = formatTrend(activityStore.currentStreak, yesterdayStreak, ' day')
                    trendValue = result.trendValue
                    trend = result.trend as any

                } else if (baseStat.key === 'today') {
                    value = activityStore.totalMinutesToday.toString()
                    const yesterdayMins = yesterdayLogs.reduce((acc, log) => acc + log.durationMinutes, 0)
                    const result = formatTrend(activityStore.totalMinutesToday, yesterdayMins, ' min', true)
                    trendValue = result.trendValue
                    trend = result.trend as any

                } else if (baseStat.key === 'progress') {
                    value = courseStore.courses.filter(t => t.progress > 0 && t.progress < 100 && t.status !== 'Archived').length.toString()
                    const todayCourseIds = new Set(todayLogs.map(l => l.courseId))
                    const yesterdayCourseIds = new Set(yesterdayLogs.map(l => l.courseId))
                    const result = formatTrend(todayCourseIds.size, yesterdayCourseIds.size, ' course')
                    trendValue = result.trendValue
                    trend = result.trend as any

                } else if (baseStat.key === 'completed') {
                    value = courseStore.courses.filter(t => t.status === 'Completed' || t.progress >= 100).length.toString()
                    const result = formatTrend(todayLogs.length, yesterdayLogs.length, ' session')
                    trendValue = result.trendValue
                    trend = result.trend as any

                } else if (baseStat.key === 'assessment') {
                    value = activityStore.logs.filter(log => log.type === 'Assessment').length.toString()
                    const todayAssessments = todayLogs.filter(l => l.type === 'Assessment').length
                    const yesterdayAssessments = yesterdayLogs.filter(l => l.type === 'Assessment').length
                    const result = formatTrend(todayAssessments, yesterdayAssessments, '')
                    trendValue = result.trendValue
                    trend = result.trend as any

                } else if (baseStat.key === 'score') {
                    const allAssessments = activityStore.logs.filter(log => log.type === 'Assessment').length
                    value = allAssessments > 0 ? `${Math.min(100, 80 + (allAssessments * 2))}` : '0'
                    const todayScore = todayLogs.filter(l => l.type === 'Assessment').length > 0
                        ? Math.min(100, 80 + (todayLogs.filter(l => l.type === 'Assessment').length * 2))
                        : 0
                    const yesterdayScore = yesterdayLogs.filter(l => l.type === 'Assessment').length > 0
                        ? Math.min(100, 80 + (yesterdayLogs.filter(l => l.type === 'Assessment').length * 2))
                        : 0
                    const result = formatTrend(todayScore, yesterdayScore, ' pt')
                    trendValue = result.trendValue
                    trend = result.trend as any

                } else if (baseStat.key === 'total') {
                    value = activityStore.logs.length.toString()
                }

                const numericValue = parseInt(value) || 0
                const showTrend = numericValue > 0

                return {
                    ...baseStat,
                    value,
                    showTrend,
                    trend,
                    trendValue: showTrend ? trendValue : ''
                }
            })
        }
    },

    persist: { storage: persistedState.localStorage }
})
