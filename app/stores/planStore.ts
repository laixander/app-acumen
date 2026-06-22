import { defineStore } from 'pinia'
import type { Plan } from '~/types/plan'

export const usePlanStore = defineStore('planStore', {
    state: () => ({
        plans: [] as Plan[]
    }),
    actions: {
        addPlan(plan: Plan) {
            this.plans.push(plan)
        },
        updatePlan(id: string, updates: Partial<Plan>) {
            const index = this.plans.findIndex(p => p.id === id)
            if (index !== -1) {
                this.plans[index] = { ...this.plans[index], ...updates, updatedAt: new Date().toISOString() } as Plan
            }
        },
        deletePlan(id: string) {
            this.plans = this.plans.filter(p => p.id !== id)
        }
    },
    persist: { storage: persistedState.localStorage }
})
