import { 
    MOCK_COURSES, 
    injectAssessmentsIntoTimeline, 
    MOCK_ACTIVITY_LOGS, 
    MOCK_SESSION_LOGS, 
    calculateInterval,
    generateMockWorkspaces,
    generateInitialWorkspaces,
    MOCK_RECEIVED_INVITATIONS,
    generateMockOrganizations,
    generateMockAdminAccounts,
    generateMockPlans,
    generateMockAdminDashboardData,
    generateEmptyAdminDashboardData
} from '~/utils/seeder'
import { MOCK_RECOMMENDED_COURSES } from '~/constants/dashboard'
import { useCourses } from '~/composables/useCourses'
import { useDashboard } from '~/composables/useDashboard'
import { useLessons } from '~/composables/useLessons'
import { useOrganizations } from '~/composables/useOrganizations'
import { useAdminAccounts } from '~/composables/useAdminAccounts'
import { usePlans } from '~/composables/usePlans'
import { useAdminDashboard } from '~/composables/useAdminDashboard'
import { useToast } from '#ui/composables/useToast'
import type { LessonOverview, LessonContent, Assessment } from '~/types/course'

export const useSeeder = () => {
    const { courses } = useCourses()
    const { getLessonsByCourse, addLessons, addLessonContents, addAssessments, clearAll: clearLessons } = useLessons()
    const { logs, sessions } = useActivityLogs()
    const { recommendedCourses } = useDashboard()
    const toast = useToast()

    const { user } = useUser()

    const seedWorkspaces = () => {
        const { workspaces, pendingInvitations, currentWorkspaceId, saveWorkspaces } = useWorkspaces()
        workspaces.value = generateMockWorkspaces(user.value.profile)
        pendingInvitations.value = [...MOCK_RECEIVED_INVITATIONS]
        currentWorkspaceId.value = '1'
        saveWorkspaces()
    }

    const seedOrganizations = () => {
        const { organizations, currentOrganizationId, saveOrganizations } = useOrganizations()
        organizations.value = generateMockOrganizations(user.value.profile)
        currentOrganizationId.value = organizations.value[0]?.id || null
        saveOrganizations()
    }

    const clearWorkspaces = () => {
        const { workspaces, pendingInvitations, currentWorkspaceId, saveWorkspaces } = useWorkspaces()
        workspaces.value = generateInitialWorkspaces(user.value.profile)
        pendingInvitations.value = []
        currentWorkspaceId.value = '1'
        saveWorkspaces()
    }

    const clearOrganizations = () => {
        const { organizations, currentOrganizationId, saveOrganizations } = useOrganizations()
        organizations.value = []
        currentOrganizationId.value = null
        saveOrganizations()
    }

    const seedAdminAccounts = () => {
        const { adminAccounts, saveAdminAccounts } = useAdminAccounts()
        adminAccounts.value = generateMockAdminAccounts()
        saveAdminAccounts()
    }

    const clearAdminAccounts = () => {
        const { adminAccounts, saveAdminAccounts } = useAdminAccounts()
        adminAccounts.value = []
        saveAdminAccounts()
    }

    const seedPlans = () => {
        const { plans, savePlans } = usePlans()
        plans.value = generateMockPlans()
        savePlans()
    }

    const clearPlans = () => {
        const { plans, savePlans } = usePlans()
        plans.value = []
        savePlans()
    }

    const seedAdminDashboard = () => {
        const { adminDashboardData, saveAdminDashboard } = useAdminDashboard()
        adminDashboardData.value = generateMockAdminDashboardData()
        saveAdminDashboard()
    }

    const clearAdminDashboard = () => {
        const { adminDashboardData, saveAdminDashboard } = useAdminDashboard()
        adminDashboardData.value = generateEmptyAdminDashboardData()
        saveAdminDashboard()
    }

    const seedCourses = () => {
        courses.value = [...MOCK_COURSES]
        logs.value = [...MOCK_ACTIVITY_LOGS]
        sessions.value = [...MOCK_SESSION_LOGS]
        recommendedCourses.value = [...MOCK_RECOMMENDED_COURSES]
        
        seedWorkspaces()
        seedOrganizations()
        seedAdminAccounts()
        seedPlans()
        seedAdminDashboard()
        
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

        clearLessons()
        addLessons(allLessons)
        addLessonContents(allContents)
        addAssessments(allAssessments)

        toast.add({ title: 'Test data seeded!', color: 'success' })
    }

    const clearCourses = () => {
        courses.value = []
        logs.value = []
        sessions.value = []
        recommendedCourses.value = []
        clearLessons()
        clearWorkspaces()
        clearOrganizations()
        clearAdminAccounts()
        clearPlans()
        clearAdminDashboard()
        toast.add({ title: 'Test data cleared!', color: 'info' })
    }

    return {
        seedCourses,
        clearCourses,
        seedWorkspaces,
        clearWorkspaces,
        seedOrganizations,
        clearOrganizations,
        seedAdminAccounts,
        clearAdminAccounts,
        seedPlans,
        clearPlans,
        seedAdminDashboard,
        clearAdminDashboard
    }
}
