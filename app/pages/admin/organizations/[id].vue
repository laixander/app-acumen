<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const orgId = route.params.id as string

const { organizations, updateOrganization } = useOrganizations()
const { workspaces } = useWorkspaces()
const toast = useToast()

const isEditModalOpen = ref(false)
const isWorkspaceModalOpen = ref(false)
const isConfirmModalOpen = ref(false)
const isPlanConfirmOpen = ref(false)
const editingWorkspace = ref<any>(null)
const selectedTargetPlan = ref<string | null>(null)

const { plans } = usePlans()
const activePlans = computed(() => plans.value.filter(p => p.status === 'Active'))
const planOptions = computed(() => activePlans.value.map(p => ({
    label: `${p.name} Plan`,
    value: p.name,
    icon: p.name === 'Enterprise' ? 'i-lucide-shield-check' : (p.name === 'Pro' ? 'i-lucide-zap' : 'i-lucide-sparkles')
})))

const preparePlanChange = (plan: string) => {
    selectedTargetPlan.value = plan
    isPlanConfirmOpen.value = true
}

const handlePlanUpdate = () => {
    if (!organization.value || !selectedTargetPlan.value) return
    updateOrganization(organization.value.id, { plan: selectedTargetPlan.value as any })
    toast.add({
        title: 'Plan Updated',
        description: `${organization.value.name} is now on the ${selectedTargetPlan.value} plan.`,
        color: 'success'
    })
    isPlanConfirmOpen.value = false
    selectedTargetPlan.value = null
}

const organization = computed(() => organizations.value.find(o => o.id === orgId))
const orgWorkspaces = computed(() => workspaces.value.filter(w => w.organizationId === orgId))

const toggleStatus = () => {
    isConfirmModalOpen.value = true
}

const handleToggleStatus = () => {
    if (!organization.value) return
    const newStatus = organization.value.status === 'Suspended' ? 'Active' : 'Suspended'

    updateOrganization(organization.value.id, { status: newStatus })
    toast.add({
        title: `Organization ${newStatus === 'Active' ? 'Activated' : 'Suspended'}`,
        description: `${organization.value.name} has been ${newStatus.toLowerCase()}.`,
        color: newStatus === 'Active' ? 'success' : 'info'
    })
    isConfirmModalOpen.value = false
}

const { deleteWorkspace } = useWorkspaces()

const activeTab = computed({
    get: () => route.query.tab as string || 'overview',
    set: (val) => router.replace({ query: { ...route.query, tab: val } })
})

const openAddWorkspaceModal = () => {
    editingWorkspace.value = null
    isWorkspaceModalOpen.value = true
}

const openEditWorkspaceModal = (ws: any) => {
    editingWorkspace.value = ws
    isWorkspaceModalOpen.value = true
}

const confirmDeleteWorkspace = (id: string) => {
    if (confirm('Are you sure you want to delete this workspace? This action cannot be undone.')) {
        deleteWorkspace(id)
    }
}

const items = [
    {
        label: 'Overview',
        icon: 'i-lucide-layout-dashboard',
        value: 'overview',
        slot: 'overview'
    },
    {
        label: 'Workspaces',
        icon: 'i-lucide-layers',
        value: 'workspaces',
        slot: 'workspaces'
    },
    {
        label: 'Members',
        icon: 'i-lucide-users',
        value: 'members',
        slot: 'members'
    },
    {
        label: 'Billing',
        icon: 'i-lucide-credit-card',
        value: 'billing',
        slot: 'billing'
    }
]

if (!organization.value) {
    // In a real app, handle 404
}
</script>

