import type { Topic, LessonOverview, LessonContent, Assessment } from '~/types/topic'
import { TOPIC_CONTENT_MAP } from './topics'

export const generateBaseLessonsForTopic = (topicId: string, topicTitle: string): {
    baseLessons: LessonOverview[],
    baseContents: LessonContent[],
    baseAssessments: Assessment[]
} => {
    const custom = TOPIC_CONTENT_MAP[topicId]
    const baseLessons: LessonOverview[] = []
    const baseContents: LessonContent[] = []
    const baseAssessments: Assessment[] = []

    if (custom) {
        custom.lessons.forEach((l, idx) => {
            const lessonId = l.id || `${topicId}-lesson-${idx + 1}`
            const status = idx === 0 ? 'current' : 'locked'

            baseLessons.push({
                id: lessonId,
                topicId,
                title: l.title || `Lesson ${idx + 1}`,
                duration: l.duration || '15 min',
                status: status as any,
                type: l.type || 'reading',
                icon: l.icon || 'i-lucide-book-open',
                color: l.color || 'primary',
                summary: l.summary || 'Custom lesson content.'
            } as LessonOverview)

            baseContents.push({
                id: lessonId,
                topicId,
                title: l.title || `Lesson ${idx + 1}`,
                description: l.content?.description || `Detailed study materials for ${l.title}.`,
                lessonTypes: l.content?.lessonTypes || ['Reading', 'Video'],
                sections: l.content?.sections || [
                    { title: 'Overview', content: 'Study materials for this lesson.', aiInsight: null }
                ]
            } as LessonContent)

            if (l.assessment) {
                baseAssessments.push({
                    id: `assess-${lessonId}`,
                    lessonId,
                    topicId,
                    title: l.assessment.title || `Assessment: ${l.title}`,
                    questions: l.assessment.questions || []
                } as Assessment)
            }
        })
    } else {
        const count = 8 + Math.floor(Math.random() * 5)
        for (let i = 1; i <= count; i++) {
            const lessonId = `${topicId}-lesson-${i}`
            const status = i === 1 ? 'current' : 'locked'

            baseLessons.push({
                id: lessonId,
                topicId,
                title: `Lesson ${i}: Understanding ${topicTitle}`,
                duration: '20 min',
                status: status as any,
                type: 'reading',
                icon: 'i-lucide-book-open',
                color: i === 1 ? 'primary' : 'neutral',
                summary: `Essential concepts for ${topicTitle} - part ${i}.`
            })

            baseContents.push({
                id: lessonId,
                topicId,
                title: `Lesson ${i}: ${topicTitle}`,
                description: `Deep dive into the core principles of ${topicTitle}.`,
                lessonTypes: ['Reading', 'Video'],
                sections: [
                    { title: 'Core Objectives', content: 'AI-generated content for this section.', aiInsight: 'Focus on foundations.' }
                ]
            } as LessonContent)
        }
    }

    return { baseLessons, baseContents, baseAssessments }
}

export const calculateInterval = (totalLessons: number) => {
    if (totalLessons <= 5) return 2
    if (totalLessons <= 8) return 3
    return 5
}

export const generateReviewContent = (id: string, topicId: string, topicTitle: string, isFinal: boolean): LessonContent => {
    return {
        id,
        topicId,
        title: isFinal ? 'Final Topic Review' : 'Checkpoint Review',
        description: isFinal
            ? `You've reached the end of ${topicTitle}! This final review session will help you synthesize everything you've learned before the final assessment.`
            : `Great job reaching this milestone in ${topicTitle}. Take a moment to review core concepts.`,
        lessonTypes: ['Reading'],
        sections: [
            {
                title: "Key Takeaways",
                content: "Review the core principles discussed in the preceding lessons. Focus on how these concepts integrate with your overall learning objectives.",
                aiInsight: "This assessment will specifically test your ability to apply these concepts in combined scenarios."
            },
            {
                title: "Quick Recap",
                content: "Ensure you are comfortable with the terminology and logic flow before proceeding.",
                aiInsight: null
            }
        ],
        assessmentId: id
    }
}

