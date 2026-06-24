<script setup lang="ts">
defineProps<{ 
    targetFinishDate?: number | string,
    sessionsPerWeek?: number,
    itemsPerWeek?: number
}>()
</script>
<template>
    <UCard variant="soft" :ui="{ body: 'p-5 flex flex-col gap-4' }">
        <div class="flex items-center justify-between">
            <span class="text-sm font-semibold uppercase tracking-wider text-muted">
                Schedule & Targets
            </span>
        </div>
        <div class="flex flex-col gap-3">
            <div class="flex items-center justify-between gap-4">
                <div class="flex items-center gap-2 text-dimmed">
                    <UIcon name="i-lucide-calendar-clock" class="size-4 text-primary-500" />
                    <span class="text-xs font-medium">Target Date</span>
                </div>
                <USeparator class="flex-1" />
                <span class="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                    {{ targetFinishDate ? new Date(targetFinishDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : 'Not set' }}
                </span>
            </div>
            <div class="flex items-center justify-between gap-4">
                <div class="flex items-center gap-2 text-dimmed">
                    <UIcon name="i-lucide-calendar-days" class="size-4 text-orange-500" />
                    <span class="text-xs font-medium">Sessions / Week</span>
                </div>
                <USeparator class="flex-1" />
                <span class="text-sm font-bold text-neutral-900 dark:text-neutral-100">{{ sessionsPerWeek || 'Not set' }}</span>
            </div>
            <div class="flex items-center justify-between gap-4">
                <div class="flex items-center gap-2 text-dimmed">
                    <UIcon name="i-lucide-layers" class="size-4 text-purple-500" />
                    <span class="text-xs font-medium">Items / Week</span>
                </div>
                <USeparator class="flex-1" />
                <span class="text-sm font-bold text-neutral-900 dark:text-neutral-100">{{ itemsPerWeek || 'Not set' }}</span>
            </div>
        </div>
    </UCard>
</template>
