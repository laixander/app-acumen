import { MOCK_TOPICS } from '~/constants/topics'
import { useTopics } from '~/composables/useTopics'
import { useToast } from '#ui/composables/useToast'

export const useSeeder = () => {
    const { topics } = useTopics()
    const toast = useToast()

    const seedTopics = () => {
        topics.value = [...MOCK_TOPICS]
        toast.add({ title: 'Test data seeded!', color: 'success' })
    }

    const clearTopics = () => {
        topics.value = []
        toast.add({ title: 'Test data cleared!', color: 'info' })
    }

    return {
        seedTopics,
        clearTopics
    }
}
