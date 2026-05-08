import type { WorkspaceMember } from './workspace'

export type OrganizationRole = 'Org_Owner' | 'Org_Admin' | 'Org_Member'

export interface OrganizationMember extends WorkspaceMember {
    orgRole: OrganizationRole
}

export interface Organization {
    id: string
    name: string
    slug: string
    logo?: string
    description?: string
    website?: string
    type: 'University' | 'School' | 'Company' | 'Personal'
    plan: 'Free' | 'Pro' | 'Enterprise'
    status: 'Active' | 'Suspended'
    members: OrganizationMember[]
    createdAt: string
    updatedAt: string
}
