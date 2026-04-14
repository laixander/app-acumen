<script setup lang="ts">
import type { LearningGoal } from '~/types/topic'

const props = defineProps<{
  formData: {
    title: string
    description: string
    learningGoal: LearningGoal
    duration: string
    availability: string
    files: any[]
    assessments: any[]
  }
}>()

const stats = [
  { label: 'Lessons', value: '12', icon: 'i-lucide-book-open' },
  { label: 'Quizzes', value: '4', icon: 'i-lucide-brain-circuit' },
  { label: 'Estimated', value: props.formData.duration, icon: 'i-lucide-clock' }
]
</script>

<template>
  <div class="flex flex-col gap-8">
    <div class="flex items-center gap-4">
      <div class="p-3 bg-primary-100 dark:bg-primary-900/40 rounded-xl">
        <UIcon name="i-lucide-check-circle" class="text-2xl text-primary-500" />
      </div>
      <div>
        <h2 class="text-xl font-bold">Ready to start?</h2>
        <p class="text-sm text-neutral-500">Review your learning path settings before we generate your first lessons.</p>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <UCard 
        v-for="stat in stats" 
        :key="stat.label" 
        variant="soft" 
        class="bg-primary-50 dark:bg-primary-900/10 border-none"
        :ui="{ body: 'flex flex-col items-center gap-2 p-4' }"
      >
        <UIcon :name="stat.icon" class="text-xl text-primary-500" />
        <p class="text-lg font-bold leading-none">{{ stat.value }}</p>
        <p class="text-[10px] font-bold uppercase tracking-widest text-neutral-400">{{ stat.label }}</p>
      </UCard>
    </div>

    <div class="flex flex-col gap-4">
        <h3 class="text-xs font-bold uppercase tracking-wider text-neutral-400">Path Summary</h3>
        <UCard class="bg-neutral-50 dark:bg-neutral-950/20 border-neutral-100 dark:border-neutral-800">
            <div class="flex flex-col gap-4">
                <div class="flex justify-between items-start border-b border-neutral-100 dark:border-neutral-800 pb-4">
                    <div>
                        <p class="text-xs text-neutral-500 uppercase font-bold tracking-tighter">Topic</p>
                        <p class="font-bold">{{ formData.title || 'Untitled Topic' }}</p>
                    </div>
                    <UBadge :label="formData.learningGoal" variant="soft" color="primary" />
                </div>
                
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <p class="text-xs text-neutral-500 uppercase font-bold tracking-tighter">Schedule</p>
                        <p class="text-sm">{{ formData.availability }}</p>
                    </div>
                    <div>
                        <p class="text-xs text-neutral-500 uppercase font-bold tracking-tighter">Materials</p>
                        <p class="text-sm">{{ formData.files.length }} files uploaded</p>
                    </div>
                </div>

                <div v-if="formData.description" class="pt-2">
                    <p class="text-xs text-neutral-500 uppercase font-bold tracking-tighter">Note</p>
                    <p class="text-sm italic text-neutral-600 dark:text-neutral-400">"{{ formData.description }}"</p>
                </div>
            </div>
        </UCard>
    </div>
  </div>
</template>
