<script setup lang="ts">
import { upperFirst } from 'scule'

const { organizations, updateOrganization } = useOrganizations()
const table = useTemplateRef('table')
const toast = useToast()

const columnVisibility = ref({
    id: false
})

const isModalOpen = ref(false)
const isConfirmModalOpen = ref(false)
const editingOrg = ref<any>(null)
const targetOrg = ref<any>(null)
const loading = ref(true)

onMounted(() => {
    setTimeout(() => {
        loading.value = false
    }, 600)
})

const toggleOrgStatus = (org: any) => {
    targetOrg.value = org
    isConfirmModalOpen.value = true
}

const handleConfirmToggle = () => {
    if (!targetOrg.value) return
    const org = targetOrg.value
    const newStatus = org.status === 'Suspended' ? 'Active' : 'Suspended'
    
    updateOrganization(org.id, { status: newStatus })
    toast.add({ 
        title: `Organization ${newStatus === 'Active' ? 'Activated' : 'Suspended'}`,
        description: `${org.name} has been ${newStatus.toLowerCase()}.`,
        color: newStatus === 'Active' ? 'success' : 'info'
    })
    isConfirmModalOpen.value = false
    targetOrg.value = null
}

const openAddModal = () => {
    editingOrg.value = null
    isModalOpen.value = true
}

const openEditModal = (org: any) => {
    editingOrg.value = org.raw
    isModalOpen.value = true
}

const columns = [
    {
        accessorKey: 'id',
        header: 'ID'
    },
    {
        accessorKey: 'name',
        header: 'Organization Name'
    },
    {
        accessorKey: 'type',
        header: 'Type'
    },
    {
        accessorKey: 'plan',
        header: 'Plan'
    },
    {
        accessorKey: 'memberCount',
        header: 'Members'
    },
    {
        accessorKey: 'status',
        header: 'Status'
    },
    {
        accessorKey: 'actions',
        header: '',
        meta: {
            class: {
                td: 'text-right'
            }
        }
    }
]

const orgData = computed(() => organizations.value.map(org => ({
    id: org.id,
    name: org.name,
    type: org.type,
    plan: org.plan || 'Free',
    memberCount: org.members.length,
    status: org.status || 'Active',
    raw: org
})))

const getRowActions = (org: any) => [
    [
        { label: 'View Details', icon: 'i-lucide-eye', to: `/admin/organizations/${org.id}` },
        { label: 'Edit Organization', icon: 'i-lucide-edit', onSelect: () => openEditModal(org) }
    ],
    [
        { label: 'Manage Workspaces', icon: 'i-lucide-layers', to: `/admin/organizations/${org.id}?tab=workspaces` },
        { label: 'Subscription & Billing', icon: 'i-lucide-credit-card', to: `/admin/organizations/${org.id}?tab=billing` }
    ],
    [
        { 
            label: org.status === 'Suspended' ? 'Activate Organization' : 'Suspend Organization', 
            icon: org.status === 'Suspended' ? 'i-lucide-user-check' : 'i-lucide-ban', 
            color: org.status === 'Suspended' ? 'success' as const : 'error' as const,
            onSelect: () => toggleOrgStatus(org.raw)
        }
    ]
]
</script>

<template>
    <ContentPanel title="Organization Management">
        <ContentHeading title="Organization Management"
            description="Manage institutional accounts, university schools, and corporate partners." />

        <div class="space-y-4">
            <div class="flex items-center justify-between">
                <UInput icon="i-lucide-search" placeholder="Search organizations..." class="w-64" />
                <div class="flex items-center gap-2">
                    <UButton color="primary" icon="i-lucide-plus" @click="openAddModal">Add Organization</UButton>
                    <UDropdownMenu :items="table?.tableApi
                        ?.getAllColumns()
                        .filter((column) => column.getCanHide())
                        .map((column) => ({
                            label: upperFirst(column.id),
                            type: 'checkbox' as const,
                            checked: column.getIsVisible(),
                            onUpdateChecked(checked: boolean) {
                                table?.tableApi?.getColumn(column.id)?.toggleVisibility(!!checked)
                            },
                            onSelect(e: Event) {
                                e.preventDefault()
                            }
                        }))
                        " :content="{ align: 'end' }">
                        <UButton label="Display" color="neutral" variant="outline"
                            trailing-icon="i-lucide-settings-2" />
                    </UDropdownMenu>
                </div>
            </div>

            <UTable :data="orgData" :columns="columns" ref="table" :loading="loading"
                v-model:column-visibility="columnVisibility">
                <template #name-cell="{ row }">
                    <div class="flex items-center gap-3">
                        <div
                            class="w-8 h-8 rounded-lg bg-primary-500/10 flex items-center justify-center text-primary-500">
                            <UIcon :name="row.original.raw.logo || 'i-lucide-building-2'" />
                        </div>
                        <span class="font-bold">{{ row.original.name }}</span>
                    </div>
                </template>
                <template #type-cell="{ row }">
                    <UBadge variant="soft" color="info">
                        {{ row.original.type }}
                    </UBadge>
                </template>
                <template #plan-cell="{ row }">
                    <UBadge variant="soft"
                        :color="row.original.plan === 'Enterprise' ? 'info' : (row.original.plan === 'Pro' ? 'primary' : 'neutral')">
                        {{ row.original.plan }}
                    </UBadge>
                </template>
                <template #status-cell="{ row }">
                    <UBadge :color="row.original.status === 'Active' ? 'success' : 'error'" variant="soft">
                        {{ row.original.status }}
                    </UBadge>
                </template>
                <template #actions-cell="{ row }">
                    <UDropdownMenu :items="getRowActions(row.original)" size="sm" :content="{ align: 'end' }">
                        <UButton color="neutral" variant="ghost" icon="i-lucide-more-horizontal" size="sm" />
                    </UDropdownMenu>
                </template>
            </UTable>
        </div>

        <AdminOrganizationModal v-model:open="isModalOpen" :organization="editingOrg" />

        <AdminConfirmModal v-if="targetOrg" v-model:open="isConfirmModalOpen"
            :title="targetOrg.status === 'Suspended' ? 'Activate Organization' : 'Suspend Organization'"
            :description="`Are you sure you want to ${targetOrg.status === 'Suspended' ? 'activate' : 'suspend'} ${targetOrg.name}?`"
            :confirm-label="targetOrg.status === 'Suspended' ? 'Activate' : 'Suspend'"
            :confirm-color="targetOrg.status === 'Suspended' ? 'success' : 'error'" @confirm="handleConfirmToggle" />
    </ContentPanel>
</template>
