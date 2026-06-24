<script setup lang="ts">
defineProps<{ 
    author: {
        name: string
        avatar?: string
        role?: string
    }
    courseCount: number
}>()
</script>
<template>
    <UCard variant="soft" :ui="{ body: 'p-5 flex flex-col gap-4' }">
        <div class="flex items-center justify-between">
            <span class="text-xs font-semibold uppercase tracking-wider text-muted">
                Curated By
            </span>
        </div>
        <div class="flex items-center justify-between gap-4">
            <div class="flex items-center gap-3">
                <UAvatar :src="author.avatar" :alt="author.name"
                    size="md" class="ring-2 ring-primary-500/20" />
                <div class="flex flex-col">
                    <span
                        class="text-sm font-bold text-neutral-900 dark:text-neutral-100 leading-tight">
                        {{ author.name }}
                    </span>
                    <span
                        class="text-[10px] text-primary-500 font-semibold uppercase tracking-wider mt-0.5">
                        {{ author.role }}
                    </span>
                </div>
            </div>

            <div
                class="flex items-center gap-4 shrink-0 border-l border-neutral-200 dark:border-neutral-700 pl-4">
                <div class="flex flex-col items-center">
                    <span
                        class="text-[10px] font-bold text-neutral-900 dark:text-neutral-100">
                        {{ courseCount }}
                    </span>
                    <span class="text-[8px] text-neutral-400 font-bold uppercase">Courses</span>
                </div>
            </div>
        </div>
    </UCard>
</template>
