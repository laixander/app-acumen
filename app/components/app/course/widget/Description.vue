<script setup lang="ts">
defineProps<{ description?: string }>()
</script>
<template>
    <UCard variant="soft" :ui="{ body: 'p-5 flex flex-col' }">
        <div class="flex items-center justify-between mb-2">
            <span class="text-sm font-semibold uppercase tracking-wider text-muted">
                Description
            </span>
        </div>
        <div class="flex flex-wrap gap-2">
            <p class="text-xs text-dimmed">{{ description || 'No description provided.' }}</p>
        </div>
    </UCard>
</template>
