<script setup lang="ts">
import { useOnboardingDraft } from '~/composables/useOnboardingDraft'
import { slugify } from '~/utils/format'
import type { LearningGoal } from '~/types/topic'

definePageMeta({ layout: false })

const { write } = useOnboardingDraft()

// Mirror new.vue's FlowState exactly
type FlowState = 'entry' | 'setup' | 'indexing' | 'assessment' | 'review'

const flowState = ref<FlowState>('entry')
const creationMode = ref<'upload' | 'explore' | 'prompt' | null>(null)
const isGenerating = ref(false)

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

// Mirror new.vue's steps/stepper
const steps = computed(() => {
    if (creationMode.value === 'explore') return ['Mode', 'Subject', 'Pre-Assessment', 'Plan']
    if (creationMode.value === 'prompt') return ['Mode', 'Pre-Assessment', 'Plan']
    return ['Mode', 'Materials', 'Pre-Assessment', 'Plan']
})

const currentStepIndex = computed(() => {
    if (flowState.value === 'entry') return 0
    if (flowState.value === 'setup' || flowState.value === 'indexing') return 1
    if (flowState.value === 'assessment') return creationMode.value === 'prompt' ? 1 : 2
    if (flowState.value === 'review') return creationMode.value === 'prompt' ? 2 : 3
    return 0
})

// Left panel label
const modeLabel = computed(() => {
    if (creationMode.value === 'upload') return 'Materials Mode'
    if (creationMode.value === 'explore') return 'Explore Mode'
    if (creationMode.value === 'prompt') return 'AI Prompt Mode'
    return 'Getting Started'
})

// Door selection handlers — mirror new.vue exactly
const selectMode = (mode: 'upload' | 'explore') => {
    creationMode.value = mode
    flowState.value = 'setup'
}

const handlePromptSelect = (prompt: string) => {
    formData.title = prompt
    formData.description = `AI-generated curriculum for: ${prompt}`
    creationMode.value = 'prompt'
    flowState.value = 'assessment'
}

