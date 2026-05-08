<script setup lang="ts">
import { upperFirst } from 'scule'

const table = useTemplateRef('table')
const loading = ref(true)

onMounted(() => {
    setTimeout(() => {
        loading.value = false
    }, 600)
})

const columnVisibility = ref({
    id: false
})

const userColumns = [{
    accessorKey: 'id',
    header: 'ID'
}, {
    accessorKey: 'name',
    header: 'Name'
}, {
    accessorKey: 'email',
    header: 'Email'
}, {
    accessorKey: 'status',
    header: 'Status'
}, {
    accessorKey: 'subscription',
    header: 'Subscription'
}, {
    accessorKey: 'actions',
    header: '',
    meta: {
        class: {
            td: 'text-right'
        }
    },
}]

import type { AdminLearner } from '~/utils/seeder/accounts'

const { adminAccounts } = useAdminAccounts()
const staticUsers = adminAccounts

// Modal state
const showSubscriptionModal = ref(false)
const showSupportModal = ref(false)
const selectedUser = ref<AdminLearner | null>(null)



const getSubscriptionColor = (sub: string) => {
    switch (sub) {
        case 'Premium': return 'primary'
        case 'Pro': return 'info'
        case 'Free': return 'neutral'
        default: return 'neutral'
    }
}

const openSubscriptionModal = (user: any) => {
    selectedUser.value = user
    showSubscriptionModal.value = true
}

const openSupportModal = (user: any) => {
    selectedUser.value = user
    showSupportModal.value = true
}

const getRowActions = (user: any) => {
    return [
        [
            { label: 'Manage Subscription', icon: 'i-lucide-credit-card', onSelect: () => openSubscriptionModal(user) },
            { label: 'Technical Support', icon: 'i-lucide-life-buoy', onSelect: () => openSupportModal(user) }
        ],
        [
            { label: 'Edit Learner', icon: 'i-lucide-edit' },
            { label: user.status === 'Active' ? 'Deactivate' : 'Activate', icon: user.status === 'Active' ? 'i-lucide-user-minus' : 'i-lucide-user-check' }
        ]
    ]
}
</script>
<template>
    <ContentPanel title="Learner Management">
        <ContentHeading title="Learner Management"
            description="Oversee learner accounts, manage subscriptions, and provide technical support." />

        <div class="space-y-4">
            <div class="flex items-center justify-between">
                <UInput icon="i-lucide-search" placeholder="Search learners..." class="w-64" />
                <!-- <UButton color="neutral" icon="i-lucide-user-plus">Add Learner</UButton> -->
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
                    <UButton label="Display" color="neutral" variant="outline" trailing-icon="i-lucide-settings-2" />
                </UDropdownMenu>
            </div>

            <UTable :data="staticUsers" :columns="userColumns" ref="table" :loading="loading" v-model:column-visibility="columnVisibility">
                <template #status-cell="{ row }">
                    <UBadge :color="row.original.status === 'Active' ? 'success' : 'neutral'" variant="soft">
                        {{ row.original.status }}
                    </UBadge>
                </template>
                <template #subscription-cell="{ row }">
                    <UBadge :color="getSubscriptionColor(row.original.subscription)" variant="soft">
                        {{ row.original.subscription }}
                    </UBadge>
                </template>
                <template #actions-cell="{ row }">
                    <UDropdownMenu :items="getRowActions(row.original)" size="sm" :content="{ align: 'end' }">
                        <UButton color="neutral" variant="ghost" icon="i-lucide-more-horizontal" size="sm" />
                    </UDropdownMenu>
                </template>
            </UTable>
        </div>

        <!-- Manage Subscription Modal -->
        <AdminManageSubscriptionModal v-model:open="showSubscriptionModal" :user="selectedUser" />

        <!-- Technical Support Modal -->
        <AdminTechnicalSupportModal v-model:open="showSupportModal" :user="selectedUser" />
    </ContentPanel>
</template>