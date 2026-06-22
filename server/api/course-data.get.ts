import { eventHandler } from 'h3'

import type { LessonOverview, LessonContent, Assessment } from '~/types/course'

export default eventHandler(() => {
    const allLessons: LessonOverview[] = []
    const allContents: LessonContent[] = []
    const allAssessments: Assessment[] = []

    MOCK_COURSES.forEach(course => {
        const lessonsParts = course.lessons.split('/').map(Number)
        const completed = lessonsParts[0] ?? 0
        const total = lessonsParts[1] ?? 0
        
        const baseLessons: LessonOverview[] = []
        
        // Create base reading lessons
        for (let i = 1; i <= total; i++) {
            const lessonId = `${course.id}-lesson-${i}`
            const interval = calculateInterval(total)
            const hasQuizAtCurrent = completed > 0 && completed % interval === 0 && completed < total
            
            const status = i <= completed 
                ? 'completed' 
                : (i === completed + 1 && !hasQuizAtCurrent ? 'current' : 'locked')
            
            baseLessons.push({
                id: lessonId,
                courseId: course.id,
                title: `Lesson ${i}: ${course.title} Core`,
                duration: '15 min',
                status: status as any,
                type: 'reading',
                icon: 'i-lucide-book-open',
                color: status === 'completed' ? 'green' : (status === 'current' ? 'primary' : 'neutral'),
                summary: `Standard seeded lesson content for module ${i}.`
            })

            allContents.push({
                id: lessonId,
                courseId: course.id,
                title: `Lesson ${i}: ${course.title} Core`,
                description: `Course module exploration Part ${i}.`,
                lessonTypes: ['Reading', 'Video'],
                sections: [
                    { title: "Overview", content: "Details about this seeded lesson.", aiInsight: "Review this before the milestone." }
                ]
            })
        }

        // Inject Assessments using centralized logic
        const { newTimeline, newAssessments, newContents } = injectAssessmentsIntoTimeline(
            course.id, 
            course.title, 
            baseLessons, 
            completed, 
            total, 
            course.status === 'Completed'
        )
        
        allLessons.push(...newTimeline)
        allAssessments.push(...newAssessments)
        allContents.push(...newContents)
    })

    return {
        courses: MOCK_COURSES,
        lessons: allLessons,
        contents: allContents,
        assessments: allAssessments
    }
})
