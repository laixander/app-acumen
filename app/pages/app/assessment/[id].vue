<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useLessons } from '~/composables/useLessons'
import { ref, computed } from 'vue'

const route = useRoute()
const { getAssessmentByLessonId } = useLessons()

const { data: serverAssessmentData } = await useFetch(`/api/assessment/${route.params.id}`)
const localAssessmentData = getAssessmentByLessonId(route.params.id as string)

const assessmentData = computed(() => {
    return localAssessmentData || serverAssessmentData.value
})

const title = computed(() => {
    return assessmentData.value?.title || 'Assessment'
})

useHead({ title: `${title.value} - LearnFast Assessment` })

const currentQuestionIndex = ref(0)
const selectedAnswer = ref<string | null>(null)
const isCompleted = ref(false)

const questions = computed(() => assessmentData.value?.questions || [])

const progress = computed(() => {
    return Math.round((currentQuestionIndex.value / questions.value.length) * 100)
})

const currentQuestion = computed(() => questions.value[currentQuestionIndex.value]!)

const answers = ref<Record<string | number, string>>({})

const nextQuestion = () => {
    const question = currentQuestion.value
    if (question && selectedAnswer.value) {
        answers.value[question.id] = selectedAnswer.value
    }
    
    if (currentQuestionIndex.value < questions.value.length - 1) {
        currentQuestionIndex.value++
        const nextQ = questions.value[currentQuestionIndex.value]
        if (nextQ) {
            selectedAnswer.value = answers.value[nextQ.id] || null
        }
    } else {
        submitAssessment()
    }
}

const prevQuestion = () => {
    if (currentQuestionIndex.value > 0) {
        currentQuestionIndex.value--
        const prevQ = questions.value[currentQuestionIndex.value]
        if (prevQ) {
            selectedAnswer.value = answers.value[prevQ.id] || null
        }
    }
}

const submitAssessment = () => {
    isCompleted.value = true
}

const calculatedScore = computed(() => {
    let score = 0
    questions.value.forEach(q => {
        if (answers.value[q.id] === (q.correct as string)) score++
    })
    return Math.round((score / questions.value.length) * 100)
})

</script>

<template>
    <ContentPanel :title="title" back-link="/app/dashboard">
        <template #toolbar>
            <UBadge label="Quiz / Assessment" variant="subtle" color="rose" />
        </template>

        <div class="w-full lg:max-w-4xl mx-auto flex flex-col gap-6 py-6">
            
            <template v-if="!isCompleted">
                <!-- Progress Header -->
                <div class="flex flex-col gap-2 mb-4">
                    <div class="flex items-center justify-between text-sm font-semibold">
                        <span class="text-dimmed uppercase tracking-wider">Question {{ currentQuestionIndex + 1 }} of {{ questions.length }}</span>
                        <span class="text-primary">{{ progress }}% Completed</span>
                    </div>
                    <UProgress :model-value="progress" color="primary" size="sm" />
                </div>

                <!-- Quiz Card -->
                <UCard class="shadow-sm border border-neutral-200 dark:border-neutral-800" :ui="{ body: 'p-8 sm:p-12 flex flex-col gap-8' }">
                    <!-- Question Text -->
                    <h2 class="text-2xl sm:text-3xl font-bold leading-tight">
                        {{ currentQuestion.text }}
                    </h2>
                    
                    <!-- Options -->
                    <div class="flex flex-col gap-4">
                        <label v-for="option in currentQuestion.options" :key="option.id" 
                            class="flex items-center gap-4 p-5 rounded-xl border-2 transition-all duration-200 cursor-pointer group"
                            :class="[
                                selectedAnswer === option.id 
                                    ? 'border-primary bg-primary-50/50 dark:bg-primary-900/20' 
                                    : 'border-neutral-200 dark:border-neutral-800 hover:border-primary-500/50 hover:bg-neutral-50 dark:hover:bg-neutral-900/50'
                            ]">
                            <div class="w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors"
                                :class="selectedAnswer === option.id ? 'border-primary' : 'border-neutral-300 dark:border-neutral-700'">
                                <div v-if="selectedAnswer === option.id" class="w-3 h-3 rounded-full bg-primary" />
                            </div>
                            <input type="radio" :value="option.id" v-model="selectedAnswer" class="sr-only" />
                            <span class="text-lg font-medium" :class="{ 'text-primary-600 dark:text-primary-400': selectedAnswer === option.id }">
                                {{ option.label }}
                            </span>
                        </label>
                    </div>
                </UCard>

                <!-- Navigation Controls -->
                <div class="flex items-center justify-between mt-4">
                    <UButton 
                        @click="prevQuestion" 
                        :disabled="currentQuestionIndex === 0"
                        label="Previous" 
                        icon="i-lucide-arrow-left" 
                        color="neutral" 
                        variant="ghost" 
                        size="lg" />
                    
                    <UButton 
                        @click="nextQuestion" 
                        :disabled="!selectedAnswer"
                        :label="currentQuestionIndex === questions.length - 1 ? 'Submit Assessment' : 'Next Question'" 
                        :icon="currentQuestionIndex === questions.length - 1 ? 'i-lucide-check-circle' : 'i-lucide-arrow-right'" 
                        :trailing="true"
                        color="primary" 
                        size="lg" />
                </div>
            </template>

            <!-- Results State -->
            <template v-else>
                <UCard class="shadow-md text-center py-12" :ui="{ body: 'flex flex-col items-center gap-6' }">
                    <div class="relative w-40 h-40 flex items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-900">
                        <!-- Simulated circular progress -->
                        <svg class="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" stroke-width="10" class="text-neutral-200 dark:text-neutral-800" />
                            <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" stroke-width="10" 
                                :class="calculatedScore > 70 ? 'text-green-500' : 'text-amber-500'"
                                :stroke-dasharray="283" 
                                :stroke-dashoffset="283 - (283 * calculatedScore) / 100"
                                stroke-linecap="round" />
                        </svg>
                        <div class="flex flex-col items-center">
                            <span class="text-4xl font-extrabold" :class="calculatedScore > 70 ? 'text-green-500' : 'text-amber-500'">{{ calculatedScore }}%</span>
                            <span class="text-xs text-dimmed uppercase tracking-wider font-semibold">Score</span>
                        </div>
                    </div>

                    <div class="max-w-md mx-auto">
                        <h2 class="text-3xl font-bold">{{ calculatedScore > 70 ? 'Great job!' : 'Needs some review.' }}</h2>
                        <p class="text-muted mt-2">
                            {{ calculatedScore > 70 
                                ? "You've successfully mastered the key concepts in this lesson snippet. Your AI tutor has logged your progress." 
                                : "You passed, but there's room for improvement. The AI tutor recommends reviewing the provided materials again." 
                            }}
                        </p>
                    </div>

                    <div class="flex items-center gap-4 mt-6">
                        <UButton label="Review Answers" icon="i-lucide-rotate-ccw" color="neutral" variant="ghost" size="lg" />
                        <UButton label="Return to Topic" icon="i-lucide-arrow-right" trailing color="primary" size="lg" to="/app/dashboard" />
                    </div>
                </UCard>
            </template>

        </div>
    </ContentPanel>
</template>
