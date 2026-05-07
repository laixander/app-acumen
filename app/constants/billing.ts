export interface Plan {
    id: string
    name: string
    price: number
    tokens: number
    features: string[]
    color: string
}

export const PLANS: Plan[] = [
    {
        id: 'free',
        name: 'Free',
        price: 0,
        tokens: 500,
        features: [
            '1 Personal Workspace',
            'Basic AI Assistance',
            'Community Support',
            'Limited File Storage'
        ],
        color: 'neutral'
    },
    {
        id: 'pro',
        name: 'Pro',
        price: 19,
        tokens: 5000,
        features: [
            'Unlimited Workspaces',
            'Advanced AI Models',
            'Priority Support',
            '10GB File Storage',
            'Team Collaboration'
        ],
        color: 'primary'
    },
    {
        id: 'enterprise',
        name: 'Enterprise',
        price: 99,
        tokens: 100000,
        features: [
            'Everything in Pro',
            'Custom AI Training',
            'Dedicated Account Manager',
            'SSO & Advanced Security',
            'Unlimited Storage'
        ],
        color: 'purple'
    }
]
