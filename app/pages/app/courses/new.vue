<script setup lang="ts">

import { slugify } from '~/utils/format'
import type { LearningGoal } from '~/types/course'
import { useOnboardingDraft } from '~/composables/useOnboardingDraft'

const userStore = useUserStore()
const courseStore = useCourseStore()
const lessonStore = useLessonStore()
const router = useRouter()

// Register unsaved-changes guard so WorkspaceMenu can intercept mid-wizard switches
const { registerUnsavedCheck } = useUnsavedChanges()
const unregister = registerUnsavedCheck(() => flowState.value !== 'entry' && !isGenerating.value)
onUnmounted(unregister)

// Flow States
type FlowState = 'entry' | 'setup' | 'indexing' | 'processing' | 'details' | 'schedule' | 'assessment' | 'review'

// Bootstrap from dashboard redirect — read query synchronously to avoid flash on first render
const route = useRoute()
const _qMode = route.query.mode as string | undefined
const _qStep = route.query.step as string | undefined

const flowState = ref<FlowState>(
    _qMode === 'upload' && _qStep === 'indexing' ? 'indexing'
        : _qMode === 'prompt' ? 'processing'
            : _qMode === 'explore' ? 'processing'
                : 'entry'
)
const creationMode = ref<'upload' | 'explore' | 'prompt' | null>(
    _qMode === 'upload' ? 'upload'
        : _qMode === 'explore' ? 'explore'
            : _qMode === 'prompt' ? 'prompt'
                : null
)

onMounted(() => {
    const promptParam = route.query.prompt as string | undefined
    const subjectParam = route.query.subject as string | undefined

    // Consume onboarding draft from guest /start flow
    if (route.query.from === 'onboarding') {
        const { read, clear } = useOnboardingDraft()
        const draft = read()
        if (draft) {
            const mode = draft.mode ?? 'prompt'
            creationMode.value = mode

            formData.title = draft.course || 'Untitled Course'
            formData.description = draft.description || ''
            if (draft.learningGoal) formData.learningGoal = draft.learningGoal as any
            if (draft.targetFinishDate) formData.targetFinishDate = draft.targetFinishDate
            if (draft.sessionsPerWeek) formData.sessionsPerWeek = draft.sessionsPerWeek
            if (draft.itemsPerWeek) formData.itemsPerWeek = draft.itemsPerWeek

            if (mode === 'upload' && (!formData.title || formData.title === 'Untitled Course')) {
                formData.title = draft.files[0] ?? 'Uploaded Material'
                if (!formData.description) formData.description = `Curriculum built from: ${draft.files.join(', ')}`
            } else if (mode === 'explore') {
                if (!formData.title) formData.title = draft.course
                if (!formData.description) formData.description = `Universal curriculum for ${draft.course}`
            } else {
                if (!formData.title) formData.title = draft.course
                if (!formData.description) formData.description = `AI-generated curriculum for: ${draft.course}`
            }

            // User already completed details and pre-assessment in onboarding, skip to review plan
            flowState.value = 'review'

            clear()
            return
        }
    }

    if (_qMode === 'prompt' && promptParam) {
        formData.title = promptParam
        formData.description = `AI-generated curriculum for: ${promptParam}`
        setTimeout(() => { flowState.value = 'details' }, 3500)
    } else if (_qMode === 'explore' && subjectParam) {
        formData.title = subjectParam
        formData.description = `Universal curriculum for ${subjectParam}`
        setTimeout(() => { flowState.value = 'details' }, 3500)
    } else if (_qMode === 'upload' && _qStep === 'indexing') {
        const queryFiles = route.query.files as string | undefined
        if (queryFiles) {
            const filesList = queryFiles.split(',')
            formData.title = filesList[0]?.replace(/\.[^/.]+$/, "") || 'Uploaded Material'
            formData.description = `Curriculum built from: ${filesList.join(', ')}`
        } else {
            formData.title = 'Uploaded Material'
            formData.description = 'Curriculum built from uploaded material'
        }
        setTimeout(() => { flowState.value = 'details' }, 3500)
    }
})

const steps = computed(() => {
    if (creationMode.value === 'explore') {
        return ['Mode', 'Subject', 'Details', 'Pre-Assessment', 'Plan']
    }
    if (creationMode.value === 'prompt') {
        return ['Mode', 'Details', 'Pre-Assessment', 'Plan']
    }
    return ['Mode', 'Materials', 'Details', 'Pre-Assessment', 'Plan']
})

