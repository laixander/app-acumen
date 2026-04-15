import { computed, watch } from 'vue'
import type { Topic } from '~/types/topic'

export const useTopics = () => {
    const topics = useState<Topic[]>('topics', () => [])

    const slugify = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')

    if (import.meta.client) {
        const saved = localStorage.getItem('learnfast-topics')
        if (saved) {
            try {
                const parsed = JSON.parse(saved)
                topics.value = parsed.map((t: Topic) => {
                    if (!t.id) {
                        t.id = slugify(t.title)
                    }
                    if (!t.slug) {
                        t.slug = t.id
                    }
                    return t
                })
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

    const addTopic = (newTopic: Omit<Topic, 'id' | 'slug'> & { slug?: string }) => {
        const id = newTopic.slug || slugify(newTopic.title)
        topics.value.push({ ...newTopic, id, slug: id } as Topic)
    }

    const updateTopicProgress = (topicId: string, completed: number, total: number, progress: number) => {
        const topic = topics.value.find(t => t.id === topicId)
        if (topic) {
            topic.progress = progress
            topic.lessons = `${completed}/${total}`
            topic.lastStudiedAt = Date.now()
            topic.lastStudied = 'Just now'
            
            if (progress >= 100) {
                topic.status = 'Completed'
            } else if (topic.status === 'Completed') {
                topic.status = 'Ongoing' // Reset if somehow progress goes down (e.g. adding lessons)
            }
        }
    }

    return {
        topics,
        togglePin,
        updateLastStudied,
        updateTopicProgress,
        pinnedTopics,
        continueLearningTopic,
        recentTopics,
        addTopic
    }
}
