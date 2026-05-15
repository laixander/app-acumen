<script setup lang="ts">
import type { SessionReadyProps } from '~/types/session'

defineProps<SessionReadyProps>()

defineEmits(['start'])
</script>

<template>
    <div
        class="p-8 md:p-16 flex flex-col items-center justify-center gap-12 min-h-[400px] animate-fade-in bg-gradient-to-b from-white to-neutral-50/50 dark:from-neutral-900 dark:to-neutral-900/50">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-5xl">
            <AppSessionReadyCard label="Topic" :value="topicName" icon="i-lucide-book" />
            <AppSessionReadyCard label="Module" :value="moduleTitle" icon="i-lucide-layout" />
            <AppSessionReadyCard label="Difficulty" :value="difficulty" icon="i-lucide-bar-chart" />
            <AppSessionReadyCard label="Duration" :value="duration" icon="i-lucide-clock" />
        </div>

        <UButton label="Begin Session" trailing-icon="i-lucide-arrow-right" size="xl" color="primary"
            class="rounded-full px-16 py-5 uppercase text-sm font-semibold tracking-[0.2em] hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30"
            @click="$emit('start')" />
    </div>
</template>
