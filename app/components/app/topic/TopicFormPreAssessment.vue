<script setup lang="ts">
const props = defineProps<{
    modelValue: any
}>()

const emit = defineEmits(['update:modelValue', 'complete'])

const questions = [
  {
    id: 1,
    type: 'multiple_choice',
    text: 'Which of the following best describes the primary goal of Acumen\'s personalized learning approach?',
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

const currentQuestionIndex = ref(0)
const currentQuestion = computed(() => questions[currentQuestionIndex.value])
const selectedOptionId = ref<string | null>(null)
const reasoning = ref('')
const showEvaluation = ref(false)
const isEvaluating = ref(false)

// Template Refs
const rootRef = ref<HTMLElement | null>(null)
const probingRef = ref<HTMLElement | null>(null)
const evaluationRef = ref<HTMLElement | null>(null)

const selectOption = async (optionId: string) => {
    if (selectedOptionId.value) return
    selectedOptionId.value = optionId
    
    await nextTick()
    probingRef.value?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const submitReasoning = () => {
    isEvaluating.value = true
    setTimeout(async () => {
        isEvaluating.value = false
        showEvaluation.value = true
        
        await nextTick()
        evaluationRef.value?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 2000)
}

const nextQuestion = async () => {
    if (currentQuestionIndex.value < questions.length - 1) {
        currentQuestionIndex.value++
        selectedOptionId.value = null
        reasoning.value = ''
        showEvaluation.value = false
        
        await nextTick()
        rootRef.value?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
        emit('complete')
    }
}
</script>

<template>
    <div ref="rootRef" class="flex flex-col gap-10 py-4 scroll-mt-20">
        <!-- Header -->
        <div class="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800 pb-6">
            <div class="flex flex-col gap-1">
                <span class="text-[10px] tracking-widest uppercase font-bold text-primary">Pre-Assessment</span>
                <h2 class="text-xl font-bold text-neutral-900 dark:text-white">
                    Diagnostic Quiz: {{ currentQuestionIndex + 1 }} of {{ questions.length }}
                </h2>
            </div>
            <div class="flex gap-1">
                <div 
                    v-for="(_, i) in questions" 
                    :key="i"
                    class="w-8 h-1 rounded-full transition-colors duration-300"
                    :class="i === currentQuestionIndex ? 'bg-primary-500' : (i < currentQuestionIndex ? 'bg-emerald-500' : 'bg-neutral-200 dark:bg-neutral-800')"
                ></div>
            </div>
        </div>

        <div v-if="currentQuestion" class="flex flex-col gap-12 max-w-3xl mx-auto w-full">
            <!-- Question Text -->
            <div class="text-2xl font-medium leading-relaxed text-neutral-900 dark:text-neutral-100">
                {{ currentQuestion.text }}
            </div>

            <!-- True/False Options -->
            <div v-if="currentQuestion.type === 'true_false'" class="grid grid-cols-2 gap-6">
                <button v-for="option in currentQuestion.options" :key="option.id"
                    @click="selectOption(option.id)" :disabled="!!selectedOptionId" :class="[
                        'flex flex-col items-center justify-center gap-4 p-10 rounded-[2rem] border-2 transition-all duration-500 group relative overflow-hidden',
                        selectedOptionId && option.id === currentQuestion.correct ? 'border-emerald-500 bg-emerald-500/5 ring-8 ring-emerald-500/5' : '',
                        selectedOptionId === option.id && option.id !== currentQuestion.correct ? 'border-red-500 bg-red-500/5 ring-8 ring-red-500/5' : '',
                        !selectedOptionId ? 'border-neutral-100 dark:border-neutral-800 hover:border-primary/50 hover:bg-neutral-50 dark:hover:bg-neutral-800/50' : '',
                        selectedOptionId && option.id !== currentQuestion.correct && selectedOptionId !== option.id ? 'opacity-40 scale-95' : ''
                    ]">
                    <div :class="[
                        'w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500',
                        selectedOptionId && option.id === currentQuestion.correct ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' :
                            selectedOptionId === option.id && option.id !== currentQuestion.correct ? 'bg-red-500 text-white shadow-lg shadow-red-500/20' :
                                option.id === 'true' ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : 'bg-rose-50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400'
                    ]">
                        <UIcon :name="option.id === 'true' ? 'i-lucide-check-circle-2' : 'i-lucide-x-circle'" class="w-8 h-8" />
                    </div>
                    <span class="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">{{ option.label }}</span>
                </button>
            </div>

            <!-- Multiple Choice Options -->
            <div v-else class="grid grid-cols-1 gap-4">
                <button v-for="option in currentQuestion.options" :key="option.id"
                    @click="selectOption(option.id)" :disabled="!!selectedOptionId" :class="[
                        'flex items-center gap-4 p-6 rounded-2xl border-2 transition-all duration-300 text-left group relative overflow-hidden',
                        selectedOptionId && option.id === currentQuestion.correct ? 'border-emerald-500 bg-emerald-500/5 ring-4 ring-emerald-500/5' : '',
                        selectedOptionId === option.id && option.id !== currentQuestion.correct ? 'border-red-500 bg-red-500/5 ring-4 ring-red-500/5' : '',
                        !selectedOptionId ? 'border-neutral-100 dark:border-neutral-800 hover:border-primary/50 hover:bg-neutral-50 dark:hover:bg-neutral-800/50' : '',
                        selectedOptionId && option.id !== currentQuestion.correct && selectedOptionId !== option.id ? 'opacity-40' : ''
                    ]">
                    <div :class="[
                        'w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm transition-colors',
                        selectedOptionId && option.id === currentQuestion.correct ? 'bg-emerald-500 text-white' :
                            selectedOptionId === option.id && option.id !== currentQuestion.correct ? 'bg-red-500 text-white' :
                                'bg-neutral-100 dark:bg-neutral-800 text-neutral-500'
                    ]">
                        {{ option.id.toUpperCase() }}
                    </div>
                    <span class="flex-1 font-medium text-neutral-900 dark:text-white">{{ option.label }}</span>
                    <UIcon v-if="selectedOptionId && option.id === currentQuestion.correct" name="i-lucide-check-circle-2" class="text-emerald-500 w-6 h-6 animate-fade-in" />
                    <UIcon v-else-if="selectedOptionId === option.id && option.id !== currentQuestion.correct" name="i-lucide-x-circle" class="text-red-500 w-6 h-6 animate-fade-in" />
                </button>
            </div>

            <!-- Probing Reasoning -->
            <Transition enter-active-class="transition duration-500 ease-out" enter-from-class="transform translate-y-8 opacity-0" enter-to-class="transform translate-y-0 opacity-100">
                <div v-if="selectedOptionId" ref="probingRef" class="flex flex-col gap-8 p-10 rounded-4xl bg-neutral-50 dark:bg-[#0a0a0a] border border-neutral-100 dark:border-neutral-800 shadow-2xl relative overflow-hidden scroll-mt-24">
                    <div class="flex items-center gap-2 text-[10px] tracking-[0.2em] font-bold uppercase text-primary relative z-10">
                        <div class="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
                        <span>Acumen AI</span>
                        <span class="text-neutral-300 dark:text-neutral-600">·</span>
                        <span class="text-neutral-500 dark:text-neutral-400">Probing Your Reasoning</span>
                    </div>

                    <div class="text-xl md:text-2xl leading-relaxed text-neutral-800 dark:text-neutral-200 italic relative z-10">
                        Interesting choice. Can you explain your reasoning for selecting <span class="text-primary not-italic font-bold">{{ currentQuestion.options.find(o => o.id === selectedOptionId)?.label }}</span>?
                    </div>

                    <div class="relative z-10 space-y-6">
                        <UTextarea v-model="reasoning" placeholder="Type your reasoning here..." :rows="4"
                                    :disabled="showEvaluation || isEvaluating" class="w-full relative z-10" :ui="{
                                        base: 'bg-neutral-50 dark:bg-neutral-900/50 border-neutral-200 dark:border-neutral-800 focus:border-primary/50 transition-all duration-300 text-lg py-4 px-6 rounded-2xl placeholder:text-neutral-400 dark:placeholder:text-neutral-700 focus:ring-primary/20'
                                    }" />
                        
                        <div v-if="!showEvaluation" class="flex justify-end">
                            <UButton 
                                label="Submit Reasoning" 
                                color="primary" 
                                size="xl" 
                                class="rounded-full px-8" 
                                :loading="isEvaluating"
                                :disabled="!reasoning"
                                @click="submitReasoning" 
                            />
                        </div>
                    </div>

                    <!-- Acumen Evaluates -->
                    <Transition enter-active-class="transition duration-500 ease-out" enter-from-class="transform translate-y-4 opacity-0" enter-to-class="transform translate-y-0 opacity-100">
                        <div v-if="showEvaluation" ref="evaluationRef" class="mt-8 pt-8 border-t border-neutral-200 dark:border-neutral-800 space-y-6 animate-in slide-in-from-bottom-4 duration-700 scroll-mt-24">
                            <div class="flex items-center gap-2 text-[10px] tracking-[0.2em] font-bold uppercase text-emerald-500">
                                <UIcon name="i-lucide-check-circle-2" />
                                <span>Acumen Evaluates</span>
                            </div>
                            
                            <p class="text-lg leading-relaxed text-neutral-700 dark:text-neutral-300">
                                Your reasoning is sound. You've identified the core principle here, which helps the AI calibrate your starting proficiency level. We'll focus more on advanced nuances in the upcoming lessons.
                            </p>

                            <div class="flex justify-end pt-4">
                                <UButton 
                                    :label="currentQuestionIndex === questions.length - 1 ? 'Finish Assessment' : 'Next Question'" 
                                    color="primary" 
                                    variant="solid" 
                                    size="xl" 
                                    class="rounded-full px-10" 
                                    trailing-icon="i-lucide-arrow-right"
                                    @click="nextQuestion" 
                                />
                            </div>
                        </div>
                    </Transition>
                </div>
            </Transition>
        </div>
    </div>
</template>
