import type { Organization } from '~/types/organization'

export const useOrganizations = () => {
    const organizations = useState<Organization[]>('organizations', () => [])
    const currentOrganizationId = useState<string | null>('currentOrganizationId', () => null)

    const currentOrganization = computed(() => 
        organizations.value.find(org => org.id === currentOrganizationId.value) || null
    )

    const initOrganizations = (initialData?: Organization[]) => {
        if (import.meta.client) {
            const saved = localStorage.getItem('app-organizations')
            if (saved) {
                try {
                    organizations.value = JSON.parse(saved)
                } catch (e) {
                    console.error('Failed to parse organizations', e)
                }
            } else if (initialData) {
                organizations.value = initialData
                saveOrganizations()
            }
            
            const savedId = localStorage.getItem('current-organization-id')
            if (savedId) {
                currentOrganizationId.value = savedId
            } else if (organizations.value.length > 0) {
                currentOrganizationId.value = organizations.value[0]?.id || null
                saveOrganizations()
            }
        }
    }

    const saveOrganizations = () => {
        if (import.meta.client) {
            localStorage.setItem('app-organizations', JSON.stringify(organizations.value))
            if (currentOrganizationId.value) {
                localStorage.setItem('current-organization-id', currentOrganizationId.value)
            }
        }
    }

    const setOrganization = (id: string) => {
        currentOrganizationId.value = id
        saveOrganizations()
    }

    const addOrganization = (org: Organization) => {
        organizations.value.push(org)
        saveOrganizations()
    }

    const updateOrganization = (id: string, updates: Partial<Organization>) => {
        const index = organizations.value.findIndex(o => o.id === id)
        if (index !== -1) {
            organizations.value[index] = { ...organizations.value[index], ...updates } as Organization
            saveOrganizations()
        }
    }

    return {
        organizations,
        currentOrganizationId,
        currentOrganization,
        initOrganizations,
        setOrganization,
        addOrganization,
        updateOrganization,
        saveOrganizations
    }
}
