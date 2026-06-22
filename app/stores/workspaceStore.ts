import { defineStore } from 'pinia'
import type { Workspace } from '~/types/workspace'
import { useUserStore } from './userStore'
import { useOrganizationStore } from './organizationStore'

export const useWorkspaceStore = defineStore('workspaceStore', {
    state: () => ({
        workspaces: [] as Workspace[],
        currentWorkspaceId: '1',
        pendingInvitations: [] as any[],
        isInitialized: false,
    }),

    getters: {
        currentWorkspace: (state) => state.workspaces.find(w => w.id === state.currentWorkspaceId),
        currentUserRole(): string | null {
            if (!this.currentWorkspace) return null
            const userStore = useUserStore()
            const member = this.currentWorkspace.members.find(m => m.email === userStore.profile.email)
            return member?.role || null
        },
        currentUserOrgRole(): string | null {
            const orgStore = useOrganizationStore()
            if (!orgStore.currentOrganization) return null
            const userStore = useUserStore()
            const member = orgStore.currentOrganization.members.find(m => m.email === userStore.profile.email)
            return member?.orgRole || null
        },
        isAdmin(): boolean {
            return this.currentUserRole === 'Admin' ||
                   this.currentUserRole === 'Owner' ||
                   this.currentUserOrgRole === 'Org_Admin' ||
                   this.currentUserOrgRole === 'Org_Owner'
        },
        canManageBilling(): boolean {
            return this.isAdmin
        }
    },

    actions: {
        updateWorkspace(id: string, updates: Partial<Workspace>) {
            const index = this.workspaces.findIndex(w => w.id === id)
            if (index !== -1) {
                this.workspaces[index] = { ...this.workspaces[index], ...updates } as Workspace
            }
        },
        addWorkspace(workspace: Workspace) {
            this.workspaces.push(workspace)
        },
        deleteWorkspace(id: string) {
            this.workspaces = this.workspaces.filter(w => w.id !== id)
        }
    },

    persist: { storage: persistedState.localStorage }
})
