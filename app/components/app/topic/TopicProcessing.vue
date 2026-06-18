<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

const props = defineProps<{ mode: 'upload' | 'explore' | 'prompt' | null }>()

const progress = ref(0)
const statusIndex = ref(0)

const config = computed(() => {
    if (props.mode === 'explore') {
        return {
            title: 'Mapping Your Curriculum...',
            description: 'Building a personalized learning path based on your selected subject.',
            statuses: ['SCANNING SUBJECT', 'MAPPING TOPICS', 'BUILDING OUTLINE'],
            initialSteps: [
                { id: 1, label: 'Scanning subject', status: 'in-progress', progress: 0, icon: 'i-lucide-search' },
                { id: 2, label: 'Mapping topics', status: 'pending', progress: 0, icon: 'i-lucide-network' },
                { id: 3, label: 'Building outline', status: 'pending', progress: 0, icon: 'i-lucide-list-tree' }
            ]
        }
    }
    return {
        title: 'Analyzing Your Prompt...',
        description: 'AI is interpreting your learning goals and structuring the curriculum.',
        statuses: ['PARSING INTENT', 'IDENTIFYING CONCEPTS', 'GENERATING OUTLINE'],
        initialSteps: [
            { id: 1, label: 'Parsing intent', status: 'in-progress', progress: 0, icon: 'i-lucide-brain' },
            { id: 2, label: 'Identifying concepts', status: 'pending', progress: 0, icon: 'i-lucide-lightbulb' },
            { id: 3, label: 'Generating outline', status: 'pending', progress: 0, icon: 'i-lucide-list-tree' }
        ]
    }
})

const steps = ref(config.value.initialSteps)

const currentStep = computed(() => {
    return steps.value.find(s => s.status === 'in-progress') || steps.value[steps.value.length - 1]
})

onMounted(() => {
    const duration = 3500
    const interval = 50
    const stepAmount = (100 / (duration / interval))

    const timer = setInterval(() => {
        progress.value += stepAmount

        const numSteps = 3
        const percentPerStep = 100 / numSteps

        for (let i = 0; i < numSteps; i++) {
            const stepStart = i * percentPerStep
            const stepEnd = (i + 1) * percentPerStep
            
            if (progress.value >= stepStart && progress.value < stepEnd) {
                if (steps.value[i]) {
                    steps.value[i]!.status = 'in-progress'
                    steps.value[i]!.progress = Math.min(100, ((progress.value - stepStart) / percentPerStep) * 100)
                }
            } else if (progress.value >= stepEnd) {
                if (steps.value[i]) {
                    steps.value[i]!.status = 'completed'
                    steps.value[i]!.progress = 100
                }
            }
        }

        if (progress.value >= 33.33 && progress.value < 66.66) {
            statusIndex.value = 1
        } else if (progress.value >= 66.66) {
            statusIndex.value = 2
        }

        if (progress.value >= 100) {
            progress.value = 100
            clearInterval(timer)
        }
    }, interval)
})
</script>

<template>
    <div class="flex flex-col items-center justify-center text-center gap-8 py-12">

        <!-- Circular Progress Top -->
        <AppCircularProgress :value="Math.round(progress)" :size="160" :stroke-width="6"
            color="var(--color-primary-500, #3b82f6)">
            <div class="flex flex-col items-center justify-center -mt-1">
                <span class="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">{{ Math.round(progress)
                    }}%</span>
                <span
                    class="text-[9px] font-black uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mt-1">{{
                    config.statuses[statusIndex] }}</span>
            </div>
        </AppCircularProgress>

        <div class="space-y-3">
            <h2 class="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">{{ config.title }}</h2>
            <p class="text-sm text-neutral-500 dark:text-neutral-400 max-w-xs mx-auto leading-relaxed">
                {{ config.description }}
            </p>
        </div>

        <!-- Status Badge -->
        <div
            class="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary-500/20 bg-primary-500/5 text-primary-600 dark:text-primary-400 text-xs font-semibold uppercase tracking-widest">
            <UIcon name="i-lucide-sparkles" class="w-3.5 h-3.5" />
            <Transition mode="out-in" enter-active-class="transition-all duration-300 ease-out"
                enter-from-class="opacity-0 translate-y-1" enter-to-class="opacity-100 translate-y-0"
                leave-active-class="transition-all duration-150 ease-in" leave-from-class="opacity-100"
                leave-to-class="opacity-0">
                <span :key="statusIndex">{{ config.statuses[statusIndex] }}</span>
            </Transition>
        </div>

        <!-- Current Step Card -->
        <div class="w-full max-w-sm relative h-[72px] mt-4">
            <TransitionGroup name="step-fade">
                <div v-for="step in (currentStep ? [currentStep] : [])" :key="step.id"
                    class="absolute inset-0 flex items-center gap-4 px-4 py-3 bg-white dark:bg-neutral-800/50 border border-neutral-200 dark:border-white/10 rounded-2xl shadow-sm backdrop-blur-md">
                    
                    <!-- Status Icon -->
                    <div class="w-10 h-10 rounded-xl flex items-center justify-center bg-primary-50 text-primary-600 border border-primary-200 dark:bg-primary-500/10 dark:text-primary-400 dark:border-primary-500/20 shrink-0">
                        <UIcon v-if="step.progress === 100" name="i-lucide-check-circle-2" class="w-5 h-5" />
                        <UIcon v-else :name="step.icon" class="w-5 h-5 animate-pulse" />
                    </div>

                    <!-- Label & Progress -->
                    <div class="flex-1 flex flex-col justify-center gap-2">
                        <div class="flex justify-between items-center text-sm w-full">
                            <span class="font-semibold text-neutral-900 dark:text-white">{{ step.label }}</span>
                            <span class="text-xs font-bold text-primary-500 tabular-nums">{{ Math.round(step.progress) }}%</span>
                        </div>
                        <!-- Linear Progress Bar -->
                        <div class="h-1.5 w-full bg-neutral-100 dark:bg-white/5 rounded-full overflow-hidden">
                            <div class="h-full bg-primary-500 transition-all duration-150 ease-out"
                                :style="{ width: `${step.progress}%` }" />
                        </div>
                    </div>
                </div>
            </TransitionGroup>
        </div>
    </div>
</template>

<style scoped>
.step-fade-enter-active,
.step-fade-leave-active {
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.step-fade-enter-from {
    opacity: 0;
    transform: translateY(15px) scale(0.95);
}

.step-fade-leave-to {
    opacity: 0;
    transform: translateY(-15px) scale(0.95);
}
</style>
