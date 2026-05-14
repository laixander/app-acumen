<script setup lang="ts">
import { useTopics } from '~/composables/useTopics'
import { useLessons } from '~/composables/useLessons'
import { injectAssessmentsIntoTimeline, generateBaseLessonsForTopic } from '~/utils/seeder'
import { slugify } from '~/utils/format'
import type { LearningGoal } from '~/types/topic'

const { addTopic } = useTopics()
const { addLessons, addLessonContents, addAssessments } = useLessons()
const router = useRouter()

// Flow States
type FlowState = 'entry' | 'setup' | 'indexing' | 'details' | 'schedule' | 'assessment' | 'review'
const flowState = ref<FlowState>('entry')
const creationMode = ref<'upload' | 'explore' | null>(null)

const steps = computed(() => {
    if (creationMode.value === 'explore') {
        return ['Mode', 'Subject', 'Pre-Assessment', 'Review']
    }
    return ['Mode', 'Materials', 'Pre-Assessment', 'Review']
})

const currentStepIndex = computed(() => {
    if (flowState.value === 'entry') return 0
    if (flowState.value === 'setup' || flowState.value === 'indexing') return 1
    if (flowState.value === 'assessment') return 2
    if (flowState.value === 'review') return 3
    return 0
})

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

const isGenerating = ref(false)

// Actions
const selectMode = (mode: 'upload' | 'explore') => {
    creationMode.value = mode
    flowState.value = 'setup'
}

const handleUploadComplete = () => {
    flowState.value = 'indexing'
    setTimeout(() => {
        flowState.value = 'assessment'
    }, 3500)
}

const handleSubjectSelect = (subject: string) => {
    formData.title = subject
    formData.description = `Universal curriculum for ${subject}`
    flowState.value = 'assessment'
}

const handleAssessmentComplete = () => {
    flowState.value = 'review'
}

const nextStep = () => {
    if (flowState.value === 'setup' && creationMode.value === 'upload') handleUploadComplete()
    else if (flowState.value === 'assessment') handleAssessmentComplete()
    else if (flowState.value === 'review') handleFinish()
}

const prevStep = () => {
    if (flowState.value === 'setup') {
        flowState.value = 'entry'
        creationMode.value = null
    }
    else if (flowState.value === 'assessment') flowState.value = 'setup'
    else if (flowState.value === 'review') flowState.value = 'assessment'
    else if (flowState.value === 'entry') router.push('/app/dashboard')
}

const handleFinish = () => {
    isGenerating.value = true
}

