import type { Workspace } from '~/types/workspace'
import type { AdminDashboardData } from '~/types/admin'

export const generateInitialWorkspaces = (userProfile: any): Workspace[] => [
    {
        id: '1',
        name: 'Personal Workspace',
        icon: 'i-lucide-user',
        description: 'Start your collaborative journey here.',
        plan: 'Free',
        lastActive: 'Just now',
        color: 'primary',
        tokens: 500,
        maxTokens: 1000,
        members: [
            { id: '1', name: userProfile.fullName || 'User', email: userProfile.email || '', role: 'Owner', avatar: userProfile.avatar || '', status: 'online' }
        ],
        pendingInvites: []
    }
]

export const generateEmptyAdminDashboardData = (): AdminDashboardData => {
    return {
        totalLearners: 0,
        totalLearnersTrend: '0% from last month',
        coursesMastered: 0,
        coursesMasteredTrend: '0% from last week',
        avgGenerationTime: '0.0s',
        avgGenerationTimeTrend: '0.0s from last month',
        activityLabels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        activityData: [0, 0, 0, 0, 0, 0, 0],
        categoryLabels: ['Tech', 'Design', 'Business', 'Languages', 'Science', 'Math'],
        categoryData: [0, 0, 0, 0, 0, 0]
    }
}
