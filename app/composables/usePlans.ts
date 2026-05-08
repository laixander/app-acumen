import type { Plan } from '~/types/plan'

export const usePlans = () => {
    const plans = useState<Plan[]>('plans', () => [])

    const initPlans = (initialData?: Plan[]) => {
        if (import.meta.client) {
            const saved = localStorage.getItem('app-plans')
            if (saved) {
                try {
                    plans.value = JSON.parse(saved)
                } catch (e) {
                    console.error('Failed to parse plans', e)
                }
            } else if (initialData) {
                plans.value = initialData
                savePlans()
            }
        }
    }

    const savePlans = () => {
        if (import.meta.client) {
            localStorage.setItem('app-plans', JSON.stringify(plans.value))
        }
    }

    const addPlan = (plan: Plan) => {
        plans.value.push(plan)
        savePlans()
    }

    const updatePlan = (id: string, updates: Partial<Plan>) => {
        const index = plans.value.findIndex(p => p.id === id)
        if (index !== -1) {
            plans.value[index] = { ...plans.value[index], ...updates, updatedAt: new Date().toISOString() } as Plan
            savePlans()
        }
    }

    const deletePlan = (id: string) => {
        plans.value = plans.value.filter(p => p.id !== id)
        savePlans()
    }

    return {
        plans,
        initPlans,
        savePlans,
        addPlan,
        updatePlan,
        deletePlan
    }
}
