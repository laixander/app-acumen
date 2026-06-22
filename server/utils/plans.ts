import type { Plan } from '~/types/plan'

export const generateMockPlans = (): Plan[] => {
    return [
        {
            id: 'plan_free',
            name: 'Free',
            description: 'Perfect for individuals and small projects.',
            price: 0,
            interval: 'monthly',
            tokenLimit: 100000,
            features: ['1 Workspace', 'Basic AI Models', 'Community Support'],
            status: 'Active',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        },
        {
            id: 'plan_pro',
            name: 'Pro',
            description: 'Advanced features for professionals.',
            price: 29,
            interval: 'monthly',
            tokenLimit: 1000000,
            features: ['5 Workspaces', 'Advanced AI Models', 'Priority Support', 'Custom Knowledge'],
            status: 'Active',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        },
        {
            id: 'plan_enterprise',
            name: 'Enterprise',
            description: 'Custom scale for large institutions.',
            price: 499,
            interval: 'monthly',
            tokenLimit: 10000000,
            features: ['Unlimited Workspaces', 'Dedicated AI Models', '24/7 Phone Support', 'SSO & Advanced Security'],
            status: 'Active',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }
    ]
}
