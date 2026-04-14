<script setup lang="ts">
const props = defineProps<{
  modelValue: {
    assessments: Array<{ label: string; value: number }>
  }
}>()

const emit = defineEmits(['update:modelValue'])

const updateValue = (index: number, val: number | undefined) => {
  if (typeof val !== 'number') return
  
  const newAssess = props.modelValue.assessments.map((item, i) => 
    i === index ? { ...item, value: val } : item
  )
  emit('update:modelValue', { ...props.modelValue, assessments: newAssess })
}
</script>

<template>
  <div class="flex flex-col gap-8">
    <div class="flex items-center gap-4">
      <div class="p-3 bg-primary-100 dark:bg-primary-900/40 rounded-xl">
        <UIcon name="i-lucide-sparkles" class="text-2xl text-primary-500" />
      </div>
      <div>
        <h2 class="text-xl font-bold">Key Concepts & Proficiency</h2>
        <p class="text-sm text-neutral-500">Based on your materials, AI found these core topics. Rate your current confidence.</p>
      </div>
    </div>

    <div class="flex flex-col gap-6">
      <UCard 
        v-for="(item, index) in modelValue.assessments" 
        :key="item.label"
        variant="soft"
        class="bg-neutral-50 dark:bg-neutral-900/40 border-none"
        :ui="{ body: 'p-6 flex flex-col gap-6' }"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-6 h-6 rounded-md bg-white dark:bg-neutral-800 flex items-center justify-center text-[10px] font-bold shadow-sm border border-neutral-100 dark:border-neutral-700">
              {{ index + 1 }}
            </div>
            <h3 class="font-bold text-sm">{{ item.label }}</h3>
          </div>
          <span class="text-sm font-bold text-primary-500">{{ item.value }}%</span>
        </div>

        <div class="px-2">
          <USlider 
            :model-value="item.value" 
            @update:model-value="v => updateValue(index, v)"
            :min="0"
            :max="100"
            :step="5"
            color="primary"
          />
        </div>

        <div class="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-neutral-400 px-1">
          <span>Just Starting</span>
          <span>Comfortable</span>
          <span>Mastery</span>
        </div>
      </UCard>
    </div>
  </div>
</template>
