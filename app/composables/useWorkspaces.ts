import type { Workspace } from '~/types/workspace'
import { generateInitialWorkspaces } from '~/utils/seeder'

export const useWorkspaces = () => {
    const { user } = useUser()
    
    const workspaces = useState<Workspace[]>('workspaces', () => {
        return generateInitialWorkspaces(user.value.profile)
    })

    const currentWorkspaceId = useState<string>('currentWorkspaceId', () => '1')
    const pendingInvitations = useState<any[]>('receivedInvitations', () => [])
    const isInitialized = useState<boolean>('workspacesInitialized', () => false)

    const { currentOrganization } = useOrganizations()
    const currentWorkspace = computed(() => workspaces.value.find(w => w.id === currentWorkspaceId.value))

    const currentUserRole = computed(() => {
        if (!currentWorkspace.value) return null
        const member = currentWorkspace.value.members.find(m => m.email === user.value.profile.email)
        return member?.role || null
    })

    const currentUserOrgRole = computed(() => {
        if (!currentOrganization.value) return null
        const member = currentOrganization.value.members.find(m => m.email === user.value.profile.email)
        return member?.orgRole || null
    })

    const isAdmin = computed(() => {
        const workspaceRole = currentUserRole.value
        const orgRole = currentUserOrgRole.value

        return workspaceRole === 'Admin' ||
            workspaceRole === 'Owner' ||
            orgRole === 'Org_Admin' ||
            orgRole === 'Org_Owner'
    })

    const canManageBilling = computed(() => isAdmin.value)

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

            const savedInvs = localStorage.getItem('received-invitations')
            if (savedInvs) {
                try {
                    pendingInvitations.value = JSON.parse(savedInvs)
                } catch (e) {}
            }
            
            isInitialized.value = true
        }
    }

    const saveWorkspaces = () => {
        if (import.meta.client) {
            localStorage.setItem('app-workspaces', JSON.stringify(workspaces.value))
            localStorage.setItem('current-workspace-id', currentWorkspaceId.value)
            localStorage.setItem('received-invitations', JSON.stringify(pendingInvitations.value))
        }
    }

    const updateWorkspace = (id: string, updates: Partial<Workspace>) => {
        const index = workspaces.value.findIndex(w => w.id === id)
        if (index !== -1) {
            workspaces.value[index] = { ...workspaces.value[index], ...updates } as Workspace
            saveWorkspaces()
        }
    }

    const addWorkspace = (workspace: Workspace) => {
        workspaces.value.push(workspace)
        saveWorkspaces()
    }

    const deleteWorkspace = (id: string) => {
        workspaces.value = workspaces.value.filter(w => w.id !== id)
        saveWorkspaces()
    }

    return {
        workspaces,
        currentWorkspaceId,
        currentWorkspace,
        pendingInvitations,
        isInitialized,
        currentUserRole,
        isAdmin,
        canManageBilling,
        initWorkspaces,
        updateWorkspace,
        addWorkspace,
        deleteWorkspace,
        saveWorkspaces
    }
}
