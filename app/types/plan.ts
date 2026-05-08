export type PlanStatus = 'Active' | 'Inactive'

export interface Plan {
    id: string
    name: string
    description: string
    price: number
    interval: 'monthly' | 'yearly'
    tokenLimit: number
    features: string[]
    status: PlanStatus
    createdAt: string
    updatedAt: string
}