<template>
    <ContentPanel v-if="organization" :title="organization.name">
        <!-- Header with Back Button -->
        <div class="flex flex-col gap-6">
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-4">
                    <UButton icon="i-lucide-arrow-left" variant="ghost" color="neutral" to="/admin/organizations" />
                    <div class="flex items-center gap-3">
                        <div
                            class="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center text-2xl text-primary-500">
                            <UIcon :name="organization.logo || 'i-lucide-building-2'" />
                        </div>
                        <div>
                            <h1 class="text-2xl font-bold tracking-tight">{{ organization.name }}</h1>
                            <p class="text-sm text-neutral-500">{{ organization.type }} • {{ organization.plan }} • {{
                                organization.website
                                || 'No website' }}</p>
                        </div>
                    </div>
                </div>
                <div class="flex items-center gap-2">
                    <UButton color="neutral" variant="outline" icon="i-lucide-edit" @click="isEditModalOpen = true">Edit
                        Organization</UButton>
                    <UButton :color="organization.status === 'Suspended' ? 'success' : 'error'" variant="soft"
                        :icon="organization.status === 'Suspended' ? 'i-lucide-user-check' : 'i-lucide-ban'"
                        @click="toggleStatus">
                        {{ organization.status === 'Suspended' ? 'Activate' : 'Suspend' }}
                    </UButton>
                </div>
            </div>

            <!-- Stats Grid -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <UCard :ui="{ body: 'p-5' }">
                    <div class="flex items-center gap-3 text-neutral-500 mb-2">
                        <UIcon name="i-lucide-layers" class="w-4 h-4" />
                        <span class="text-sm font-medium">Workspaces</span>
                    </div>
                    <div class="text-2xl font-bold">{{ orgWorkspaces.length }}</div>
                </UCard>
                <UCard :ui="{ body: 'p-5' }">
                    <div class="flex items-center gap-3 text-neutral-500 mb-2">
                        <UIcon name="i-lucide-users" class="w-4 h-4" />
                        <span class="text-sm font-medium">Total Members</span>
                    </div>
                    <div class="text-2xl font-bold">{{ organization.members.length }}</div>
                </UCard>
                <UCard :ui="{ body: 'p-5' }">
                    <div class="flex items-center gap-3 text-neutral-500 mb-2">
                        <UIcon name="i-lucide-zap" class="w-4 h-4" />
                        <span class="text-sm font-medium">Token Usage</span>
                    </div>
                    <div class="text-2xl font-bold">1.2M <span class="text-sm font-normal text-neutral-400">/ 5M</span>
                    </div>
                </UCard>
            </div>

            <!-- Tabs -->
            <UTabs v-model="activeTab" :items="items" class="w-full">
                <template #overview>
                    <div class="py-6 flex flex-col gap-8">
                        <section class="flex flex-col gap-4">
                            <h3 class="font-bold text-lg">About</h3>
                            <p class="text-neutral-600 dark:text-neutral-400 max-w-2xl leading-relaxed">
                                {{ organization.description || 'No description provided for this institution.' }}
                            </p>
                        </section>

                        <section class="flex flex-col gap-4">
                            <h3 class="font-bold text-lg">Institutional Details</h3>
                            <UCard :ui="{ body: 'p-0 sm:p-0' }">
                                <div class="divide-y divide-neutral-100 dark:divide-neutral-800">
                                    <div class="grid grid-cols-3 p-4">
                                        <span class="text-sm text-neutral-500">Legal Name</span>
                                        <span class="col-span-2 font-medium">{{ organization.name }}</span>
                                    </div>
                                    <div class="grid grid-cols-3 p-4">
                                        <span class="text-sm text-neutral-500">Slug</span>
                                        <span class="col-span-2 font-medium">{{ organization.slug }}</span>
                                    </div>
                                    <div class="grid grid-cols-3 p-4">
                                        <span class="text-sm text-neutral-500">Plan</span>
                                        <span class="col-span-2">
                                            <UBadge variant="soft"
                                                :color="organization.plan === 'Enterprise' ? 'info' : (organization.plan === 'Pro' ? 'primary' : 'neutral')">
                                                {{ organization.plan }}
                                            </UBadge>
                                        </span>
                                    </div>
                                    <div class="grid grid-cols-3 p-4">
                                        <span class="text-sm text-neutral-500">Created At</span>
                                        <span class="col-span-2 font-medium">{{ new
                                            Date(organization.createdAt).toLocaleDateString() }}</span>
                                    </div>
                                </div>
                            </UCard>
                        </section>
                    </div>
                </template>

                <template #workspaces>
                    <div class="py-6 flex flex-col gap-6">
                        <div class="flex items-center justify-between">
                            <h3 class="font-bold text-lg">Organization Workspaces</h3>
                            <UButton color="primary" variant="soft" icon="i-lucide-plus" @click="openAddWorkspaceModal">
                                Add
                                Workspace</UButton>
                        </div>

                        <div v-if="orgWorkspaces.length === 0"
                            class="text-center py-12 border-2 border-dashed border-neutral-200 dark:border-neutral-800 rounded-2xl">
                            <p class="text-neutral-500">No workspaces found for this organization.</p>
                        </div>
                        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            <UCard v-for="ws in orgWorkspaces" :key="ws.id"
                                class="hover:border-primary-500/50 transition-colors group relative">
                                <div class="flex items-start gap-4">
                                    <div
                                        class="w-10 h-10 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-xl">
                                        <UIcon :name="ws.icon" />
                                    </div>
                                    <div class="flex flex-col gap-1 pr-8">
                                        <span class="font-bold group-hover:text-primary-500 transition-colors">{{
                                            ws.name }}</span>
                                        <span class="text-xs text-neutral-500 line-clamp-1">{{ ws.description }}</span>
                                        <div class="flex items-center gap-2 mt-2">
                                            <UBadge variant="soft" size="sm" color="neutral">{{ ws.members.length }}
                                                members</UBadge>
                                            <UBadge variant="soft" size="sm"
                                                :color="ws.plan === 'Enterprise' ? 'info' : (ws.plan === 'Pro' ? 'primary' : 'neutral')">
                                                {{ ws.plan }}
                                            </UBadge>
                                        </div>
                                    </div>
                                </div>

                                <!-- Workspace Actions -->
                                <div
                                    class="absolute top-2 right-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <UButton icon="i-lucide-edit" size="xs" color="neutral" variant="ghost"
                                        @click="openEditWorkspaceModal(ws)" />
                                    <UButton icon="i-lucide-trash" size="xs" color="error" variant="ghost"
                                        @click="confirmDeleteWorkspace(ws.id)" />
                                </div>
                            </UCard>
                        </div>
                    </div>
                </template>

                <template #members>
                    <div class="py-6">
                        <UTable :data="organization.members" :columns="[
                            { accessorKey: 'name', header: 'Member Name' },
                            { accessorKey: 'email', header: 'Email' },
                            { accessorKey: 'orgRole', header: 'Org Role' },
                            { accessorKey: 'status', header: 'Status' }
                        ]">
                            <template #name-cell="{ row }">
                                <div class="flex items-center gap-3">
                                    <UAvatar :src="row.original.avatar" :alt="row.original.name" size="xs" />
                                    <span class="font-medium">{{ row.original.name }}</span>
                                </div>
                            </template>
                            <template #orgRole-cell="{ row }">
                                <UBadge variant="soft"
                                    :color="row.original.orgRole === 'Org_Owner' ? 'primary' : 'neutral'">
                                    {{ row.original.orgRole.replace('_', ' ') }}
                                </UBadge>
                            </template>
                            <template #status-cell="{ row }">
                                <div class="flex items-center gap-1.5">
                                    <div :class="row.original.status === 'online' ? 'bg-green-500' : 'bg-neutral-300'"
                                        class="w-2 h-2 rounded-full" />
                                    <span class="text-sm capitalize">{{ row.original.status }}</span>
                                </div>
                            </template>
                        </UTable>
                    </div>
                </template>

                <template #billing>
                    <div class="py-6 flex flex-col gap-8">
                        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <!-- Subscription Plan Card -->
                            <UCard class="lg:col-span-2">
                                <template #header>
                                    <div class="flex items-center justify-between">
                                        <h3 class="font-bold">Subscription Plan</h3>
                                        <UBadge variant="soft"
                                            :color="organization.plan === 'Enterprise' ? 'info' : (organization.plan === 'Pro' ? 'primary' : 'neutral')">
                                            {{ organization.plan }} Plan
                                        </UBadge>
                                    </div>
                                </template>
                                <div class="flex flex-col gap-6">
                                    <div class="flex items-start justify-between">
                                        <div class="flex flex-col gap-1">
                                            <p class="text-sm text-neutral-500">Your current plan is suited for large
                                                institutions.</p>
                                            <p class="font-medium">Next billing date: June 1, 2024</p>
                                        </div>
                                        <UDropdownMenu
                                            :items="[planOptions.map(p => ({ ...p, onSelect: () => preparePlanChange(p.value) }))]"
                                            size="sm">
                                            <UButton color="neutral" variant="outline" icon="i-lucide-refresh-cw">Change
                                                Plan
                                            </UButton>
                                        </UDropdownMenu>
                                    </div>
                                    <div
                                        class="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
                                        <div class="flex items-center gap-3">
                                            <div
                                                class="w-10 h-10 rounded-full bg-primary-500/10 flex items-center justify-center text-primary-500">
                                                <UIcon name="i-lucide-credit-card" />
                                            </div>
                                            <div>
                                                <div class="flex items-center gap-2">
                                                    <p class="font-bold">Visa ending in 4242</p>
                                                    <UTooltip text="PCI-DSS Compliant Storage">
                                                        <UIcon name="i-lucide-shield-check"
                                                            class="text-green-500 text-xs" />
                                                    </UTooltip>
                                                </div>
                                                <p class="text-xs text-neutral-500">Expires 12/26 • Primary Method</p>
                                            </div>
                                        </div>
                                        <UButton color="neutral" variant="ghost" size="xs" icon="i-lucide-external-link"
                                            @click="toast.add({ title: 'Stripe Billing Portal', description: 'In production, this would securely redirect to Stripe to manage subscriptions and invoices.', color: 'info' })">
                                            Manage in Stripe
                                        </UButton>
                                    </div>
                                </div>
                            </UCard>

                            <!-- Usage Summary Card -->
                            <UCard>
                                <template #header>
                                    <h3 class="font-bold">Total Usage</h3>
                                </template>
                                <div class="flex flex-col gap-6">
                                    <div class="flex flex-col gap-2">
                                        <div class="flex items-center justify-between text-sm">
                                            <span class="text-neutral-500">Aggregate Tokens</span>
                                            <span class="font-bold">1.2M / 5M</span>
                                        </div>
                                        <UProgress :model-value="24" color="primary" size="sm" />
                                    </div>
                                    <div
                                        class="flex flex-col gap-4 pt-4 border-t border-neutral-100 dark:border-neutral-800">
                                        <div class="flex items-center justify-between">
                                            <div class="flex items-center gap-2">
                                                <UIcon name="i-lucide-users" class="text-neutral-400" />
                                                <span class="text-sm">Active Members</span>
                                            </div>
                                            <span class="font-medium">{{ organization.members.length }}</span>
                                        </div>
                                        <div class="flex items-center justify-between">
                                            <div class="flex items-center gap-2">
                                                <UIcon name="i-lucide-layers" class="text-neutral-400" />
                                                <span class="text-sm">Total Workspaces</span>
                                            </div>
                                            <span class="font-medium">{{ orgWorkspaces.length }}</span>
                                        </div>
                                    </div>
                                </div>
                            </UCard>
                        </div>

                        <!-- Usage by Workspace -->
                        <section class="flex flex-col gap-4">
                            <h3 class="font-bold text-lg">Usage by Workspace</h3>
                            <UCard :ui="{ body: 'p-0 sm:p-0' }">
                                <UTable :data="orgWorkspaces" :columns="[
                                    { accessorKey: 'name', header: 'Workspace' },
                                    { accessorKey: 'tokens', header: 'Tokens Used' },
                                    { accessorKey: 'maxTokens', header: 'Limit' },
                                    { accessorKey: 'plan', header: 'Plan' }
                                ]">
                                    <template #tokens-cell="{ row }">
                                        <span class="font-mono text-xs">{{ (row.original.tokens || 0).toLocaleString()
                                            }}</span>
                                    </template>
                                    <template #maxTokens-cell="{ row }">
                                        <span class="text-neutral-400 text-xs">{{ (row.original.maxTokens ||
                                            0).toLocaleString() }}</span>
                                    </template>
                                </UTable>
                            </UCard>
                        </section>
                    </div>
                </template>
            </UTabs>
        </div>

        <AdminOrganizationModal v-model:open="isEditModalOpen" :organization="organization" />
        <AdminWorkspaceModal v-model:open="isWorkspaceModalOpen" :workspace="editingWorkspace"
            :organization-id="organization.id" />

        <AdminConfirmModal v-if="organization" v-model:open="isConfirmModalOpen"
            :title="organization.status === 'Suspended' ? 'Activate Organization' : 'Suspend Organization'"
            :description="`Are you sure you want to ${organization.status === 'Suspended' ? 'activate' : 'suspend'} ${organization.name}? This will affect all associated workspaces and members.`"
            :confirm-label="organization.status === 'Suspended' ? 'Activate' : 'Suspend'"
            :confirm-color="organization.status === 'Suspended' ? 'success' : 'error'" @confirm="handleToggleStatus" />

        <AdminConfirmModal v-if="organization && selectedTargetPlan" v-model:open="isPlanConfirmOpen"
            title="Change Subscription Plan"
            :description="`Are you sure you want to change ${organization.name}'s plan to ${selectedTargetPlan}? This will update their billing and token limits immediately.`"
            confirm-label="Update Plan" confirm-color="primary" @confirm="handlePlanUpdate" />
    </ContentPanel>

    <div v-else class="flex flex-col items-center justify-center py-24 gap-6 w-full">
        <div
            class="w-20 h-20 rounded-3xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center border border-neutral-200 dark:border-neutral-700">
            <UIcon name="i-lucide-search-x" class="text-4xl text-neutral-400" />
        </div>
        <div class="flex flex-col items-center gap-2 text-center">
            <h2 class="text-2xl font-bold">Organization Not Found</h2>
            <p class="text-neutral-500 max-w-sm">The organization ID you are looking for doesn't exist in our system.
            </p>
        </div>
        <UButton label="Back to Organizations" color="primary" to="/admin/organizations" icon="i-lucide-arrow-left" />
    </div>
</template>
