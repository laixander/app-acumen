<script setup lang="ts">
const searchQuery = ref('')
const selectedTag = ref('All')
const currentStatus = ref('All')
const viewMode = ref<'grid' | 'list'>('grid')
const sortBy = ref('Recent')

const tags = ['All', 'Math', 'History', 'Science', 'Language', 'English']
const statuses = ['All', 'Ongoing', 'Completed', 'Archived']
const sortOptions = ['Recent', 'Progress', 'Alphabetical']

const topics = ref([
    { title: 'Introduction to Algebra', progress: 80, tag: 'Math', status: 'Ongoing', lessons: '10/12', lastStudied: '2 hrs ago', icon: 'i-lucide-function-square' },
    { title: 'World War II Overview', progress: 55, tag: 'History', status: 'Ongoing', lessons: '6/11', lastStudied: '1 day ago', icon: 'i-lucide-landmark' },
    { title: "Newton's Laws of Motion", progress: 30, tag: 'Science', status: 'Ongoing', lessons: '3/10', lastStudied: '3 days ago', icon: 'i-lucide-microscope' },
    { title: 'Spanish Basics', progress: 65, tag: 'Language', status: 'Ongoing', lessons: '8/12', lastStudied: 'Yesterday', icon: 'i-lucide-languages' },
    { title: 'Reading Comprehension', progress: 90, tag: 'English', status: 'Completed', lessons: '9/10', lastStudied: 'Just now', icon: 'i-lucide-book-open' },
])

const filteredTopics = computed(() => {
    return topics.value
        .filter(topic => {
            const matchesSearch = topic.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                topic.tag.toLowerCase().includes(searchQuery.value.toLowerCase())
            const matchesTag = selectedTag.value === 'All' || topic.tag === selectedTag.value
            const matchesStatus = currentStatus.value === 'All' || topic.status === currentStatus.value
            return matchesSearch && matchesTag && matchesStatus
        })
        .sort((a, b) => {
            if (sortBy.value === 'Progress') return b.progress - a.progress
            if (sortBy.value === 'Alphabetical') return a.title.localeCompare(b.title)
            return 0 // 'Recent' is default (already roughly sorted)
        })
})

const topicActions = (topic: any) => [
    [{
        label: 'Rename',
        icon: 'i-lucide-pencil'
    }, {
        label: 'Archive',
        icon: 'i-lucide-archive'
    }],
    [{
        label: 'Delete',
        icon: 'i-lucide-trash',
        color: 'red' as const
    }]
]
</script>

