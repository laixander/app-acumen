<script setup lang="ts">
const { currentWorkspace: workspace } = useWorkspaces()
const { topics } = useTopics()

const workspaceTopics = computed(() => {
    if (!workspace.value) return []
    return topics.value.filter(t => !t.workspaceId || t.workspaceId === workspace.value?.id)
})
</script>

<template>
    <UContainer class="max-w-4xl py-12">
        <div v-if="workspace" class="flex flex-col gap-10">
            <!-- Breadcrumbs -->
            <nav class="flex items-center gap-2 text-sm text-neutral-500 mb-2">
                <ULink to="/app/dashboard" class="hover:text-primary transition-colors">App</ULink>
                <UIcon name="i-lucide-chevron-right" class="w-3.5 h-3.5" />
                <ULink to="/app/workspaces/settings" class="hover:text-primary transition-colors">Workspace Settings</ULink>
                <UIcon name="i-lucide-chevron-right" class="w-3.5 h-3.5" />
                <span class="font-medium text-neutral-900 dark:text-neutral-100">Workspace Topics</span>
            </nav>

            <!-- Header -->
            <header class="flex items-center justify-between gap-4">
                <div class="flex items-center gap-4">
                    <div
                        class="w-16 h-16 flex items-center justify-center rounded-2xl bg-orange-500/10 text-orange-500 border border-orange-500/20 shadow-inner">
                        <UIcon name="i-lucide-book-open" class="text-3xl" />
                    </div>
                    <div class="flex flex-col gap-1">
                        <h1 class="text-3xl font-bold tracking-tight">Workspace Topics</h1>
                        <p class="text-neutral-500">Manage all learning modules curated for {{ workspace.name }}.</p>
                    </div>
                </div>
                <UButton label="Create Topic" icon="i-lucide-plus" color="primary" to="/app/topics/new" />
            </header>

            <!-- Workspace Topics List -->
            <div class="flex flex-col gap-4">
                <div class="flex items-center justify-between px-2">
                    <h2 class="text-xs font-bold text-neutral-400 uppercase tracking-[0.2em]">
                        All Topics ({{ workspaceTopics.length }})
                    </h2>
                </div>

                <UCard
                    :ui="{ body: 'p-0 sm:p-0 overflow-hidden', root: 'shadow-sm border-neutral-200 dark:border-neutral-800' }">
                    <div class="divide-y divide-neutral-100 dark:divide-neutral-800">
                        <div v-for="topic in workspaceTopics" :key="topic.id"
                            class="flex items-center justify-between p-5 hover:bg-neutral-50 dark:hover:bg-neutral-900/50 transition-colors group cursor-pointer"
                            @click="navigateTo(`/app/topics/${topic.id}`)">
                            <div class="flex items-center gap-4">
                                <div
                                    class="w-12 h-12 flex items-center justify-center rounded-xl bg-primary-500/10 text-primary-500 border border-primary-500/10 transition-transform group-hover:scale-110">
                                    <UIcon :name="topic.icon" class="text-2xl" />
                                </div>
                                <div class="flex flex-col">
                                    <span class="text-base font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-primary transition-colors">{{ topic.title }}</span>
                                    <div class="flex items-center gap-3 text-sm text-neutral-500 mt-1">
                                        <div class="flex items-center gap-2">
                                            <UAvatar v-if="topic.createdBy?.avatar" :src="topic.createdBy.avatar"
                                                size="xs" class="ring-1 ring-primary-500/20" />
                                            <span class="font-medium text-neutral-700 dark:text-neutral-300">{{ topic.createdBy?.name || 'Unknown Author' }}</span>
                                        </div>
                                        <span class="text-neutral-300 dark:text-neutral-700">•</span>
                                        <span class="bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider">{{ topic.tag }}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="flex items-center gap-6">
                                <div class="hidden sm:flex flex-col items-end">
                                    <div class="flex items-center gap-2 mb-1">
                                        <UIcon name="i-lucide-eye" class="size-3.5 text-neutral-400" />
                                        <span class="text-xs font-bold">{{ topic.viewersCount || 0 }}</span>
                                    </div>
                                    <span class="text-[10px] text-neutral-400 uppercase font-bold">Viewing</span>
                                </div>
                                <div class="flex flex-col items-end min-w-[80px]">
                                    <span class="text-sm font-bold text-primary-500">{{ topic.progress }}%</span>
                                    <div class="w-16 h-1 bg-neutral-100 dark:bg-neutral-800 rounded-full mt-1 overflow-hidden">
                                        <div class="h-full bg-primary-500" :style="{ width: `${topic.progress}%` }" />
                                    </div>
                                </div>
                                <UIcon name="i-lucide-chevron-right"
                                    class="w-5 h-5 text-neutral-300 group-hover:text-primary transition-colors" />
                            </div>
                        </div>
                    </div>
                    <div v-if="workspaceTopics.length === 0" class="p-12 flex flex-col items-center justify-center text-center">
                        <UIcon name="i-lucide-book-dashed" class="text-5xl text-neutral-300 mb-4" />
                        <h3 class="text-lg font-bold">No topics yet</h3>
                        <p class="text-neutral-500 max-w-xs mt-1">This workspace doesn't have any curated topics yet. Start by creating one!</p>
                        <UButton label="Create First Topic" icon="i-lucide-plus" color="primary" class="mt-6" to="/app/topics/new" />
                    </div>
                </UCard>
            </div>
        </div>

        <!-- 404 Empty State -->
        <div v-else class="flex flex-col items-center justify-center py-20 text-center">
            <div class="bg-neutral-100 dark:bg-neutral-800 p-6 rounded-full mb-6">
                <UIcon name="i-lucide-search-x" class="text-6xl text-neutral-400" />
            </div>
            <div class="flex flex-col gap-2 mb-8">
                <h2 class="text-2xl font-bold">Workspace not found</h2>
                <p class="text-neutral-500 max-w-sm">The workspace you are looking for doesn't exist or you don't have
                    access to it.</p>
            </div>
            <UButton label="Go to Workspaces" color="primary" to="/app/workspaces" icon="i-lucide-arrow-left" />
        </div>
    </UContainer>
</template>
