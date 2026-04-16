import { computed, watch } from 'vue'
import type { ActivityLog, SessionLog } from '~/types/topic'

const FALLBACK_MOCK_LOGS: ActivityLog[] = [
    {
        id: 'log-1',
        topicId: 'introduction-to-algebra',
        topicTitle: 'Introduction to Algebra',
        lessonId: 'introduction-to-algebra-lesson-1',
        lessonTitle: 'Understanding Variables',
        type: 'Lesson',
        durationMinutes: 10,
        completedAt: Date.now() - (2 * 24 * 60 * 60 * 1000)
    },
    {
        id: 'log-2',
        topicId: 'world-war-ii-overview',
        topicTitle: 'World War II Overview',
        lessonId: 'world-war-ii-overview-lesson-1',
        lessonTitle: 'The Road to War',
        type: 'Lesson',
        durationMinutes: 15,
        completedAt: Date.now() - (1 * 24 * 60 * 60 * 1000)
    },
    {
        id: 'log-3',
        topicId: 'introduction-to-algebra',
        topicTitle: 'Introduction to Algebra',
        lessonId: 'introduction-to-algebra-lesson-2',
        lessonTitle: 'Solving One-Step Equations',
        type: 'Lesson',
        durationMinutes: 20,
        completedAt: Date.now() - (6 * 60 * 60 * 1000)
    },
    {
        id: 'log-4',
        topicId: 'advanced-javascript',
        topicTitle: 'Advanced JavaScript',
        lessonId: 'advanced-javascript-lesson-1',
        lessonTitle: 'Closures & Scope',
        type: 'Assessment',
        durationMinutes: 25,
        completedAt: Date.now() - (2 * 60 * 60 * 1000)
    },
    {
        id: 'log-5',
        topicId: 'spanish-basics',
        topicTitle: 'Spanish Basics',
        lessonId: 'spanish-basics-lesson-1',
        lessonTitle: 'Essential Greetings',
        type: 'Lesson',
        durationMinutes: 12,
        completedAt: Date.now() - (1 * 60 * 60 * 1000)
    }
]

export const useActivityLogs = () => {
    const logs = useState<ActivityLog[]>('activity-logs', () => [])
    const sessions = useState<SessionLog[]>('session-logs', () => [])

    if (import.meta.client) {
        // Load Activity Logs
        const savedLogs = localStorage.getItem('learnfast-activity-logs')
        if (savedLogs) {
            try {
                const parsed = JSON.parse(savedLogs)
                if (Array.isArray(parsed)) logs.value = parsed
            } catch (e) {
                console.error("Failed to load activity logs:", e)
            }
        }

        // Load Session Logs
        const savedSessions = localStorage.getItem('learnfast-session-logs')
        if (savedSessions) {
            try {
                const parsed = JSON.parse(savedSessions)
                if (Array.isArray(parsed)) sessions.value = parsed
            } catch (e) {
                console.error("Failed to load session logs:", e)
            }
        }

        watch(logs, (newVal) => {
            localStorage.setItem('learnfast-activity-logs', JSON.stringify(newVal))
        }, { deep: true })

        watch(sessions, (newVal) => {
            localStorage.setItem('learnfast-session-logs', JSON.stringify(newVal))
        }, { deep: true })
    }

    const parseDuration = (durationStr: string): number => {
        const matches = durationStr.match(/(\d+)/)
        const value = matches ? parseInt(matches[0]) : 15
        if (durationStr.toLowerCase().includes('hr')) return value * 60
        return value
    }

    const addLog = (topicId: string, topicTitle: string, lessonId: string, lessonTitle: string, durationStr: string, type: 'Lesson' | 'Assessment' | 'Review' = 'Lesson') => {
        const durationMinutes = parseDuration(durationStr)
        const newLog: ActivityLog = {
            id: `log-${Date.now()}`,
            topicId,
            topicTitle,
            lessonId,
            lessonTitle,
            type,
            durationMinutes,
            completedAt: Date.now()
        }
        logs.value.unshift(newLog)
    }

    const addSessionLog = (session: Omit<SessionLog, 'id' | 'timestamp'>) => {
        const newSession: SessionLog = {
            ...session,
            id: `session-${Date.now()}`,
            timestamp: Date.now()
        }
        sessions.value.unshift(newSession)
    }

    const weeklyStats = computed(() => {
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

        logs.value.forEach(log => {
            const logDate = new Date(log.completedAt)
            if (logDate >= monday && logDate <= sunday) {
                const dayIndex = (logDate.getDay() + 6) % 7
                data[dayIndex] = (data[dayIndex] ?? 0) + log.durationMinutes
            }
        })

        return { labels, data }
    })

    const totalMinutesThisWeek = computed(() => {
        return weeklyStats.value.data.reduce((acc, curr) => acc + curr, 0)
    })

    const averageMinutesPerDay = computed(() => {
        const nonZeroDays = weeklyStats.value.data.filter(d => d > 0).length
        return nonZeroDays > 0 ? Math.round(totalMinutesThisWeek.value / nonZeroDays) : 0
    })

    const totalMinutesToday = computed(() => {
        const todayStr = new Date().toISOString().split('T')[0]
        return logs.value
            .filter(log => new Date(log.completedAt).toISOString().split('T')[0] === todayStr)
            .reduce((acc, log) => acc + log.durationMinutes, 0)
    })

    const currentStreak = computed(() => {
        if (logs.value.length === 0) return 0

        // Get unique sorted dates (YYYY-MM-DD)
        const activeDates = new Set(
            logs.value.map(log => new Date(log.completedAt).toISOString().split('T')[0])
        )
        const sortedDates = Array.from(activeDates).sort().reverse()

        const now = new Date()
        const today = now.toISOString().split('T')[0]
        
        const yesterdayDate = new Date()
        yesterdayDate.setDate(now.getDate() - 1)
        const yesterday = yesterdayDate.toISOString().split('T')[0]

        // If no activity today OR yesterday, streak is broken (return 0)
        // Unless we want it to persist until the end of today? 
        // Usually, a streak includes today OR yesterday.
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
    })

    return {
        logs,
        sessions,
        addLog,
        addSessionLog,
        weeklyStats,
        totalMinutesThisWeek,
        totalMinutesToday,
        averageMinutesPerDay,
        currentStreak
    }
}
