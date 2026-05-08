import type { AdminLearner } from '~/utils/seeder/accounts'

export const useAdminAccounts = () => {
    const adminAccounts = useState<AdminLearner[]>('admin-accounts', () => [])

    const initAdminAccounts = (initialData?: AdminLearner[]) => {
        if (import.meta.client) {
            const saved = localStorage.getItem('app-admin-accounts')
            if (saved) {
                try {
                    adminAccounts.value = JSON.parse(saved)
                } catch (e) {
                    console.error('Failed to parse admin accounts', e)
                }
            } else if (initialData) {
                adminAccounts.value = initialData
                saveAdminAccounts()
            }
        }
    }

    const saveAdminAccounts = () => {
        if (import.meta.client) {
            localStorage.setItem('app-admin-accounts', JSON.stringify(adminAccounts.value))
        }
    }

    return {
        adminAccounts,
        initAdminAccounts,
        saveAdminAccounts
    }
}
