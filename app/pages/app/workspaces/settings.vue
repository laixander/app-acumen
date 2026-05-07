<script setup lang="ts">


const { user } = useUser()
const { currentWorkspace: workspace, updateWorkspace, workspaces, currentWorkspaceId } = useWorkspaces()
const { topics } = useTopics()

const workspaceTopics = computed(() => {
    if (!workspace.value) return []
    return topics.value.filter(t => !t.workspaceId || t.workspaceId === workspace.value?.id)
})

const workspaceTopicsCount = computed(() => workspaceTopics.value.length)

const isEditNameModalOpen = ref(false)
const newWorkspaceName = ref(workspace.value?.name || '')

const isChangeIconModalOpen = ref(false)
const isDeleteModalOpen = ref(false)

const iconOptions = [
    'i-lucide-user', 'i-lucide-users', 'i-lucide-briefcase', 'i-lucide-graduation-cap',
    'i-lucide-code-2', 'i-lucide-globe', 'i-lucide-brain-circuit', 'i-lucide-rocket',
    'i-lucide-sparkles', 'i-lucide-layers', 'i-lucide-layout', 'i-lucide-database',
    'i-lucide-cpu', 'i-lucide-monitor', 'i-lucide-smartphone', 'i-lucide-cloud',
    'i-lucide-shield', 'i-lucide-lock', 'i-lucide-key', 'i-lucide-fingerprint',
    'i-lucide-zap', 'i-lucide-flame', 'i-lucide-heart', 'i-lucide-star'
]

const updateWorkspaceName = () => {
    if (workspace.value) {
        updateWorkspace(workspace.value.id, { name: newWorkspaceName.value })
        isEditNameModalOpen.value = false
    }
}

const updateWorkspaceIcon = (icon: string) => {
    if (workspace.value) {
        updateWorkspace(workspace.value.id, { icon })
        isChangeIconModalOpen.value = false
    }
}

const deleteWorkspace = () => {
    // In a real app, you'd remove it from the list
    isDeleteModalOpen.value = false
    navigateTo('/app/dashboard')
}

const currentUserRole = computed(() => {
    if (!workspace.value) return 'Member'
    const me = workspace.value.members.find(m => m.id === '1')
    return me ? me.role : 'Member'
})

const formatTokens = (val?: number) => {
    if (!val) return '0'
    if (val >= 1000000) return (val / 1000000).toFixed(1) + 'M'
    if (val >= 1000) return (val / 1000).toFixed(1) + 'k'
    return val.toString()
}

const sections = computed(() => [
    {
        title: 'General',
        items: [
            {
                label: 'Workspace Name',
                value: workspace.value?.name || '',
                icon: 'i-lucide-edit-3',
                color: 'blue'
            },
            {
                label: 'Workspace Icon',
                value: 'Change Icon',
                icon: workspace.value?.icon || 'i-lucide-user',
                color: 'blue'
            },
            {
                label: 'Total Topics',
                value: `${workspaceTopicsCount.value} Active Topics`,
                icon: 'i-lucide-book-open',
                color: 'orange',
                action: '/app/workspaces/topics'
            }
        ]
    },
    {
        title: 'Access Control',
        items: [
            {
                label: 'Team Members',
                value: workspace.value ? `${workspace.value.members.length} Members, ${workspace.value.pendingInvites.length} Pending` : 'No data',
                icon: 'i-lucide-users',
                color: 'purple',
                action: '/app/workspaces/members'
            }
        ]
    },
    {
        title: 'Billing',
        items: [
            {
                label: 'Subscription',
                value: workspace.value?.plan || 'Free',
                icon: 'i-lucide-credit-card',
                color: 'emerald',
                action: '/app/workspaces/billing'
            }
        ]
    }
])

const dangerZone = [
    {
        label: 'Delete Workspace',
        description: 'Permanently remove this workspace and all its data.',
        icon: 'i-lucide-trash-2',
        color: 'error'
    }
]
</script>