const currentStepIndex = computed(() => {
    if (flowState.value === 'entry') return 0
    if (flowState.value === 'setup' || flowState.value === 'indexing') return 1
    if (flowState.value === 'processing' || flowState.value === 'details') {
        if (creationMode.value === 'prompt') return 1
        return 2 // explore/upload
    }
    if (flowState.value === 'assessment') {
        if (creationMode.value === 'prompt') return 2
        return 3 // upload/explore
    }
    if (flowState.value === 'review') {
        if (creationMode.value === 'prompt') return 3
        return 4 // upload/explore
    }
    return 0
})

const formData = reactive({
    title: '',
    description: '',
    learningGoal: 'Deep Mastery' as LearningGoal,
    targetFinishDate: '',
    sessionsPerWeek: 3,
    itemsPerWeek: 5,
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
    
    // Prefill details based on uploaded files
    if (formData.files && formData.files.length > 0) {
        const firstFile = formData.files[0]
        const baseName = firstFile.name ? firstFile.name.replace(/\.[^/.]+$/, "") : 'Uploaded Material'
        formData.title = baseName
        const fileNames = formData.files.map(f => f.name).join(', ')
        formData.description = `Curriculum built from: ${fileNames}`
    }
    
    setTimeout(() => {
        flowState.value = 'details'
    }, 3500)
}

const handleSubjectSelect = (subject: string) => {
    formData.title = subject
    formData.description = `Universal curriculum for ${subject}`
    flowState.value = 'processing'
    setTimeout(() => { flowState.value = 'details' }, 3500)
}

const handlePromptSelect = (prompt: string) => {
    formData.title = prompt
    formData.description = `AI-generated curriculum for: ${prompt}`
    creationMode.value = 'prompt'
    flowState.value = 'processing'
    setTimeout(() => { flowState.value = 'details' }, 3500)
}

const handleAssessmentComplete = () => {
    flowState.value = 'review'
    window.scrollTo({ top: 0, behavior: 'smooth' })
}

const nextStep = () => {
    if (flowState.value === 'setup' && creationMode.value === 'upload') handleUploadComplete()
    else if (flowState.value === 'details') flowState.value = 'assessment'
    else if (flowState.value === 'assessment') handleAssessmentComplete()
    else if (flowState.value === 'review') handleFinish()
}

const prevStep = () => {
    if (flowState.value === 'setup') {
        flowState.value = 'entry'
        creationMode.value = null
    }
    else if (flowState.value === 'details') {
        if (creationMode.value === 'prompt') {
            flowState.value = 'entry'
            creationMode.value = null
        } else {
            flowState.value = 'setup'
        }
    }
    else if (flowState.value === 'assessment') {
        flowState.value = 'details'
    }
    else if (flowState.value === 'review') {
        flowState.value = 'assessment'
    }
    else if (flowState.value === 'entry') {
        router.push('/app/dashboard')
    }
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

const confirmFinish = async () => {
    const courseId = slugify(formData.title || 'Untitled Course') + '-' + Math.random().toString(36).substr(2, 5)

    try {
        const { timeline, contents, assessments } = await $fetch('/api/courses/generate-timeline', {
            method: 'POST',
            body: { courseId, courseTitle: formData.title || 'Untitled Course' }
        })

        lessonStore.addLessons(timeline)
        lessonStore.addLessonContents(contents)
        lessonStore.addAssessments(assessments)

        courseStore.addCourse({ id: courseId,
            title: formData.title || 'Untitled Course',
            progress: 0,
            tag: creationMode.value === 'upload' ? 'Materials' : 'Curriculum',
            status: 'Ongoing',
            lessons: `0/${timeline.length}`,
            lastStudied: 'Just now',
            lastStudiedAt: Date.now(),
            icon: creationMode.value === 'upload' ? 'i-lucide-file-text' : creationMode.value === 'prompt' ? 'i-lucide-sparkles' : 'i-lucide-book-open',
            isPinned: false,
            learningGoal: formData.learningGoal,
            description: formData.description,
            targetFinishDate: formData.targetFinishDate ? new Date(formData.targetFinishDate).getTime() : undefined,
            sessionsPerWeek: formData.sessionsPerWeek,
            itemsPerWeek: formData.itemsPerWeek,
            createdBy: {
                id: 'user-1',
                name: userStore.profile.fullName,
                avatar: userStore.profile.avatar,
                role: 'Author'
            },
            stats: [
                { label: 'Master (Overall)', value: '0%', subtext: 'Analysis pending', icon: 'i-lucide-award' },
                { label: 'Pass Probability', value: '0%', subtext: 'Initial benchmark', icon: 'i-lucide-line-chart' },
                { label: 'Sessions This Week', value: '0', subtext: 'Ready to start', icon: 'i-lucide-calendar-days' }
            ],
            strongCourses: [],
            weakCourses: []
        })

        router.push('/app/dashboard')
    } catch (e) {
        console.error('Failed to generate course timeline:', e)
        isGenerating.value = false
    }
}
</script>

<template>
    <UContainer class="lg:max-w-4xl py-10 flex flex-col grow min-h-full gap-10">
        <!-- Breadcrumbs -->
        <nav v-if="flowState !== 'entry'" class="flex items-center gap-2 text-sm text-neutral-500">
            <button @click="resetFlow" class="hover:text-primary transition-colors cursor-pointer">Create</button>
            <UIcon name="i-lucide-chevron-right" class="w-3.5 h-3.5" />
            <span class="font-medium text-neutral-900 dark:text-neutral-100">
                {{ creationMode === 'upload' ? 'Materials' : creationMode === 'prompt' ? 'AI Prompt' : 'Explore' }} Mode
            </span>
        </nav>

        <Transition mode="out-in" enter-active-class="transition-all duration-300 ease-out"
            enter-from-class="opacity-0 translate-y-4" enter-to-class="opacity-100 translate-y-0"
            leave-active-class="transition-all duration-200 ease-in" leave-from-class="opacity-100 translate-y-0"
            leave-to-class="opacity-0 -translate-y-4">

            <!-- Generation Overlay -->
            <div v-if="isGenerating" class="flex flex-col justify-center grow">
                <AppCourseGenerating @finish="confirmFinish" />
            </div>

            <!-- Indexing Overlay (Upload Mode Only) -->
            <div v-else-if="flowState === 'indexing'" class="flex flex-col justify-center grow">
                <AppCourseAnalyzing />
            </div>

            <!-- Processing Overlay (Explore & Prompt Modes) -->
            <div v-else-if="flowState === 'processing'" class="flex flex-col justify-center grow">
                <AppCourseProcessing :mode="creationMode" />
            </div>

            <!-- Main Flow -->
            <div v-else class="flex flex-col gap-8">
                <!-- Stepper (Visible after mode selection) -->
                <div v-if="flowState !== 'entry'"
                    class="flex flex-col gap-8 animate-in fade-in slide-in-from-top-4 duration-500">
                    <!-- <ContentHeading :title="`Create Course: ${steps[currentStepIndex]}`" centered /> -->
                    <AppCourseStepper :current-step="currentStepIndex" :steps="steps" />
                </div>

                <!-- Entry Point -->
                <div v-if="flowState === 'entry'">
                    <AppCourseDoorSelection @select-upload="selectMode('upload')" @select-explore="selectMode('explore')"
                        @select-prompt="handlePromptSelect" />
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
                                    <AppCourseFormMaterials v-if="creationMode === 'upload'" :model-value="formData"
                                        @update:model-value="val => Object.assign(formData, val)"
                                        @upload-ready="handleUploadComplete" />
                                    <AppCourseSubjectPicker v-else-if="creationMode === 'explore'"
                                        @select="handleSubjectSelect" />
                                </template>

                                <!-- Details Step -->
                                <AppCourseFormBasic v-else-if="flowState === 'details'" :model-value="formData"
                                    @update:model-value="val => Object.assign(formData, val)" @next="nextStep"
                                    @back="prevStep" />

                                <!-- Assessment Step -->
                                <AppCourseFormPreAssessment v-else-if="flowState === 'assessment'"
                                    :model-value="formData" @update:model-value="val => Object.assign(formData, val)"
                                    @complete="handleAssessmentComplete" @back="prevStep" />

                                <!-- Review Step -->
                                <AppSessionReadinessPlan v-else-if="flowState === 'review'"
                                    :course-title="formData.title" is-onboarding @close="handleFinish" />

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