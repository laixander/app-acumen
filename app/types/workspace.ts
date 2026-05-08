export interface WorkspaceMember {
    id: string
    name: string
    email: string
    role: 'Owner' | 'Admin' | 'Member'
    avatar?: string
    status?: 'online' | 'offline'
    tokens?: number
}

export interface WorkspaceInvite {
    id: string
    email: string
    role: 'Admin' | 'Member'
    sentAt: string
}

export interface Workspace {
    id: string
    organizationId?: string
    name: string
    icon: string
    description: string
    plan: string
    members: WorkspaceMember[]
    pendingInvites: WorkspaceInvite[]
    lastActive: string
    color?: string
    tokens?: number
    maxTokens?: number
}
