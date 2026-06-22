export interface AdminLearner {
    id: number | string
    name: string
    email: string
    status: 'Active' | 'Inactive'
    subscription: 'Premium' | 'Pro' | 'Free'
}

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
