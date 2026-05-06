import type { Workspace } from '~/types/workspace'

export const useWorkspaces = () => {
    const { user } = useUser()
    
    const workspaces = useState<Workspace[]>('workspaces', () => [
        {
            id: '1',
            name: 'Personal Workspace',
            icon: 'i-lucide-user',
            description: 'My private workspace for personal learning and projects.',
            plan: 'Pro',
            lastActive: 'Active now',
            color: 'primary',
            members: [
                { id: '1', name: user.value.profile.fullName, email: user.value.profile.email, role: 'Owner', avatar: user.value.profile.avatar, status: 'online' },
                { id: '2', name: 'Sarah Chen', email: 'sarah@example.com', role: 'Admin', avatar: 'https://i.pravatar.cc/150?u=sarah', status: 'online' },
                { id: '3', name: 'Mike Johnson', email: 'mike@example.com', role: 'Member', avatar: 'https://i.pravatar.cc/150?u=mike', status: 'offline' }
            ],
            pendingInvites: [
                { id: 'p1', email: 'david.miller@example.com', role: 'Member', sentAt: '2 hours ago' }
            ]
        },
        {
            id: '4',
            name: 'Design Systems',
            icon: 'i-lucide-palette',
            description: 'Core design assets and component libraries.',
            plan: 'Pro',
            lastActive: '3 hours ago',
            color: 'blue',
            members: [
                { id: '1', name: user.value.profile.fullName, email: user.value.profile.email, role: 'Owner', avatar: user.value.profile.avatar, status: 'online' }
            ],
            pendingInvites: []
        },
        {
            id: '5',
            name: 'Open Source Projects',
            icon: 'i-lucide-github',
            description: 'Collaborative public software initiatives.',
            plan: 'Free',
            lastActive: 'Yesterday',
            color: 'neutral',
            members: [
                { id: '1', name: user.value.profile.fullName, email: user.value.profile.email, role: 'Owner', avatar: user.value.profile.avatar, status: 'online' }
            ],
            pendingInvites: []
        },
        {
            id: '2',
            name: 'Engineering Team',
            icon: 'i-lucide-users',
            description: 'Backend and Infrastructure development group.',
            plan: 'Enterprise',
            lastActive: '2 hours ago',
            color: 'blue',
            members: [
                { id: '1', name: user.value.profile.fullName, email: user.value.profile.email, role: 'Admin', avatar: user.value.profile.avatar, status: 'online' }
            ],
            pendingInvites: []
        },
        {
            id: '3',
            name: 'Product Group',
            icon: 'i-lucide-briefcase',
            description: 'Product strategy and roadmap planning.',
            plan: 'Free',
            lastActive: 'Yesterday',
            color: 'purple',
            members: [
                { id: '1', name: user.value.profile.fullName, email: user.value.profile.email, role: 'Member', avatar: user.value.profile.avatar, status: 'online' }
            ],
            pendingInvites: []
        }
    ])

    const currentWorkspaceId = useState<string>('currentWorkspaceId', () => '1')

    const currentWorkspace = computed(() => workspaces.value.find(w => w.id === currentWorkspaceId.value))

    const initWorkspaces = () => {
        if (import.meta.client) {
            const saved = localStorage.getItem('app-workspaces')
            if (saved) {
                try {
                    workspaces.value = JSON.parse(saved)
                } catch (e) {
                    console.error('Failed to parse workspaces', e)
                }
            }
            
            const savedId = localStorage.getItem('current-workspace-id')
            if (savedId) {
                currentWorkspaceId.value = savedId
            }
        }
    }

    const saveWorkspaces = () => {
        if (import.meta.client) {
            localStorage.setItem('app-workspaces', JSON.stringify(workspaces.value))
            localStorage.setItem('current-workspace-id', currentWorkspaceId.value)
        }
    }

    const updateWorkspace = (id: string, updates: Partial<Workspace>) => {
        const index = workspaces.value.findIndex(w => w.id === id)
        if (index !== -1) {
            workspaces.value[index] = { ...workspaces.value[index], ...updates } as Workspace
            saveWorkspaces()
        }
    }

    return {
        workspaces,
        currentWorkspaceId,
        currentWorkspace,
        initWorkspaces,
        updateWorkspace,
        saveWorkspaces
    }
}
