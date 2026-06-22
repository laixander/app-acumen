import { defineStore } from 'pinia'
import type { AdminLearner } from '~/types/admin'

export const useAdminAccountStore = defineStore('adminAccountStore', {
    state: () => ({
        adminAccounts: [] as AdminLearner[]
    }),
    persist: { storage: persistedState.localStorage }
})
