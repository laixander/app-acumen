<script setup lang="ts">
import type { AssessmentQuestion, AssessmentOption } from '~/types/topic'

const props = defineProps<{
    questions: AssessmentQuestion[]
    moduleTitle: string
}>()


const emit = defineEmits(['complete', 'close'])

const currentQuestionIndex = ref(0)
const currentQuestion = computed(() => props.questions[currentQuestionIndex.value])
const selectedOptionId = ref<string | null>(null)
const reasoningText = ref('')
const isReasoningSubmitted = ref(false)
const isEvaluating = ref(false)

const selectedOptionLabel = computed(() => {
    return currentQuestion.value?.options?.find((o: AssessmentOption) => o.id === selectedOptionId.value)?.label || ''
})


const selectOption = (id: string) => {
    if (selectedOptionId.value) return
    selectedOptionId.value = id
}


const handleReasoningSubmit = async (text: string) => {
    reasoningText.value = text
    isEvaluating.value = true
    await new Promise(r => setTimeout(r, 1500))
    isEvaluating.value = false
    isReasoningSubmitted.value = true
}

const nextQuestion = () => {
    if (currentQuestionIndex.value < props.questions.length - 1) {
        currentQuestionIndex.value++
        selectedOptionId.value = null
        reasoningText.value = ''
        isReasoningSubmitted.value = false
        isEvaluating.value = false
    } else {
        emit('complete')
    }
}
</script>

<template>
    <div v-if="currentQuestion" class="p-8 md:p-12 flex flex-col gap-10 animate-fade-in bg-white dark:bg-neutral-900">
        <!-- Progress Header -->
        <div class="flex items-center justify-between w-full max-w-3xl mx-auto border-b border-neutral-100 dark:border-neutral-800 pb-6">
            <div class="flex flex-col gap-1">
                <span class="text-[10px] tracking-widest uppercase font-bold text-primary">{{ moduleTitle }}</span>
                <h2 class="text-xl font-bold">Question {{ currentQuestionIndex + 1 }} of {{ questions.length }}</h2>
            </div>
            <UButton icon="i-lucide-x" color="neutral" variant="ghost" @click="$emit('close')" class="rounded-full" />
        </div>

        <div class="flex flex-col gap-12 w-full max-w-3xl mx-auto">
            <!-- Question Text -->
            <div class="text-2xl font-medium leading-relaxed text-neutral-900 dark:text-neutral-100">
                {{ currentQuestion.text }}
            </div>

            <!-- Assessment Options -->
            <div v-if="currentQuestion.type === 'true_false'" class="grid grid-cols-2 gap-6">
                <button v-for="option in currentQuestion.options" :key="option.id"
                    @click="selectOption(option.id)" :disabled="!!selectedOptionId" :class="[
                        'flex flex-col items-center justify-center gap-4 p-10 rounded-[2rem] border-2 transition-all duration-500 group relative overflow-hidden',
                        selectedOptionId && option.id === currentQuestion.correct ? 'border-green-500 bg-green-500/5 ring-8 ring-green-500/5' : '',
                        selectedOptionId === option.id && option.id !== currentQuestion.correct ? 'border-red-500 bg-red-500/5 ring-8 ring-red-500/5' : '',
                        !selectedOptionId ? 'border-neutral-100 dark:border-neutral-800 hover:border-primary/50 hover:bg-neutral-50 dark:hover:bg-neutral-800/50' : '',
                        selectedOptionId && option.id !== currentQuestion.correct && selectedOptionId !== option.id ? 'opacity-40 border-neutral-100 dark:border-neutral-800 scale-95' : ''
                    ]">
                    <div :class="[
                        'w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500',
                        selectedOptionId && option.id === currentQuestion.correct ? 'bg-green-500 text-white shadow-lg shadow-green-500/20' :
                            selectedOptionId === option.id && option.id !== currentQuestion.correct ? 'bg-red-500 text-white shadow-lg shadow-red-500/20' :
                                option.id === 'true' ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : 'bg-rose-50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400'
                    ]">
                        <UIcon :name="option.id === 'true' ? 'i-lucide-check-circle-2' : 'i-lucide-x-circle'" class="w-8 h-8" />
                    </div>
                    <span class="text-2xl font-bold tracking-tight">{{ option.label }}</span>
                </button>
            </div>

            <!-- Multiple Choice Options -->
            <div v-else class="grid grid-cols-1 gap-4">
                <button v-for="option in currentQuestion.options" :key="option.id"
                    @click="selectOption(option.id)" :disabled="!!selectedOptionId" :class="[
                        'flex items-center gap-4 p-6 rounded-2xl border-2 transition-all duration-300 text-left group relative overflow-hidden',
                        selectedOptionId && option.id === currentQuestion.correct ? 'border-green-500 bg-green-500/5 ring-4 ring-green-500/5' : '',
                        selectedOptionId === option.id && option.id !== currentQuestion.correct ? 'border-red-500 bg-red-500/5 ring-4 ring-red-500/5' : '',
                        !selectedOptionId ? 'border-neutral-100 dark:border-neutral-800 hover:border-primary/50 hover:bg-neutral-50 dark:hover:bg-neutral-800/50' : '',
                        selectedOptionId && option.id !== currentQuestion.correct && selectedOptionId !== option.id ? 'opacity-40 border-neutral-100 dark:border-neutral-800' : ''
                    ]">
                    <div :class="[
                        'w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm transition-colors',
                        selectedOptionId && option.id === currentQuestion.correct ? 'bg-green-500 text-white' :
                            selectedOptionId === option.id && option.id !== currentQuestion.correct ? 'bg-red-500 text-white' :
                                'bg-neutral-100 dark:bg-neutral-800 text-neutral-500'
                    ]">
                        {{ option.id.toUpperCase() }}
                    </div>
                    <span class="flex-1 font-medium">{{ option.label }}</span>
                    <UIcon v-if="selectedOptionId && option.id === currentQuestion.correct" name="i-lucide-check-circle-2" class="text-green-500 w-6 h-6 animate-fade-in" />
                    <UIcon v-else-if="selectedOptionId === option.id && option.id !== currentQuestion.correct" name="i-lucide-x-circle" class="text-red-500 w-6 h-6 animate-fade-in" />
                </button>
            </div>

            <!-- Probing Reasoning Section -->
            <Transition name="fade">
                <AppSessionProbingReasoning 
                    v-if="selectedOptionId"
                    :selected-option-label="selectedOptionLabel"
                    :is-evaluating="isEvaluating"
                    :is-reasoning-submitted="isReasoningSubmitted"
                    :next-button-label="currentQuestionIndex === questions.length - 1 ? 'Complete Session' : 'Next Question'"
                    @submit="handleReasoningSubmit"
                    @next="nextQuestion"
                />
            </Transition>
        </div>
    </div>
</template>
