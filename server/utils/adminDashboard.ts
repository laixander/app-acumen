import type { AdminDashboardData } from '~/types/admin'

export const generateMockAdminDashboardData = (): AdminDashboardData => {
    return {
        totalLearners: 1248,
        totalLearnersTrend: '12% from last month',
        coursesMastered: 84,
        coursesMasteredTrend: '5% from last week',
        avgGenerationTime: '2.4s',
        avgGenerationTimeTrend: '0.3s from last month',
        activityLabels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        activityData: [350, 480, 620, 510, 750, 890, 780],
        categoryLabels: ['Tech', 'Design', 'Business', 'Languages', 'Science', 'Math'],
        categoryData: [320, 150, 90, 210, 180, 250]
    }
}


