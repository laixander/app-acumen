<script setup lang="ts">
defineProps<{ title?: string }>()
defineEmits<{
    (e: 'download', filename: string): void
}>()
</script>
<template>
    <UCard :ui="{ body: 'p-5 flex flex-col gap-3' }"
        class="bg-primary-100 ring-primary-200 dark:ring-primary-900 dark:bg-primary-900/20">
        <div class="flex items-center gap-2 mb-1 text-primary">
            <UIcon name="i-lucide-brain-circuit" />
            <h3 class="text-sm font-semibold uppercase tracking-wider">AI Context</h3>
        </div>
        <p class="text-xs text-primary/50 mb-2">
            This syllabus was dynamically generated from your uploaded materials.
        </p>

        <div class="flex flex-col gap-2">
            <UCard :ui="{ body: 'flex items-center justify-between gap-2 p-2 sm:p-2' }"
                class="rounded-md shadow-sm group/file hover:bg-white dark:hover:bg-primary-800 transition-colors cursor-pointer"
                @click="$emit('download', `${title || 'Course'} Chapter 1-3.pdf`)">
                <div class="flex items-center gap-2 min-w-0">
                    <UIcon name="i-lucide-file-text" class="text-red-500 shrink-0" />
                    <span class="text-xs font-medium truncate">{{ title || 'Course' }} Chapter 1-3.pdf</span>
                </div>
                <UButton icon="i-lucide-download" variant="ghost" size="xs"
                    class="opacity-0 group-hover/file:opacity-100 transition-opacity shrink-0" />
            </UCard>
            <UCard :ui="{ body: 'flex items-center justify-between gap-2 p-2 sm:p-2' }"
                class="rounded-md shadow-sm group/file hover:bg-white dark:hover:bg-primary-800 transition-colors cursor-pointer"
                @click="$emit('download', 'Lecture_Deck_Final.pptx')">
                <div class="flex items-center gap-2 min-w-0">
                    <UIcon name="i-lucide-presentation" class="text-orange-500 shrink-0" />
                    <span class="text-xs font-medium truncate">Lecture_Deck_Final.pptx</span>
                </div>
                <UButton icon="i-lucide-download" variant="ghost" size="xs"
                    class="opacity-0 group-hover/file:opacity-100 transition-opacity shrink-0" />
            </UCard>
        </div>
    </UCard>
</template>