const handleUploadComplete = () => {
    flowState.value = 'indexing'
    setTimeout(() => { flowState.value = 'assessment' }, 3500)
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

const prevStep = () => {
    if (flowState.value === 'setup') {
        flowState.value = 'entry'
        creationMode.value = null
    } else if (flowState.value === 'assessment') {
        if (creationMode.value === 'prompt') {
            flowState.value = 'entry'
            creationMode.value = null
        } else {
            flowState.value = 'setup'
        }
    } else if (flowState.value === 'review') {
        flowState.value = 'assessment'
    } else if (flowState.value === 'entry') {
        navigateTo('/')
    }
}

const resetFlow = () => {
    flowState.value = 'entry'
    creationMode.value = null
    formData.title = ''
    formData.description = ''
    formData.files = []
}

// Guest override: save draft → navigate to signup
const handleFinish = () => {
    isGenerating.value = true
}

const confirmFinish = () => {
    write({
        mode: creationMode.value,
        topic: formData.title,
        files: formData.files.map((f: any) => f.name ?? String(f)),
        quizComplete: true,
        createdAt: Date.now(),
    })
    navigateTo('/signup')
}
</script>

<template>
    <div class="fixed inset-0 grid grid-cols-1 lg:grid-cols-[340px_1fr] bg-background overflow-hidden">

        <!-- Left Panel -->
        <div class="hidden lg:flex flex-col bg-primary p-10 text-white relative overflow-hidden">
            <div class="absolute inset-0 pointer-events-none">
                <div class="absolute -top-32 -left-32 w-80 h-80 rounded-full bg-white/10" />
                <div class="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-black/10" />
            </div>

            <div class="relative z-10 mb-auto">
                <NuxtLink to="/" class="opacity-80 hover:opacity-100 transition-opacity">
                    <AppLogo name="Acumen" icon="i-lucide-brain-circuit" theme="white" naked />
                </NuxtLink>
            </div>

            <div class="relative z-10 flex-1 flex flex-col justify-center max-w-xs gap-6">
                <div class="p-3 w-fit rounded-2xl bg-white/15">
                    <UIcon name="i-lucide-brain-circuit" class="size-7 flex" />
                </div>
                <div>
                    <Transition mode="out-in" enter-active-class="transition-all duration-300"
                        enter-from-class="opacity-0 translate-y-2" enter-to-class="opacity-100 translate-y-0"
                        leave-active-class="transition-all duration-200"
                        leave-from-class="opacity-100" leave-to-class="opacity-0">
                        <div :key="modeLabel">
                            <p class="text-xs font-bold uppercase tracking-widest opacity-60 mb-2">{{ modeLabel }}</p>
                            <h1 class="text-3xl font-bold leading-tight mb-3">Experience the real thing.</h1>
                            <p class="text-sm font-light leading-relaxed opacity-75">
                                This is the actual Acumen topic creator. Sign up to save your plan and start learning.
                            </p>
                        </div>
                    </Transition>
                </div>
                <div class="space-y-2.5">
                    <div v-for="item in ['Full topic creation flow', 'AI-powered pre-assessment', 'Personalized lesson plan']" :key="item"
                        class="flex items-center gap-2.5 text-sm font-light">
                        <div class="size-5 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                            <UIcon name="i-lucide-check" class="size-3" />
                        </div>
                        {{ item }}
                    </div>
                </div>
            </div>

            <!-- Guest badge -->
            <div class="relative z-10 flex items-center gap-2 text-xs font-medium opacity-70">
                <UIcon name="i-lucide-eye" class="size-3.5" />
                Guest preview — no account needed yet
            </div>
        </div>

        <!-- Right Panel -->
        <div class="flex flex-col overflow-y-auto">
            <!-- Top Bar -->
            <div class="flex items-center justify-between px-8 py-4 border-b border-neutral-100 dark:border-neutral-800 shrink-0">
                <div class="flex items-center gap-2">
                    <div v-for="(label, i) in steps" :key="label" class="flex items-center gap-2">
                        <div class="flex items-center gap-1.5">
                            <div class="size-1.5 rounded-full transition-all duration-500"
                                :class="i <= currentStepIndex ? 'bg-primary w-4' : 'bg-neutral-300 dark:bg-neutral-700'" />
                            <span v-if="i <= currentStepIndex"
                                class="text-[10px] font-bold uppercase tracking-widest text-primary">{{ label }}</span>
                        </div>
                        <div v-if="i < steps.length - 1" class="w-5 h-px"
                            :class="i < currentStepIndex ? 'bg-primary/40' : 'bg-neutral-200 dark:bg-neutral-700'" />
                    </div>
                </div>

                <div class="flex items-center gap-3">
                    <button v-if="flowState !== 'entry'" @click="prevStep"
                        class="text-xs text-muted hover:text-primary transition-colors flex items-center gap-1">
                        <UIcon name="i-lucide-arrow-left" class="size-3.5" /> Back
                    </button>
                    <NuxtLink to="/"
                        class="text-xs text-muted hover:text-primary transition-colors flex items-center gap-1">
                        <UIcon name="i-lucide-x" class="size-3.5" /> Exit
                    </NuxtLink>
                </div>
            </div>

            <!-- Main content area -->
            <div class="flex-1 overflow-y-auto">
                <UContainer class="lg:max-w-4xl py-10 flex flex-col grow gap-10">

                    <Transition mode="out-in" enter-active-class="transition-all duration-300 ease-out"
                        enter-from-class="opacity-0 translate-y-4" enter-to-class="opacity-100 translate-y-0"
                        leave-active-class="transition-all duration-200 ease-in"
                        leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 -translate-y-4">

                        <!-- Generation Overlay -->
                        <div v-if="isGenerating" class="flex flex-col justify-center grow">
                            <AppTopicGenerating @finish="confirmFinish" />
                        </div>

                        <!-- Indexing Overlay (Upload only) -->
                        <div v-else-if="flowState === 'indexing'" class="flex flex-col justify-center grow">
                            <AppTopicAnalyzing />
                        </div>

                        <!-- Main Flow -->
                        <div v-else class="flex flex-col gap-8">

                            <!-- Stepper heading (shown after door selection) -->
                            <div v-if="flowState !== 'entry'"
                                class="flex flex-col gap-8 animate-in fade-in slide-in-from-top-4 duration-500">
                                <ContentHeading :title="`Create Topic: ${steps[currentStepIndex]}`" centered />
                                <AppTopicStepper :current-step="currentStepIndex" :steps="steps" />
                            </div>

                            <!-- Entry (Door Selection) -->
                            <div v-if="flowState === 'entry'">
                                <AppTopicDoorSelection
                                    @select-upload="selectMode('upload')"
                                    @select-explore="selectMode('explore')"
                                    @select-prompt="handlePromptSelect" />
                            </div>

                            <!-- Step Content Card -->
                            <UCard v-else
                                class="w-full relative border-none ring-1 ring-primary/20 shadow-2xl shadow-primary/5 overflow-hidden"
                                :ui="{ body: 'p-0 sm:p-0 relative' }">
                                <div class="min-h-full">
                                    <Transition mode="out-in" enter-active-class="transition-all duration-300 ease-out"
                                        enter-from-class="opacity-0 translate-y-4" enter-to-class="opacity-100 translate-y-0"
                                        leave-active-class="transition-all duration-200 ease-in"
                                        leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 -translate-y-4">
                                        <div :key="flowState">

                                            <!-- Setup Step -->
                                            <template v-if="flowState === 'setup'">
                                                <AppTopicFormMaterials v-if="creationMode === 'upload'"
                                                    :model-value="formData"
                                                    @update:model-value="val => Object.assign(formData, val)"
                                                    @upload-ready="handleUploadComplete" />
                                                <AppTopicSubjectPicker v-else-if="creationMode === 'explore'"
                                                    @select="handleSubjectSelect" />
                                            </template>

                                            <!-- Assessment Step -->
                                            <AppTopicFormPreAssessment v-else-if="flowState === 'assessment'"
                                                v-model="formData"
                                                @complete="handleAssessmentComplete"
                                                @back="prevStep" />

                                            <!-- Plan / Review Step -->
                                            <AppSessionReadinessPlan v-else-if="flowState === 'review'"
                                                :topic-title="formData.title"
                                                is-onboarding
                                                @close="handleFinish" />

                                        </div>
                                    </Transition>
                                </div>
                            </UCard>

                        </div>
                    </Transition>

                    <!-- Guest CTA (always visible below content) -->
                    <Transition enter-active-class="transition-all duration-500"
                        enter-from-class="opacity-0 translate-y-4" enter-to-class="opacity-100 translate-y-0">
                        <div v-if="flowState !== 'entry'"
                            class="flex items-center justify-between px-5 py-4 rounded-2xl border border-neutral-100 dark:border-neutral-800 bg-neutral-50/80 dark:bg-neutral-800/30">
                            <div>
                                <p class="text-sm font-semibold">Like what you see?</p>
                                <p class="text-xs text-muted">Sign up free to save this plan and start learning.</p>
                            </div>
                            <UButton label="Sign Up Free" to="/signup" color="primary" size="sm"
                                trailing-icon="i-lucide-arrow-right" class="rounded-full shrink-0" />
                        </div>
                    </Transition>

                </UContainer>
            </div>
        </div>
    </div>
</template>
