<script setup lang="ts">
import { useOnboardingDraft } from '~/composables/useOnboardingDraft'
import { slugify } from '~/utils/format'
import type { LearningGoal } from '~/types/topic'

definePageMeta({ layout: false })

const { write } = useOnboardingDraft()

// Mirror new.vue's FlowState exactly
type FlowState = 'entry' | 'setup' | 'indexing' | 'processing' | 'assessment' | 'review'

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
    if (flowState.value === 'processing' || flowState.value === 'assessment') return creationMode.value === 'prompt' ? 1 : 2
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
    flowState.value = 'processing'
    setTimeout(() => { flowState.value = 'assessment' }, 3500)
}

const handleUploadComplete = () => {
    flowState.value = 'indexing'
    setTimeout(() => { flowState.value = 'assessment' }, 3500)
}

const handleSubjectSelect = (subject: string) => {
    formData.title = subject
    formData.description = `Universal curriculum for ${subject}`
    flowState.value = 'processing'
    setTimeout(() => { flowState.value = 'assessment' }, 3500)
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

        <!-- Left Panel — Premium Dark -->
        <div class="hidden lg:flex flex-col p-10 text-white h-full relative overflow-hidden st-panel">

            <!-- Layered gradient background -->
            <div class="absolute inset-0 z-0 st-panel-bg" />

            <!-- Animated floating orbs -->
            <div class="absolute inset-0 z-0 pointer-events-none">
                <div class="st-orb st-orb-1" />
                <div class="st-orb st-orb-2" />
                <div class="st-orb st-orb-3" />
            </div>

            <!-- Grid overlay -->
            <div
                class="pointer-events-none absolute inset-0 z-[2] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_70%_75%_at_50%_0%,black_40%,transparent_100%)]">
            </div>

            <!-- Logo -->
            <div class="relative z-10 mb-auto">
                <NuxtLink to="/" class="opacity-90 hover:opacity-100 transition-opacity">
                    <AppLogo name="Acumen" icon="i-lucide-brain-circuit" theme="white" naked />
                </NuxtLink>
            </div>

            <!-- Body -->
            <div class="relative z-10 flex-1 flex flex-col justify-center gap-8">

                <!-- Mode badge + headline -->
                <div class="space-y-4">
                    <UBadge color="primary" variant="outline"
                        class="inline-flex items-center gap-2 w-fit px-3 py-1.5 text-xs font-medium tracking-wide uppercase">
                        <span class="w-1.5 h-1.5 rounded-full bg-primary-400 animate-pulse" />
                        <Transition mode="out-in" enter-active-class="transition-all duration-300"
                            enter-from-class="opacity-0" enter-to-class="opacity-100"
                            leave-active-class="transition-all duration-200" leave-to-class="opacity-0">
                            <span :key="modeLabel">{{ modeLabel }}</span>
                        </Transition>
                    </UBadge>

                    <Transition mode="out-in" enter-active-class="transition-all duration-300"
                        enter-from-class="opacity-0 translate-y-2" enter-to-class="opacity-100 translate-y-0"
                        leave-active-class="transition-all duration-200" leave-from-class="opacity-100"
                        leave-to-class="opacity-0">
                        <div :key="modeLabel">
                            <h1 class="text-3xl font-bold leading-tight mb-3">
                                Experience the <span class="text-primary">real thing.</span>
                            </h1>
                            <p class="text-sm font-light leading-relaxed text-white/60">
                                This is the actual Acumen topic creator. Sign up to save your plan and start learning.
                            </p>
                        </div>
                    </Transition>
                </div>

                <!-- Feature checklist -->
                <div class="space-y-2.5">
                    <div v-for="item in ['Full topic creation flow', 'AI-powered pre-assessment', 'Personalized lesson plan']"
                        :key="item" class="flex items-center gap-3 text-sm font-light text-white/80">
                        <div class="size-5 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center shrink-0">
                            <UIcon name="i-lucide-check" class="size-3 text-primary-300" />
                        </div>
                        {{ item }}
                    </div>
                </div>

                <!-- Guest CTA (appears after door selection) -->
                <Transition enter-active-class="transition-all duration-500" enter-from-class="opacity-0 translate-y-4"
                    enter-to-class="opacity-100 translate-y-0">
                    <UCard v-if="flowState !== 'entry'" variant="outline"
                        class="bg-white/5 ring-white/10 rounded-2xl">
                        <p class="text-sm font-semibold text-white mb-1">Like what you see?</p>
                        <p class="text-xs text-white/55 leading-relaxed mb-3">Sign up free to save this plan and start learning.</p>
                        <UButton label="Sign Up Free" to="/signup" color="primary" variant="solid" size="sm"
                            trailing-icon="i-lucide-arrow-right" class="rounded-full" />
                    </UCard>
                </Transition>
            </div>

            <!-- Guest badge -->
            <div class="relative z-10 flex items-center gap-2 text-xs font-medium text-white/40">
                <UIcon name="i-lucide-eye" class="size-3.5" />
                Guest preview — no account needed yet
            </div>
        </div>

        <!-- Right Panel -->
        <div class="flex flex-col overflow-y-auto">
            <!-- Top Bar -->
            <div
                class="flex items-center justify-between px-8 py-4 border-b border-neutral-100 dark:border-neutral-800 shrink-0">
                <div class="flex items-center gap-3 flex-1">
                    <button v-if="flowState !== 'entry'" @click="prevStep"
                        class="text-xs text-muted hover:text-primary transition-colors flex items-center gap-1">
                        <UIcon name="i-lucide-arrow-left" class="size-3.5" /> Back
                    </button>
                </div>
                <div class="flex items-center justify-center flex-1 font-semibold">
                    Onboarding
                </div>
                <!-- <div class="flex items-center gap-2">
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
                </div> -->

                <div class="flex items-center justify-end gap-3 flex-1">
                    <!-- <button v-if="flowState !== 'entry'" @click="prevStep"
                        class="text-xs text-muted hover:text-primary transition-colors flex items-center gap-1">
                        <UIcon name="i-lucide-arrow-left" class="size-3.5" /> Back
                    </button> -->
                    <NuxtLink to="/"
                        class="text-xs text-muted hover:text-primary transition-colors flex items-center gap-1">
                        <UIcon name="i-lucide-x" class="size-3.5" /> Exit
                    </NuxtLink>
                </div>
            </div>

            <!-- Main content area -->
            <div class="flex-1 overflow-y-auto flex flex-col">
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

                        <!-- Processing Overlay (Explore & Prompt Modes) -->
                        <div v-else-if="flowState === 'processing'" class="flex flex-col justify-center grow">
                            <AppTopicProcessing :mode="creationMode" />
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
                                <AppTopicDoorSelection @select-upload="selectMode('upload')"
                                    @select-explore="selectMode('explore')" @select-prompt="handlePromptSelect" />
                            </div>

                            <!-- Step Content Card -->
                            <UCard v-else
                                class="w-full relative border-none ring-1 ring-primary/20 shadow-2xl shadow-primary/5 overflow-hidden"
                                :ui="{ body: 'p-0 sm:p-0 relative' }">
                                <div class="min-h-full">
                                    <Transition mode="out-in" enter-active-class="transition-all duration-300 ease-out"
                                        enter-from-class="opacity-0 translate-y-4"
                                        enter-to-class="opacity-100 translate-y-0"
                                        leave-active-class="transition-all duration-200 ease-in"
                                        leave-from-class="opacity-100 translate-y-0"
                                        leave-to-class="opacity-0 -translate-y-4">
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
                                                v-model="formData" @complete="handleAssessmentComplete"
                                                @back="prevStep" />

                                            <!-- Plan / Review Step -->
                                            <AppSessionReadinessPlan v-else-if="flowState === 'review'"
                                                :topic-title="formData.title" is-onboarding @close="handleFinish" />

                                        </div>
                                    </Transition>
                                </div>
                            </UCard>

                        </div>
                    </Transition>
                </UContainer>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* ═══════════════════════════════════════════
   Left Panel — theme-aware (start.vue)
   Uses Nuxt UI tokens: --color-primary-*, --color-neutral-*
   ═══════════════════════════════════════════ */

.st-panel {
    background: var(--color-neutral-950);
}

:root:not(.dark) .st-panel {
    background: color-mix(in srgb, var(--color-neutral-900) 90%, var(--color-primary-950, var(--color-primary-900)) 10%);
}

.st-panel-bg {
    background:
        radial-gradient(ellipse 80% 60% at 15% 5%,
            color-mix(in srgb, var(--color-primary-500) 28%, transparent) 0%,
            transparent 60%),
        radial-gradient(ellipse 60% 50% at 80% 95%,
            color-mix(in srgb, var(--color-primary-600) 22%, transparent) 0%,
            transparent 55%),
        radial-gradient(ellipse 50% 40% at 50% 50%,
            color-mix(in srgb, var(--color-primary-400) 8%, transparent) 0%,
            transparent 70%),
        linear-gradient(160deg,
            color-mix(in srgb, var(--color-neutral-950) 85%, var(--color-primary-950, var(--color-primary-900)) 15%) 0%,
            var(--color-neutral-950) 50%,
            color-mix(in srgb, var(--color-neutral-950) 92%, var(--color-primary-950, var(--color-primary-900)) 8%) 100%);
}

:root:not(.dark) .st-panel-bg {
    background:
        radial-gradient(ellipse 80% 60% at 15% 5%,
            color-mix(in srgb, var(--color-primary-500) 22%, transparent) 0%,
            transparent 60%),
        radial-gradient(ellipse 60% 50% at 80% 95%,
            color-mix(in srgb, var(--color-primary-700) 18%, transparent) 0%,
            transparent 55%),
        radial-gradient(ellipse 50% 40% at 50% 50%,
            color-mix(in srgb, var(--color-primary-400) 6%, transparent) 0%,
            transparent 70%),
        linear-gradient(160deg,
            color-mix(in srgb, var(--color-neutral-900) 80%, var(--color-primary-900) 20%) 0%,
            var(--color-neutral-900) 50%,
            color-mix(in srgb, var(--color-neutral-900) 88%, var(--color-primary-900) 12%) 100%);
}

.st-orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(60px);
    opacity: 0.4;
    animation: st-float linear infinite;
}

