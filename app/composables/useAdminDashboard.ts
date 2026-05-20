import type { AdminDashboardData } from '~/utils/seeder/adminDashboard'
import { generateEmptyAdminDashboardData } from '~/utils/seeder/adminDashboard'

export const useAdminDashboard = () => {
    const adminDashboardData = useState<AdminDashboardData>('adminDashboardData', () => generateEmptyAdminDashboardData())

    const initAdminDashboard = (initialData?: AdminDashboardData) => {
        if (import.meta.client) {
            const saved = localStorage.getItem('app-admin-dashboard-data')
            if (saved) {
                try {
                    adminDashboardData.value = JSON.parse(saved)
                } catch (e) {
                    console.error('Failed to parse admin dashboard data', e)
                }
            } else if (initialData) {
                adminDashboardData.value = initialData
                saveAdminDashboard()
            }
        }
    }

    const saveAdminDashboard = () => {
        if (import.meta.client) {
            localStorage.setItem('app-admin-dashboard-data', JSON.stringify(adminDashboardData.value))
        }
    }

    return {
        adminDashboardData,
        initAdminDashboard,
        saveAdminDashboard
    }
}
