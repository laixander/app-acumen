<script setup lang="ts">
import { useTopics } from '~/composables/useTopics'
import type { Topic } from '~/types/topic'
import { GOAL_COLORS } from '~/constants/topics'

const props = withDefaults(defineProps<{
    topic: Topic
    showActions?: boolean
    isHero?: boolean
}>(), {
    showActions: true,
    isHero: false
})

const { togglePin, archiveTopic, deleteTopic, renameTopic } = useTopics()
const toast = useToast()

const isRenameOpen = ref(false)
const isArchiveOpen = ref(false)
const isDeleteOpen = ref(false)
const newTitle = ref(props.topic.title)

const handleRename = () => {
    if (newTitle.value && newTitle.value !== props.topic.title) {
        renameTopic(props.topic.id, newTitle.value)
        isRenameOpen.value = false
        toast.add({
            title: 'Topic Renamed',
            description: `Successfully renamed to ${newTitle.value}`,
            color: 'success'
        })
    }
}

const handleArchive = () => {
    archiveTopic(props.topic.id)
    isArchiveOpen.value = false
    toast.add({
        title: 'Topic Archived',
        description: 'This topic has been moved to archives.',
        color: 'neutral'
    })
}

const handleDelete = () => {
    deleteTopic(props.topic.id)
    isDeleteOpen.value = false
    toast.add({
        title: 'Topic Deleted',
        description: 'The topic has been removed from your library.',
        color: 'success'
    })
}

const actions = computed(() => [
    [{
        label: 'Rename',
        icon: 'i-lucide-pencil',
        onSelect: () => {
            newTitle.value = props.topic.title
            isRenameOpen.value = true
        }
    }, {
        label: 'Archive',
        icon: 'i-lucide-archive',
        onSelect: () => {
            isArchiveOpen.value = true
        }
    }],
    [{
        label: 'Delete',
        icon: 'i-lucide-trash',
        color: 'red' as const,
        onSelect: () => {
            isDeleteOpen.value = true
        }
    }]
])
</script>

