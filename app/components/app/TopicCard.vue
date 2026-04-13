<script setup lang="ts">
import { useTopics } from '~/composables/useTopics'
export interface Topic {
    title: string
    progress: number
    tag: string
    status: string
    lessons: string
    lastStudied: string
    lastStudiedAt: number
    icon: string
    isPinned: boolean
}

const props = withDefaults(defineProps<{
    topic: Topic
    viewMode?: 'grid' | 'list'
    showActions?: boolean
    isHero?: boolean
}>(), {
    viewMode: 'grid',
    showActions: true,
    isHero: false
})

const { togglePin, updateLastStudied } = useTopics()

const actions = [
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
    <UCard variant="subtle"
        class="transition-all duration-300 hover:-translate-y-1.5 hover:ring-2 hover:ring-primary-500/50 cursor-pointer overflow-hidden group shadow-sm hover:shadow-xl dark:shadow-none"
        :class="{ 'border-primary-500/30': topic.isPinned }" :ui="{
            header: 'p-0 sm:p-0 relative',
            body: viewMode === 'list' ? 'p-3 sm:p-4' : (isHero ? 'p-6' : '')
        }">
        <template #header v-if="viewMode === 'grid'">
            <div class="relative aspect-video overflow-hidden">
                <Placeholder class="h-full" />
                <!-- Mesh Gradient Overlay -->
                <div
                    class="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-transparent pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity" />

                <div class="absolute top-4 left-4 flex gap-2">
                    <div class="bg-primary/20 backdrop-blur-md p-2 rounded-xl">
                        <UIcon :name="topic.icon" class="text-xl text-primary flex shrink-0" />
                    </div>
                </div>

                <div
                    class="absolute top-4 right-4 flex gap-2 transform translate-y-1 opacity-100 transition-all duration-300">
                    <UButton :icon="topic.isPinned ? 'i-lucide-pin' : 'i-lucide-pin-off'"
                        :variant="topic.isPinned ? 'soft' : 'ghost'" :color="topic.isPinned ? 'primary' : 'neutral'"
                        size="xs" class="shadow-sm rounded-full bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm"
                        @click.stop="togglePin(topic.title)" />
                    <UDropdownMenu v-if="showActions" :items="actions" :content="{
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
            <div v-if="viewMode === 'list' && !isHero" class="bg-primary/10 p-2 rounded-lg shrink-0">
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

                <UButton icon="i-lucide-play" color="primary" variant="ghost" size="sm"
                    @click.stop="updateLastStudied(topic.title)" />
            </div>
            <!-- Grid View Meta -->
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
            <div v-if="viewMode === 'list'" class="hidden md:flex items-center gap-6 shrink-0">
                <USeparator orientation="vertical" class="mx-2 h-6" />
                <span class="flex flex-col">
                    <span class="text-[10px] text-dimmed/80 font-semibold uppercase tracking-wider">Lessons</span>
                    <span class="text-xs">{{ topic.lessons }}</span>
                </span>
                <span class="flex flex-col">
                    <span class="text-[10px] text-dimmed/80 font-semibold uppercase tracking-wider">Last Studied</span>
                    <span class="text-xs">{{ topic.lastStudied }}</span>
                </span>
                <div class="flex items-center gap-2 shrink-0">
                    <UButton :icon="topic.isPinned ? 'i-lucide-pin' : 'i-lucide-pin-off'"
                        :variant="topic.isPinned ? 'soft' : 'ghost'" color="primary" size="xs" class="rounded-full"
                        @click.stop="togglePin(topic.title)" />
                    <UDropdownMenu v-if="showActions" :items="actions" :content="{
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
</template>
