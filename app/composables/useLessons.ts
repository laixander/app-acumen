import { watch } from 'vue'
import type { LessonOverview, LessonContent, Assessment } from '~/types/topic'

export const useLessons = () => {
    const lessons = useState<LessonOverview[]>('lessons', () => [])
    const lessonContents = useState<LessonContent[]>('lessonContents', () => [])
    const assessments = useState<Assessment[]>('assessments', () => [])

    const initLessons = () => {
        if (import.meta.client) {
            // Load lessons
            const savedLessons = localStorage.getItem('learnfast-lessons')
            if (savedLessons) {
                try { lessons.value = JSON.parse(savedLessons) } catch (e) { console.error(e) }
            }
            watch(lessons, (val) => {
                localStorage.setItem('learnfast-lessons', JSON.stringify(val))
            }, { deep: true })

            // Load contents
            const savedContents = localStorage.getItem('learnfast-lesson-contents')
            if (savedContents) {
                try { lessonContents.value = JSON.parse(savedContents) } catch (e) { console.error(e) }
            }
            watch(lessonContents, (val) => {
                localStorage.setItem('learnfast-lesson-contents', JSON.stringify(val))
            }, { deep: true })

            // Load assessments
            const savedAssessments = localStorage.getItem('learnfast-assessments')
            if (savedAssessments) {
                try { assessments.value = JSON.parse(savedAssessments) } catch (e) { console.error(e) }
            }
            watch(assessments, (val) => {
                localStorage.setItem('learnfast-assessments', JSON.stringify(val))
            }, { deep: true })
        }
    }

    const addLessons = (newLessons: LessonOverview[]) => {
        lessons.value.push(...newLessons)
    }

    const addLessonContents = (newContents: LessonContent[]) => {
        lessonContents.value.push(...newContents)
    }

    const addAssessments = (newAssessments: Assessment[]) => {
        assessments.value.push(...newAssessments)
    }

    const getLessonsByTopic = (topicId: string) => {
        return lessons.value.filter(l => l.topicId === topicId)
    }

    const getAdjacentLessons = (lessonId: string) => {
        const current = lessons.value.find(l => l.id === lessonId)
        if (!current) return { prev: null, next: null }

        const topicLessons = getLessonsByTopic(current.topicId)
        const index = topicLessons.findIndex(l => l.id === lessonId)

        return {
            prev: index > 0 ? topicLessons[index - 1] : null,
            next: index < topicLessons.length - 1 ? topicLessons[index + 1] : null
        }
    }

    const completeLesson = (lessonId: string) => {
        const current = lessons.value.find(l => l.id === lessonId)
        if (!current) return

        current.status = 'completed'
        current.color = 'green'

        const topicLessons = getLessonsByTopic(current.topicId)
        const index = topicLessons.findIndex(l => l.id === lessonId)
        const next = topicLessons[index + 1]

        if (next && next.status === 'locked') {
            next.status = 'current'
            if (next.color === 'neutral') {
                next.color = 'primary'
            }
        }
    }

    const getLessonContentById = (lessonId: string) => {
        return lessonContents.value.find(c => c.id === lessonId)
    }

    const getAssessmentByLessonId = (lessonId: string) => {
        return assessments.value.find(a => a.lessonId === lessonId)
    }

    const updateLessonsForTopic = (topicId: string, newLessons: LessonOverview[]) => {
        // Remove old lessons for this topic
        lessons.value = lessons.value.filter(l => l.topicId !== topicId)
        // Add new ones
        lessons.value.push(...newLessons)
    }

    const clearAll = () => {
        lessons.value = []
        lessonContents.value = []
        assessments.value = []
    }

    return {
        lessons,
        initLessons,
        lessonContents,
        assessments,
        addLessons,
        addLessonContents,
        addAssessments,
        updateLessonsForTopic,
        getLessonsByTopic,
        getAdjacentLessons,
        completeLesson,
        getLessonContentById,
        getAssessmentByLessonId,
        clearAll
    }
}
