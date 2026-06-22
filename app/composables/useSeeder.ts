import { useCourseStore } from '~/stores/courseStore'
import { useDashboardStore } from '~/stores/dashboardStore'
import { useLessonStore } from '~/stores/lessonStore'
import { useOrganizationStore } from '~/stores/organizationStore'
import { useAdminAccountStore } from '~/stores/adminAccountStore'
import { usePlanStore } from '~/stores/planStore'
import { useAdminDashboardStore } from '~/stores/adminDashboardStore'
import { useActivityLogStore } from '~/stores/activityLogStore'
import { useWorkspaceStore } from '~/stores/workspaceStore'
import { useUserStore } from '~/stores/userStore'
import { useToast } from '#ui/composables/useToast'


export const useSeeder = () => {
    const toast = useToast()
    const userStore = useUserStore()
    
    // Store instances
    const courseStore = useCourseStore()
    const dashboardStore = useDashboardStore()
    const lessonStore = useLessonStore()
    const organizationStore = useOrganizationStore()
    const adminAccountStore = useAdminAccountStore()
    const planStore = usePlanStore()
    const adminDashboardStore = useAdminDashboardStore()
    const activityLogStore = useActivityLogStore()
    const workspaceStore = useWorkspaceStore()

    const seedWorkspaces = async () => {
        try {
            const data = await $fetch('/api/workspaces', {
                method: 'POST',
                body: { userProfile: userStore.profile }
            })
            workspaceStore.workspaces = data as any
            workspaceStore.currentWorkspaceId = '1'

            const invites = await $fetch('/api/invitations')
            workspaceStore.pendingInvitations = invites as any
        } catch (e) { console.error(e) }
    }

    const seedOrganizations = async () => {
        try {
            const data = await $fetch('/api/organizations', {
                method: 'POST',
                body: { userProfile: userStore.profile }
            })
            organizationStore.organizations = data as any
            organizationStore.currentOrganizationId = (data as any)[0]?.id || null
        } catch (e) { console.error(e) }
    }

    const clearWorkspaces = () => {
        workspaceStore.workspaces = generateInitialWorkspaces(userStore.profile)
        workspaceStore.pendingInvitations = []
        workspaceStore.currentWorkspaceId = '1'
    }

    const clearOrganizations = () => {
        organizationStore.organizations = []
        organizationStore.currentOrganizationId = null
    }

    const seedAdminAccounts = async () => {
        try {
            const data = await $fetch('/api/admin-accounts')
            adminAccountStore.adminAccounts = data as any
        } catch (e) { console.error(e) }
    }

    const clearAdminAccounts = () => {
        adminAccountStore.adminAccounts = []
    }

    const seedPlans = async () => {
        try {
            const data = await $fetch('/api/plans')
            planStore.plans = data as any
        } catch (e) { console.error(e) }
    }

    const clearPlans = () => {
        planStore.plans = []
    }

    const seedAdminDashboard = async () => {
        try {
            const data = await $fetch('/api/admin-dashboard')
            adminDashboardStore.adminDashboardData = data as any
        } catch (e) { console.error(e) }
    }

    const clearAdminDashboard = () => {
        adminDashboardStore.adminDashboardData = generateEmptyAdminDashboardData()
    }

    const seedCourses = async () => {
        try {
            const logsData = await $fetch('/api/activity-logs') as any
            activityLogStore.logs = logsData.logs
            activityLogStore.sessions = logsData.sessions

            const dashData = await $fetch('/api/dashboard-stats') as any
            dashboardStore.recommendedCourses = dashData.recommendedCourses

            await Promise.all([
                seedWorkspaces(),
                seedOrganizations(),
                seedAdminAccounts(),
                seedPlans(),
                seedAdminDashboard()
            ])

            const courseData = await $fetch('/api/course-data') as any
            courseStore.courses = courseData.courses
            
            lessonStore.clearAll()
            lessonStore.addLessons(courseData.lessons)
            lessonStore.addLessonContents(courseData.contents)
            lessonStore.addAssessments(courseData.assessments)

            toast.add({ title: 'Test data seeded from server!', color: 'success' })
        } catch (e) {
            console.error(e)
            toast.add({ title: 'Failed to seed test data', color: 'error' })
        }
    }

    const clearCourses = () => {
        courseStore.courses = []
        activityLogStore.logs = []
        activityLogStore.sessions = []
        dashboardStore.recommendedCourses = []
        
        lessonStore.clearAll()
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
