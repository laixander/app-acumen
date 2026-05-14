<script setup lang="ts">
import type { SessionCompleteData } from '~/types/session'

defineProps<SessionCompleteData>()

defineEmits(['close', 'view-plan'])
</script>


<template>
    <div class="p-8 md:p-16 flex flex-col items-center justify-center text-center gap-10 animate-fade-in bg-white dark:bg-neutral-900 min-h-[500px]">
        <div class="flex flex-col items-center gap-6">
            <div class="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <UIcon name="i-lucide-award" class="w-10 h-10 text-primary" />
            </div>
            <div class="flex flex-col gap-2">
                <span class="text-[10px] tracking-[0.4em] uppercase font-bold text-primary">Session Complete</span>
                <h2 class="text-4xl font-bold tracking-tight text-neutral-900 dark:text-white">Great job!</h2>
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            <!-- Card 1: What you did well -->
            <div class="flex flex-col gap-6 p-8 rounded-4xl bg-green-50/50 dark:bg-green-900/10 border border-green-100 dark:border-green-900/20 shadow-sm transition-all duration-500 animate-fade-in text-left">
                <div class="flex items-center gap-3 text-[10px] tracking-widest uppercase font-bold text-green-600 dark:text-green-400">
                    <UIcon name="i-lucide-trending-up" class="w-4 h-4" />
                    <span>What you did well</span>
                </div>
                <p class="text-lg font-medium text-neutral-800 dark:text-neutral-200 leading-relaxed">
                    {{ whatYouDidWell }}
                </p>
            </div>

            <!-- Card 2: Where you struggled -->
            <div class="flex flex-col gap-6 p-8 rounded-4xl bg-amber-50/50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/20 shadow-sm transition-all duration-500 animate-fade-in [animation-delay:100ms] text-left">
                <div class="flex items-center gap-3 text-[10px] tracking-widest uppercase font-bold text-amber-600 dark:text-amber-400">
                    <UIcon name="i-lucide-trending-down" class="w-4 h-4" />
                    <span>Where you struggled</span>
                </div>
                <p class="text-lg font-medium text-neutral-800 dark:text-neutral-200 leading-relaxed">
                    {{ whereYouStruggled }}
                </p>
            </div>

            <!-- Card 3: Mastery Profile Updated -->
            <div class="flex flex-col gap-6 p-8 rounded-4xl bg-primary-50/50 dark:bg-primary-900/10 border border-primary-100 dark:border-primary-900/20 shadow-sm transition-all duration-500 animate-fade-in [animation-delay:200ms] text-left">
                <div class="flex items-center gap-3 text-[10px] tracking-widest uppercase font-bold text-primary">
                    <UIcon name="i-lucide-zap" class="w-4 h-4" />
                    <span>Mastery profile updated</span>
                </div>

                <div class="flex flex-col gap-4">
                    <div class="text-sm font-bold text-neutral-500 dark:text-neutral-400">
                        {{ moduleTitle }}
                    </div>
                    <div class="flex items-end gap-4">
                        <div class="flex flex-col gap-1">
                            <span class="text-[10px] uppercase text-neutral-400">Before</span>
                            <span class="text-2xl font-bold text-neutral-400 line-through">{{ passProbBefore }}</span>
                        </div>
                        <UIcon name="i-lucide-arrow-right" class="w-6 h-6 mb-1 text-primary" />
                        <div class="flex flex-col gap-1">
                            <span class="text-[10px] uppercase text-primary">After</span>
                            <span class="text-4xl font-bold text-primary">{{ passProbAfter }}</span>
                        </div>
                    </div>
                    <div class="flex items-center gap-2 text-xs font-bold text-primary mt-2">
                        <span class="bg-primary/10 px-2 py-1 rounded-full">+{{ parseInt(passProbAfter) - parseInt(passProbBefore) }}% pass probability</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="flex flex-col items-center gap-6 w-full max-w-2xl px-6 py-10 rounded-[3rem] bg-primary-50/30 dark:bg-primary-900/5 border border-primary-100/50 dark:border-primary-900/10 animate-fade-in [animation-delay:400ms] relative">
            <div class="flex items-center gap-2 text-[10px] tracking-[0.2em] font-bold uppercase text-primary relative z-10">
                <UIcon name="i-lucide-sparkles" class="w-3.5 h-3.5" />
                <span>Acumen Insight</span>
            </div>
            <p class="text-xl md:text-2xl leading-relaxed text-neutral-800 dark:text-neutral-200 italic relative z-10 px-4">
                "{{ aiFinalComment }}"
            </p>
            <div class="flex items-center gap-3 relative z-10 pt-2">
                <div class="w-8 h-px bg-primary/30"></div>
                <span class="text-[10px] tracking-[0.2em] font-bold uppercase text-neutral-400">Acumen AI</span>
                <div class="w-8 h-px bg-primary/30"></div>
            </div>
        </div>

        <UButton 
            label="See Your Readiness Plan" 
            variant="soft" 
            color="neutral" 
            size="xl" 
            class="rounded-full px-10 py-4 animate-fade-in [animation-delay:600ms]" 
            @click="$emit('view-plan')" 
        />

    </div>
</template>
