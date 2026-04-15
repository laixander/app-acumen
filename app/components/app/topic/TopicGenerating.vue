<script setup lang="ts">
const emit = defineEmits(['finish'])

const steps = ref([
    { id: 1, label: 'Analyzing topic context', status: 'pending' },
    { id: 2, label: 'Scanning uploaded materials', status: 'pending' },
    { id: 3, label: 'Evaluating assessment results', status: 'pending' },
    { id: 4, label: 'Mapping learning objectives', status: 'pending' },
    { id: 5, label: 'Optimizing lesson schedule', status: 'pending' }
])

const currentStepIndex = ref(0)

const processSteps = async () => {
    let i = 0
    for (const step of steps.value) {
        currentStepIndex.value = i
        step.status = 'in-progress'

        // Simulate thinking/processing time
        await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 800))

        step.status = 'completed'
        i++
    }

    // Final delay for dramatic effect
    setTimeout(() => {
        emit('finish')
    }, 1000)
}

onMounted(() => {
    processSteps()
})
</script>

<template>
    <div class="flex flex-col items-center justify-center min-h-[500px] text-center gap-10 py-8">
        <!-- Top Spinner -->
        <div class="relative">
            <div class="absolute inset-0 bg-primary/20 blur-2xl rounded-full scale-150 animate-pulse" />
            <div
                class="relative bg-white dark:bg-neutral-900 border-none shadow-xl rounded-3xl p-8 flex items-center justify-center">
                <UIcon name="i-lucide-sparkles" class="text-6xl text-primary flex shrink-0 animate-bounce" />
            </div>
        </div>

        <h2 class="text-3xl font-black tracking-tight">AI is crafting your personal path...</h2>

        <!-- Checklist -->
        <div class="w-full max-w-sm flex flex-col gap-3">
            <TransitionGroup name="list">
                <UCard v-for="(step, index) in steps" :key="step.id"
                    class="border-none shadow-sm transition-all duration-300" :class="[
                        step.status === 'pending' ? 'opacity-40 grayscale pointer-events-none' : '',
                        step.status === 'in-progress' ? 'ring-1 ring-primary-500 bg-primary-50/50 dark:bg-primary-900/10' : ''
                    ]" :ui="{ body: 'p-4 flex items-center gap-4' }">
                    <!-- Status Icon -->
                    <div class="w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300"
                        :class="[
                            step.status === 'completed' ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' :
                                step.status === 'in-progress' ? 'bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400' :
                                    'bg-neutral-100 text-neutral-400 dark:bg-neutral-800'
                        ]">
                        <UIcon v-if="step.status === 'completed'" name="i-lucide-check" class="w-5 h-5" />
                        <UIcon v-else-if="step.status === 'in-progress'" name="i-lucide-loader-2"
                            class="w-5 h-5 animate-spin" />
                        <div v-else class="w-2 h-2 rounded-full bg-neutral-300 dark:bg-neutral-700" />
                    </div>

                    <!-- Label -->
                    <div class="flex-1 text-left flex items-center justify-between">
                        <span class="text-sm font-bold transition-colors duration-300" :class="[
                            step.status === 'completed' ? 'text-neutral-900 dark:text-white' :
                                step.status === 'in-progress' ? 'text-primary-600 dark:text-primary-400' :
                                    'text-neutral-400'
                        ]">
                            {{ step.label }}
                        </span>

                        <span v-if="step.status === 'in-progress'"
                            class="text-[10px] font-black uppercase tracking-widest text-primary-500 animate-pulse">
                            IN PROGRESS
                        </span>
                    </div>
                </UCard>
            </TransitionGroup>
        </div>
    </div>
</template>

<style scoped>
.list-enter-active,
.list-leave-active {
    transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
    opacity: 0;
    transform: translateY(10px);
}
</style>
