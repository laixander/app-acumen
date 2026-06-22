<script setup lang="ts">
import { useOnboardingDraft } from '~/composables/useOnboardingDraft'
import { slugify } from '~/utils/format'
import type { LearningGoal } from '~/types/course'

definePageMeta({ layout: false })

const { write } = useOnboardingDraft()

// Mirror new.vue's FlowState exactly
type FlowState = 'entry' | 'setup' | 'indexing' | 'processing' | 'details' | 'assessment' | 'review' | 'pricing'

const flowState = ref<FlowState>('entry')
const creationMode = ref<'upload' | 'explore' | 'prompt' | null>(null)
const isGenerating = ref(false)
const isContactModalOpen = ref(false)

const rightPanelRef = ref<HTMLElement | null>(null)
const mainContentRef = ref<HTMLElement | null>(null)

const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    if (rightPanelRef.value) {
        rightPanelRef.value.scrollTo({ top: 0, behavior: 'smooth' })
    }
    if (mainContentRef.value) {
        mainContentRef.value.scrollTo({ top: 0, behavior: 'smooth' })
    }
}

const formData = reactive({
    title: '',
    description: '',
    learningGoal: 'Mastery' as LearningGoal,
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

// Mirror new.vue's steps/stepper
const steps = computed(() => {
    if (creationMode.value === 'explore') return ['Mode', 'Subject', 'Details', 'Pre-Assessment', 'Plan']
    if (creationMode.value === 'prompt') return ['Mode', 'Details', 'Pre-Assessment', 'Plan']
    return ['Mode', 'Materials', 'Details', 'Pre-Assessment', 'Plan']
})

const currentStepIndex = computed(() => {
    if (flowState.value === 'entry') return 0
    if (flowState.value === 'setup' || flowState.value === 'indexing') return 1
    if (flowState.value === 'processing' || flowState.value === 'details') return creationMode.value === 'prompt' ? 1 : 2
    if (flowState.value === 'assessment') return creationMode.value === 'prompt' ? 2 : 3
    if (flowState.value === 'review') return creationMode.value === 'prompt' ? 3 : 4
    if (flowState.value === 'pricing') return creationMode.value === 'prompt' ? 4 : 5
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
    setTimeout(() => { flowState.value = 'details' }, 3500)
}

const handleUploadComplete = () => {
    flowState.value = 'indexing'
    if (formData.files && formData.files.length > 0) {
        const firstFile = formData.files[0]
        const baseName = firstFile.name ? firstFile.name.replace(/\.[^/.]+$/, "") : 'Uploaded Material'
        formData.title = baseName
        const fileNames = formData.files.map((f: any) => f.name).join(', ')
        formData.description = `Curriculum built from: ${fileNames}`
    }
    setTimeout(() => { flowState.value = 'details' }, 3500)
}

const handleSubjectSelect = (subject: string) => {
    formData.title = subject
    formData.description = `Universal curriculum for ${subject}`
    flowState.value = 'processing'
    setTimeout(() => { flowState.value = 'details' }, 3500)
}

const handleAssessmentComplete = () => {
    flowState.value = 'review'
    scrollToTop()
}

const nextStep = () => {
    if (flowState.value === 'details') flowState.value = 'assessment'
}

const prevStep = () => {
    if (flowState.value === 'setup') {
        flowState.value = 'entry'
        creationMode.value = null
    } else if (flowState.value === 'details') {
        if (creationMode.value === 'prompt') {
            flowState.value = 'entry'
            creationMode.value = null
        } else {
            flowState.value = 'setup'
        }
    } else if (flowState.value === 'assessment') {
        flowState.value = 'details'
    } else if (flowState.value === 'review') {
        flowState.value = 'assessment'
    } else if (flowState.value === 'pricing') {
        flowState.value = 'review'
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

// Guest override: save draft → show pricing
const handleFinish = () => {
    flowState.value = 'pricing'
    scrollToTop()
}

const planStore = usePlanStore()
const activePlans = computed(() => planStore.plans.filter(p => p.status === 'Active'))

const selectPlan = (planId: string) => {
    // Find the plan to check its name/type
    const plan = planStore.plans.find(p => p.id === planId)
    const planName = plan ? plan.name.toLowerCase() : planId.toLowerCase()

    // Enterprise opens contact modal instead of navigating
    if (planName === 'enterprise') {
        isContactModalOpen.value = true
        return
    }
    write({
        mode: creationMode.value,
        course: formData.title,
        description: formData.description,
        learningGoal: formData.learningGoal,
        targetFinishDate: formData.targetFinishDate,
        sessionsPerWeek: formData.sessionsPerWeek,
        itemsPerWeek: formData.itemsPerWeek,
        files: formData.files.map((f: any) => f.name ?? String(f)),
        quizComplete: true,
        plan: planName,
        createdAt: Date.now(),
    })
    // Match landing page pricing redirect params
    if (planName === 'pro') {
        navigateTo('/signup?plan=pro')
    } else {
        navigateTo('/signup')
    }
}

const pricingPlans = computed(() => {
    return activePlans.value.map((plan) => {
        const nameLower = plan.name.toLowerCase()
        const isPro = nameLower === 'pro'
        const isFree = nameLower === 'free' || plan.price === 0
        const isEnterprise = nameLower === 'enterprise' || (!isPro && !isFree && plan.price >= 99)

        let color = 'neutral'
        if (isPro) color = 'primary'
        else if (isEnterprise) color = 'purple'

        return {
            id: plan.id,
            name: plan.name,
            price: `$${plan.price}`,
            period: plan.interval === 'monthly' ? 'per month' : 'per year',
            description: plan.description,
            badge: isPro ? 'Most Popular' : null,
            color,
            features: plan.features,
            cta: isFree ? 'Start Free' : isPro ? 'Get Pro' : 'Contact Sales',
            highlighted: isPro,
        }
    })
})

</script>

<template>
    <div class="fixed inset-0 grid grid-cols-1 lg:grid-cols-[340px_1fr] bg-background overflow-hidden">

        <!-- Left Panel — Premium Dark -->
        <div class="hidden lg:flex flex-col p-10 text-white h-full relative overflow-hidden st-panel">

            <!-- Layered gradient background -->
            <!-- <div class="absolute inset-0 z-0 st-panel-bg" /> -->

            <!-- Animated floating orbs -->
            <div class="absolute inset-0 z-0 pointer-events-none">
                <div class="st-orb st-orb-1"></div>
                <div class="st-orb st-orb-2"></div>
                <div class="st-orb st-orb-3"></div>
            </div>

            <!-- Grid overlay -->
            <div
                class="pointer-events-none absolute inset-0 z-[2] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_70%_75%_at_50%_0%,black_40%,transparent_100%)]">
            </div>

            <!-- Logo -->
            <div class="relative z-10 mb-auto">
                <UButton icon="i-lucide-home" variant="soft" to="/" size="sm" />
            </div>

            <!-- Body -->
            <div class="relative z-10 flex-1 flex flex-col justify-center gap-8">

                <!-- Mode badge + headline -->
                <div class="space-y-4">
                    <UBadge color="primary" variant="outline"
                        class="inline-flex items-center gap-2 w-fit px-3 py-1.5 text-xs font-medium tracking-wide uppercase">
                        <span class="w-1.5 h-1.5 rounded-full bg-primary-400 animate-pulse" />
                        <span :key="modeLabel">{{ modeLabel }}</span>
                    </UBadge>
                    <div :key="modeLabel">
                        <h1 class="text-3xl font-bold leading-tight mb-3">
                            Experience the <span class="text-primary">real thing.</span>
                        </h1>
                        <p class="text-sm font-light leading-relaxed text-white/60">
                            This is the actual Acumen course creator. Sign up to save your plan and start learning.
                        </p>
                    </div>
                </div>

                <!-- Feature checklist -->
                <div class="space-y-2.5">
                    <div v-for="item in ['Full course creation flow', 'AI-powered pre-assessment', 'Personalized lesson plan']"
                        :key="item" class="flex items-center gap-3 text-sm font-light text-white/80">
                        <div
                            class="size-5 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center shrink-0">
                            <UIcon name="i-lucide-check" class="size-3 text-primary-300" />
                        </div>
                        {{ item }}
                    </div>
                </div>

                <UButton label="Sign Up Free" to="/signup" color="primary" variant="solid" size="lg"
                    class="w-fit px-4" />

                <!-- Guest CTA (appears after door selection) -->
                <!-- <Transition enter-active-class="transition-all duration-500" enter-from-class="opacity-0 translate-y-4"
                    enter-to-class="opacity-100 translate-y-0">
                    <UCard v-if="flowState !== 'entry'" variant="outline" class="bg-white/5 ring-white/10 rounded-2xl">
                        <p class="text-sm font-semibold text-white mb-1">Like what you see?</p>
                        <p class="text-xs text-white/55 leading-relaxed mb-3">Sign up free to save this plan and start
                            learning.</p>
                        <UButton label="Sign Up Free" to="/signup" color="primary" variant="solid" size="sm"
                            trailing-icon="i-lucide-arrow-right" class="rounded-full" />
                    </UCard>
                </Transition> -->
            </div>

            <!-- copyright -->
            <div class="relative z-10 flex items-center gap-2 text-xs font-medium text-white/40">
                &copy; {{ new Date().getFullYear() }} Acumen. All rights reserved.
            </div>
        </div>

        <!-- Right Panel -->
        <div ref="rightPanelRef" class="overflow-y-auto h-full flex flex-col">
            <!-- Main content area -->
            <UContainer ref="mainContentRef" class="lg:max-w-4xl py-10 w-full flex-1 flex flex-col">
                <Transition mode="out-in" enter-active-class="transition-all duration-300 ease-out"
                    enter-from-class="opacity-0 translate-y-4" enter-to-class="opacity-100 translate-y-0"
                    leave-active-class="transition-all duration-200 ease-in"
                    leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 -translate-y-4">

                    <!-- Pricing Step -->
                    <div v-if="flowState === 'pricing'"
                        class="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500 my-auto w-full">
                        <!-- Header -->
                        <div class="text-center space-y-3">
                            <UBadge color="primary" variant="subtle"
                                class="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold uppercase tracking-widest">
                                <UIcon name="i-lucide-sparkles" class="size-3" />
                                Your plan is ready
                            </UBadge>
                            <h2 class="text-3xl font-bold tracking-tight">
                                Choose how you want to learn
                            </h2>
                            <p class="text-sm text-muted max-w-md mx-auto leading-relaxed">
                                Your personalised course
                                <strong class="text-foreground">
                                    {{ formData.title || 'is ready' }}
                                </strong>.
                                Pick a plan to unlock it and start learning.
                            </p>
                        </div>

                        <!-- Pricing Cards -->
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
                            <div v-for="plan in pricingPlans" :key="plan.id"
                                class="pricing-card relative flex flex-col rounded-2xl overflow-hidden cursor-pointer group"
                                :class="plan.highlighted ? 'pricing-card--highlighted' : 'pricing-card--default'"
                                @click="selectPlan(plan.id)">

                                <!-- Popular badge -->
                                <div v-if="plan.badge" class="pricing-badge">
                                    <UIcon name="i-lucide-zap" class="size-3" />
                                    {{ plan.badge }}
                                </div>

                                <!-- Card body -->
                                <div class="flex flex-col flex-1 p-6 gap-5">
                                    <!-- Plan name & price -->
                                    <div class="space-y-1">
                                        <p class="text-xs font-semibold uppercase tracking-widest"
                                            :class="plan.highlighted ? 'text-primary-300' : 'text-muted'">{{
                                                plan.name }}</p>
                                        <div class="flex items-end gap-1">
                                            <span class="text-4xl font-bold tracking-tight"
                                                :class="plan.highlighted ? 'text-white' : ''">
                                                {{ plan.price }}
                                            </span>
                                            <span class="text-sm pb-1"
                                                :class="plan.highlighted ? 'text-white/50' : 'text-muted'">
                                                / {{ plan.period }}
                                            </span>
                                        </div>
                                        <p class="text-xs leading-relaxed"
                                            :class="plan.highlighted ? 'text-white/60' : 'text-muted'">
                                            {{ plan.description }}
                                        </p>
                                    </div>

                                    <!-- Divider -->
                                    <div class="h-px"
                                        :class="plan.highlighted ? 'bg-white/10' : 'bg-neutral-100 dark:bg-neutral-800'" />

                                    <!-- Features -->
                                    <ul class="space-y-2 flex-1">
                                        <li v-for="feat in plan.features" :key="feat"
                                            class="flex items-start gap-2.5 text-sm"
                                            :class="plan.highlighted ? 'text-white/80' : ''">
                                            <div class="mt-0.5 size-4 rounded-full flex items-center justify-center shrink-0"
                                                :class="plan.highlighted ? 'bg-primary-500/20' : 'bg-primary/10'">
                                                <UIcon name="i-lucide-check" class="size-2.5"
                                                    :class="plan.highlighted ? 'text-primary-300' : 'text-primary'" />
                                            </div>
                                            {{ feat }}
                                        </li>
                                    </ul>

                                    <!-- CTA button -->
                                    <UButton :label="plan.cta" :color="plan.highlighted ? 'neutral' : 'primary'"
                                        :variant="plan.highlighted ? 'solid' : 'outline'"
                                        trailing-icon="i-lucide-arrow-right"
                                        class="w-full justify-center rounded-xl mt-auto transition-transform group-hover:scale-[1.02]"
                                        @click.stop="selectPlan(plan.id)" />
                                </div>
                            </div>
                        </div>

                        <!-- Skip / social proof row -->
                        <div class="flex flex-col items-center gap-3">
                            <div class="flex items-center gap-5 text-xs text-muted">
                                <span class="flex items-center gap-1.5">
                                    <UIcon name="i-lucide-shield-check" class="size-3.5 text-primary" /> No credit
                                    card required
                                </span>
                                <span class="flex items-center gap-1.5">
                                    <UIcon name="i-lucide-refresh-ccw" class="size-3.5 text-primary" /> Cancel
                                    anytime
                                </span>
                                <span class="flex items-center gap-1.5">
                                    <UIcon name="i-lucide-lock" class="size-3.5 text-primary" /> Secure checkout
                                </span>
                            </div>
                            <button class="text-xs text-muted hover:text-primary transition-colors"
                                @click="selectPlan('free')">
                                Skip for now — continue with Free
                            </button>
                        </div>
                    </div>

                    <!-- Generation Overlay (legacy – kept for safety) -->
                    <div v-else-if="isGenerating" class="flex flex-col justify-center my-auto w-full">
                        <AppCourseGenerating @finish="selectPlan('free')" />
                    </div>

                    <!-- Indexing Overlay (Upload only) -->
                    <div v-else-if="flowState === 'indexing'" class="flex flex-col justify-center my-auto w-full">
                        <AppCourseAnalyzing />
                    </div>

                    <!-- Processing Overlay (Explore & Prompt Modes) -->
                    <div v-else-if="flowState === 'processing'" class="flex flex-col justify-center my-auto w-full">
                        <AppCourseProcessing :mode="creationMode" />
                    </div>

                    <!-- Main Flow -->
                    <div v-else class="flex flex-col gap-8 my-auto w-full">

                        <!-- Stepper heading (shown after door selection) -->
                        <div v-if="flowState !== 'entry'"
                            class="flex flex-col gap-8 animate-in fade-in slide-in-from-top-4 duration-500">
                            <!-- <ContentHeading :title="`Create Course: ${steps[currentStepIndex]}`" centered /> -->
                            <AppCourseStepper :current-step="currentStepIndex" :steps="steps" />
                        </div>

                        <!-- Entry (Door Selection) -->
                        <div v-if="flowState === 'entry'">
                            <AppCourseDoorSelection is-onboarding @select-upload="selectMode('upload')"
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
                                            <AppCourseFormMaterials v-if="creationMode === 'upload'"
                                                :model-value="formData"
                                                @update:model-value="val => Object.assign(formData, val)"
                                                @upload-ready="handleUploadComplete" />
                                            <AppCourseSubjectPicker v-else-if="creationMode === 'explore'"
                                                @select="handleSubjectSelect" />
                                        </template>

                                        <!-- Details Step -->
                                        <AppCourseFormBasic v-else-if="flowState === 'details'"
                                            :model-value="formData" @update:model-value="val => Object.assign(formData, val)"
                                            @next="nextStep" @back="prevStep" />

                                        <!-- Assessment Step -->
                                        <AppCourseFormPreAssessment v-else-if="flowState === 'assessment'"
                                            :model-value="formData" @update:model-value="val => Object.assign(formData, val)"
                                            @complete="handleAssessmentComplete" @back="prevStep" />

                                        <!-- Plan / Review Step -->
                                        <AppSessionReadinessPlan v-else-if="flowState === 'review'"
                                            :course-title="formData.title" is-onboarding is-teaser @close="handleFinish" />

                                    </div>
                                </Transition>
                            </div>
                        </UCard>

                    </div>
                </Transition>
            </UContainer>
        </div>

        <ContactSalesModal v-model:open="isContactModalOpen" />
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
    animation-name: st-float;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
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

/* ═══════════════════════════════════════════
   Pricing cards
   ═══════════════════════════════════════════ */

.pricing-card--default {
    background: var(--color-background);
    border: 1px solid color-mix(in srgb, var(--color-neutral-200) 100%, transparent);
    transition: box-shadow 0.25s ease, transform 0.25s ease, border-color 0.25s ease;
}

.dark .pricing-card--default {
    border-color: color-mix(in srgb, var(--color-neutral-700) 100%, transparent);
}

.pricing-card--default:hover {
    box-shadow: 0 8px 32px -4px color-mix(in srgb, var(--color-primary-500) 12%, transparent);
    border-color: color-mix(in srgb, var(--color-primary-400) 40%, transparent);
    transform: translateY(-3px);
}

.pricing-card--highlighted {
    background:
        radial-gradient(ellipse 80% 50% at 20% 10%,
            color-mix(in srgb, var(--color-primary-500) 30%, transparent) 0%,
            transparent 60%),
        linear-gradient(160deg,
            color-mix(in srgb, var(--color-primary-700) 95%, var(--color-neutral-950) 5%) 0%,
            color-mix(in srgb, var(--color-primary-900) 90%, var(--color-neutral-950) 10%) 100%);
    box-shadow:
        0 0 0 1px color-mix(in srgb, var(--color-primary-500) 40%, transparent),
        0 20px 60px -10px color-mix(in srgb, var(--color-primary-600) 35%, transparent);
    transition: box-shadow 0.25s ease, transform 0.25s ease;
}

.pricing-card--highlighted:hover {
    box-shadow:
        0 0 0 1px color-mix(in srgb, var(--color-primary-400) 60%, transparent),
        0 28px 72px -10px color-mix(in srgb, var(--color-primary-500) 45%, transparent);
    transform: translateY(-4px);
}

.pricing-badge {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    position: absolute;
    top: -1px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    padding: 3px 12px;
    border-radius: 0 0 10px 10px;
    background: color-mix(in srgb, var(--color-primary-400) 100%, transparent);
    color: white;
    white-space: nowrap;
}

@keyframes st-float {
    0% {
        transform: translate(0, 0) scale(1);
    }

    25% {
        transform: translate(14px, -18px) scale(1.03);
    }

    50% {
        transform: translate(-10px, 14px) scale(0.97);
    }

    75% {
        transform: translate(18px, 8px) scale(1.02);
    }

    100% {
        transform: translate(0, 0) scale(1);
    }
}
</style>