const confirmFinish = () => {
    const topicId = slugify(formData.title || 'Untitled Topic')

    const {
        baseLessons,
        baseContents,
        baseAssessments
    } = generateBaseLessonsForTopic(topicId, formData.title)

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
        tag: creationMode.value === 'upload' ? 'Materials' : 'Curriculum',
        status: 'Ongoing',
        lessons: `0/${newTimeline.length}`,
        lastStudied: 'Just now',
        lastStudiedAt: Date.now(),
        icon: creationMode.value === 'upload' ? 'i-lucide-file-text' : 'i-lucide-book-open',
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

            <!-- Generation Overlay -->
            <div v-if="isGenerating" class="flex flex-col justify-center grow">
                <AppTopicGenerating @finish="confirmFinish" />
            </div>

            <!-- Indexing Overlay (Upload Mode Only) -->
            <div v-else-if="flowState === 'indexing'" class="flex flex-col justify-center grow">
                <AppTopicAnalyzing />
            </div>

            <!-- Main Flow -->
            <div v-else class="flex flex-col gap-8">
                <!-- Stepper (Visible after mode selection) -->
                <div v-if="flowState !== 'entry'" class="flex flex-col gap-8 animate-in fade-in slide-in-from-top-4 duration-500">
                    <ContentHeading :title="`Create Topic: ${steps[currentStepIndex]}`" centered />
                    <AppTopicStepper :current-step="currentStepIndex" :steps="steps" />
                </div>

                <!-- Entry Point -->
                <div v-if="flowState === 'entry'">
                    <AppTopicDoorSelection 
                        @select-upload="selectMode('upload')" 
                        @select-explore="selectMode('explore')" 
                    />
                </div>

                <!-- Step Content -->
                <UCard v-else class="shadow-sm border-neutral-100 dark:border-neutral-800 overflow-visible"
                    :ui="{ body: 'p-8 sm:p-10 relative' }">
                    
                    <div class="min-h-full">
                        <Transition mode="out-in" enter-active-class="transition-all duration-300 ease-out"
                            enter-from-class="opacity-0 translate-y-4" enter-to-class="opacity-100 translate-y-0"
                            leave-active-class="transition-all duration-200 ease-in"
                            leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 -translate-y-4">
                            
                            <div :key="flowState">
                                <!-- Setup Step -->
                                <template v-if="flowState === 'setup'">
                                    <AppTopicFormMaterials 
                                        v-if="creationMode === 'upload'" 
                                        :model-value="formData"
                                        @update:model-value="val => Object.assign(formData, val)"
                                        @upload-ready="handleUploadComplete" 
                                    />
                                    <AppTopicSubjectPicker 
                                        v-else-if="creationMode === 'explore'" 
                                        @select="handleSubjectSelect" 
                                    />
                                </template>

                                <!-- Assessment Step -->
                                <AppTopicFormPreAssessment 
                                    v-else-if="flowState === 'assessment'" 
                                    v-model="formData" 
                                    @complete="handleAssessmentComplete"
                                />

                                <!-- Review Step -->
                                <AppTopicFormReview 
                                    v-else-if="flowState === 'review'" 
                                    :form-data="formData" 
                                />
                            </div>
                        </Transition>
                    </div>

                    <!-- Navigation Buttons (Side) -->
                    <div class="absolute top-0 -right-13 h-full pointer-events-none hidden lg:block">
                        <div class="sticky top-18 flex flex-col gap-2 pointer-events-auto">
                            <UTooltip :text="flowState === 'review' ? 'Generate Plan' : (flowState === 'setup' && creationMode === 'upload' ? 'Start Indexing' : 'Continue')" :delay-duration="0" :content="{
                                side: 'right', sideOffset: 8
                            }">
                                <UButton :icon="flowState === 'review' ? 'i-lucide-sparkles' : 'i-lucide-arrow-right'"
                                    variant="soft" size="xl" class="rounded-lg"
                                    :disabled="(flowState === 'setup' && creationMode === 'upload' && formData.files.length === 0) || flowState === 'assessment'"
                                    @click="nextStep" />
                            </UTooltip>
                            <UTooltip text="Back" :delay-duration="0" :content="{
                                side: 'right', sideOffset: 8
                            }">
                                <UButton icon="i-lucide-arrow-left" variant="soft"
                                    color="neutral" size="xl" class="rounded-lg" @click="prevStep" />
                            </UTooltip>
                        </div>
                    </div>

                    <!-- Bottom Navigation -->
                    <div class="flex items-center justify-between mt-8 sm:mt-10 pt-8 sm:pt-10 border-t border-default">
                        <UButton 
                            :label="flowState === 'setup' ? 'Cancel' : 'Back'"
                            :icon="flowState === 'setup' ? 'i-lucide-x' : 'i-lucide-arrow-left'" 
                            size="xl" 
                            variant="soft"
                            color="neutral" 
                            @click="prevStep" 
                        />

                        <UButton 
                            v-if="(flowState !== 'setup' || creationMode === 'upload') && flowState !== 'assessment'"
                            :label="flowState === 'review' ? 'Generate Plan' : (flowState === 'setup' && creationMode === 'upload' ? 'Start Indexing' : 'Continue')"
                            :trailing-icon="flowState === 'review' ? 'i-lucide-sparkles' : 'i-lucide-arrow-right'" 
                            color="primary"
                            size="xl" 
                            variant="solid"
                            :disabled="flowState === 'setup' && creationMode === 'upload' && formData.files.length === 0"
                            @click="nextStep" 
                        />
                    </div>
                </UCard>
            </div>
        </Transition>
    </UContainer>
</template>