<script setup lang="ts">
import { useTopics } from '~/composables/useTopics'
import { useLessons } from '~/composables/useLessons'
import { injectAssessmentsIntoTimeline, generateBaseLessonsForTopic } from '~/utils/seeder'
import { slugify } from '~/utils/format'
import type { LearningGoal, LessonOverview, LessonContent, Assessment } from '~/types/topic'

const { addTopic } = useTopics()
const { addLessons, addLessonContents, addAssessments } = useLessons()
const router = useRouter()

const steps = ['Basic Info', 'Schedule', 'Materials', 'Assessment', 'Review']
const currentStep = ref(0)

const formData = reactive({
    title: '',
    description: '',
    learningGoal: 'Mastery' as LearningGoal,
    duration: '2 weeks',
    availability: 'Standard (5-7h/week)',
    files: [] as any[],
    assessments: [
        { label: 'Core Fundamentals', value: 50 },
        { label: 'Advanced Optimization', value: 30 },
        { label: 'Best Practices', value: 20 },
        { label: 'Real-world Application', value: 10 }
    ]
})

const updateFormData = (val: any) => {
    Object.assign(formData, val)
}

const isAnalyzing = ref(false)
const isGenerating = ref(false)

const isLastStep = computed(() => currentStep.value === steps.length - 1)

const nextStep = () => {
    if (isLastStep.value) {
        handleFinish()
    } else if (currentStep.value === 2) {
        // Move to Assessment step but show analyzing first
        currentStep.value++
        isAnalyzing.value = true
        setTimeout(() => {
            isAnalyzing.value = false
        }, 3500)
    } else {
        currentStep.value++
    }
}

const prevStep = () => {
    if (currentStep.value > 0) {
        currentStep.value--
    } else {
        router.push('/app/dashboard')
    }
}

const handleFinish = () => {
    isGenerating.value = true
}

const confirmFinish = () => {
    const topicId = slugify(formData.title || 'Untitled Topic')

    // Use centralized logic to generate lessons
    const {
        baseLessons,
        baseContents,
        baseAssessments
    } = generateBaseLessonsForTopic(topicId, formData.title)

    // Inject assessments into the timeline (reviews/quizzes)
    const {
        newTimeline,
        newAssessments,
        newContents: injectedContents
    } = injectAssessmentsIntoTimeline(topicId, formData.title, baseLessons, 0, baseLessons.length, false, baseAssessments)

    addLessons(newTimeline)
    addLessonContents([...baseContents, ...injectedContents])
    addAssessments(newAssessments)

    addTopic({
        title: formData.title || 'Untitled Topic',
        progress: 0,
        tag: 'New',
        status: 'Ongoing',
        lessons: `0/${newTimeline.length}`,
        lastStudied: 'Just now',
        lastStudiedAt: Date.now(),
        icon: 'i-lucide-sparkles',
        isPinned: false,
        learningGoal: formData.learningGoal
    })

    router.push('/app/dashboard')
}
</script>

<template>
    <UContainer class="lg:max-w-4xl py-10 flex flex-col grow">
        <Transition mode="out-in" enter-active-class="transition-all duration-300 ease-out"
            enter-from-class="opacity-0 translate-y-4" enter-to-class="opacity-100 translate-y-0"
            leave-active-class="transition-all duration-200 ease-in" leave-from-class="opacity-100 translate-y-0"
            leave-to-class="opacity-0 -translate-y-4">

            <div v-if="isGenerating" class="flex flex-col justify-center grow">
                <AppTopicGenerating @finish="confirmFinish" />
            </div>

            <div v-else-if="isAnalyzing" class="flex flex-col justify-center grow">
                <AppTopicAnalyzing />
            </div>

            <div v-else class="flex flex-col gap-4">
                <div class="flex flex-col gap-8" v-if="!isGenerating && !isAnalyzing">
                    <ContentHeading :title="`Create New Topic - ${steps[currentStep]}`" centered />
                    <AppTopicStepper :current-step="currentStep" :steps="steps" />
                </div>

                <UCard class="shadow-sm border-neutral-100 dark:border-neutral-800 overflow-visible"
                    :ui="{ body: 'p-8 sm:p-10 relative' }">
                    <!-- Step Content -->
                    <div class="min-h-full">
                        <Transition mode="out-in" enter-active-class="transition-all duration-300 ease-out"
                            enter-from-class="opacity-0 translate-y-4" enter-to-class="opacity-100 translate-y-0"
                            leave-active-class="transition-all duration-200 ease-in"
                            leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 -translate-y-4">
                            <div :key="currentStep">
                                <AppTopicFormBasic v-if="currentStep === 0" :model-value="formData"
                                    @update:model-value="updateFormData" />
                                <AppTopicFormSchedule v-else-if="currentStep === 1" :model-value="formData"
                                    @update:model-value="updateFormData" />
                                <AppTopicFormMaterials v-else-if="currentStep === 2" :model-value="formData"
                                    @update:model-value="updateFormData" />
                                <AppTopicFormAssessment v-else-if="currentStep === 3" :model-value="formData"
                                    @update:model-value="updateFormData" />
                                <AppTopicFormReview v-else-if="currentStep === 4" :form-data="formData" />
                            </div>
                        </Transition>
                    </div>

                    <!-- Navigation Buttons -->
                    <div class="absolute top-0 -right-13 h-full pointer-events-none">
                        <div class="sticky top-18 flex flex-col gap-2 pointer-events-auto">
                            <UTooltip :text="isLastStep ? 'Generate Plan' : 'Continue'" :delay-duration="0" :content="{
                                side: 'right', sideOffset: 8
                            }">
                                <UButton :icon="isLastStep ? 'i-lucide-sparkles' : 'i-lucide-arrow-right'"
                                    variant="soft" size="xl" class="rounded-lg"
                                    :disabled="(currentStep === 0 && (!formData.title || formData.title.toLowerCase().split(/\s+/).includes('new')))"
                                    @click="nextStep" />
                            </UTooltip>
                            <UTooltip :text="currentStep === 0 ? 'Cancel' : 'Back'" :delay-duration="0" :content="{
                                side: 'right', sideOffset: 8
                            }">
                                <UButton :icon="currentStep === 0 ? 'i-lucide-x' : 'i-lucide-arrow-left'" variant="soft"
                                    color="neutral" size="xl" class="rounded-lg" @click="prevStep" />
                            </UTooltip>
                        </div>
                    </div>
                    <div class="flex items-center justify-between mt-8 sm:mt-10 pt-8 sm:pt-10 border-t border-default">
                        <UButton :label="currentStep === 0 ? 'Cancel' : 'Back'"
                            :icon="currentStep === 0 ? 'i-lucide-x' : 'i-lucide-arrow-left'" size="xl" variant="soft"
                            color="neutral" @click="prevStep" />

                        <UButton :label="isLastStep ? 'Generate Plan' : 'Continue'"
                            :trailing-icon="isLastStep ? 'i-lucide-sparkles' : 'i-lucide-arrow-right'" color="primary"
                            size="xl" variant="solid"
                            :disabled="(currentStep === 0 && (!formData.title || formData.title.toLowerCase().split(/\s+/).includes('new')))"
                            @click="nextStep" />
                    </div>
                </UCard>
            </div>
        </Transition>
    </UContainer>
</template>