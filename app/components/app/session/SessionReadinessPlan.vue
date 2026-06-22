<script setup lang="ts">
import type { SubCourseAnalysis } from '~/types/course'

const props = withDefaults(defineProps<{
    weakestCourse?: SubCourseAnalysis
    courseTitle?: string
    isOnboarding?: boolean
    isTeaser?: boolean
}>(), {
    isOnboarding: false,
    isTeaser: false
})

defineEmits(['close'])
</script>



<template>
    <!-- Readiness Plan State -->
    <div :class="[
        'p-8 md:p-16 flex flex-col animate-fade-in bg-white dark:bg-neutral-900',
        isOnboarding ? 'gap-8' : 'gap-16 min-h-[600px]'
    ]">
        <!-- Hero Header -->
        <div
            class="flex flex-col md:flex-row justify-between md:items-end gap-8 md:gap-24 border-b border-neutral-100 dark:border-neutral-800 pb-12">
            <div class="flex flex-col gap-4">
                <div
                    class="flex items-center gap-3 text-primary mb-2 border border-primary/30 px-4 py-2 rounded-full bg-primary/10 w-fit">
                    <UIcon name="i-lucide-map" class="w-4 h-4" />
                    <span class="tracking-[0.4em] uppercase font-bold text-[10px]">Readiness Plan</span>
                </div>
                <h2 class="text-5xl font-bold tracking-tight text-neutral-900 dark:text-white leading-tight">
                    <span v-if="courseTitle" class="block text-xl text-neutral-500 mb-2 font-medium tracking-normal">Path
                        for {{ courseTitle }}</span>
                    Mastery <span class="text-primary">Roadmap</span>
                </h2>
                <p class="text-xl text-neutral-500 dark:text-neutral-400 max-w-2xl mb-4">
                    Based on your performance, Acumen AI has orchestrated a hyper-personalized roadmap to bridge your
                    knowledge gaps.
                </p>
                <UButton v-if="!isTeaser" :label="isOnboarding ? 'Begin Your Journey' : 'Return to Lessons'" size="xl"
                    :color="isOnboarding ? 'primary' : 'neutral'" :variant="isOnboarding ? 'solid' : 'soft'"
                    @click="$emit('close')"
                    class="rounded-full px-12 py-5 uppercase text-sm font-bold tracking-[0.2em] shadow-xl transition-all duration-300 w-fit"
                    :class="isOnboarding ? 'shadow-primary/20 hover:shadow-primary/30 hover:scale-105' : ''" />
            </div>
            <div class="flex flex-col md:items-end gap-2">
                <span class="text-[10px] font-bold tracking-[0.2em] text-neutral-400 uppercase whitespace-nowrap">
                    Pre-Assessment Score</span>
                <span class="text-6xl font-bold text-primary">75<span class="text-3xl">%</span></span>
                <div class="flex flex-col items-end gap-1 w-full">
                    <UProgress inverted :model-value="75" size="sm" class="w-full" />
                    <span class="text-[10px]">Unlock 25% more knowledge</span>
                </div>
            </div>
        </div>

        <!-- Roadmap Steps -->
        <div class="relative" :class="isTeaser ? 'h-[30vh]' : ''">
            <div :class="[
                isOnboarding ? 'flex flex-col gap-6' : 'grid grid-cols-1 md:grid-cols-3 gap-8',
                isTeaser ? 'absolute inset-x-0 top-0 pointer-events-none select-none' : ''
            ]">
                <!-- Step 1 -->
                <div :class="[
                    'rounded-[2.5rem] bg-neutral-50 dark:bg-neutral-800/30 border border-neutral-100 dark:border-neutral-800 relative group transition-all duration-500',
                    isOnboarding ? 'flex flex-col md:flex-row md:items-center gap-8 p-10' : 'flex flex-col gap-8 p-10 hover:scale-[1.02]'
                ]">
                    <div :class="[
                        'rounded-2xl bg-primary text-white flex items-center justify-center font-bold text-xl shadow-lg shadow-primary/20 shrink-0 w-12 h-12',
                        isOnboarding ? 'absolute -top-4 -left-4 md:relative md:top-0 md:left-0' : 'absolute -top-4 -left-4'
                    ]">1</div>

                    <div
                        :class="['flex gap-4 items-start md:items-center', isOnboarding ? 'flex-1 flex-col md:flex-row' : 'flex-col mt-2']">
                        <UIcon name="i-lucide-layers"
                            :class="['text-primary shrink-0', isOnboarding ? 'text-3xl md:text-4xl' : 'text-4xl']" />
                        <div :class="['flex flex-col', isOnboarding ? 'gap-8 md:gap-1' : 'gap-8']">
                            <h3 class="font-bold tracking-tight text-2xl">Core Concept Consolidation</h3>
                            <p v-if="isOnboarding"
                                class="text-neutral-500 dark:text-neutral-400 leading-relaxed md:max-w-xl">
                                Deep dive into fundamentals. Focus on the interplay between mechanics and outcomes.
                            </p>
                        </div>
                    </div>

                    <p v-if="!isOnboarding" class="text-neutral-500 dark:text-neutral-400 leading-relaxed">
                        Deep dive into <span class="text-neutral-900 dark:text-white font-semibold">{{
                            weakestCourse?.name
                            || 'this course' }}</span> fundamentals. Focus on the interplay between mechanics and
                        outcomes.
                    </p>

                    <div :class="[
                        'border-neutral-200 dark:border-neutral-700/50 flex items-center justify-between shrink-0',
                        isOnboarding ? 'flex-row md:flex-col items-center md:items-end gap-1 w-full md:w-auto md:ml-auto border-t md:border-t-0 pt-6 md:pt-0' : 'mt-auto pt-6 border-t'
                    ]">
                        <span class="text-[10px] font-bold text-primary uppercase tracking-widest">Recommended</span>
                        <span class="text-xs text-neutral-400 font-mono">90 Min</span>
                    </div>
                </div>

                <!-- Step 2 -->
                <div :class="[
                    'rounded-[2.5rem] bg-neutral-50 dark:bg-neutral-800/30 border border-neutral-100 dark:border-neutral-800 relative group transition-all duration-500',
                    isOnboarding ? 'flex flex-col md:flex-row md:items-center gap-8 p-10' : 'flex flex-col gap-8 p-10 hover:scale-[1.02]'
                ]">
                    <div :class="[
                        'rounded-2xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 flex items-center justify-center font-bold text-xl shadow-lg shrink-0 w-12 h-12',
                        isOnboarding ? 'absolute -top-4 -left-4 md:relative md:top-0 md:left-0' : 'absolute -top-4 -left-4'
                    ]">2</div>

                    <div
                        :class="['flex gap-4 items-start md:items-center', isOnboarding ? 'flex-1 flex-col md:flex-row' : 'flex-col mt-2']">
                        <UIcon name="i-lucide-activity"
                            :class="['text-neutral-900 dark:text-white shrink-0', isOnboarding ? 'text-3xl md:text-4xl' : 'text-4xl']" />
                        <div :class="['flex flex-col', isOnboarding ? 'gap-8 md:gap-1' : 'gap-8']">
                            <h3 class="font-bold tracking-tight text-2xl">Advanced Simulations</h3>
                            <p v-if="isOnboarding"
                                class="text-neutral-500 dark:text-neutral-400 leading-relaxed md:max-w-xl">
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
                        isOnboarding ? 'flex-row md:flex-col items-center md:items-end gap-1 w-full md:w-auto md:ml-auto border-t md:border-t-0 pt-6 md:pt-0' : 'mt-auto pt-6 border-t'
                    ]">
                        <span
                            class="text-[10px] font-bold text-neutral-900 dark:text-white uppercase tracking-widest">Crucial</span>
                        <span class="text-xs text-neutral-400 font-mono">120 Min</span>
                    </div>
                </div>

                <!-- Step 3 -->
                <div :class="[
                    'rounded-[2.5rem] bg-neutral-50 dark:bg-neutral-800/30 border border-neutral-100 dark:border-neutral-800 relative group transition-all duration-500',
                    isOnboarding ? 'flex flex-col md:flex-row md:items-center gap-8 p-10' : 'flex flex-col gap-8 p-10 hover:scale-[1.02]'
                ]">
                    <div :class="[
                        'rounded-2xl bg-primary text-white flex items-center justify-center font-bold text-xl shadow-lg shadow-primary/20 shrink-0 w-12 h-12',
                        isOnboarding ? 'absolute -top-4 -left-4 md:relative md:top-0 md:left-0' : 'absolute -top-4 -left-4'
                    ]">3</div>

                    <div
                        :class="['flex gap-4 items-start md:items-center', isOnboarding ? 'flex-1 flex-col md:flex-row' : 'flex-col mt-2']">
                        <UIcon name="i-lucide-check-check"
                            :class="['text-primary shrink-0', isOnboarding ? 'text-3xl md:text-4xl' : 'text-4xl']" />
                        <div :class="['flex flex-col', isOnboarding ? 'gap-8 md:gap-1' : 'gap-8']">
                            <h3 class="font-bold tracking-tight text-2xl">Final Certification Run</h3>
                            <p v-if="isOnboarding"
                                class="text-neutral-500 dark:text-neutral-400 leading-relaxed md:max-w-xl">
                                A full-length assessment covering the entire course scope to ensure your passing.
                            </p>
                        </div>
                    </div>

                    <p v-if="!isOnboarding" class="text-neutral-500 dark:text-neutral-400 leading-relaxed">
                        A full-length assessment covering the entire course scope to ensure your probability of passing
                        reaches <span class="text-primary font-bold">95%+</span>.
                    </p>

                    <div :class="[
                        'border-neutral-200 dark:border-neutral-700/50 flex items-center justify-between shrink-0',
                        isOnboarding ? 'flex-row md:flex-col items-center md:items-end gap-1 w-full md:w-auto md:ml-auto border-t md:border-t-0 pt-6 md:pt-0' : 'mt-auto pt-6 border-t'
                    ]">
                        <span class="text-[10px] font-bold text-primary uppercase tracking-widest">Final Step</span>
                        <span class="text-xs text-neutral-400 font-mono">60 Min</span>
                    </div>
                </div>
            </div>

            <!-- Absolute Teaser Mask Overlay -->
            <div v-if="isTeaser"
                class="absolute inset-x-0 top-0 bottom-[-10vh] z-10 pointer-events-none bg-gradient-to-b from-white/0 via-white to-white dark:from-neutral-900/0 dark:via-neutral-900 dark:to-neutral-900"
                style="--tw-gradient-via-position: 15vh;"></div>

            <!-- Unlock Teaser Overlay -->
            <div v-if="isTeaser"
                class="absolute inset-x-0 bottom-0 h-48 flex items-end justify-center z-20 pointer-events-auto">
                <UButton label="Register to Unlock Roadmap" icon="i-lucide-lock" color="primary" size="lg"
                    @click="$emit('close')"
                    class="rounded-xl px-8 py-3 text-base font-semibold shadow-2xl shadow-primary/20 hover:shadow-primary/30 hover:-translate-y-0.5 transition-all duration-300" />
            </div>
        </div>

        <!-- AI Conclusion -->
        <div v-if="!isTeaser"
            class="bg-primary/5 rounded-[3rem] p-12 border border-primary/10 flex flex-col items-center text-center gap-8 animate-fade-in relative overflow-hidden">
            <div
                class="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2">
            </div>
            <div class="bg-primary/10 p-4 rounded-2xl">
                <UIcon name="i-lucide-sparkles" class="text-4xl text-primary flex" />
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
        <div v-if="!isTeaser" class="flex justify-center pt-8">
            <UButton :label="isOnboarding ? 'Begin Your Journey' : 'Return to Lessons'" size="xl"
                :color="isOnboarding ? 'primary' : 'neutral'" :variant="isOnboarding ? 'solid' : 'soft'"
                @click="$emit('close')"
                class="rounded-full px-12 py-5 uppercase text-sm font-bold tracking-[0.2em] shadow-xl transition-all duration-300"
                :class="isOnboarding ? 'shadow-primary/20 hover:shadow-primary/30 hover:scale-105' : ''" />
        </div>
    </div>
</template>
