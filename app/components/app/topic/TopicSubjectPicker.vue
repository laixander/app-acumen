<script setup lang="ts">
const emit = defineEmits(['select'])

const categories = [
  {
    name: 'Mathematics',
    icon: 'i-lucide-calculator',
    color: 'blue',
    subjects: ['Algebra', 'Calculus', 'Statistics', 'Geometry', 'Trigonometry']
  },
  {
    name: 'Sciences',
    icon: 'i-lucide-beaker',
    color: 'emerald',
    subjects: ['Physics', 'Chemistry', 'Biology', 'Earth Science', 'Astronomy']
  },
  {
    name: 'Languages',
    icon: 'i-lucide-languages',
    color: 'orange',
    subjects: ['English', 'Spanish', 'French', 'German', 'Mandarin', 'Japanese']
  },
  {
    name: 'Humanities',
    icon: 'i-lucide-landmark',
    color: 'purple',
    subjects: ['History', 'Philosophy', 'Literature', 'Art History', 'Political Science']
  }
]

const selectedSubject = ref('')

const handleSelect = (subject: string) => {
  selectedSubject.value = subject
  emit('select', subject)
}
</script>

<template>
  <div class="space-y-12">
    <div class="text-center space-y-4">
      <h2 class="text-2xl font-bold text-neutral-900 dark:text-white">Pick a subject to master</h2>
      <p class="text-neutral-500 dark:text-neutral-400">Select from our universal curriculum aligned with global standards.</p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-8">
      <div v-for="category in categories" :key="category.name" class="space-y-4">
        <div class="flex items-center gap-3 px-2">
          <div :class="`p-2 rounded-lg bg-${category.color}-50 dark:bg-${category.color}-950/30 text-${category.color}-600 dark:text-${category.color}-400`">
            <UIcon :name="category.icon" class="w-5 h-5" />
          </div>
          <h3 class="font-bold text-neutral-900 dark:text-white uppercase tracking-wider text-xs">{{ category.name }}</h3>
        </div>
        
        <div class="flex flex-wrap gap-3">
          <UButton
            v-for="subject in category.subjects"
            :key="subject"
            :label="subject"
            variant="ghost"
            color="neutral"
            size="md"
            class="rounded-2xl border border-neutral-100 dark:border-neutral-800 bg-white dark:bg-neutral-900/50 hover:border-primary-500/50 hover:bg-primary-50 dark:hover:bg-primary-950/30 transition-all duration-300"
            :class="{ 'ring-2 ring-primary-500 bg-primary-50 dark:bg-primary-950/30 border-primary-500': selectedSubject === subject }"
            @click="handleSelect(subject)"
          />
        </div>
      </div>
    </div>
    
    <div class="pt-8 border-t border-neutral-100 dark:border-neutral-800 text-center">
      <p class="text-sm text-neutral-500 italic">
        "Math, Sciences, Languages, Humanities — universal principles, no upload needed."
      </p>
    </div>
  </div>
</template>
