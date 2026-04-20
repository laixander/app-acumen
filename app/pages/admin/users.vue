<script setup lang="ts">
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
    header: ''
}]

const staticUsers = [
    { id: 1, name: 'Alice Smith', email: 'alice@example.com', status: 'Active', subscription: 'Premium' },
    { id: 2, name: 'Bob Johnson', email: 'bob@example.com', status: 'Inactive', subscription: 'Free' },
    { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', status: 'Active', subscription: 'Pro' },
    { id: 4, name: 'Diana Prince', email: 'diana@example.com', status: 'Active', subscription: 'Premium' },
]

// Modal state
const showSubscriptionModal = ref(false)
const showSupportModal = ref(false)
const selectedUser = ref<typeof staticUsers[0] | null>(null)



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
            </div>

            <UTable :data="staticUsers" :columns="userColumns">
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