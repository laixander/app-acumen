<script setup lang="ts">
defineProps<{ 
    progress: number
    masteryGap: number
    passingRate: number
}>()
</script>
<template>
    <UCard variant="soft" :ui="{ body: 'p-5 flex flex-col gap-4' }">
        <div>
            <div class="flex items-center justify-between mb-2">
                <span class="text-sm font-semibold uppercase tracking-wider text-muted">Overall Progress</span>
                <span class="text-sm font-bold text-primary">{{ progress }}%</span>
            </div>
            <UProgress :model-value="progress" color="primary" size="sm" />
        </div>
        <div class="text-xs text-dimmed flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <div class="flex items-center gap-1">
                <span class="text-primary font-bold">{{ masteryGap }}%</span> more to mastery!
            </div>
            <UIcon name="i-lucide-dot" class="size-4 hidden sm:block" />
            <div class="flex items-center gap-1">
                <span class="text-primary font-bold">{{ passingRate }}%</span> passing rate
            </div>
        </div>
    </UCard>
</template>
