import { MOCK_TOPICS, injectAssessmentsIntoTimeline, MOCK_ACTIVITY_LOGS, MOCK_SESSION_LOGS, calculateInterval } from '~/utils/seeder'
import { MOCK_RECOMMENDED_TOPICS } from '~/constants/dashboard'
import { useTopics } from '~/composables/useTopics'
import { useDashboard } from '~/composables/useDashboard'
import { useLessons } from '~/composables/useLessons'
import { useToast } from '#ui/composables/useToast'
import type { LessonOverview, LessonContent, Assessment } from '~/types/topic'

export const useSeeder = () => {
    const { topics } = useTopics()
    const { getLessonsByTopic, addLessons, addLessonContents, addAssessments, clearAll: clearLessons } = useLessons()
    const { logs, sessions } = useActivityLogs()
    const { recommendedTopics } = useDashboard()
    const toast = useToast()

    const seedTopics = () => {
        topics.value = [...MOCK_TOPICS]
        logs.value = [...MOCK_ACTIVITY_LOGS]
        sessions.value = [...MOCK_SESSION_LOGS]
        recommendedTopics.value = [...MOCK_RECOMMENDED_TOPICS]
        
        const allLessons: LessonOverview[] = []
        const allContents: LessonContent[] = []
        const allAssessments: Assessment[] = []

        MOCK_TOPICS.forEach(topic => {
            const lessonsParts = topic.lessons.split('/').map(Number)
            const completed = lessonsParts[0] ?? 0
            const total = lessonsParts[1] ?? 0
            
            const baseLessons: LessonOverview[] = []
            
            // Create base reading lessons
            for (let i = 1; i <= total; i++) {
                const lessonId = `${topic.id}-lesson-${i}`
                const interval = calculateInterval(total)
                const hasQuizAtCurrent = completed > 0 && completed % interval === 0 && completed < total
                
                const status = i <= completed 
                    ? 'completed' 
                    : (i === completed + 1 && !hasQuizAtCurrent ? 'current' : 'locked')
                
                baseLessons.push({
                    id: lessonId,
                    topicId: topic.id,
                    title: `Lesson ${i}: ${topic.title} Core`,
                    duration: '15 min',
                    status: status as any,
                    type: 'reading',
                    icon: 'i-lucide-book-open',
                    color: status === 'completed' ? 'green' : (status === 'current' ? 'primary' : 'neutral'),
                    summary: `Standard seeded lesson content for module ${i}.`
                })

                allContents.push({
                    id: lessonId,
                    topicId: topic.id,
                    title: `Lesson ${i}: ${topic.title} Core`,
                    description: `Topic module exploration Part ${i}.`,
                    sections: [
                        { title: "Overview", content: "Details about this seeded lesson.", aiInsight: "Review this before the milestone." }
                    ]
                })
            }

            // Inject Assessments using centralized logic
            const { newTimeline, newAssessments, newContents } = injectAssessmentsIntoTimeline(
                topic.id, 
                topic.title, 
                baseLessons, 
                completed, 
                total, 
                topic.status === 'Completed'
            )
            
            // The statuses are now correctly calculated inside injectAssessmentsIntoTimeline based on 'completed' and 'total'

            allLessons.push(...newTimeline)
            allAssessments.push(...newAssessments)
            allContents.push(...newContents)
        })

        clearLessons()
        addLessons(allLessons)
        addLessonContents(allContents)
        addAssessments(allAssessments)

        toast.add({ title: 'Test data seeded!', color: 'success' })
    }

    const clearTopics = () => {
        topics.value = []
        logs.value = []
        sessions.value = []
        recommendedTopics.value = []
        clearLessons()
        toast.add({ title: 'Test data cleared!', color: 'info' })
    }

    return {
        seedTopics,
        clearTopics
    }
}
