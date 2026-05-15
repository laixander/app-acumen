<script setup lang="ts">
import { useTopics } from '~/composables/useTopics'
import { useLessons } from '~/composables/useLessons'
import { injectAssessmentsIntoTimeline, generateBaseLessonsForTopic } from '~/utils/seeder'
import { slugify } from '~/utils/format'
import type { LearningGoal } from '~/types/topic'

const { user } = useUser()
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
    window.scrollTo({ top: 0, behavior: 'smooth' })
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

const resetFlow = () => {
    flowState.value = 'entry'
    creationMode.value = null
    // Reset form data if needed
    formData.title = ''
    formData.description = ''
    formData.files = []
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
        learningGoal: formData.learningGoal,
        createdBy: {
            id: 'user-1',
            name: user.value.profile.fullName,
            avatar: user.value.profile.avatar,
            role: 'Author'
        },
        stats: [
            { label: 'Master (Overall)', value: '0%', subtext: 'Analysis pending', icon: 'i-lucide-award' },
            { label: 'Pass Probability', value: '0%', subtext: 'Initial benchmark', icon: 'i-lucide-line-chart' },
            { label: 'Sessions This Week', value: '0', subtext: 'Ready to start', icon: 'i-lucide-calendar-days' }
        ],
        strongTopics: [],
        weakTopics: []
    })

    router.push('/app/dashboard')
}
</script>

<template>
    <UContainer class="lg:max-w-4xl py-10 flex flex-col grow gap-10">
        <!-- Breadcrumbs -->
        <nav v-if="flowState !== 'entry'" class="flex items-center gap-2 text-sm text-neutral-500">
            <button @click="resetFlow" class="hover:text-primary transition-colors cursor-pointer">Create</button>
            <UIcon name="i-lucide-chevron-right" class="w-3.5 h-3.5" />
            <span class="font-medium text-neutral-900 dark:text-neutral-100">{{ creationMode === 'upload' ? 'Materials'
                : 'Explore' }} Mode</span>
        </nav>

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
                <div v-if="flowState !== 'entry'"
                    class="flex flex-col gap-8 animate-in fade-in slide-in-from-top-4 duration-500">
                    <ContentHeading :title="`Create Topic: ${steps[currentStepIndex]}`" centered />
                    <AppTopicStepper :current-step="currentStepIndex" :steps="steps" />
                </div>

                <!-- Entry Point -->
                <div v-if="flowState === 'entry'">
                    <AppTopicDoorSelection @select-upload="selectMode('upload')"
                        @select-explore="selectMode('explore')" />
                </div>

                <!-- Step Content -->
                <UCard v-else
                    class="w-full relative border-none ring-1 ring-primary/20 shadow-2xl shadow-primary/5 overflow-hidden transition-all duration-500"
                    :ui="{ body: 'p-0 sm:p-0 relative' }">

                    <div class="min-h-full">
                        <Transition mode="out-in" enter-active-class="transition-all duration-300 ease-out"
                            enter-from-class="opacity-0 translate-y-4" enter-to-class="opacity-100 translate-y-0"
                            leave-active-class="transition-all duration-200 ease-in"
                            leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 -translate-y-4">

                            <div :key="flowState">
                                <!-- Setup Step -->
                                <template v-if="flowState === 'setup'">
                                    <AppTopicFormMaterials v-if="creationMode === 'upload'" :model-value="formData"
                                        @update:model-value="val => Object.assign(formData, val)"
                                        @upload-ready="handleUploadComplete" />
                                    <AppTopicSubjectPicker v-else-if="creationMode === 'explore'"
                                        @select="handleSubjectSelect" />
                                </template>

                                <!-- Assessment Step -->
                                <AppTopicFormPreAssessment v-else-if="flowState === 'assessment'" v-model="formData"
                                    @complete="handleAssessmentComplete" @back="prevStep" />

                                <!-- Review Step -->
                                <AppSessionReadinessPlan v-else-if="flowState === 'review'"
                                    :topic-title="formData.title" is-onboarding @close="handleFinish" />

                            </div>
                        </Transition>
                    </div>

                    <!-- Bottom Navigation -->
                    <!-- <div v-if="flowState === 'review'" class="flex items-center justify-center w-full mt-8">
                        <UButton 
                            label="Generate Plan"
                            trailing-icon="i-lucide-sparkles"  
                            variant="solid"
                            @click="nextStep" 
                            size="xl" color="primary"
                            class="rounded-full px-12 py-5 uppercase text-sm font-semibold tracking-[0.2em] hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30"
                        />
                    </div> -->

                </UCard>
            </div>
        </Transition>
    </UContainer>
</template>