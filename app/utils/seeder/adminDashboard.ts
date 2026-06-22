export interface AdminDashboardData {
    totalLearners: number
    totalLearnersTrend: string
    coursesMastered: number
    coursesMasteredTrend: string
    avgGenerationTime: string
    avgGenerationTimeTrend: string
    activityLabels: string[]
    activityData: number[]
    categoryLabels: string[]
    categoryData: number[]
}

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
