import { computed, watch } from 'vue'
import { MOCK_DASHBOARD_STATS, MOCK_RECOMMENDED_TOPICS } from '~/constants/dashboard'
import { useActivityLogs } from '~/composables/useActivityLogs'
import { useTopics } from '~/composables/useTopics'

export interface RecommendedTopic {
    title: string
    tag: string
    icon: string
}

export const useDashboard = () => {
    const { currentStreak, totalMinutesToday, logs } = useActivityLogs()
    const { topics } = useTopics()
    
    // Recommended Topics State (initial empty, seedable)
    const recommendedTopics = useState<RecommendedTopic[]>('recommended-topics', () => [])

    const initDashboard = () => {
        if (import.meta.client) {
            const saved = localStorage.getItem('learnfast-recommended-topics')
            if (saved) {
                try {
                    recommendedTopics.value = JSON.parse(saved)
                } catch (e) {
                    console.error("Failed to load recommended topics:", e)
                }
            }
            
            watch(recommendedTopics, (newVal) => {
                localStorage.setItem('learnfast-recommended-topics', JSON.stringify(newVal))
            }, { deep: true })
        }
    }

    // Helpers: date strings for today and yesterday
    const getTodayStr = () => new Date().toISOString().split('T')[0] ?? ''
    const getYesterdayStr = () => {
        const d = new Date()
        d.setDate(d.getDate() - 1)
        return d.toISOString().split('T')[0] ?? ''
    }

    const logsForDate = (dateStr: string) =>
        logs.value.filter(log => new Date(log.completedAt).toISOString().split('T')[0] === dateStr)

    const formatTrend = (today: number, yesterday: number, unit = '', percent = false): { trendValue: string, trend: 'up' | 'down' | 'neutral' } => {
        const diff = today - yesterday
        if (diff === 0) return { trendValue: `±0${unit}`, trend: 'neutral' }
        const sign = diff > 0 ? '+' : ''
        if (percent && yesterday > 0) {
            const pct = Math.round((diff / yesterday) * 100)
            return { trendValue: `${sign}${pct}%`, trend: diff > 0 ? 'up' : 'down' }
        }
        return { trendValue: `${sign}${diff}${unit}`, trend: diff > 0 ? 'up' : 'down' }
    }

    // Dynamic Stats Calculation
    const stats = computed(() => {
        const todayStr = getTodayStr()
        const yesterdayStr = getYesterdayStr()
        const todayLogs = logsForDate(todayStr)
        const yesterdayLogs = logsForDate(yesterdayStr)

        return MOCK_DASHBOARD_STATS.map(baseStat => {
            let value = '0'
            let trendValue = ''
            let trend: 'up' | 'down' | 'neutral' = baseStat.trend as 'up' | 'down' | 'neutral'

            if (baseStat.key === 'streak') {
                value = currentStreak.value.toString()
                // Yesterday's streak was either current - 1 (if active today) or same (if no activity today)
                const todayActive = todayLogs.length > 0
                const yesterdayStreak = todayActive ? Math.max(0, currentStreak.value - 1) : currentStreak.value
                const result = formatTrend(currentStreak.value, yesterdayStreak, ' day')
                trendValue = result.trendValue
                trend = result.trend

            } else if (baseStat.key === 'today') {
                value = totalMinutesToday.value.toString()
                const yesterdayMins = yesterdayLogs.reduce((acc, log) => acc + log.durationMinutes, 0)
                const result = formatTrend(totalMinutesToday.value, yesterdayMins, ' min', true)
                trendValue = result.trendValue
                trend = result.trend

            } else if (baseStat.key === 'progress') {
                value = topics.value.filter(t => t.progress > 0 && t.progress < 100 && t.status !== 'Archived').length.toString()
                // Topics touched today vs yesterday
                const todayTopicIds = new Set(todayLogs.map(l => l.topicId))
                const yesterdayTopicIds = new Set(yesterdayLogs.map(l => l.topicId))
                const result = formatTrend(todayTopicIds.size, yesterdayTopicIds.size, ' topic')
                trendValue = result.trendValue
                trend = result.trend

            } else if (baseStat.key === 'completed') {
                value = topics.value.filter(t => t.status === 'Completed' || t.progress >= 100).length.toString()
                // Completions logged today vs yesterday (lessons/assessments finished)
                const result = formatTrend(todayLogs.length, yesterdayLogs.length, ' session')
                trendValue = result.trendValue
                trend = result.trend

            } else if (baseStat.key === 'assessment') {
                value = logs.value.filter(log => log.type === 'Assessment').length.toString()
                const todayAssessments = todayLogs.filter(l => l.type === 'Assessment').length
                const yesterdayAssessments = yesterdayLogs.filter(l => l.type === 'Assessment').length
                const result = formatTrend(todayAssessments, yesterdayAssessments, '')
                trendValue = result.trendValue
                trend = result.trend

            } else if (baseStat.key === 'score') {
                const allAssessments = logs.value.filter(log => log.type === 'Assessment').length
                value = allAssessments > 0 ? `${Math.min(100, 80 + (allAssessments * 2))}` : '0'
                const todayScore = todayLogs.filter(l => l.type === 'Assessment').length > 0
                    ? Math.min(100, 80 + (todayLogs.filter(l => l.type === 'Assessment').length * 2))
                    : 0
                const yesterdayScore = yesterdayLogs.filter(l => l.type === 'Assessment').length > 0
                    ? Math.min(100, 80 + (yesterdayLogs.filter(l => l.type === 'Assessment').length * 2))
                    : 0
                const result = formatTrend(todayScore, yesterdayScore, ' pt')
                trendValue = result.trendValue
                trend = result.trend

            } else if (baseStat.key === 'total') {
                value = logs.value.length.toString()
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
    })

    return {
        stats,
        initDashboard,
        recommendedTopics
    }
}
