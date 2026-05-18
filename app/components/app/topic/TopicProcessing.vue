<script setup lang="ts">
const props = defineProps<{ mode: 'upload' | 'explore' | 'prompt' | null }>()

const progress = ref(0)
const statusIndex = ref(0)

const config = computed(() => {
    if (props.mode === 'explore') {
        return {
            icon: 'i-lucide-compass',
            title: 'Mapping Your Curriculum...',
            description: 'Building a personalized learning path based on your selected subject.',
            label: 'Curriculum Mapping',
            statuses: ['SCANNING SUBJECT', 'MAPPING TOPICS', 'BUILDING OUTLINE'],
        }
    }
    return {
        icon: 'i-lucide-sparkles',
        title: 'Analyzing Your Prompt...',
        description: 'AI is interpreting your learning goals and structuring the curriculum.',
        label: 'Prompt Analysis',
        statuses: ['PARSING INTENT', 'IDENTIFYING CONCEPTS', 'GENERATING OUTLINE'],
    }
})

onMounted(() => {
    const duration = 3500
    const interval = 50
    const step = (100 / (duration / interval))

    const timer = setInterval(() => {
        progress.value += step
        if (progress.value >= 35) statusIndex.value = 1
        if (progress.value >= 70) statusIndex.value = 2
        if (progress.value >= 100) {
            progress.value = 100
            clearInterval(timer)
        }
    }, interval)
})
</script>

<template>
    <div class="flex flex-col items-center justify-center text-center gap-8 py-12">
        <!-- Icon Card -->
        <div class="relative">
            <div class="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-150 animate-pulse" />
            <div
                class="relative bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 shadow-2xl rounded-3xl p-10 flex items-center justify-center">
                <UIcon :name="config.icon" class="text-6xl text-primary flex shrink-0 animate-pulse" />
            </div>
        </div>

        <div class="space-y-3">
            <h2 class="text-3xl font-black tracking-tight text-neutral-900 dark:text-white">{{ config.title }}</h2>
            <p class="text-neutral-500 dark:text-neutral-400 max-w-sm mx-auto leading-relaxed">
                {{ config.description }}
            </p>
        </div>

        <!-- Progress Section -->
        <div class="w-full max-w-sm flex flex-col mt-4">
            <div class="flex justify-between items-end mb-2 px-1">
                <span class="text-[10px] font-black uppercase tracking-widest text-neutral-400">{{ config.label
                    }}</span>
                <span class="text-xs font-bold text-primary tabular-nums">{{ Math.round(progress) }}%</span>
            </div>
            <UProgress v-model="progress" color="primary" size="md" class="shadow-sm" />

            <div
                class="flex items-center justify-center text-[10px] font-black uppercase tracking-widest text-primary px-1 mt-4">
                <div class="flex items-center gap-2">
                    <UIcon name="i-lucide-loader-2" class="animate-spin w-3 h-3" />
                    <Transition mode="out-in" enter-active-class="transition-all duration-300 ease-out"
                        enter-from-class="opacity-0 translate-y-1" enter-to-class="opacity-100 translate-y-0"
                        leave-active-class="transition-all duration-150 ease-in" leave-from-class="opacity-100"
                        leave-to-class="opacity-0">
                        <span :key="statusIndex">{{ config.statuses[statusIndex] }}</span>
                    </Transition>
                </div>
            </div>
        </div>
    </div>
</template>