<template>
    <UContainer class="max-w-4xl py-12">
        <div v-if="workspace" class="flex flex-col gap-10">
            <!-- Breadcrumbs -->
            <nav class="flex items-center gap-2 text-sm text-neutral-500 mb-2">
                <ULink to="/app/dashboard" class="hover:text-primary transition-colors">App</ULink>
                <template v-if="$route.query.from === 'manage'">
                    <UIcon name="i-lucide-chevron-right" class="w-3.5 h-3.5" />
                    <ULink to="/app/workspaces" class="hover:text-primary transition-colors">Manage Workspaces</ULink>
                </template>
                <UIcon name="i-lucide-chevron-right" class="w-3.5 h-3.5" />
                <span class="font-medium text-neutral-900 dark:text-neutral-100">Workspace Settings</span>
            </nav>

            <!-- Header -->
            <header class="flex items-center justify-between gap-4">
                <div class="flex items-center gap-4">
                    <div
                        class="w-16 h-16 flex items-center justify-center rounded-2xl bg-primary-500/10 text-primary-500 border border-primary-500/20 shadow-inner">
                        <UIcon :name="workspace.icon" class="text-3xl" />
                    </div>
                    <div class="flex flex-col gap-1">
                        <h1 class="text-3xl font-bold tracking-tight">Workspace Settings</h1>
                        <p class="text-neutral-500">{{ workspace.description }}</p>
                    </div>
                </div>
            </header>

            <!-- Dynamic Sections -->
            <div v-for="section in sections" :key="section.title" class="flex flex-col gap-4">
                <h2 class="text-xs font-bold text-neutral-400 uppercase tracking-[0.2em] px-2">
                    {{ section.title }}
                </h2>

                <UCard
                    :ui="{ body: 'p-0 sm:p-0 overflow-hidden', root: 'shadow-sm border-neutral-200 dark:border-neutral-800' }">
                    <div class="divide-y divide-neutral-100 dark:divide-neutral-800">
                        <div v-for="item in section.items" :key="item.label"
                            @click="('action' in item && item.action) ? navigateTo(item.action as string) : (item.label === 'Workspace Name' ? isEditNameModalOpen = true : item.label === 'Workspace Icon' ? isChangeIconModalOpen = true : null)"
                            class="flex items-center justify-between p-5 hover:bg-neutral-50 dark:hover:bg-neutral-900/50 transition-colors group cursor-pointer">

                            <div class="flex items-center gap-4">
                                <div
                                    class="w-10 h-10 flex items-center justify-center rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200/50 dark:border-neutral-700/50">
                                    <UIcon :name="item.icon" class="text-lg text-neutral-500" />
                                </div>
                                <div class="flex flex-col">
                                    <span class="font-bold text-neutral-700 dark:text-neutral-200">{{ item.label
                                    }}</span>
                                    <span v-if="'email' in item && item.email" class="text-xs text-neutral-500">{{
                                        item.email }}</span>
                                </div>
                            </div>

                            <div class="flex items-center gap-4">
                                <span class="text-neutral-500 dark:text-neutral-400 font-medium">{{ item.value }}</span>
                                <UButton icon="i-lucide-chevron-right" variant="ghost" color="neutral" size="xs" />
                            </div>
                        </div>
                    </div>
                </UCard>
            </div>

            <!-- Danger Zone -->
            <div class="flex flex-col gap-4">
                <h2 class="text-xs font-bold text-error-500 dark:text-error-400 uppercase tracking-[0.2em] px-2">
                    Danger Zone
                </h2>
                <UCard :ui="{ root: 'border-error-200 dark:border-error-900/50 bg-error-50/10' }">
                    <div class="flex items-center justify-between p-6">
                        <div class="flex flex-col gap-1">
                            <p class="font-bold text-neutral-900 dark:text-neutral-100">{{ currentUserRole === 'Owner' ?
                                'Delete Workspace' : 'Leave Workspace' }}</p>
                            <p class="text-sm text-neutral-500">
                                {{ currentUserRole === 'Owner'
                                    ? 'Permanently remove this workspace and all its data. This action is irreversible.'
                                    : 'Remove your access to this workspace. You will need a new invitation to join again.'
                                }}
                            </p>
                        </div>
                        <UButton :label="currentUserRole === 'Owner' ? 'Delete Workspace' : 'Leave Workspace'"
                            color="error" variant="soft" @click="isDeleteModalOpen = true" />
                    </div>
                </UCard>
            </div>
        </div>

        <div v-else class="flex flex-col items-center justify-center py-24 gap-6">
            <div
                class="w-20 h-20 rounded-3xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center border border-neutral-200 dark:border-neutral-700">
                <UIcon name="i-lucide-search-x" class="text-4xl text-neutral-400" />
            </div>
            <div class="flex flex-col items-center gap-2 text-center">
                <h2 class="text-2xl font-bold">Workspace Not Found</h2>
                <p class="text-neutral-500 max-w-sm">The workspace you are looking for doesn't exist or you don't have
                    access to
                    it.</p>
            </div>
            <UButton label="Go to Workspaces" color="primary" to="/app/workspaces" icon="i-lucide-arrow-left" />
        </div>

        <!-- Modals -->
        <UModal v-model:open="isEditNameModalOpen">
            <template #content>
                <div class="p-6 flex flex-col gap-6">
                    <div class="flex flex-col gap-1">
                        <h3 class="text-lg font-bold">Rename Workspace</h3>
                        <p class="text-sm text-neutral-500">Enter a new name for your workspace.</p>
                    </div>
                    <UInput v-model="newWorkspaceName" class="w-full" />
                    <div class="flex items-center justify-end gap-3">
                        <UButton label="Cancel" variant="ghost" color="neutral" @click="isEditNameModalOpen = false" />
                        <UButton label="Save Changes" color="primary" @click="updateWorkspaceName" />
                    </div>
                </div>
            </template>
        </UModal>

        <UModal v-model:open="isChangeIconModalOpen">
            <template #content>
                <div class="p-6 flex flex-col gap-6">
                    <div class="flex flex-col gap-1">
                        <h3 class="text-lg font-bold">Select Workspace Icon</h3>
                        <p class="text-sm text-neutral-500">Choose an icon that represents your workspace.</p>
                    </div>
                    <div class="grid grid-cols-6 sm:grid-cols-8 gap-2">
                        <UButton v-for="icon in iconOptions" :key="icon" @click="updateWorkspaceIcon(icon)" :icon="icon"
                            :variant="workspace?.icon === icon ? 'solid' : 'outline'"
                            :color="workspace?.icon === icon ? 'primary' : 'neutral'" size="xl" square
                            class="p-3 w-fit rounded-xl" />
                    </div>
                </div>
            </template>
        </UModal>

        <UModal v-model:open="isDeleteModalOpen">
            <template #content>
                <div class="p-6 flex flex-col gap-6">
                    <div class="flex items-center gap-4 text-error-600">
                        <div
                            class="w-12 h-12 rounded-full bg-error-50 dark:bg-error-950/30 flex items-center justify-center">
                            <UIcon :name="currentUserRole === 'Owner' ? 'i-lucide-alert-triangle' : 'i-lucide-log-out'"
                                class="text-2xl" />
                        </div>
                        <h3 class="text-xl font-bold">{{ currentUserRole === 'Owner' ? 'Delete Workspace?'
                            : 'Leave Workspace?' }}</h3>
                    </div>
                    <p class="text-neutral-500">
                        {{ currentUserRole === 'Owner'
                            ? `This action cannot be undone. All data, members, and resources associated with
                        "${workspace?.name}" will be permanently deleted.`
                            : `Are you sure you want to leave "${workspace?.name}"? You will lose access to all shared
                        resources and will need an invitation to join again.` }}
                    </p>
                    <div class="flex items-center justify-end gap-3">
                        <UButton label="Cancel" variant="ghost" color="neutral" @click="isDeleteModalOpen = false" />
                        <UButton :label="currentUserRole === 'Owner' ? 'Yes, Delete Workspace' : 'Leave Workspace'"
                            color="error" @click="isDeleteModalOpen = false" />
                    </div>
                </div>
            </template>
        </UModal>
    </UContainer>
</template>
