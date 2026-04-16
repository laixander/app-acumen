import { computed, watch } from 'vue'
import { MOCK_DASHBOARD_STATS, MOCK_RECOMMENDED_TOPICS } from '~/constants/dashboard'
import { useActivityLogs } from '~/composables/useActivityLogs'

export interface RecommendedTopic {
    title: string
    tag: string
    icon: string
}

export const useDashboard = () => {
    const { currentStreak, totalMinutesToday, logs } = useActivityLogs()
    
    // Recommended Topics State (initial empty, seedable)
    const recommendedTopics = useState<RecommendedTopic[]>('recommended-topics', () => [])

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

    // Dynamic Stats Calculation
    const stats = computed(() => {
        return MOCK_DASHBOARD_STATS.map(baseStat => {
            let value = '0'
            
            if (baseStat.key === 'streak') {
                value = currentStreak.value.toString()
            } else if (baseStat.key === 'today') {
                value = totalMinutesToday.value.toString()
            } else if (baseStat.key === 'total') {
                value = logs.value.length.toString()
            }

            // Only show trends if there is actual activity
            const numericValue = parseInt(value) || 0
            const showTrend = numericValue > 0

            return {
                ...baseStat,
                value,
                showTrend,
                // If it's the streak, maybe we don't have a trend percentage yet
                trendValue: showTrend ? baseStat.trendValue : ''
            }
        })
    })

    return {
        stats,
        recommendedTopics
    }
}
