<script setup lang="ts">
import { computed } from 'vue'
import { GOAL_OPTIONS } from '~/constants/goal'

const props = defineProps<{ goal?: string }>()

const activeGoal = computed(() => {
    const defaultGoal = GOAL_OPTIONS[0]!
    if (!props.goal) return defaultGoal
    return GOAL_OPTIONS.find(g => g.id === props.goal) || defaultGoal
})
</script>
<template>
    <UCard variant="soft" :ui="{ body: 'p-5 flex flex-col gap-3' }">
        <div class="flex items-center justify-between">
            <span class="text-sm font-semibold uppercase tracking-wider text-muted">
                Learning Goal
            </span>
        </div>

        <div class="flex items-start gap-3">
            <div class="p-2 rounded-lg bg-primary-100 text-primary-600 dark:bg-primary-900/50 dark:text-primary-400 shrink-0">
                <UIcon :name="activeGoal.icon" class="text-xl flex" />
            </div>
            <div class="flex flex-col">
                <span class="font-bold text-sm text-neutral-900 dark:text-neutral-100">{{ activeGoal.label }}</span>
                <span class="text-xs text-neutral-500 mt-0.5 leading-relaxed">{{ activeGoal.description }}</span>
            </div>
        </div>
    </UCard>
</template>
