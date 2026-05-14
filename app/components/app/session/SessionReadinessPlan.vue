<script setup lang="ts">
import type { SubTopicAnalysis } from '~/types/topic'

const props = withDefaults(defineProps<{
    weakestTopic?: SubTopicAnalysis
    topicTitle?: string
    isOnboarding?: boolean
}>(), {
    isOnboarding: false
})

defineEmits(['close'])
</script>



<template>
    <!-- Readiness Plan State -->
    <div class="p-8 md:p-16 flex flex-col gap-16 animate-fade-in bg-white dark:bg-neutral-900 min-h-[600px]">
        <!-- Hero Header -->
        <div
            class="flex flex-col md:flex-row justify-between items-end gap-8 border-b border-neutral-100 dark:border-neutral-800 pb-12">
            <div class="flex flex-col gap-4">
                <div
                    class="flex items-center gap-3 text-primary mb-2 border border-primary/30 px-4 py-2 rounded-full bg-primary/10 w-fit">
                    <UIcon name="i-lucide-map" class="w-4 h-4" />
                    <span class="tracking-[0.4em] uppercase font-bold text-[10px]">Readiness Plan</span>
                </div>
                <h2 class="text-5xl font-bold tracking-tight text-neutral-900 dark:text-white leading-tight">
                    <span v-if="topicTitle" class="block text-xl text-neutral-500 mb-2 font-medium tracking-normal">Path for {{ topicTitle }}</span>
                    Mastery <span class="text-primary">Roadmap</span>
                </h2>
                <p class="text-xl text-neutral-500 dark:text-neutral-400 max-w-2xl">
                    Based on your performance, Acumen AI has orchestrated a hyper-personalized roadmap to bridge your
                    knowledge gaps.
                </p>
            </div>
            <div class="flex flex-col items-end gap-3">
                <span class="text-[10px] font-bold tracking-[0.2em] text-neutral-400 uppercase">Estimated Effort</span>
                <div class="flex items-baseline gap-2">
                    <span class="text-5xl font-bold text-primary">4.5</span>
                    <span class="text-xl font-medium text-neutral-500">Hours</span>
                </div>
            </div>
        </div>

        <!-- Roadmap Steps -->
        <div :class="isOnboarding ? 'flex flex-col gap-6' : 'grid grid-cols-1 md:grid-cols-3 gap-8'">
            <!-- Step 1 -->
            <div :class="[
                'rounded-[2.5rem] bg-neutral-50 dark:bg-neutral-800/30 border border-neutral-100 dark:border-neutral-800 relative group transition-all duration-500',
                isOnboarding ? 'flex flex-row items-center gap-8 p-6 md:p-8' : 'flex flex-col gap-8 p-10 hover:scale-[1.02]'
            ]">
                <div :class="[
                    'rounded-2xl bg-primary text-white flex items-center justify-center font-bold text-xl shadow-lg shadow-primary/20 shrink-0',
                    isOnboarding ? 'w-10 h-10' : 'absolute -top-4 -left-4 w-12 h-12'
                ]">1</div>

                <div :class="['flex gap-4 items-center', isOnboarding ? 'flex-1' : 'flex-col mt-2 items-start']">
                    <UIcon name="i-lucide-layers" :class="['text-primary shrink-0', isOnboarding ? 'text-3xl' : 'text-4xl']" />
                    <div class="flex flex-col gap-1">
                        <h3 :class="['font-bold tracking-tight', isOnboarding ? 'text-lg' : 'text-2xl']">Core Concept Consolidation</h3>
                        <p v-if="isOnboarding" class="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-xl">
                            Deep dive into fundamentals. Focus on the interplay between mechanics and outcomes.
                        </p>
                    </div>
                </div>

                <p v-if="!isOnboarding" class="text-neutral-500 dark:text-neutral-400 leading-relaxed">
                    Deep dive into <span class="text-neutral-900 dark:text-white font-semibold">{{ weakestTopic?.name
                        || 'this topic' }}</span> fundamentals. Focus on the interplay between mechanics and outcomes.
                </p>

                <div :class="[
                    'border-neutral-200 dark:border-neutral-700/50 flex items-center justify-between shrink-0',
                    isOnboarding ? 'flex-col items-end gap-1 ml-auto' : 'mt-auto pt-6 border-t'
                ]">
                    <span class="text-[10px] font-bold text-primary uppercase tracking-widest">Recommended</span>
                    <span class="text-xs text-neutral-400 font-mono">90 Min</span>
                </div>
            </div>

            <!-- Step 2 -->
            <div :class="[
                'rounded-[2.5rem] bg-neutral-50 dark:bg-neutral-800/30 border border-neutral-100 dark:border-neutral-800 relative group transition-all duration-500',
                isOnboarding ? 'flex flex-row items-center gap-8 p-6 md:p-8' : 'flex flex-col gap-8 p-10 hover:scale-[1.02]'
            ]">
                <div :class="[
                    'rounded-2xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 flex items-center justify-center font-bold text-xl shadow-lg shrink-0',
                    isOnboarding ? 'w-10 h-10' : 'absolute -top-4 -left-4 w-12 h-12'
                ]">2</div>

                <div :class="['flex gap-4 items-center', isOnboarding ? 'flex-1' : 'flex-col mt-2 items-start']">
                    <UIcon name="i-lucide-activity" :class="['text-neutral-900 dark:text-white shrink-0', isOnboarding ? 'text-3xl' : 'text-4xl']" />
                    <div class="flex flex-col gap-1">
                        <h3 :class="['font-bold tracking-tight', isOnboarding ? 'text-lg' : 'text-2xl']">Advanced Simulations</h3>
                        <p v-if="isOnboarding" class="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-xl">
                            Engage with 15 complex scenarios designed to challenge your decision-making speed.
                        </p>
                    </div>
                </div>

                <p v-if="!isOnboarding" class="text-neutral-500 dark:text-neutral-400 leading-relaxed">
                    Engage with 15 complex scenarios designed to challenge your decision-making speed and retention
                    under pressure.
                </p>

                <div :class="[
                    'border-neutral-200 dark:border-neutral-700/50 flex items-center justify-between shrink-0',
                    isOnboarding ? 'flex-col items-end gap-1 ml-auto' : 'mt-auto pt-6 border-t'
                ]">
                    <span class="text-[10px] font-bold text-neutral-900 dark:text-white uppercase tracking-widest">Crucial</span>
                    <span class="text-xs text-neutral-400 font-mono">120 Min</span>
                </div>
            </div>

            <!-- Step 3 -->
            <div :class="[
                'rounded-[2.5rem] bg-neutral-50 dark:bg-neutral-800/30 border border-neutral-100 dark:border-neutral-800 relative group transition-all duration-500',
                isOnboarding ? 'flex flex-row items-center gap-8 p-6 md:p-8' : 'flex flex-col gap-8 p-10 hover:scale-[1.02]'
            ]">
                <div :class="[
                    'rounded-2xl bg-primary text-white flex items-center justify-center font-bold text-xl shadow-lg shadow-primary/20 shrink-0',
                    isOnboarding ? 'w-10 h-10' : 'absolute -top-4 -left-4 w-12 h-12'
                ]">3</div>

                <div :class="['flex gap-4 items-center', isOnboarding ? 'flex-1' : 'flex-col mt-2 items-start']">
                    <UIcon name="i-lucide-check-check" :class="['text-primary shrink-0', isOnboarding ? 'text-3xl' : 'text-4xl']" />
                    <div class="flex flex-col gap-1">
                        <h3 :class="['font-bold tracking-tight', isOnboarding ? 'text-lg' : 'text-2xl']">Final Certification Run</h3>
                        <p v-if="isOnboarding" class="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-xl">
                            A full-length assessment covering the entire topic scope to ensure your passing.
                        </p>
                    </div>
                </div>

                <p v-if="!isOnboarding" class="text-neutral-500 dark:text-neutral-400 leading-relaxed">
                    A full-length assessment covering the entire topic scope to ensure your probability of passing
                    reaches <span class="text-primary font-bold">95%+</span>.
                </p>

                <div :class="[
                    'border-neutral-200 dark:border-neutral-700/50 flex items-center justify-between shrink-0',
                    isOnboarding ? 'flex-col items-end gap-1 ml-auto' : 'mt-auto pt-6 border-t'
                ]">
                    <span class="text-[10px] font-bold text-primary uppercase tracking-widest">Final Step</span>
                    <span class="text-xs text-neutral-400 font-mono">60 Min</span>
                </div>
            </div>
        </div>

        <!-- AI Conclusion -->
        <div
            class="bg-primary/5 rounded-[3rem] p-12 border border-primary/10 flex flex-col items-center text-center gap-8 animate-fade-in relative overflow-hidden">
            <div
                class="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2">
            </div>
            <div class="bg-primary/10 p-4 rounded-2xl">
                <UIcon name="i-lucide-sparkles" class="text-4xl text-primary" />
            </div>
            <div class="flex flex-col gap-4 max-w-3xl relative z-10">
                <h4 class="text-3xl font-bold tracking-tight">You're closer than you think.</h4>
                <p class="text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed italic">
                    "The progress you've made today has already moved the needle. Following this plan will solidify your
                    intuition, making the complex feel second nature. I'll be here to recalibrate every step of the
                    way."
                </p>
            </div>
            <div class="flex items-center gap-4 pt-4">
                <div class="w-12 h-px bg-primary/20"></div>
                <span class="text-xs font-bold tracking-[0.4em] text-primary uppercase">Acumen AI Coach</span>
                <div class="w-12 h-px bg-primary/20"></div>
            </div>
        </div>

        <!-- Final Action -->
        <div class="flex justify-center pt-8">
            <UButton :label="isOnboarding ? 'Begin Your Journey' : 'Return to Dashboard'" size="xl" :color="isOnboarding ? 'primary' : 'neutral'"
                :variant="isOnboarding ? 'solid' : 'soft'" @click="$emit('close')"
                class="rounded-full px-12 py-5 uppercase text-sm font-bold tracking-[0.2em] shadow-xl transition-all duration-300"
                :class="isOnboarding ? 'shadow-primary/20 hover:shadow-primary/30 hover:scale-105' : ''" />
        </div>
    </div>
</template>
