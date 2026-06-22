import { computed, watch } from 'vue'
import { slugify } from '~/utils/format'
import type { Course } from '~/types/course'

export const useCourses = () => {
    const courses = useState<Course[]>('courses', () => [])



    const initCourses = () => {
        if (import.meta.client) {
            const saved = localStorage.getItem('learnfast-courses')
            if (saved) {
                try {
                    const parsed = JSON.parse(saved)
                    courses.value = parsed.map((t: Course) => {
                        if (!t.id) {
                            t.id = slugify(t.title)
                        }
                        return t
                    })
                } catch (e) {
                    console.error("Failed to load courses:", e)
                }
            }
            watch(courses, (newVal) => {
                localStorage.setItem('learnfast-courses', JSON.stringify(newVal))
            }, { deep: true })
        }
    }


    const updateLastStudied = (courseTitle: string) => {
        const course = courses.value.find(t => t.title === courseTitle)
        if (course) {
            course.lastStudiedAt = Date.now()
            course.lastStudied = 'Just now'
        }
    }

    const togglePin = (courseTitle: string) => {
        const course = courses.value.find(t => t.title === courseTitle)
        if (course) {
            course.isPinned = !course.isPinned
        }
    }

    const pinnedCourses = computed(() => {
        return courses.value.filter(t => t.isPinned && t.status !== 'Archived')
    })

    const continueLearningCourse = computed(() => {
        return courses.value
            .filter(t => t.status !== 'Archived' && t.progress < 100)
            .sort((a, b) => b.lastStudiedAt - a.lastStudiedAt)[0]
    })

    const recentCourses = computed(() => {
        return courses.value
            .filter(t => t.status !== 'Archived')
            .sort((a, b) => b.lastStudiedAt - a.lastStudiedAt)
            .slice(0, 3)
    })

    const addCourse = (newCourse: Omit<Course, 'id'>) => {
        const id = slugify(newCourse.title)
        courses.value.push({ ...newCourse, id } as Course)
    }

    const updateCourseProgress = (courseId: string, completed: number, total: number, progress: number) => {
        const course = courses.value.find(t => t.id === courseId)
        if (course) {
            course.progress = progress
            course.lessons = `${completed}/${total}`
            course.lastStudiedAt = Date.now()
            course.lastStudied = 'Just now'
            
            if (progress >= 100) {
                course.status = 'Completed'
            } else if (course.status === 'Completed') {
                course.status = 'Ongoing' // Reset if somehow progress goes down (e.g. adding lessons)
            }
        }
    }

    const archiveCourse = (courseId: string) => {
        const course = courses.value.find(t => t.id === courseId)
        if (course) {
            course.status = 'Archived'
            course.isPinned = false
        }
    }

    const deleteCourse = (courseId: string) => {
        const index = courses.value.findIndex(t => t.id === courseId)
        if (index !== -1) {
            courses.value.splice(index, 1)
        }
    }

    const renameCourse = (courseId: string, newTitle: string) => {
        const course = courses.value.find(t => t.id === courseId)
        if (course) {
            course.title = newTitle
        }
    }

    const updateCourse = (courseId: string, updates: Partial<Omit<Course, 'id'>>) => {
        const course = courses.value.find(t => t.id === courseId)
        if (course) {
            Object.assign(course, updates)
        }
    }

    return {
        courses,
        initCourses,
        togglePin,
        updateLastStudied,
        updateCourseProgress,
        archiveCourse,
        deleteCourse,
        renameCourse,
        updateCourse,
        pinnedCourses,
        continueLearningCourse,
        recentCourses,
        addCourse
    }
}
