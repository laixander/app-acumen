<script setup lang="ts">
defineProps<{
  currentStep: number
  steps: string[]
}>()
</script>

<template>
  <div class="w-full flex items-center justify-between mb-12 relative px-4 sm:px-12">
    <!-- Connecting Lines -->
    <div class="absolute top-1/2 left-0 w-full h-0.5 bg-neutral-200 dark:bg-neutral-800 -translate-y-1/2 z-0" />
    <div 
      class="absolute top-1/2 left-0 h-0.5 bg-primary-500 transition-all duration-500 ease-in-out -translate-y-1/2 z-0"
      :style="{ width: `${(currentStep / (steps.length - 1)) * 100}%` }"
    />

    <!-- Step Circles -->
    <div 
      v-for="(step, index) in steps" 
      :key="index"
      class="relative z-10 flex flex-col items-center gap-3 group"
    >
      <div 
        class="w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300"
        :class="[
          index <= currentStep 
            ? 'bg-white dark:bg-neutral-900 border-primary-500 text-primary-500 shadow-sm' 
            : 'bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 text-neutral-400'
        ]"
      >
        <UIcon 
          v-if="index < currentStep" 
          name="i-lucide-check" 
          class="text-xl" 
        />
        <span v-else class="text-sm font-bold">{{ index + 1 }}</span>
      </div>
      <span 
        class="absolute -bottom-8 whitespace-nowrap text-[10px] font-bold uppercase tracking-wider transition-colors duration-300"
        :class="[index <= currentStep ? 'text-primary-500' : 'text-neutral-400']"
      >
        {{ step }}
      </span>
    </div>
  </div>
</template>
