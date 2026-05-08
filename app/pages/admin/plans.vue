<script setup lang="ts">
import { upperFirst } from 'scule'

const { plans, updatePlan, deletePlan } = usePlans()
const table = useTemplateRef('table')
const toast = useToast()
const loading = ref(true)

onMounted(() => {
    setTimeout(() => {
        loading.value = false
    }, 600)
})

const isModalOpen = ref(false)
const isConfirmModalOpen = ref(false)
const isDetailsModalOpen = ref(false)
const editingPlan = ref<any>(null)
const targetPlan = ref<any>(null)
const viewingPlan = ref<any>(null)

const columns = [
    { accessorKey: 'name', header: 'Plan Name' },
    { accessorKey: 'price', header: 'Price' },
    { accessorKey: 'tokenLimit', header: 'Token Limit' },
    { accessorKey: 'status', header: 'Status' },
    { accessorKey: 'actions', header: '' }
]

const togglePlanStatus = (plan: any) => {
    const newStatus = plan.status === 'Active' ? 'Inactive' : 'Active'
    updatePlan(plan.id, { status: newStatus })
    toast.add({
        title: `Plan ${newStatus}`,
        description: `${plan.name} has been set to ${newStatus.toLowerCase()}.`,
        color: newStatus === 'Active' ? 'success' : 'info'
    })
}

const openEditModal = (plan: any) => {
    editingPlan.value = plan
    isModalOpen.value = true
}

const openAddModal = () => {
    editingPlan.value = null
    isModalOpen.value = true
}

const confirmDeletePlan = (plan: any) => {
    targetPlan.value = plan
    isConfirmModalOpen.value = true
}

const handleConfirmDelete = () => {
    if (!targetPlan.value) return
    deletePlan(targetPlan.value.id)
    toast.add({
        title: 'Plan Deleted',
        description: `${targetPlan.value.name} has been removed from the platform.`,
        color: 'error'
    })
    isConfirmModalOpen.value = false
    targetPlan.value = null
}

const openDetailsModal = (plan: any) => {
    viewingPlan.value = plan
    isDetailsModalOpen.value = true
}

const getRowActions = (plan: any) => [
    [
        { label: 'View Details', icon: 'i-lucide-info', onSelect: () => openDetailsModal(plan) },
        { label: 'Edit Plan', icon: 'i-lucide-edit', onSelect: () => openEditModal(plan) },
        {
            label: plan.status === 'Active' ? 'Set Inactive' : 'Set Active',
            icon: plan.status === 'Active' ? 'i-lucide-eye-off' : 'i-lucide-eye',
            onSelect: () => togglePlanStatus(plan)
        }
    ],
    [
        {
            label: 'Delete Plan',
            icon: 'i-lucide-trash-2',
            color: 'error' as const,
            onSelect: () => confirmDeletePlan(plan)
        }
    ]
]
</script>

