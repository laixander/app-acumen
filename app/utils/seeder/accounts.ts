export interface AdminLearner {
    id: number | string
    name: string
    email: string
    status: 'Active' | 'Inactive'
    subscription: 'Premium' | 'Pro' | 'Free'
}

export const MOCK_ADMIN_ACCOUNTS: AdminLearner[] = [
    { id: 1, name: 'Alice Smith', email: 'alice@example.com', status: 'Active', subscription: 'Premium' },
    { id: 2, name: 'Bob Johnson', email: 'bob@example.com', status: 'Inactive', subscription: 'Free' },
    { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', status: 'Active', subscription: 'Pro' },
    { id: 4, name: 'Diana Prince', email: 'diana@example.com', status: 'Active', subscription: 'Premium' },
    { id: 5, name: 'Edward Norton', email: 'edward@example.com', status: 'Active', subscription: 'Pro' },
    { id: 6, name: 'Fiona Gallagher', email: 'fiona@example.com', status: 'Active', subscription: 'Free' },
    { id: 7, name: 'George Miller', email: 'george@example.com', status: 'Inactive', subscription: 'Premium' },
    { id: 8, name: 'Hannah Arendt', email: 'hannah@example.com', status: 'Active', subscription: 'Pro' }
]

export const generateMockAdminAccounts = (): AdminLearner[] => {
    return [...MOCK_ADMIN_ACCOUNTS]
}