<template>
    <ContentPanel title="My Topics">
        <template #toolbar>
            <div class="flex items-center justify-between w-full gap-4 overflow-x-auto pb-2 sm:pb-0">
                <div class="flex items-center gap-2">
                    <UInput v-model="searchQuery" icon="i-lucide-search" placeholder="Search topics..." class="w-64" />
                    <USeparator orientation="vertical" class="mx-2 h-6" />
                    <div class="flex items-center gap-1">
                        <UButton v-for="tag in tags" :key="tag" :label="tag"
                            :variant="selectedTag === tag ? 'solid' : 'ghost'" color="neutral" size="xs"
                            @click="selectedTag = tag" />
                    </div>
                </div>
                <div class="flex items-center gap-2 shrink-0">
                    <USelectMenu v-model="sortBy" :options="sortOptions" size="sm" class="w-32">
                        <template #leading>
                            <UIcon name="i-lucide-list-filter" class="size-4" />
                        </template>
                    </USelectMenu>
                    <USeparator orientation="vertical" class="mx-2 h-6" />
                    <div class="flex items-center bg-neutral-100 dark:bg-neutral-800 p-0.5 rounded-lg">
                        <UButton :icon="viewMode === 'grid' ? 'i-lucide-layout-grid' : 'i-lucide-layout-list'"
                            variant="ghost" color="neutral" size="xs"
                            @click="viewMode = viewMode === 'grid' ? 'list' : 'grid'" />
                    </div>
                    <UButton label="New Topic" icon="i-lucide-plus" color="primary" size="sm" class="ml-2" />
                </div>
            </div>
        </template>

        <div class="w-full lg:max-w-6xl mx-auto flex flex-col gap-6">
            <!-- Status Tabs -->
            <div class="flex items-center gap-4 border-b border-neutral-200 dark:border-neutral-800">
                <button v-for="status in statuses" :key="status"
                    class="px-4 py-2 text-sm font-medium transition-colors relative"
                    :class="currentStatus === status ? 'text-primary' : 'text-dimmed hover:text-neutral-900 dark:hover:text-white'"
                    @click="currentStatus = status">
                    {{ status }}
                    <div v-if="currentStatus === status"
                        class="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
                </button>
            </div>

            <TransitionGroup v-if="filteredTopics.length > 0" tag="div"
                :class="[viewMode === 'grid' ? 'grid lg:grid-cols-3 gap-4' : 'flex flex-col gap-3']"
                move-class="transition-all duration-500" enter-active-class="transition-all duration-300 ease-out"
                enter-from-class="opacity-0 translate-y-4"
                leave-active-class="transition-all duration-200 ease-in absolute" leave-to-class="opacity-0 scale-95">

                <!-- TO DO: make this card a component that has a list layout feature -->
                <UCard v-for="topic in filteredTopics" :key="topic.title" variant="subtle"
                    class="transition-all duration-300 hover:-translate-y-1.5 hover:ring-2 hover:ring-primary-500/50 cursor-pointer overflow-hidden group shadow-sm hover:shadow-xl dark:shadow-none"
                    :ui="{ header: 'p-0 sm:p-0 relative', body: viewMode === 'list' ? 'p-3 sm:p-4' : '' }">
                    <template #header v-if="viewMode === 'grid'">
                        <div class="relative aspect-video overflow-hidden">
                            <Placeholder class="h-full" />
                            <!-- Mesh Gradient Overlay -->
                            <div
                                class="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-transparent pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity" />

                            <div
                                class="absolute top-4 left-4 bg-primary/10 backdrop-blur-md p-2 rounded-xl border border-primary/20">
                                <UIcon :name="topic.icon" class="text-xl text-primary flex shrink-0" />
                            </div>

                            <div
                                class="absolute top-4 right-4 flex gap-1 transform translate-y-1 opacity-100 group-hover:translate-y-0 transition-all duration-300">
                                <UDropdownMenu :items="topicActions(topic)" :content="{
                                    align: 'end',
                                    side: 'bottom',
                                    sideOffset: 8
                                }">
                                    <UButton icon="i-lucide-more-horizontal" color="neutral" variant="ghost" size="xs"
                                        class="shadow-sm rounded-full bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm" />
                                </UDropdownMenu>
                            </div>
                        </div>
                    </template>

                    <div :class="[viewMode === 'list' ? 'flex items-center gap-4' : 'flex flex-col']">
                        <!-- List View Icon -->
                        <div v-if="viewMode === 'list'" class="bg-primary/10 p-2 rounded-lg shrink-0">
                            <UIcon :name="topic.icon" class="text-xl text-primary flex" />
                        </div>
                        <div class="flex items-center gap-4 w-full">
                            <div class="flex-1 min-w-0">
                                <div class="flex items-center justify-between w-fit">
                                    <span class="text-sm font-medium truncate">{{ topic.title }}</span>
                                    <UBadge :label="topic.tag" variant="soft" size="sm" class="ml-2 shrink-0" />
                                </div>
                                <div class="flex items-center gap-3">
                                    <UProgress :model-value="topic.progress" size="xs" color="primary" class="flex-1" />
                                    <span class="text-xs font-semibold text-primary shrink-0">
                                        {{ topic.progress }}%
                                    </span>
                                </div>
                            </div>
                            <UButton icon="i-lucide-play" color="primary" variant="ghost" size="sm" />
                        </div>

                        <div v-if="viewMode === 'grid'" class="flex items-center justify-between">
                            <div class="flex items-center gap-4 text-xs text-dimmed mt-4">
                                <span class="flex items-center gap-1">
                                    <UIcon name="i-lucide-book-open" class="size-4" /> {{ topic.lessons }} lessons
                                </span>
                                <span class="flex items-center gap-1">
                                    <UIcon name="i-lucide-clock" class="size-4" /> {{ topic.lastStudied }}
                                </span>
                            </div>
                        </div>

                        <!-- List View Meta -->
                        <div v-if="viewMode === 'list'"
                            class="hidden md:flex items-center gap-6 text-xs text-dimmed shrink-0">
                            <USeparator orientation="vertical" class="mx-2 h-6" />
                            <span class="flex flex-col">
                                <span
                                    class="text-[10px] uppercase tracking-wider font-semibold opacity-50">Lessons</span>
                                <span class="text-neutral-900 dark:text-white">{{ topic.lessons }}</span>
                            </span>
                            <span class="flex flex-col">
                                <span class="text-[10px] uppercase tracking-wider font-semibold opacity-50">Last
                                    Studied</span>
                                <span class="text-neutral-900 dark:text-white">{{ topic.lastStudied }}</span>
                            </span>
                            <div class="flex items-center gap-2 shrink-0">
                                <UDropdownMenu :items="topicActions(topic)" :content="{
                                    align: 'end',
                                    side: 'bottom',
                                    sideOffset: 8
                                }">
                                    <UButton icon="i-lucide-more-vertical" color="neutral" variant="ghost" size="xs" />
                                </UDropdownMenu>
                            </div>
                        </div>
                    </div>
                </UCard>
            </TransitionGroup>

            <!-- Empty State -->
            <div v-else
                class="flex flex-col items-center justify-center py-20 px-4 text-center bg-neutral-50 dark:bg-neutral-900/50 rounded-2xl border-2 border-dashed border-neutral-200 dark:border-neutral-800">
                <div class="bg-primary/10 p-4 rounded-full mb-4">
                    <UIcon name="i-lucide-search-x" class="flex text-4xl text-primary" />
                </div>
                <h3 class="text-lg font-bold">No topics found</h3>
                <p class="text-dimmed max-w-xs mt-1">
                    We couldn't find any topics matching your current filters. Try adjusting them!
                </p>
                <div class="flex items-center gap-3 mt-6">
                    <UButton label="Clear Filters" color="neutral" variant="ghost"
                        @click="searchQuery = ''; selectedTag = 'All'; currentStatus = 'All'" />
                </div>
            </div>
        </div>
    </ContentPanel>
</template>