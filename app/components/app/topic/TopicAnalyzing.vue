<script setup lang="ts">
import { ref, onMounted } from 'vue'

const progress = ref(0)
const status = ref('READING FILES')

const steps = ref([
    { id: 1, label: 'Reading files', status: 'in-progress', progress: 0, icon: 'i-lucide-file-text' },
    { id: 2, label: 'Generating topics', status: 'pending', progress: 0, icon: 'i-lucide-brain' },
    { id: 3, label: 'First question ready', status: 'pending', progress: 0, icon: 'i-lucide-message-square' }
])

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

        <!-- Checklist -->
        <div class="w-full max-w-sm flex flex-col gap-2 mt-4">
            <TransitionGroup name="list">
                <div v-for="(step, index) in steps" :key="step.id"
                    class="flex items-center gap-4 py-3 transition-all duration-300"
                    :class="[step.status === 'pending' ? 'opacity-40 grayscale' : '']">

                    <!-- Status Icon -->
                    <div class="w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-300 border shrink-0"
                        :class="[
                            step.status === 'completed' ? 'bg-primary-50 text-primary-600 border-primary-200 dark:bg-primary-500/10 dark:text-primary-400 dark:border-primary-500/20' :
                                step.status === 'in-progress' ? 'bg-neutral-50 text-neutral-900 border-neutral-200 dark:bg-white/5 dark:text-white dark:border-white/10' :
                                    'bg-transparent text-neutral-400 border-neutral-200 dark:border-white/10 dark:text-neutral-500'
                        ]">
                        <UIcon v-if="step.status === 'completed'" name="i-lucide-check-circle-2" class="w-5 h-5" />
                        <UIcon v-else :name="step.icon" class="w-5 h-5" />
                    </div>

                    <!-- Label & Progress -->
                    <div class="flex-1 flex flex-col justify-center gap-2">
                        <div class="flex justify-between items-center text-sm w-full">
                            <span class="font-semibold text-neutral-900 dark:text-white">{{ step.label }}</span>
                            <span class="text-xs font-medium text-neutral-500">{{ Math.round(step.progress) }}%</span>
                        </div>
                        <!-- Linear Progress Bar -->
                        <div class="h-1 w-full bg-neutral-100 dark:bg-white/5 rounded-full overflow-hidden">
                            <div class="h-full bg-primary-500 transition-all duration-200"
                                :style="{ width: `${step.progress}%` }" />
                        </div>
                    </div>
                </div>
            </TransitionGroup>
        </div>
    </div>
</template>