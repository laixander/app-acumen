import { MOCK_TOPICS } from '~/constants/topics'
import { useTopics } from '~/composables/useTopics'
import { useLessons } from '~/composables/useLessons'
import { useToast } from '#ui/composables/useToast'
import type { LessonOverview, LessonContent, Assessment } from '~/types/topic'

export const useSeeder = () => {
    const { topics } = useTopics()
    const { lessons, lessonContents, assessments, addLessons, addLessonContents, addAssessments, clearAll: clearLessons } = useLessons()
    const toast = useToast()

    const seedTopics = () => {
        topics.value = [...MOCK_TOPICS]
        
        // Clear and Seed Lessons for each topic
        const allLessons: LessonOverview[] = []
        const allContents: LessonContent[] = []
        const allAssessments: Assessment[] = []

        MOCK_TOPICS.forEach(topic => {
            const lessonsParts = topic.lessons.split('/').map(Number)
            const completed = lessonsParts[0] ?? 0
            const total = lessonsParts[1] ?? 0
            
            for (let i = 1; i <= total; i++) {
                const lessonId = `${topic.id}-lesson-${i}`
                const status = i <= completed ? 'completed' : (i === completed + 1 ? 'current' : 'locked')
                
                allLessons.push({
                    id: lessonId,
                    topicId: topic.id,
                    title: `Lesson ${i}: ${topic.title} Deep Dive`,
                    duration: '15 min',
                    status: status as any,
                    type: i % 4 === 0 ? 'quiz' : 'reading',
                    icon: i % 4 === 0 ? 'i-lucide-clipboard-check' : 'i-lucide-book-open',
                    color: i <= completed ? 'green' : (i === completed + 1 ? 'primary' : 'neutral'),
                    summary: `Automated summary for lesson ${i} of ${topic.title}. This content is generated to provide a realistic trial experience.`
                })

                allContents.push({
                    id: lessonId,
                    topicId: topic.id,
                    title: `Lesson ${i}: ${topic.title} Deep Dive`,
                    description: `Detailed exploration of ${topic.title} - Part ${i}.`,
                    sections: [
                        {
                            title: "Overview",
                            content: `This section covers the essential concepts of ${topic.title} in the context of lesson ${i}.`,
                            aiInsight: "Pay close attention to the relationship between these concepts and your overall learning goal."
                        }
                    ],
                    assessmentId: i % 4 === 0 ? `assess-${lessonId}` : undefined
                })

                if (i % 4 === 0) {
                    allAssessments.push({
                        id: `assess-${lessonId}`,
                        lessonId: lessonId,
                        title: `Assessment ${i/4}`,
                        questions: [
                            {
                                id: 1,
                                text: `What is the primary takeaway from ${topic.title} Part ${i}?`,
                                options: [
                                    { id: 'a', label: 'The first option' },
                                    { id: 'b', label: 'The second option' },
                                    { id: 'c', label: 'The third option' }
                                ],
                                correct: 'a'
                            }
                        ]
                    })
                }
            }
        })

        clearLessons()
        addLessons(allLessons)
        addLessonContents(allContents)
        addAssessments(allAssessments)

        toast.add({ title: 'Test data seeded!', color: 'success' })
    }

    const clearTopics = () => {
        topics.value = []
        clearLessons()
        toast.add({ title: 'Test data cleared!', color: 'info' })
    }

    return {
        seedTopics,
        clearTopics
    }
}
