import { defineStore } from 'pinia'
import type { Organization } from '~/types/organization'

export const useOrganizationStore = defineStore('organizationStore', {
    state: () => ({
        organizations: [] as Organization[],
        currentOrganizationId: null as string | null
    }),

    getters: {
        currentOrganization: (state) => state.organizations.find(org => org.id === state.currentOrganizationId) || null
    },

    actions: {
        setOrganization(id: string) {
            this.currentOrganizationId = id
        },
        addOrganization(org: Organization) {
            this.organizations.push(org)
        },
        updateOrganization(id: string, updates: Partial<Organization>) {
            const index = this.organizations.findIndex(o => o.id === id)
            if (index !== -1) {
                this.organizations[index] = { ...this.organizations[index], ...updates } as Organization
            }
        }
    },

    persist: { storage: persistedState.localStorage }
})
