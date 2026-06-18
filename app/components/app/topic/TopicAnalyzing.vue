<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

const progress = ref(0)
const status = ref('READING FILES')

const steps = ref([
    { id: 1, label: 'Reading files', status: 'in-progress', progress: 0, icon: 'i-lucide-file-text' },
    { id: 2, label: 'Generating topics', status: 'pending', progress: 0, icon: 'i-lucide-brain' },
    { id: 3, label: 'First question ready', status: 'pending', progress: 0, icon: 'i-lucide-message-square' }
])

const currentStep = computed(() => {
    return steps.value.find(s => s.status === 'in-progress') || steps.value[steps.value.length - 1]
})

onMounted(() => {
    const duration = 3500
    const interval = 50
    const stepAmount = (100 / (duration / interval))

    const timer = setInterval(() => {
        progress.value += stepAmount

        // Update individual steps
        if (progress.value < 33) {
            steps.value[0]!.progress = Math.min(100, (progress.value / 33) * 100)
        } else if (progress.value < 66) {
            steps.value[0]!.status = 'completed'
            steps.value[0]!.progress = 100
            steps.value[1]!.status = 'in-progress'
            steps.value[1]!.progress = Math.min(100, ((progress.value - 33) / 33) * 100)
        } else {
            steps.value[1]!.status = 'completed'
            steps.value[1]!.progress = 100
            steps.value[2]!.status = 'in-progress'
            steps.value[2]!.progress = Math.min(100, ((progress.value - 66) / 34) * 100)
        }

        if (progress.value >= 33 && progress.value < 66) {
            status.value = 'INDEXING FACTS'
        } else if (progress.value >= 66) {
            status.value = 'MAPPING TRACEABILITY'
        }

        if (progress.value >= 100) {
            steps.value[2]!.status = 'completed'
            steps.value[2]!.progress = 100
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
                    status }}</span>
            </div>
        </AppCircularProgress>

        <div class="space-y-3">
            <h2 class="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">AI is indexing your materials
            </h2>
            <p class="text-sm text-neutral-500 dark:text-neutral-400 max-w-xs mx-auto leading-relaxed">
                Building your knowledge base — every fact is being traced back to your source material.
            </p>
        </div>

        <!-- Status Badge -->
        <div
            class="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary-500/20 bg-primary-500/5 text-primary-600 dark:text-primary-400 text-xs font-semibold uppercase tracking-widest">
            <UIcon name="i-lucide-share-2" class="w-3.5 h-3.5" />
            {{ status }}
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