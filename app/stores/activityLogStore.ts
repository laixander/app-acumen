import { defineStore } from 'pinia'
import type { ActivityLog, SessionLog } from '~/types/course'

export const useActivityLogStore = defineStore('activityLogStore', {
    state: () => ({
        logs: [] as ActivityLog[],
        sessions: [] as SessionLog[]
    }),

    getters: {
        weeklyStats(state) {
            const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            const data = [0, 0, 0, 0, 0, 0, 0]

            const now = new Date()
            const currentYear = now.getFullYear()
            const currentMonth = now.getMonth()
            const currentDay = now.getDate()
            
            const dayOfWeek = now.getDay()
            const diffToMonday = (dayOfWeek === 0 ? -6 : 1 - dayOfWeek)
            const monday = new Date(currentYear, currentMonth, currentDay + diffToMonday)
            monday.setHours(0, 0, 0, 0)

            const sunday = new Date(monday)
            sunday.setDate(monday.getDate() + 6)
            sunday.setHours(23, 59, 59, 999)

            state.logs.forEach(log => {
                const logDate = new Date(log.completedAt)
                if (logDate >= monday && logDate <= sunday) {
                    const dayIndex = (logDate.getDay() + 6) % 7
                    data[dayIndex] = (data[dayIndex] ?? 0) + log.durationMinutes
                }
            })

            return { labels, data }
        },
        totalMinutesThisWeek(): number {
            return this.weeklyStats.data.reduce((acc, curr) => acc + curr, 0)
        },
        averageMinutesPerDay(): number {
            const nonZeroDays = this.weeklyStats.data.filter(d => d > 0).length
            return nonZeroDays > 0 ? Math.round(this.totalMinutesThisWeek / nonZeroDays) : 0
        },
        totalMinutesToday(state): number {
            const todayStr = new Date().toISOString().split('T')[0]
            return state.logs
                .filter(log => new Date(log.completedAt).toISOString().split('T')[0] === todayStr)
                .reduce((acc, log) => acc + log.durationMinutes, 0)
        },
        currentStreak(state): number {
            if (state.logs.length === 0) return 0

            const activeDates = new Set(
                state.logs.map(log => new Date(log.completedAt).toISOString().split('T')[0])
            )
            const sortedDates = Array.from(activeDates).sort().reverse()

            const now = new Date()
            const today = now.toISOString().split('T')[0]
            
            const yesterdayDate = new Date()
            yesterdayDate.setDate(now.getDate() - 1)
            const yesterday = yesterdayDate.toISOString().split('T')[0]

            if (!activeDates.has(today) && !activeDates.has(yesterday)) return 0

            let streak = 0
            let checkDate = activeDates.has(today) ? now : yesterdayDate

            while (true) {
                const dateStr = checkDate.toISOString().split('T')[0]
                if (activeDates.has(dateStr)) {
                    streak++
                    checkDate.setDate(checkDate.getDate() - 1)
                } else {
                    break
                }
            }

            return streak
        }
    },

    actions: {
        parseDuration(durationStr: string): number {
            const matches = durationStr.match(/(\d+)/)
            const value = matches ? parseInt(matches[0]) : 15
            if (durationStr.toLowerCase().includes('hr')) return value * 60
            return value
        },
        addLog(courseId: string, courseTitle: string, lessonId: string, lessonTitle: string, durationStr: string, type: 'Lesson' | 'Assessment' | 'Review' = 'Lesson') {
            const durationMinutes = this.parseDuration(durationStr)
            const newLog: ActivityLog = {
                id: `log-${Date.now()}`,
                courseId,
                courseTitle,
                lessonId,
                lessonTitle,
                type,
                durationMinutes,
                completedAt: Date.now()
            }
            this.logs.unshift(newLog)
        },
        addSessionLog(session: Omit<SessionLog, 'id' | 'timestamp'>) {
            const newSession: SessionLog = {
                ...session,
                id: `session-${Date.now()}`,
                timestamp: Date.now()
            }
            this.sessions.unshift(newSession)
        }
    },

    persist: { storage: persistedState.localStorage }
})
