import type { Organization, OrganizationMember } from '~/types/organization'

const names = ['Alice', 'Bob', 'Charlie', 'David', 'Eve', 'Frank', 'Grace', 'Heidi', 'Ivan', 'Judy']
const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez']
const roles: ('Admin' | 'Member')[] = ['Admin', 'Member']
const orgRoles: ('Org_Admin' | 'Org_Member')[] = ['Org_Admin', 'Org_Member']

const createOrgMembers = (count: number): OrganizationMember[] => {
    if (count === 0) return []
    return Array.from({ length: count }, (_, i) => {
        const fn = names[i % names.length]!
        const ln = lastNames[Math.floor(i / names.length) % lastNames.length]!
        return {
            id: `org-member-${i}-${Math.random().toString(36).substr(2, 5)}`,
            name: `${fn} ${ln}`,
            email: `${fn.toLowerCase()}.${ln.toLowerCase()}@example.com`,
            role: roles[i % 2 === 0 ? 0 : 1]!,
            orgRole: orgRoles[i % 2 === 0 ? 0 : 1]!,
            avatar: `https://i.pravatar.cc/150?u=${i + 50}`,
            status: Math.random() > 0.4 ? 'online' : 'offline'
        }
    })
}

export const generateMockOrganizations = (userProfile: any): Organization[] => [
    {
        id: 'org_acumen_uni',
        name: 'Acumen University',
        slug: 'acumen-uni',
        logo: 'i-lucide-graduation-cap',
        description: 'A leading global research institution focused on digital innovation.',
        website: 'https://university.acumen.app',
        type: 'University',
        plan: 'Enterprise',
        status: 'Active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        members: [
            {
                id: '1',
                name: userProfile.fullName || 'Current User',
                email: userProfile.email || 'user@example.com',
                role: 'Owner',
                orgRole: 'Org_Owner',
                avatar: userProfile.avatar || '',
                status: 'online'
            },
            ...createOrgMembers(142)
        ]
    },
    {
        id: 'org_horizon_high',
        name: 'Horizon High School',
        slug: 'horizon-high',
        logo: 'i-lucide-school',
        description: 'Empowering the next generation through creative and critical thinking.',
        website: 'https://horizon.edu',
        type: 'School',
        plan: 'Free',
        status: 'Active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        members: [
            {
                id: '1',
                name: userProfile.fullName || 'Current User',
                email: userProfile.email || 'user@example.com',
                role: 'Admin',
                orgRole: 'Org_Admin',
                avatar: userProfile.avatar || '',
                status: 'online'
            },
            ...createOrgMembers(56)
        ]
    },
    {
        id: 'org_tech_academy',
        name: 'Quantum Tech Academy',
        slug: 'tech-academy',
        logo: 'i-lucide-cpu',
        description: 'Accelerated technical training for the modern workforce.',
        website: 'https://quantum.tech',
        type: 'Company',
        plan: 'Pro',
        status: 'Active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        members: [
            {
                id: '1',
                name: userProfile.fullName || 'Current User',
                email: userProfile.email || 'user@example.com',
                role: 'Member',
                orgRole: 'Org_Member',
                avatar: userProfile.avatar || '',
                status: 'online'
            },
            ...createOrgMembers(24)
        ]
    }
]
