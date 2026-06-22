// ============================================================================
// Store: courseStore
// ============================================================================
// State management for courses with local persistence and mock data seeding.
//
// Usage:
//   const store = useCourseStore()

import { defineStore } from 'pinia'
import type { Course } from '~/types/course'
import { generateSlug } from '~/utils/slug'

export const useCourseStore = defineStore('courseStore', {
    state: () => ({
        courses: [] as Course[],
        isLoading: false,
        hasInitializedSeed: false,
    }),

    actions: {
        async deployMockData() {
            this.isLoading = true
            try {
                const mockData = await $fetch<Course[]>('/api/courses')
                // Overwrite with mock data for demo purposes
                this.courses = mockData
            } catch (err) {
                console.error('Failed to load mock data:', err)
            } finally {
                this.isLoading = false
            }
        },

        createCourse(item: Course) {
            this.courses.unshift(item)
        },
        addCourse(item: Course) {
            this.courses.unshift(item)
        },

        updateCourse(id: string, updatedData: Partial<Course>) {
            const index = this.courses.findIndex(e => e.id === id)
            if (index !== -1) {
                this.courses[index] = { ...this.courses[index], ...updatedData } as Course
            }
        },

        updateCourseProgress(id: string, progress: number) {
            const index = this.courses.findIndex(e => e.id === id)
            if (index !== -1) {
                this.courses[index] = { ...this.courses[index], progress } as Course
            }
        },

        deleteCourse(id: string) {
            this.courses = this.courses.filter(e => e.id !== id)
        }
    },

    getters: {
        courseCount: (state) => state.courses.length,
        hasCourses: (state) => state.courses.length > 0,
        completedCourses: (state) => state.courses.filter(c => c.progress === 100),
        inProgressCourses: (state) => state.courses.filter(c => c.progress < 100),
        pinnedCourses: (state) => state.courses.filter(c => c.isPinned),
        getCourseBySlugOrId: (state) => (idOrSlug: string) => {
            return state.courses.find(c => c.id === idOrSlug || generateSlug(c.title) === idOrSlug)
        }
    },

    persist: {
        storage: persistedState.localStorage
    }
})
