<script setup lang="ts">
defineProps<{
    topicName: string
    moduleTitle: string
    difficulty: string
    duration: string
}>()

defineEmits(['start'])
</script>

<template>
    <div class="p-8 md:p-16 flex flex-col items-center justify-center gap-12 min-h-[400px] animate-fade-in bg-gradient-to-b from-white to-neutral-50/50 dark:from-neutral-900 dark:to-neutral-900/50">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-5xl">
            <!-- Card 1 -->
            <div class="bg-white dark:bg-neutral-900 ring-1 ring-neutral-200 dark:ring-neutral-800 rounded-2xl p-8 flex flex-col items-center justify-center gap-4 text-center shadow-sm">
                <span class="text-[10px] tracking-[0.2em] uppercase text-neutral-500 dark:text-neutral-400 font-semibold">Topic</span>
                <span class="text-xl font-bold leading-tight text-primary">{{ topicName }}</span>
            </div>
            <!-- Card 2 -->
            <div class="bg-white dark:bg-neutral-900 ring-1 ring-neutral-200 dark:ring-neutral-800 rounded-2xl p-8 flex flex-col items-center justify-center gap-4 text-center shadow-sm">
                <span class="text-[10px] tracking-[0.2em] uppercase text-neutral-500 dark:text-neutral-400 font-semibold">Module</span>
                <span class="text-xl font-bold leading-tight text-primary">{{ moduleTitle }}</span>
            </div>
            <!-- Card 3 -->
            <div class="bg-white dark:bg-neutral-900 ring-1 ring-neutral-200 dark:ring-neutral-800 rounded-2xl p-8 flex flex-col items-center justify-center gap-4 text-center shadow-sm">
                <span class="text-[10px] tracking-[0.2em] uppercase text-neutral-500 dark:text-neutral-400 font-semibold">Difficulty</span>
                <span class="text-xl font-bold leading-tight text-primary">{{ difficulty }}</span>
            </div>
            <!-- Card 4 -->
            <div class="bg-white dark:bg-neutral-900 ring-1 ring-neutral-200 dark:ring-neutral-800 rounded-2xl p-8 flex flex-col items-center justify-center gap-4 text-center shadow-sm">
                <span class="text-[10px] tracking-[0.2em] uppercase text-neutral-500 dark:text-neutral-400 font-semibold">Duration</span>
                <span class="text-xl font-bold leading-tight text-primary">{{ duration }}</span>
            </div>
        </div>

        <UButton 
            label="Begin Session" 
            trailing-icon="i-lucide-arrow-right"
            size="xl" 
            color="primary"
            class="rounded-full px-16 py-5 uppercase text-sm font-semibold tracking-[0.2em] hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30" 
            @click="$emit('start')"
        />
    </div>
</template>
