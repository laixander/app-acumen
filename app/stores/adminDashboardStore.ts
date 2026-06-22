import { defineStore } from 'pinia'

import type { AdminDashboardData } from '~/types/admin'

export const useAdminDashboardStore = defineStore('adminDashboardStore', {
    state: () => ({
        adminDashboardData: generateEmptyAdminDashboardData() as AdminDashboardData
    }),
    persist: { storage: persistedState.localStorage }
})