<template>
    <ContentPanel title="Platform Plans">
        <ContentHeading title="Platform Plans"
            description="Manage subscription tiers, pricing, and resource limits for the entire platform." />

        <div class="space-y-4">
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                    <UInput icon="i-lucide-search" placeholder="Search plans..." class="w-64" />
                </div>
                <UButton color="primary" icon="i-lucide-plus" @click="openAddModal">Create New Plan</UButton>
            </div>


            <UTable :data="plans" :columns="columns" :loading="loading" ref="table">
                <template #name-cell="{ row }">
                    <div class="flex items-center gap-3">
                        <div
                            class="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-950/30 flex items-center justify-center text-primary-600 shrink-0">
                            <UIcon
                                :name="row.original.name === 'Enterprise' ? 'i-lucide-shield-check' : (row.original.name === 'Pro' ? 'i-lucide-zap' : 'i-lucide-sparkles')"
                                class="text-xl" />
                        </div>
                        <div class="flex flex-col">
                            <span class="font-bold text-neutral-900 dark:text-neutral-100">{{ row.original.name
                                }}</span>
                            <span class="text-xs text-neutral-500 line-clamp-1">{{ row.original.description }}</span>
                        </div>
                    </div>
                </template>

                <template #price-cell="{ row }">
                    <div class="flex flex-col">
                        <span class="font-bold text-neutral-900 dark:text-neutral-100">${{ row.original.price }}</span>
                        <span class="text-[10px] text-neutral-500 uppercase tracking-wider font-bold">{{
                            row.original.interval }}</span>
                    </div>
                </template>

                <template #tokenLimit-cell="{ row }">
                    <div class="flex flex-col">
                        <span class="text-sm">{{ (row.original.tokenLimit / 1000000).toFixed(1) }}M Tokens</span>
                        <span class="text-[10px] text-neutral-500 font-mono">{{ row.original.tokenLimit.toLocaleString()
                        }} raw</span>
                    </div>
                </template>

                <template #status-cell="{ row }">
                    <UBadge :color="row.original.status === 'Active' ? 'success' : 'neutral'" variant="soft">
                        {{ row.original.status }}
                    </UBadge>
                </template>

                <template #actions-cell="{ row }">
                    <UDropdownMenu :items="getRowActions(row.original)" size="sm" :content="{ align: 'end' }">
                        <UButton color="neutral" variant="ghost" size="sm" icon="i-lucide-more-horizontal" />
                    </UDropdownMenu>
                </template>
            </UTable>
        </div>

        <AdminConfirmModal v-if="targetPlan" v-model:open="isConfirmModalOpen" title="Delete Plan?"
            :description="`Are you sure you want to delete the ${targetPlan.name} plan? This will not affect existing subscribers but will prevent new institutions from selecting it.`"
            confirm-label="Delete Plan" confirm-color="error" @confirm="handleConfirmDelete" />

        <AdminPlanModal v-model:open="isModalOpen" :plan="editingPlan" />

        <!-- Plan Details Modal -->
        <UModal v-model:open="isDetailsModalOpen">
            <template #content>
                <div v-if="viewingPlan" class="p-6 flex flex-col gap-6">
                    <div class="flex items-center gap-4">
                        <div
                            class="w-12 h-12 rounded-xl bg-primary-50 dark:bg-primary-950/30 flex items-center justify-center text-primary-600 shrink-0">
                            <UIcon
                                :name="viewingPlan.name === 'Enterprise' ? 'i-lucide-shield-check' : (viewingPlan.name === 'Pro' ? 'i-lucide-zap' : 'i-lucide-sparkles')"
                                class="text-2xl" />
                        </div>
                        <div class="flex flex-col">
                            <h3 class="text-xl font-bold">{{ viewingPlan.name }} Plan</h3>
                            <p class="text-sm text-neutral-500">{{ viewingPlan.description }}</p>
                        </div>
                    </div>

                    <div class="grid grid-cols-2 gap-4">
                        <div class="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 flex flex-col gap-1">
                            <span class="text-[10px] text-neutral-500 uppercase font-bold tracking-wider">Pricing</span>
                            <span class="font-bold text-lg">${{ viewingPlan.price }} <span class="text-sm font-normal text-neutral-500">/ {{ viewingPlan.interval }}</span></span>
                        </div>
                        <div class="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 flex flex-col gap-1">
                            <span class="text-[10px] text-neutral-500 uppercase font-bold tracking-wider">Resource Limit</span>
                            <span class="font-bold text-lg">{{ (viewingPlan.tokenLimit / 1000000).toFixed(1) }}M <span class="text-sm font-normal text-neutral-500">Tokens</span></span>
                        </div>
                    </div>

                    <div class="flex flex-col gap-3">
                        <h4 class="text-sm font-bold text-neutral-900 dark:text-neutral-100 uppercase tracking-widest">Included Features</h4>
                        <div class="space-y-2">
                            <div v-for="feature in viewingPlan.features" :key="feature" class="flex items-center gap-3 text-sm text-neutral-600 dark:text-neutral-400">
                                <div class="w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center text-green-500 shrink-0">
                                    <UIcon name="i-lucide-check" class="text-xs" />
                                </div>
                                {{ feature }}
                            </div>
                        </div>
                    </div>

                    <div class="flex items-center justify-end pt-2">
                        <UButton label="Close" color="neutral" variant="ghost" @click="isDetailsModalOpen = false" />
                    </div>
                </div>
            </template>
        </UModal>
    </ContentPanel>
</template>
