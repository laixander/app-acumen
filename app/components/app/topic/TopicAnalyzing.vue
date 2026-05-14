<script setup lang="ts">
const progress = ref(0)
const status = ref('SCANNING CONTENT')

onMounted(() => {
    const duration = 3500
    const interval = 50
    const step = (100 / (duration / interval))

    const timer = setInterval(() => {
        progress.value += step
        if (progress.value >= 30) {
            status.value = 'INDEXING FACTS'
        }
        if (progress.value >= 70) {
            status.value = 'MAPPING TRACEABILITY'
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
        <!-- Indexing Icon Soft Card -->
        <div class="relative">
            <div class="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-150 animate-pulse" />
            <div
                class="relative bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 shadow-2xl rounded-3xl p-10 flex items-center justify-center">
                <UIcon name="i-lucide-database" class="text-6xl text-primary flex shrink-0 animate-pulse" />
            </div>
        </div>

        <div class="space-y-3">
            <h2 class="text-3xl font-black tracking-tight text-neutral-900 dark:text-white">AI is Indexing Your Materials...</h2>
            <p class="text-neutral-500 dark:text-neutral-400 max-w-sm mx-auto leading-relaxed">
                Building your knowledge base. Every fact is being traced back to your source material.
            </p>
        </div>

        <!-- Progress Section -->
        <div class="w-full max-w-sm flex flex-col mt-4">
            <div class="flex justify-between items-end mb-2 px-1">
                <span class="text-[10px] font-black uppercase tracking-widest text-neutral-400">Indexing Progress</span>
                <span class="text-xs font-bold text-primary tabular-nums">
                    {{ Math.round(progress) }}%
                </span>
            </div>
            <UProgress v-model="progress" color="primary" size="md" class="shadow-sm" />

            <div
                class="flex items-center justify-center text-[10px] font-black uppercase tracking-widest text-primary px-1 mt-4">
                <div class="flex items-center gap-2">
                    <UIcon name="i-lucide-loader-2" class="animate-spin w-3 h-3" />
                    <span>{{ status }}</span>
                </div>
            </div>
        </div>
    </div>
</template>