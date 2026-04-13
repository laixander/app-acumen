import { computed, watch } from 'vue'
import type { Topic } from '~/types/topic'

export const useTopics = () => {
    const topics = useState<Topic[]>('topics', () => [])

    if (import.meta.client) {
        const saved = localStorage.getItem('learnfast-topics')
        if (saved) {
            try {
                topics.value = JSON.parse(saved)
            } catch (e) {
                console.error("Failed to load topics:", e)
            }
        }
        watch(topics, (newVal) => {
            localStorage.setItem('learnfast-topics', JSON.stringify(newVal))
        }, { deep: true })
    }


    const updateLastStudied = (topicTitle: string) => {
        const topic = topics.value.find(t => t.title === topicTitle)
        if (topic) {
            topic.lastStudiedAt = Date.now()
            topic.lastStudied = 'Just now'
        }
    }

    const togglePin = (topicTitle: string) => {
        const topic = topics.value.find(t => t.title === topicTitle)
        if (topic) {
            topic.isPinned = !topic.isPinned
        }
    }

    const pinnedTopics = computed(() => {
        return topics.value.filter(t => t.isPinned && t.status !== 'Archived')
    })

    const continueLearningTopic = computed(() => {
        return topics.value
            .filter(t => t.status !== 'Archived' && t.progress < 100)
            .sort((a, b) => b.lastStudiedAt - a.lastStudiedAt)[0]
    })

    const recentTopics = computed(() => {
        const top = continueLearningTopic.value
        return topics.value
            .filter(t => t.status !== 'Archived' && t.title !== top?.title)
            .sort((a, b) => b.lastStudiedAt - a.lastStudiedAt)
            .slice(0, 3)
    })

    return {
        topics,
        togglePin,
        updateLastStudied,
        pinnedTopics,
        continueLearningTopic,
        recentTopics
    }
}
