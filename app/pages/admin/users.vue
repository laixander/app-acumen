<template>
    <ContentPanel title="Learner Management">
        <div>
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Learner Management</h2>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Oversee learner accounts, manage
                subscriptions, and provide technical support.</p>
        </div>

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
                    <UDropdownMenu :items="getRowActions(row.original)">
                        <UButton color="neutral" variant="ghost" icon="i-lucide-more-horizontal" />
                    </UDropdownMenu>
                </template>
            </UTable>
        </div>

        <!-- Manage Subscription Modal -->
        <UModal v-model:open="showSubscriptionModal" :ui="{ content: 'sm:max-w-xl' }">
            <template #header>
                <div class="flex items-center gap-3">
                    <div class="p-2 rounded-lg bg-primary/10">
                        <UIcon name="i-lucide-credit-card" class="text-primary w-5 h-5" />
                    </div>
                    <div>
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Manage Subscription</h3>
                        <p class="text-sm text-gray-500 dark:text-gray-400">{{ selectedUser?.name }} &mdash;
                            {{ selectedUser?.email }}</p>
                    </div>
                </div>
            </template>

            <template #body>
                <div class="space-y-6 p-6">
                    <!-- Current Plan -->
                    <div>
                        <label
                            class="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Current
                            Plan</label>
                        <div
                            class="mt-2 flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                            <div class="flex items-center gap-3">
                                <UIcon name="i-lucide-sparkles" class="text-primary w-5 h-5" />
                                <span class="font-semibold">{{ selectedUser?.subscription }}</span>
                            </div>
                            <UBadge :color="getSubscriptionColor(selectedUser?.subscription || '')" variant="soft">
                                Active
                            </UBadge>
                        </div>
                    </div>

                    <!-- Change Plan -->
                    <div>
                        <label
                            class="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Change
                            Plan</label>
                        <div class="grid grid-cols-3 gap-3 mt-2">
                            <button v-for="plan in plans" :key="plan.name" @click="selectedPlan = plan.name"
                                class="relative flex flex-col items-center p-4 border rounded-xl transition-all duration-200 cursor-pointer"
                                :class="selectedPlan === plan.name
                                    ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
                                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'">
                                <UIcon :name="plan.icon" class="w-6 h-6 mb-2" :class="selectedPlan === plan.name
                                    ? 'text-primary'
                                    : 'text-gray-400'" />
                                <span class="text-sm font-semibold">{{ plan.name }}</span>
                                <span class="text-xs text-gray-500 mt-1">{{ plan.price }}</span>
                            </button>
                        </div>
                    </div>

                    <!-- Billing Info -->
                    <div>
                        <label
                            class="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Billing
                            Summary</label>
                        <div class="mt-2 space-y-2 text-sm">
                            <div class="flex justify-between">
                                <span class="text-gray-500">Next billing date</span>
                                <span class="font-medium">May 17, 2026</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-500">Payment method</span>
                                <span class="font-medium">•••• 4242</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-500">Member since</span>
                                <span class="font-medium">Jan 8, 2026</span>
                            </div>
                        </div>
                    </div>
                </div>
            </template>

            <template #footer>
                <div class="flex justify-end gap-3">
                    <UButton color="neutral" variant="soft" @click="showSubscriptionModal = false">Cancel</UButton>
                    <UButton color="neutral" @click="showSubscriptionModal = false">Update Plan</UButton>
                </div>
            </template>
        </UModal>

        <!-- Technical Support Modal -->
        <UModal v-model:open="showSupportModal" :ui="{ content: 'sm:max-w-xl' }">
            <template #header>
                <div class="flex items-center gap-3">
                    <div class="p-2 rounded-lg bg-orange-500/10">
                        <UIcon name="i-lucide-life-buoy" class="text-orange-500 w-5 h-5" />
                    </div>
                    <div>
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Technical Support</h3>
                        <p class="text-sm text-gray-500 dark:text-gray-400">Create a support ticket for
                            {{ selectedUser?.name }}</p>
                    </div>
                </div>
            </template>

            <template #body>
                <div class="space-y-5 p-6">
                    <!-- Existing Tickets Summary -->
                    <div
                        class="flex items-center gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                        <div class="flex-1 text-center">
                            <div class="text-2xl font-bold">3</div>
                            <div class="text-xs text-gray-500">Open</div>
                        </div>
                        <div class="w-px h-8 bg-gray-200 dark:bg-gray-700"></div>
                        <div class="flex-1 text-center">
                            <div class="text-2xl font-bold">12</div>
                            <div class="text-xs text-gray-500">Resolved</div>
                        </div>
                        <div class="w-px h-8 bg-gray-200 dark:bg-gray-700"></div>
                        <div class="flex-1 text-center">
                            <div class="text-2xl font-bold text-green-500">94%</div>
                            <div class="text-xs text-gray-500">Satisfaction</div>
                        </div>
                    </div>

                    <!-- Category -->
                    <UFormField label="Category" description="Select the type of issue.">
                        <USelect v-model="ticketCategory" :items="ticketCategories" class="w-full" />
                    </UFormField>

                    <!-- Priority -->
                    <UFormField label="Priority">
                        <div class="flex gap-2">
                            <UButton v-for="p in priorities" :key="p.value"
                                :color="ticketPriority === p.value ? p.color as any : 'neutral'"
                                :variant="ticketPriority === p.value ? 'soft' : 'outline'" size="sm"
                                @click="ticketPriority = p.value">
                                {{ p.label }}
                            </UButton>
                        </div>
                    </UFormField>

                    <!-- Subject -->
                    <UFormField label="Subject">
                        <UInput v-model="ticketSubject" placeholder="Brief description of the issue..." />
                    </UFormField>

                    <!-- Message -->
                    <UFormField label="Admin Notes" description="Internal notes or instructions for the support team.">
                        <UTextarea v-model="ticketMessage" :rows="3"
                            placeholder="Describe the issue or steps to resolve..." />
                    </UFormField>
                </div>
            </template>

            <template #footer>
                <div class="flex justify-end gap-3">
                    <UButton color="neutral" variant="soft" @click="showSupportModal = false">Cancel</UButton>
                    <UButton color="neutral" @click="showSupportModal = false">Create Ticket</UButton>
                </div>
            </template>
        </UModal>
    </ContentPanel>
</template>

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

// Subscription state
const selectedPlan = ref('')
const plans = [
    { name: 'Free', price: '$0/mo', icon: 'i-lucide-user' },
    { name: 'Pro', price: '$12/mo', icon: 'i-lucide-zap' },
    { name: 'Premium', price: '$29/mo', icon: 'i-lucide-crown' },
]

// Support state
const ticketCategory = ref('account')
const ticketPriority = ref('medium')
const ticketSubject = ref('')
const ticketMessage = ref('')

const ticketCategories = [
    { label: 'Account & Login', value: 'account' },
    { label: 'Lesson Content', value: 'content' },
    { label: 'AI Engine Issues', value: 'ai' },
    { label: 'Payment & Billing', value: 'billing' },
    { label: 'Performance & Bugs', value: 'bugs' },
]

const priorities = [
    { label: 'Low', value: 'low', color: 'neutral' },
    { label: 'Medium', value: 'medium', color: 'warning' },
    { label: 'High', value: 'high', color: 'error' },
    { label: 'Urgent', value: 'urgent', color: 'error' },
]

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
    selectedPlan.value = user.subscription
    showSubscriptionModal.value = true
}

const openSupportModal = (user: any) => {
    selectedUser.value = user
    ticketCategory.value = 'account'
    ticketPriority.value = 'medium'
    ticketSubject.value = ''
    ticketMessage.value = ''
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
