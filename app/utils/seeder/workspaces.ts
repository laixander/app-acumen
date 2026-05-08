import type { Workspace, WorkspaceMember, WorkspaceInvite } from '~/types/workspace'

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

export const MOCK_RECEIVED_INVITATIONS = [
    {
        id: 'inv_1',
        workspaceName: 'Acme Marketing',
        invitedBy: 'Alice Freeman',
        role: 'Member',
        sentAt: '1 day ago'
    },
    {
        id: 'inv_2',
        workspaceName: 'Global Logistics',
        invitedBy: 'Bob Wilson',
        role: 'Admin',
        sentAt: '3 hours ago'
    }
]

export const generateMockWorkspaces = (userProfile: any): Workspace[] => {
    const names = ['Alice', 'Bob', 'Charlie', 'David', 'Eve', 'Frank', 'Grace', 'Heidi', 'Ivan', 'Judy']
    const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez']
    const roles: ('Admin' | 'Member')[] = ['Admin', 'Member']

    const createMembers = (count: number): WorkspaceMember[] => {
        if (count === 0) return []
        return Array.from({ length: count }, (_, i) => {
            const fn = names[i % names.length]!
            const ln = lastNames[Math.floor(i / names.length) % lastNames.length]!
            return {
                id: `extra-${i}`,
                name: `${fn} ${ln}`,
                email: `${fn.toLowerCase()}.${ln.toLowerCase()}@example.com`,
                role: roles[i % 7 === 0 ? 0 : 1]!,
                avatar: `https://i.pravatar.cc/150?u=${i + 10}`,
                status: Math.random() > 0.5 ? 'online' : 'offline',
                tokens: Math.random() > 0.3 ? Math.floor(Math.random() * 500) : 0
            }
        })
    }

    const createInvites = (count: number): WorkspaceInvite[] => {
        if (count === 0) return []
        return Array.from({ length: count }, (_, i) => {
            const fn = names[(i + 5) % names.length]!
            const ln = lastNames[(i + 3) % lastNames.length]!
            return {
                id: `invite-${i}`,
                email: `${fn.toLowerCase()}.${ln.toLowerCase()}@example.com`,
                role: roles[i % 3 === 0 ? 0 : 1]!,
                sentAt: `${i + 1} hours ago`
            }
        })
    }

    return [
        {
            id: '1',
            name: 'Personal Workspace',
            icon: 'i-lucide-user',
            description: 'My private workspace for personal learning and projects.',
            plan: 'Pro',
            lastActive: 'Active now',
            color: 'primary',
            tokens: 750,
            maxTokens: 1000,
            members: [
                { id: '1', name: userProfile.fullName || 'Current User', email: userProfile.email || 'user@example.com', role: 'Owner', avatar: userProfile.avatar || '', status: 'online' },
                ...createMembers(40)
            ],
            pendingInvites: createInvites(4)
        },
        {
            id: '4',
            organizationId: 'org_acumen_uni',
            name: 'Design Systems',
            icon: 'i-lucide-palette',
            description: 'Core design assets and component libraries.',
            plan: 'Pro',
            lastActive: '3 hours ago',
            color: 'blue',
            tokens: 1200,
            maxTokens: 5000,
            members: [
                { id: '1', name: userProfile.fullName || 'Current User', email: userProfile.email || 'user@example.com', role: 'Owner', avatar: userProfile.avatar || '', status: 'online' },
                ...createMembers(12)
            ],
            pendingInvites: createInvites(2)
        },
        {
            id: '5',
            name: 'Open Source Projects',
            icon: 'i-lucide-github',
            description: 'Collaborative public software initiatives.',
            plan: 'Free',
            lastActive: 'Yesterday',
            color: 'neutral',
            tokens: 150,
            maxTokens: 500,
            members: [
                { id: '1', name: userProfile.fullName || 'Current User', email: userProfile.email || 'user@example.com', role: 'Owner', avatar: userProfile.avatar || '', status: 'online' },
                ...createMembers(0)
            ],
            pendingInvites: createInvites(0)
        },
        {
            id: '2',
            organizationId: 'org_tech_academy',
            name: 'Cloud Infrastructure',
            icon: 'i-lucide-cloud',
            description: 'Backend and Infrastructure development for the Academy.',
            plan: 'Enterprise',
            lastActive: '2 hours ago',
            color: 'blue',
            tokens: 45000,
            maxTokens: 100000,
            members: [
                { id: '1', name: userProfile.fullName || 'Current User', email: userProfile.email || 'user@example.com', role: 'Admin', avatar: userProfile.avatar || '', status: 'online' },
                ...createMembers(25)
            ],
            pendingInvites: createInvites(8)
        },
        {
            id: '3',
            organizationId: 'org_horizon_high',
            name: 'K12 Math Curriculum',
            icon: 'i-lucide-calculator',
            description: 'Planning the advanced calculus roadmap.',
            plan: 'Free',
            lastActive: 'Yesterday',
            color: 'purple',
            tokens: 250,
            maxTokens: 500,
            members: [
                { id: '1', name: userProfile.fullName || 'Current User', email: userProfile.email || 'user@example.com', role: 'Member', avatar: userProfile.avatar || '', status: 'online' },
                ...createMembers(5)
            ],
            pendingInvites: createInvites(1)
        }
    ]
}