:root:not(.dark) .st-orb {
    opacity: 0.3;
}

/* Orb positions deliberately different from login & signup */
.st-orb-1 {
    width: 320px;
    height: 320px;
    top: -80px;
    left: -60px;
    background: radial-gradient(circle, var(--color-primary-500) 0%, transparent 70%);
    animation-duration: 22s;
    animation-delay: 0s;
}

.st-orb-2 {
    width: 260px;
    height: 260px;
    bottom: 80px;
    right: -50px;
    background: radial-gradient(circle, var(--color-primary-600) 0%, transparent 70%);
    animation-duration: 28s;
    animation-delay: -12s;
    opacity: 0.25;
}

:root:not(.dark) .st-orb-2 {
    opacity: 0.2;
}

.st-orb-3 {
    width: 160px;
    height: 160px;
    top: 55%;
    left: 35%;
    background: radial-gradient(circle, var(--color-primary-400) 0%, transparent 70%);
    animation-duration: 19s;
    animation-delay: -7s;
    opacity: 0.16;
}

:root:not(.dark) .st-orb-3 {
    opacity: 0.12;
}

@keyframes st-float {
    0%   { transform: translate(0, 0) scale(1); }
    25%  { transform: translate(14px, -18px) scale(1.03); }
    50%  { transform: translate(-10px, 14px) scale(0.97); }
    75%  { transform: translate(18px, 8px) scale(1.02); }
    100% { transform: translate(0, 0) scale(1); }
}
</style>
