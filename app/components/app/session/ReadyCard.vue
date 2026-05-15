<script setup lang="ts">
import type { ReadyCardProps } from '~/types/session'

defineProps<ReadyCardProps>()
</script>

<template>
    <UCard variant="soft" class="bg-neutral-800 dark:bg-neutral-950/50 rounded-2xl relative overflow-hidden group"
        :ui="{ body: 'p-6 sm:p-8 flex flex-col items-center justify-center gap-4 text-center' }">

        <div v-if="icon" class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-1">
            <UIcon :name="icon" class="w-5 h-5 text-primary" />
        </div>

        <div class="flex flex-col gap-1">
            <span class="text-[10px] tracking-[0.2em] uppercase text-dimmed font-semibold">{{ label }}</span>
            <span class="text-xl font-bold leading-tight text-primary">{{ value }}</span>
        </div>
    </UCard>
</template>