<template>
    <UCard variant="subtle"
        class="transition-all duration-300 hover:-translate-y-1.5 hover:ring-2 hover:ring-primary-500/50 cursor-pointer overflow-hidden group shadow-sm hover:shadow-xl dark:shadow-none"
        :class="{ 'border-primary-500/30': topic.isPinned }" :ui="{
            header: 'p-0 sm:p-0 relative',
            body: isHero ? 'p-6' : ''
        }" @click="navigateTo(`/app/topics/${topic.id || topic.title.toLowerCase().replace(/\s+/g, '-')}`)">
        <template #header>
            <div class="relative aspect-video overflow-hidden">
                <Placeholder class="h-full" />
                <!-- Mesh Gradient Overlay -->
                <div
                    class="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-transparent pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity" />

                <div class="absolute top-4 left-4 flex gap-2">
                    <div class="bg-primary/20 backdrop-blur-md p-2 rounded-xl relative">
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
                            class="shadow-sm rounded-full bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm"
                            @click.stop />
                    </UDropdownMenu>
                </div>
            </div>
        </template>

        <div class="flex flex-col">
            <div class="flex items-center gap-4 w-full">
                <div class="flex-1 min-w-0">
                    <div class="flex items-center justify-between w-fit gap-2">
                        <span class="font-semibold truncate" :class="{ 'text-neutral-400': topic.status === 'Archived' }">{{ topic.title }}</span>
                        <div class="flex items-center gap-1.5 shrink-0">
                            <UBadge v-if="topic.status === 'Archived'" label="Archived" color="neutral" variant="subtle" size="sm" />
                            <UBadge :label="topic.tag" variant="soft" size="sm" />
                        </div>
                    </div>
                    <!-- <div class="flex items-center gap-3">
                        <UProgress :model-value="topic.progress" size="xs" color="primary" class="flex-1" />
                        <span class="text-xs font-semibold text-primary shrink-0">
                            {{ topic.progress }}%
                        </span>
                    </div> -->
                </div>
            </div>

            <!-- Grid View Meta -->
            <!-- <div class="flex items-center justify-between mt-4">
                <div class="flex items-center gap-4 text-xs text-dimmed">
                    <span class="flex items-center gap-1">
                        <UIcon name="i-lucide-book-open" class="size-4" /> {{ topic.lessons }} lessons
                    </span>
                    <span class="flex items-center gap-1">
                        <UIcon name="i-lucide-clock" class="size-4" /> {{ topic.lastStudied }}
                    </span>
                </div>
                <UBadge v-if="topic.learningGoal" :label="topic.learningGoal" variant="subtle" size="sm"
                    :color="GOAL_COLORS[topic.learningGoal]" class="shrink-0" />
            </div> -->

            <!-- Grid View Workspace/Creator Meta -->
            <div v-if="topic.createdBy" class="mt-4 flex items-center justify-between">
                <div class="flex items-center gap-2">
                    <UAvatar :src="topic.createdBy.avatar" :alt="topic.createdBy.name" size="xs"
                        class="ring-1 ring-neutral-200 dark:ring-neutral-800" />
                    <div class="flex flex-col">
                        <span
                            class="text-[9px] text-neutral-400 font-bold uppercase tracking-wider leading-none mb-0.5">Author</span>
                        <span class="text-[10px] text-neutral-700 dark:text-neutral-300 font-medium leading-none">{{
                            topic.createdBy.name }}</span>
                    </div>
                </div>

                <!-- <div class="flex items-center gap-3">
                    <UTooltip text="Studying">
                        <div v-if="topic.viewersCount"
                            class="flex items-center gap-1 text-neutral-400 dark:text-neutral-500">
                            <UIcon name="i-lucide-eye" class="size-4" />
                            <span class="text-xs">{{ topic.viewersCount }}</span>
                        </div>
                    </UTooltip>
                    <UTooltip text="Completed">
                        <div v-if="topic.completedCount"
                            class="flex items-center gap-1 text-neutral-400 dark:text-neutral-500">
                            <UIcon name="i-lucide-flag" class="size-4" />
                            <span class="text-xs">{{ topic.completedCount }}</span>
                        </div>
                    </UTooltip>
                </div> -->
            </div>
        </div>
    </UCard>
    
    <!-- Rename Modal -->
    <UModal v-model:open="isRenameOpen">
        <template #content>
            <div class="p-6 flex flex-col gap-6">
                <div class="flex items-center gap-4">
                    <div class="w-12 h-12 rounded-full flex items-center justify-center shrink-0 bg-primary-50 dark:bg-primary-950/30 text-primary-600">
                        <UIcon name="i-lucide-pencil" class="text-2xl" />
                    </div>
                    <div>
                        <h3 class="text-xl font-bold leading-tight">Rename Topic</h3>
                        <p class="text-sm text-neutral-500 mt-1">Change the display name of your study topic.</p>
                    </div>
                </div>

                <UFormField label="New Title" name="title">
                    <UInput v-model="newTitle" placeholder="e.g. Advanced Vue.js Patterns" class="w-full" size="lg" autofocus @keyup.enter="handleRename" />
                </UFormField>

                <div class="flex items-center justify-end gap-3 pt-2">
                    <UButton label="Cancel" variant="ghost" color="neutral" @click="isRenameOpen = false" />
                    <UButton label="Save Changes" color="primary" @click="handleRename" />
                </div>
            </div>
        </template>
    </UModal>

    <!-- Archive Confirmation Modal -->
    <UModal v-model:open="isArchiveOpen">
        <template #content>
            <div class="p-6 flex flex-col gap-6">
                <div class="flex items-center gap-4">
                    <div class="w-12 h-12 rounded-full flex items-center justify-center shrink-0 bg-warning-50 dark:bg-warning-950/30 text-warning-600">
                        <UIcon name="i-lucide-archive" class="text-2xl" />
                    </div>
                    <div>
                        <h3 class="text-xl font-bold leading-tight">Archive Topic?</h3>
                        <p class="text-sm text-neutral-500 mt-1">This will hide it from your active dashboard.</p>
                    </div>
                </div>

                <p class="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    Are you sure you want to archive <span class="font-bold text-neutral-900 dark:text-white">"{{ topic.title }}"</span>? You can still find it later in the Archived tab.
                </p>

                <div class="flex items-center justify-end gap-3 pt-2">
                    <UButton label="Cancel" variant="ghost" color="neutral" @click="isArchiveOpen = false" />
                    <UButton label="Archive Topic" color="warning" @click="handleArchive" />
                </div>
            </div>
        </template>
    </UModal>

    <!-- Delete Confirmation Modal -->
    <UModal v-model:open="isDeleteOpen">
        <template #content>
            <div class="p-6 flex flex-col gap-6">
                <div class="flex items-center gap-4">
                    <div class="w-12 h-12 rounded-full flex items-center justify-center shrink-0 bg-error-50 dark:bg-error-950/30 text-error-600">
                        <UIcon name="i-lucide-alert-triangle" class="text-2xl" />
                    </div>
                    <div>
                        <h3 class="text-xl font-bold leading-tight">Delete Topic?</h3>
                        <p class="text-sm text-neutral-500 mt-1">This action cannot be undone.</p>
                    </div>
                </div>

                <p class="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    Are you sure you want to delete <span class="font-bold text-neutral-900 dark:text-white">"{{ topic.title }}"</span>? All associated lessons and progress will be permanently removed.
                </p>

                <div class="flex items-center justify-end gap-3 pt-2">
                    <UButton label="Cancel" variant="ghost" color="neutral" @click="isDeleteOpen = false" />
                    <UButton label="Delete Topic" color="error" @click="handleDelete" />
                </div>
            </div>
        </template>
    </UModal>
</template>