export const injectAssessmentsIntoTimeline = (
    topicId: string,
    topicTitle: string,
    baseLessons: LessonOverview[],
    completedCount: number = 0,
    totalCount: number = 0,
    isTopicComplete: boolean = false,
    predefinedAssessments: Assessment[] = []
) => {
    const totalBaseLessons = baseLessons.filter(l => l.type !== 'quiz').length
    const interval = calculateInterval(totalBaseLessons)

    const newTimeline: LessonOverview[] = []
    const newAssessments: Assessment[] = [...predefinedAssessments]
    const newContents: LessonContent[] = []
    let baseCount = 0

    baseLessons.forEach((lesson, index) => {
        newTimeline.push(lesson)
        baseCount++

        const existingAssess = predefinedAssessments.find(a => a.lessonId === lesson.id)
        if (existingAssess) {
            lesson.assessmentId = existingAssess.id
        }

        if (baseCount % interval === 0 && index !== baseLessons.length - 1) {
            const quizId = `${topicId}-quiz-${baseCount}`
            
            let status: 'completed' | 'current' | 'locked' = 'locked'
            let color: string = 'neutral'
            
            if (baseCount < completedCount) {
                status = 'completed'
                color = 'green'
            } else if (baseCount === completedCount) {
                status = 'current'
                color = 'orange'
            }

            newTimeline.push({
                id: quizId,
                topicId,
                title: `Checkpoint Quiz ${Math.ceil(baseCount / interval)}`,
                duration: '10 min',
                status,
                type: 'Assessment',
                icon: 'i-lucide-award',
                color,
                summary: `Review milestone for the last ${interval} lessons.`
            })

            const review = generateReviewContent(quizId, topicId, topicTitle, false)
            newContents.push(review)

            newAssessments.push({
                id: quizId,
                lessonId: quizId,
                topicId,
                title: `Checkpoint Quiz: ${topicTitle}`,
                questions: [
                    {
                        id: 1,
                        text: `What is the primary theme of the last ${interval} lessons?`,
                        options: [{ id: '1', label: 'Correct Answer' }, { id: '2', label: 'Wrong' }, { id: '3', label: 'Wrong' }],
                        correct: '1'
                    },
                    {
                        id: 2,
                        text: `How does this relate to ${topicTitle}?`,
                        options: [{ id: '1', label: 'Related' }, { id: '2', label: 'Unrelated' }],
                        correct: '1'
                    }
                ]
            })
        }
    })

    const finalId = `${topicId}-final`
    let finalStatus: 'completed' | 'current' | 'locked' = 'locked'
    let finalColor: string = 'neutral'

    if (isTopicComplete) {
        finalStatus = 'completed'
        finalColor = 'green'
    } else if (completedCount === totalCount) {
        finalStatus = 'current'
        finalColor = 'purple'
    }

    newTimeline.push({
        id: finalId,
        topicId,
        title: 'Final Assessment',
        duration: '25 min',
        status: finalStatus,
        type: 'Assessment',
        icon: 'i-lucide-graduation-cap',
        color: finalColor,
        summary: 'Comprehensive evaluation of the entire topic.'
    })

    newContents.push(generateReviewContent(finalId, topicId, topicTitle, true))

    newAssessments.push({
        id: finalId,
        lessonId: finalId,
        topicId,
        title: `Final Assessment: ${topicTitle}`,
        questions: Array.from({ length: 5 }, (_, idx) => ({
            id: idx + 1,
            text: `Advanced evaluation question ${idx + 1} for ${topicTitle}.`,
            options: [
                { id: '1', label: 'Mastery Answer' },
                { id: '2', label: 'Distractor A' },
                { id: '3', label: 'Distractor B' },
                { id: '4', label: 'Distractor C' }
            ],
            correct: '1'
        }))
    })

    return { newTimeline, newAssessments, newContents }
}
