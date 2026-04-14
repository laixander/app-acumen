<script setup lang="ts">
const progress = ref(0)
const status = ref('SCANNING CONTENT')

onMounted(() => {
  const duration = 3500
  const interval = 50
  const step = (100 / (duration / interval))

  const timer = setInterval(() => {
    progress.value += step
    if (progress.value >= 50) {
      status.value = 'REFINING GAPS'
    }
    if (progress.value >= 100) {
      progress.value = 100
      clearInterval(timer)
    }
  }, interval)
})
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-[400px] text-center gap-8 py-12">
    <!-- Brain Icon Soft Card -->
    <div class="relative">
      <div class="absolute inset-0 bg-primary-500/20 blur-2xl rounded-full scale-150 animate-pulse" />
      <UCard class="relative bg-white dark:bg-neutral-900 border-none shadow-xl rounded-3xl"
        :ui="{ body: 'p-8 flex items-center justify-center' }">
        <UIcon name="i-lucide-brain-circuit" class="text-6xl text-primary-500 animate-bounce" />
      </UCard>
    </div>

    <div class="space-y-3">
      <h2 class="text-3xl font-black tracking-tight">AI is Analyzing Your Materials...</h2>
      <p class="text-neutral-500 max-w-sm mx-auto">
        Extracting key concepts and generating assessment questions based on your uploads.
      </p>
    </div>

    <!-- Progress Section -->
    <div class="w-full max-w-sm flex flex-col mt-4">
      <div class="flex justify-between items-end mb-2 px-1">
        <span class="text-[10px] font-black uppercase tracking-widest text-neutral-400">Analysis Progress</span>
        <span class="text-xs font-bold text-primary-500 tabular-nums">{{ Math.round(progress) }}%</span>
      </div>
      <UProgress v-model="progress" color="primary" size="md" class="shadow-sm" />

      <div
        class="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-neutral-400 px-1 mt-3">
        <span :class="{ 'text-primary-500': progress < 50 }">{{ status === 'SCANNING CONTENT' ? 'SCANNING CONTENT' :
          '...' }}</span>
        <span :class="{ 'text-primary-500': progress >= 50 }">{{ status === 'REFINING GAPS' ? 'REFINING GAPS' : '...'
          }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Optional: add some custom bounce timing */
.animate-bounce {
  animation: bounce 2s infinite;
}

@keyframes bounce {

  0%,
  100% {
    transform: translateY(-5%) scale(1);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }

  50% {
    transform: translateY(0) scale(1.05);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
}
</style>
