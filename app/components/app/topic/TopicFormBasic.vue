<script setup lang="ts">
import type { LearningGoal } from '~/types/topic'

const props = defineProps<{
    modelValue: {
        title: string
        description: string
        learningGoal: LearningGoal
    }
}>()

const emit = defineEmits(['update:modelValue'])

const goals: { label: LearningGoal; icon: string; description: string }[] = [
    { label: 'Mastery', icon: 'i-lucide-award', description: 'Deep dive into every concept.' },
    { label: 'Overview', icon: 'i-lucide-search', description: 'High-level summary of materials.' },
    { label: 'Project Based', icon: 'i-lucide-code', description: 'Focus on practical application.' },
    { label: 'Exam Prep', icon: 'i-lucide-clipboard-list', description: 'Targeted study for assessments.' }
]

const updateField = (field: string, value: any) => {
    emit('update:modelValue', { ...props.modelValue, [field]: value })
}
</script>

<template>
    <div class="flex flex-col gap-8">
        <div class="flex items-center gap-4">
            <div class="p-3 bg-primary-100 dark:bg-primary-900/40 rounded-xl">
                <UIcon name="i-lucide-book" class="text-2xl text-primary-500" />
            </div>
            <div>
                <h2 class="text-xl font-bold">Tell us what you want to learn</h2>
                <p class="text-sm text-neutral-500">The more detail you provide, the better AI can customize your path.
                </p>
            </div>
        </div>

        <div class="flex flex-col gap-6">
            <UFormField label="Topic Title" help="e.g. Machine Learning Fundamentals">
                <UInput :model-value="modelValue.title" @update:model-value="v => updateField('title', v)"
                    placeholder="Enter the main topic..." size="xl" class="w-full bg-neutral-50 dark:bg-neutral-900" />
            </UFormField>

            <UFormField label="Detailed Description"
                help="What specific areas do you want to cover? Any prerequisites?">
                <UTextarea :model-value="modelValue.description"
                    @update:model-value="v => updateField('description', v)" placeholder="Add more context here..."
                    size="xl" :rows="4" class="w-full bg-neutral-50 dark:bg-neutral-900" />
            </UFormField>

            <div class="flex flex-col gap-3">
                <label class="text-sm font-medium">What is your learning goal?</label>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <UCard v-for="goal in goals" :key="goal.label" class="cursor-pointer transition-all duration-200"
                        :class="[
                            modelValue.learningGoal === goal.label
                                ? 'ring-2 ring-primary-500 bg-primary-50 dark:bg-primary-900/20 border-transparent'
                                : 'hover:border-primary-300 dark:hover:border-primary-700'
                        ]" :ui="{ body: 'p-4 flex items-center gap-4' }"
                        @click="updateField('learningGoal', goal.label)">
                        <div class="p-2 rounded-lg"
                            :class="modelValue.learningGoal === goal.label ? 'bg-primary-500 text-white' : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-500'">
                            <UIcon :name="goal.icon" class="text-xl" />
                        </div>
                        <div>
                            <p class="font-bold text-sm">{{ goal.label }}</p>
                            <p class="text-xs text-neutral-500">{{ goal.description }}</p>
                        </div>
                        <div v-if="modelValue.learningGoal === goal.label" class="ml-auto">
                            <UIcon name="i-lucide-check-circle" class="text-primary-500 text-xl" />
                        </div>
                    </UCard>
                </div>
            </div>
        </div>
    </div>
</template>
