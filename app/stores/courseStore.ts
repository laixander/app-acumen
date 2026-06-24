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
import { useWorkspaceStore } from './workspaceStore'
import { useUserStore } from './userStore'

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
        workspaceCourses(state): Course[] {
            const workspaceStore = useWorkspaceStore()
            const userStore = useUserStore()
            
            if (workspaceStore.currentWorkspaceId === '1') {
                // Personal Workspace: authored by current user
                return state.courses.filter(c => c.createdBy?.name === userStore.profile.fullName)
            }
            
            // Other workspaces: match workspaceId
            return state.courses.filter(c => c.workspaceId === workspaceStore.currentWorkspaceId)
        },
        courseCount(): number {
            return this.workspaceCourses.length
        },
        hasCourses(): boolean {
            return this.workspaceCourses.length > 0
        },
        completedCourses(): Course[] {
            return this.workspaceCourses.filter(c => c.progress === 100)
        },
        inProgressCourses(): Course[] {
            return this.workspaceCourses.filter(c => c.progress < 100)
        },
        pinnedCourses(): Course[] {
            return this.workspaceCourses.filter(c => c.isPinned)
        },
        getCourseBySlugOrId: (state) => (idOrSlug: string) => {
            return state.courses.find(c => c.id === idOrSlug || generateSlug(c.title) === idOrSlug)
        }
    },

    persist: {
        storage: persistedState.localStorage
    }
})
