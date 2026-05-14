<script setup lang="ts">
import type { AssessmentQuestion } from '~/types/topic'

defineProps<{
    modelValue: any
}>()

defineEmits(['update:modelValue', 'complete', 'back'])

const questions: AssessmentQuestion[] = [
  {
    id: 1,
    type: 'multiple_choice',
    text: "Which of the following best describes the primary goal of Acumen's personalized learning approach?",
    options: [
      { id: 'a', label: 'Memorizing facts for exams' },
      { id: 'b', label: 'Building deep conceptual mastery through AI-driven assessment' },
      { id: 'c', label: 'Speeding through lessons as fast as possible' },
      { id: 'd', label: 'Following a fixed curriculum for everyone' }
    ],
    correct: 'b'
  },
  {
    id: 2,
    type: 'true_false',
    text: 'Acumen uses your uploaded materials as the sole source of truth for jurisdiction-specific topics.',
    options: [
      { id: 'true', label: 'True' },
      { id: 'false', label: 'False' }
    ],
    correct: 'true'
  },
  {
    id: 3,
    type: 'multiple_choice',
    text: 'What happens after the AI indexes your uploaded materials?',
    options: [
      { id: 'a', label: 'It creates a fixed set of flashcards' },
      { id: 'b', label: 'It builds a personalized readiness plan and curriculum' },
      { id: 'c', label: 'It sends you a summary email' },
      { id: 'd', label: 'It asks you to pick a subject manually' }
    ],
    correct: 'b'
  }
]
</script>

<template>
    <div class="flex flex-col gap-10">
        <AppSessionActive 
            :questions="questions" 
            module-title="Pre-Assessment"
            @complete="$emit('complete')"
            @close="$emit('back')"
        />
    </div>
</template>
