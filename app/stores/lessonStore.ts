import { defineStore } from 'pinia'
import type { LessonOverview, LessonContent, Assessment } from '~/types/course'

export const useLessonStore = defineStore('lessonStore', {
    state: () => ({
        lessons: [] as LessonOverview[],
        lessonContents: [] as LessonContent[],
        assessments: [] as Assessment[]
    }),

    actions: {
        addLessons(newLessons: LessonOverview[]) {
            this.lessons.push(...newLessons)
        },
        addLessonContents(newContents: LessonContent[]) {
            this.lessonContents.push(...newContents)
        },
        addAssessments(newAssessments: Assessment[]) {
            this.assessments.push(...newAssessments)
        },
        getLessonsByCourse(courseId: string) {
            return this.lessons.filter(l => l.courseId === courseId)
        },
        getAdjacentLessons(lessonId: string) {
            const current = this.lessons.find(l => l.id === lessonId)
            if (!current) return { prev: null, next: null }

            const courseLessons = this.getLessonsByCourse(current.courseId)
            const index = courseLessons.findIndex(l => l.id === lessonId)

            return {
                prev: index > 0 ? courseLessons[index - 1] : null,
                next: index < courseLessons.length - 1 ? courseLessons[index + 1] : null
            }
        },
        completeLesson(lessonId: string) {
            const current = this.lessons.find(l => l.id === lessonId)
            if (!current) return

            current.status = 'completed'
            current.color = 'green'

            const courseLessons = this.getLessonsByCourse(current.courseId)
            const index = courseLessons.findIndex(l => l.id === lessonId)
            const next = courseLessons[index + 1]

            if (next && next.status === 'locked') {
                next.status = 'current'
                if (next.color === 'neutral') {
                    next.color = 'primary'
                }
            }
        },
        getLessonContentById(lessonId: string) {
            return this.lessonContents.find(c => c.id === lessonId)
        },
        getAssessmentByLessonId(lessonId: string) {
            return this.assessments.find(a => a.lessonId === lessonId)
        },
        updateLessonsForCourse(courseId: string, newLessons: LessonOverview[]) {
            this.lessons = this.lessons.filter(l => l.courseId !== courseId)
            this.lessons.push(...newLessons)
        },
        clearAll() {
            this.lessons = []
            this.lessonContents = []
            this.assessments = []
        }
    },

    persist: { storage: persistedState.localStorage }
})
