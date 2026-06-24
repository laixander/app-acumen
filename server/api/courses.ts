import { eventHandler } from 'h3'
import type { Course } from '~/types/course'

export const mockCourses: Course[] = [
    {
        id: "c-1",
        title: "Advanced Vue 3 Patterns",
        progress: 45,
        tag: "Frontend",
        status: "In Progress",
        lessons: "12/24",
        lastStudied: "2 days ago",
        lastStudiedAt: Date.now() - 2 * 24 * 60 * 60 * 1000,
        icon: "i-simple-icons-vuedotjs",
        isPinned: true,
        learningGoal: "Deep Mastery",
        viewersCount: 120,
        completedCount: 45,
        workspaceId: "1",
        createdBy: {
            id: "u-1",
            name: "Alex Johnson",
            avatar: "https://i.pravatar.cc/128?u=alex",
            role: "Author"
        }
    },
    {
        id: "c-2",
        title: "Nuxt Server Routes",
        progress: 100,
        tag: "Fullstack",
        status: "Completed",
        lessons: "8/8",
        lastStudied: "1 week ago",
        lastStudiedAt: Date.now() - 7 * 24 * 60 * 60 * 1000,
        icon: "i-simple-icons-nuxtdotjs",
        isPinned: false,
        learningGoal: "Practical Application",
        viewersCount: 300,
        completedCount: 250,
        workspaceId: "2",
        createdBy: {
            id: "u-2",
            name: "Jane Smith",
            avatar: "https://i.pravatar.cc/128?u=jane",
            role: "Instructor"
        }
    },
    {
        id: "c-3",
        title: "Tailwind CSS Mastery",
        progress: 10,
        tag: "Design",
        status: "Just Started",
        lessons: "2/20",
        lastStudied: "Just now",
        lastStudiedAt: Date.now(),
        icon: "i-simple-icons-tailwindcss",
        isPinned: true,
        learningGoal: "Quick Overview",
        viewersCount: 50,
        completedCount: 5,
        workspaceId: "2",
        createdBy: {
            id: "u-1",
            name: "Alex Johnson",
            avatar: "https://i.pravatar.cc/128?u=alex",
            role: "Author"
        }
    }
]

export default eventHandler(() => mockCourses)
