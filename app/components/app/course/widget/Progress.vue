<script setup lang="ts">
defineProps<{ progress: number }>()
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
        <p class="text-xs text-dimmed">Keep up the momentum to reach your goal.</p>
    </UCard>
</template>
