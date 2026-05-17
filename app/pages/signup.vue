<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useOnboardingDraft } from '~/composables/useOnboardingDraft'

definePageMeta({
    layout: false
})

import { PLANS } from '~/constants/billing'

const route = useRoute()
const toast = useToast()
const step = ref(1)
const loading = ref(false)
const { exists: hasDraft } = useOnboardingDraft()

const planInfo = computed(() => {
    const planId = (route.query.plan as string) || 'free'
    // If enterprise is requested, we could either redirect or default to free.
    // For now, let's treat any non-pro paid plan as free signup since Enterprise is handled via modal.
    const plan = PLANS.find(p => p.id === planId.toLowerCase() && p.id !== 'enterprise')
    return (plan || PLANS[0]) as typeof PLANS[0] & { id: string, name: string, price: number }
})

const shouldShowPayment = computed(() => planInfo.value.id === 'pro')

const form = reactive({
    email: '',
    code: ['', '', '', '', '', ''],
    fullName: '',
    password: '',
    confirmPassword: '',
    card: {
        number: '',
        expiry: '',
        cvc: '',
        name: ''
    }
})

const nextStep = () => {
    if (step.value === 1) {
        if (!form.email || !/^\S+@\S+\.\S+$/.test(form.email)) {
            toast.add({ title: 'Error', description: 'Please enter a valid email address.', color: 'red' })
            return
        }
        loading.value = true
        setTimeout(() => {
            loading.value = false
            step.value = 2
            toast.add({ title: 'Code sent!', description: 'Please check your email for the verification code.' })
        }, 800)
    } else if (step.value === 2) {
        const codeString = form.code.join('')
        if (codeString.length !== 6) {
            toast.add({ title: 'Error', description: 'Please enter the 6-digit verification code.', color: 'red' })
            return
        }
        loading.value = true
        setTimeout(() => {
            loading.value = false
            step.value = 3
            toast.add({ title: 'Verified!', description: 'Your email has been successfully verified.' })
        }, 800)
    } else if (step.value === 3) {
        if (!form.fullName || !form.password || !form.confirmPassword) {
            toast.add({ title: 'Error', description: 'Please fill in all fields.', color: 'red' })
            return
        }
        if (form.password !== form.confirmPassword) {
            toast.add({ title: 'Error', description: 'Passwords do not match.', color: 'red' })
            return
        }
        loading.value = true
        setTimeout(() => {
            loading.value = false
            if (shouldShowPayment.value) {
                step.value = 4
            } else {
                toast.add({ title: 'Account created!', description: 'Welcome to Acumen! Setting up your first topic...' })
                if (hasDraft()) {
                    navigateTo('/app/topics/new?from=onboarding')
                } else {
                    navigateTo('/app/dashboard')
                }
            }
        }, 800)
    } else if (step.value === 4) {
        if (!form.card.number || !form.card.expiry || !form.card.cvc) {
            toast.add({ title: 'Error', description: 'Please complete your payment details.', color: 'red' })
            return
        }
        loading.value = true
        setTimeout(() => {
            loading.value = false
            toast.add({ title: 'Account created!', description: 'Welcome to Acumen! Your subscription is now active.' })
            if (hasDraft()) {
                navigateTo('/app/topics/new?from=onboarding')
            } else {
                navigateTo('/app/dashboard')
            }
        }, 1500)
    }
}

const resendCode = () => {
    toast.add({ title: 'Code resent!', description: 'A new verification code has been sent to your email.' })
}

const showPassword = ref(false)
const showConfirmPassword = ref(false)

function checkStrength(str: string) {
    const requirements = [
        { regex: /.{8,}/, text: 'At least 8 characters' },
        { regex: /\d/, text: 'At least 1 number' },
        { regex: /[a-z]/, text: 'At least 1 lowercase letter' },
        { regex: /[A-Z]/, text: 'At least 1 uppercase letter' }
    ]

    return requirements.map(req => ({ met: req.regex.test(str), text: req.text }))
}

const strength = computed(() => checkStrength(form.password))
const score = computed(() => strength.value.filter(req => req.met).length)

const color = computed(() => {
    if (score.value === 0) return 'neutral'
    if (score.value <= 1) return 'error'
    if (score.value <= 2) return 'warning'
    if (score.value === 3) return 'warning'
    return 'success'
})

const text = computed(() => {
    if (score.value === 0) return 'Enter a password'
    if (score.value <= 2) return 'Weak password'
    if (score.value === 3) return 'Medium password'
    return 'Strong password'
})

const suFeatures = [
    {
        icon: 'i-lucide-upload',
        label: 'Upload Any Material',
        desc: 'PDFs, slides, notes \u2014 Acumen reads it all',
        color: 'linear-gradient(135deg, #8b5cf6, #6366f1)'
    },
    {
        icon: 'i-lucide-layout-list',
        label: 'Auto-Generated Curriculum',
        desc: 'Structured lessons built in seconds',
        color: 'linear-gradient(135deg, #a855f7, #ec4899)'
    },
    {
        icon: 'i-lucide-trophy',
        label: 'Track & Celebrate Progress',
        desc: 'Milestones, streaks, and insights',
        color: 'linear-gradient(135deg, #f59e0b, #f97316)'
    }
]

const suStats = [
    { value: '10k+', label: 'Active Learners' },
    { value: '98%', label: 'Satisfaction Rate' },
    { value: '3\u00d7', label: 'Avg. Study Improvement' }
]
</script>
<template>
    <div class="fixed inset-0 grid grid-cols-1 lg:grid-cols-2 bg-background">
        <!-- Left Panel — Premium Dark -->
        <div class="hidden lg:flex flex-col p-12 text-white h-full relative overflow-hidden su-panel">

            <!-- Layered gradient background -->
            <div class="absolute inset-0 z-0 su-panel-bg" />

            <!-- Animated floating orbs -->
            <div class="absolute inset-0 z-0 pointer-events-none">
                <div class="su-orb su-orb-1" />
                <div class="su-orb su-orb-2" />
                <div class="su-orb su-orb-3" />
            </div>

            <!-- Subtle grid overlay -->
            <div
                class="pointer-events-none absolute inset-0 z-[2] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_70%_75%_at_50%_0%,black_40%,transparent_100%)]">
            </div>
            <!-- <div class="absolute inset-0 z-0 su-grid-overlay pointer-events-none" /> -->

            <!-- Logo Header -->
            <div class="relative z-10 flex items-center gap-3">
                <AppLogo name="Acumen" icon="i-lucide-brain-circuit" theme="white" size="lg" naked />
            </div>

            <!-- Body Content -->
            <div class="relative z-10 flex-1 flex flex-col justify-center gap-10">

                <!-- Headline -->
                <div class="space-y-4">
                    <!-- <div
                        class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/15 bg-white/5 backdrop-blur-sm text-xs font-medium text-white/70 tracking-wide uppercase">
                        <span class="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
                        Join 10,000+ learners
                    </div> -->
                    <UBadge color="primary" variant="outline"
                        class="inline-flex items-center gap-2 w-fit px-3 py-1.5 text-xs font-medium tracking-wide uppercase">
                        <span class="w-1.5 h-1.5 rounded-full bg-primary-400 animate-pulse" />
                        Join 10,000+ learners
                    </UBadge>
                    <h1 class="text-5xl font-bold leading-tight tracking-tight">
                        Learn smarter,<br />not harder with
                        <span class="text-primary">Acumen</span>
                        <!-- <span class="su-gradient-text">Acumen</span> -->
                    </h1>
                    <p class="text-base font-light leading-relaxed text-white/60 max-w-md">
                        AI builds your personalized curriculum in minutes. Upload your materials and let Acumen do the
                        rest.
                    </p>
                </div>

                <!-- Stats bar -->
                <div class="flex items-center">
                    <template v-for="(stat, i) in suStats" :key="stat.label">
                        <div class="flex-1 text-center">
                            <div class="text-xl font-bold su-gradient-text">{{ stat.value }}</div>
                            <div class="text-[10px] text-white/45 font-light leading-tight mt-0.5">{{ stat.label }}
                            </div>
                        </div>
                        <div v-if="i < suStats.length - 1" class="w-px h-8 bg-white/10 flex-shrink-0" />
                    </template>
                </div>

                <!-- Feature pills -->
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <UCard v-for="feat in suFeatures" :key="feat.label" variant="soft"
                        class="rounded-2xl bg-white/5 hover:bg-primary/8 transition-colors duration-200"
                        :ui="{ body: 'flex flex-col items-center text-center gap-2' }">
                        <div class="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                            :style="{ background: feat.color }">
                            <UIcon :name="feat.icon" class="size-4 text-white" />
                        </div>
                        <div>
                            <div class="text-sm font-medium text-white/90">{{ feat.label }}</div>
                            <div class="text-xs text-white/45 font-light">{{ feat.desc }}</div>
                        </div>
                    </UCard>
                </div>
            </div>

            <!-- Footer -->
            <div class="relative z-10 text-xs text-white/35 font-medium">
                &copy; {{ new Date().getFullYear() }} Acumen · All rights reserved
            </div>
        </div>

        <!-- Right Panel — Premium Signup Wizard -->
        <div class="relative flex items-center justify-center px-6 py-12 lg:px-16 overflow-y-auto">

            <!-- Back to home -->
            <NuxtLink to="/"
                class="absolute top-6 left-6 lg:top-8 lg:left-10 inline-flex items-center gap-1.5 text-xs text-muted hover:text-foreground transition-colors z-10 group">
                <UIcon name="i-lucide-arrow-left" class="size-3.5 group-hover:-translate-x-0.5 transition-transform" />
                Back to home
            </NuxtLink>

            <div class="w-full max-w-sm my-auto">

                <!-- Mobile logo -->
                <div class="flex items-center gap-2 mb-8 lg:hidden">
                    <AppLogo name="Acumen" icon="i-lucide-brain-circuit" theme="primary" size="lg" naked />
                </div>

                <!-- Premium Stepper -->
                <div class="flex items-center gap-2 mb-10">
                    <template v-for="i in (shouldShowPayment ? 4 : 3)" :key="i">
                        <div class="flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold transition-all duration-300 ring-2 ring-offset-2 ring-offset-background"
                            :class="[
                                step > i
                                    ? 'bg-primary text-white ring-primary/30'
                                    : step === i
                                        ? 'bg-primary/10 text-primary ring-primary/40'
                                        : 'bg-muted/40 text-muted ring-transparent'
                            ]">
                            <UIcon v-if="step > i" name="i-lucide-check" class="size-3.5" />
                            <span v-else>{{ i }}</span>
                        </div>
                        <div v-if="i < (shouldShowPayment ? 4 : 3)" class="flex-1 h-px transition-all duration-500"
                            :class="step > i ? 'bg-primary' : 'bg-border'" />
                    </template>
                </div>

                <!-- Step 01 — Enter email -->
                <div v-if="step === 1" class="space-y-6">
                    <div class="space-y-1">
                        <h2 class="text-2xl font-bold tracking-tight">Create your account</h2>
                        <p class="text-sm text-muted">Enter your email to get started. No credit card required.</p>
                    </div>
                    <div class="space-y-1.5">
                        <label for="su-email"
                            class="text-xs font-medium text-foreground/70 uppercase tracking-wide">Email
                            address</label>
                        <UInput id="su-email" v-model="form.email" type="email" placeholder="you@example.com"
                            variant="soft" size="lg" class="w-full" autocomplete="email" @keydown.enter="nextStep" />
                    </div>
                    <UButton label="Continue" trailing-icon="i-lucide-arrow-right" block size="lg" @click="nextStep"
                        :loading="loading" :ui="{ trailingIcon: 'ms-0' }" />
                    <div class="flex items-center justify-center gap-1.5 text-xs text-muted">
                        <UIcon name="i-lucide-shield-check" class="size-3.5 text-emerald-500" />
                        <span>Your data is encrypted and never shared</span>
                    </div>
                    <div class="text-center text-sm">
                        <span class="text-muted">Already have an account? </span>
                        <NuxtLink to="/login" class="text-primary font-medium hover:underline">Log in</NuxtLink>
                    </div>
                </div>

                <!-- Step 02 — Verify email -->
                <div v-else-if="step === 2" class="space-y-6">
                    <div
                        class="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                        <UIcon name="i-lucide-mail" class="size-5" />
                    </div>
                    <div class="space-y-1">
                        <h2 class="text-2xl font-bold tracking-tight">Check your inbox</h2>
                        <p class="text-sm text-muted">
                            We've sent a 6-digit code to
                            <span class="font-semibold text-foreground">{{ form.email }}</span>
                        </p>
                    </div>
                    <div class="space-y-1.5">
                        <label class="text-xs font-medium text-foreground/70 uppercase tracking-wide">Verification
                            code</label>
                        <UPinInput v-model="form.code" :length="6" variant="soft" size="xl" class="mt-2"
                            :ui="{ root: 'w-full justify-between', base: 'w-12 h-14 text-center font-bold' }" />
                    </div>
                    <div class="space-y-3">
                        <UButton label="Verify Email" trailing-icon="i-lucide-arrow-right" block size="lg"
                            @click="nextStep" :loading="loading" :ui="{ trailingIcon: 'ms-0' }" />
                        <UButton label="Resend code" block variant="ghost" color="neutral" size="lg"
                            @click="resendCode" />
                    </div>
                </div>

                <!-- Step 03 — Complete profile -->
                <div v-else-if="step === 3" class="space-y-5">
                    <div class="space-y-1">
                        <h2 class="text-2xl font-bold tracking-tight">Complete your profile</h2>
                        <p class="text-sm text-muted">A few more details to personalise your experience.</p>
                    </div>
                    <div class="space-y-1.5">
                        <label for="su-name" class="text-xs font-medium text-foreground/70 uppercase tracking-wide">Full
                            name</label>
                        <UInput id="su-name" v-model="form.fullName" placeholder="John Doe" variant="soft" size="lg"
                            class="w-full" @keydown.enter="nextStep" />
                    </div>
                    <div class="space-y-1.5">
                        <label for="su-password"
                            class="text-xs font-medium text-foreground/70 uppercase tracking-wide">Password</label>
                        <UInput id="su-password" v-model="form.password" placeholder="Create a password" variant="soft"
                            size="lg" :color="color" :type="showPassword ? 'text' : 'password'"
                            :aria-invalid="score < 4" aria-describedby="password-strength" :ui="{ trailing: 'pe-1' }"
                            class="w-full">
                            <template #trailing>
                                <UButton color="neutral" variant="link" size="sm"
                                    :icon="showPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                                    :aria-label="showPassword ? 'Hide password' : 'Show password'"
                                    :aria-pressed="showPassword" aria-controls="su-password"
                                    @click="showPassword = !showPassword" />
                            </template>
                        </UInput>
                    </div>
                    <div class="space-y-2">
                        <UProgress :color="color" :indicator="text" :model-value="score" :max="4" size="sm" />
                        <ul class="grid grid-cols-2 gap-x-4 gap-y-0.5">
                            <li v-for="(req, index) in strength" :key="index" class="flex items-center gap-1 text-xs"
                                :class="req.met ? 'text-success' : 'text-muted'">
                                <UIcon :name="req.met ? 'i-lucide-circle-check' : 'i-lucide-circle'"
                                    class="size-3 shrink-0" />
                                {{ req.text }}
                            </li>
                        </ul>
                    </div>
                    <div class="space-y-1.5">
                        <label for="su-confirm"
                            class="text-xs font-medium text-foreground/70 uppercase tracking-wide">Confirm
                            password</label>
                        <UInput id="su-confirm" v-model="form.confirmPassword" placeholder="Repeat password"
                            variant="soft" size="lg" :type="showConfirmPassword ? 'text' : 'password'"
                            :ui="{ trailing: 'pe-1' }" class="w-full" @keydown.enter="nextStep">
                            <template #trailing>
                                <UButton color="neutral" variant="link" size="sm"
                                    :icon="showConfirmPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                                    :aria-label="showConfirmPassword ? 'Hide password' : 'Show password'"
                                    :aria-pressed="showConfirmPassword" aria-controls="su-confirm"
                                    @click="showConfirmPassword = !showConfirmPassword" />
                            </template>
                        </UInput>
                    </div>
                    <UButton block size="lg" color="primary" @click="nextStep" :loading="loading">
                        {{ shouldShowPayment ? 'Continue to Payment' : 'Create Account' }}
                        <template #trailing>
                            <UIcon name="i-lucide-arrow-right" class="size-4" />
                        </template>
                    </UButton>
                </div>

                <!-- Step 04 — Payment -->
                <div v-else-if="step === 4" class="space-y-5">
                    <div class="space-y-1">
                        <h2 class="text-2xl font-bold tracking-tight">Payment method</h2>
                        <p class="text-sm text-muted">Safe and secure. Cancel anytime.</p>
                    </div>

                    <!-- Premium card preview -->
                    <div class="relative w-full aspect-[1.586/1] rounded-2xl p-6 text-white overflow-hidden shadow-2xl"
                        style="background: linear-gradient(135deg, #1e1b4b 0%, #312e81 40%, #4c1d95 100%)">
                        <div
                            class="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 pointer-events-none" />
                        <div class="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/5 blur-xl" />
                        <div class="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-purple-500/20 blur-xl" />
                        <div class="flex justify-between items-start relative z-10">
                            <div class="flex flex-col gap-0.5">
                                <div class="text-[10px] uppercase tracking-widest text-white/40">Acumen Pro</div>
                                <UIcon name="i-lucide-contact" class="w-8 h-8 text-white/30 mt-1" />
                            </div>
                            <div class="flex gap-1.5 items-center">
                                <div class="w-8 h-5 rounded bg-white/20" />
                                <div class="w-8 h-5 rounded bg-white/10" />
                            </div>
                        </div>
                        <div class="mt-6 relative z-10">
                            <div class="text-lg tracking-[0.18em] font-mono text-white/90">
                                {{ form.card.number || '•••• •••• •••• ••••' }}
                            </div>
                        </div>
                        <div class="mt-4 flex justify-between relative z-10">
                            <div>
                                <div class="text-[9px] uppercase tracking-widest text-white/35 mb-0.5">Card Holder</div>
                                <div class="text-sm font-medium text-white/80">{{ form.fullName || 'YOUR NAME' }}</div>
                            </div>
                            <div class="text-right">
                                <div class="text-[9px] uppercase tracking-widest text-white/35 mb-0.5">Expires</div>
                                <div class="text-sm font-medium text-white/80">{{ form.card.expiry || 'MM/YY' }}</div>
                            </div>
                        </div>
                    </div>

                    <!-- Card fields -->
                    <div class="space-y-3">
                        <div class="space-y-1.5">
                            <label class="text-xs font-medium text-foreground/70 uppercase tracking-wide">Card
                                number</label>
                            <UInput v-model="form.card.number" placeholder="0000 0000 0000 0000" variant="soft"
                                size="lg" icon="i-lucide-credit-card" class="w-full" />
                        </div>
                        <div class="grid grid-cols-2 gap-3">
                            <div class="space-y-1.5">
                                <label
                                    class="text-xs font-medium text-foreground/70 uppercase tracking-wide">Expiry</label>
                                <UInput v-model="form.card.expiry" placeholder="MM / YY" variant="soft" size="lg" />
                            </div>
                            <div class="space-y-1.5">
                                <label
                                    class="text-xs font-medium text-foreground/70 uppercase tracking-wide">CVC</label>
                                <UInput v-model="form.card.cvc" placeholder="•••" type="password" variant="soft"
                                    size="lg" />
                            </div>
                        </div>
                    </div>

                    <!-- Order summary -->
                    <div class="p-4 rounded-xl border border-border bg-muted/20">
                        <div class="flex justify-between text-sm mb-1">
                            <span class="text-muted">{{ planInfo.name }} Plan · Monthly</span>
                            <span class="font-bold">${{ planInfo.price }}.00</span>
                        </div>
                        <div class="flex justify-between text-xs text-muted">
                            <span>Cancel anytime</span>
                            <span>VAT 0%</span>
                        </div>
                    </div>

                    <UButton block size="lg" color="primary" @click="nextStep" :loading="loading">
                        <template #leading>
                            <UIcon name="i-lucide-lock" class="size-4" />
                        </template>
                        Confirm &amp; Pay
                    </UButton>
                    <p class="text-[10px] text-center text-muted px-2 leading-relaxed">
                        By clicking "Confirm &amp; Pay" you agree to our
                        <span class="underline cursor-pointer">Terms</span> and
                        <span class="underline cursor-pointer">Privacy Policy</span>.
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* ═══════════════════════════════════════════
   Left Panel — theme-aware CSS custom props
   Uses Nuxt UI tokens:
     --color-primary-*   (follows app.config primary)
     --color-neutral-*   (follows app.config neutral)
   Responds to .dark class on <html>
   ═══════════════════════════════════════════ */

/* ── Panel base ── */
.su-panel {
    background: var(--color-neutral-950);
}

:root:not(.dark) .su-panel {
    background: color-mix(in srgb, var(--color-neutral-900) 90%, var(--color-primary-950, var(--color-primary-900)) 10%);
}

/* ── Layered radial gradient background ── */
.su-panel-bg {
    background:
        radial-gradient(ellipse 80% 60% at 20% 10%,
            color-mix(in srgb, var(--color-primary-600) 28%, transparent) 0%,
            transparent 60%),
        radial-gradient(ellipse 60% 50% at 85% 90%,
            color-mix(in srgb, var(--color-primary-500) 22%, transparent) 0%,
            transparent 55%),
        radial-gradient(ellipse 50% 40% at 50% 50%,
            color-mix(in srgb, var(--color-primary-400) 8%, transparent) 0%,
            transparent 70%),
        linear-gradient(160deg,
            color-mix(in srgb, var(--color-neutral-950) 85%, var(--color-primary-950, var(--color-primary-900)) 15%) 0%,
            var(--color-neutral-950) 50%,
            color-mix(in srgb, var(--color-neutral-950) 92%, var(--color-primary-950, var(--color-primary-900)) 8%) 100%);
}

:root:not(.dark) .su-panel-bg {
    background:
        radial-gradient(ellipse 80% 60% at 20% 10%,
            color-mix(in srgb, var(--color-primary-600) 22%, transparent) 0%,
            transparent 60%),
        radial-gradient(ellipse 60% 50% at 85% 90%,
            color-mix(in srgb, var(--color-primary-700) 18%, transparent) 0%,
            transparent 55%),
        radial-gradient(ellipse 50% 40% at 50% 50%,
            color-mix(in srgb, var(--color-primary-400) 6%, transparent) 0%,
            transparent 70%),
        linear-gradient(160deg,
            color-mix(in srgb, var(--color-neutral-900) 80%, var(--color-primary-950, var(--color-primary-900)) 20%) 0%,
            var(--color-neutral-900) 50%,
            color-mix(in srgb, var(--color-neutral-900) 88%, var(--color-primary-900) 12%) 100%);
}

/* ── Floating orbs ── */
.su-orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(60px);
    opacity: 0.4;
    animation: su-float linear infinite;
}

:root:not(.dark) .su-orb {
    opacity: 0.3;
}

/* Orb 1: top-right (different from login's top-left) */
.su-orb-1 {
    width: 400px;
    height: 400px;
    top: -120px;
    right: -80px;
    background: radial-gradient(circle, var(--color-primary-600) 0%, transparent 70%);
    animation-duration: 20s;
    animation-delay: 0s;
}

/* Orb 2: bottom-left */
.su-orb-2 {
    width: 300px;
    height: 300px;
    bottom: 40px;
    left: -60px;
    background: radial-gradient(circle, var(--color-primary-500) 0%, transparent 70%);
    animation-duration: 26s;
    animation-delay: -10s;
    opacity: 0.25;
}

:root:not(.dark) .su-orb-2 {
    opacity: 0.2;
}

/* Orb 3: centre-mid */
.su-orb-3 {
    width: 180px;
    height: 180px;
    top: 50%;
    left: 30%;
    background: radial-gradient(circle, var(--color-primary-400) 0%, transparent 70%);
    animation-duration: 22s;
    animation-delay: -6s;
    opacity: 0.18;
}

:root:not(.dark) .su-orb-3 {
    opacity: 0.14;
}

@keyframes su-float {
    0% {
        transform: translate(0, 0) scale(1);
    }

    25% {
        transform: translate(-16px, 20px) scale(1.03);
    }

    50% {
        transform: translate(14px, -18px) scale(0.97);
    }

    75% {
        transform: translate(-20px, -8px) scale(1.02);
    }

    100% {
        transform: translate(0, 0) scale(1);
    }
}

/* ── Dot grid overlay ── */
.su-grid-overlay {
    background-image: radial-gradient(circle,
            color-mix(in srgb, var(--color-neutral-100) 8%, transparent) 1px,
            transparent 1px);
    background-size: 28px 28px;
    mask-image: radial-gradient(ellipse 85% 90% at 50% 50%, black 40%, transparent 100%);
}

:root:not(.dark) .su-grid-overlay {
    background-image: radial-gradient(circle,
            color-mix(in srgb, var(--color-neutral-100) 12%, transparent) 1px,
            transparent 1px);
}

/* ── Gradient text: primary-300 → primary-200 ── */
.su-gradient-text {
    background: linear-gradient(100deg,
            var(--color-primary-300) 0%,
            var(--color-primary-200) 40%,
            var(--color-primary-300) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

:root:not(.dark) .su-gradient-text {
    background: linear-gradient(100deg,
            var(--color-primary-200) 0%,
            var(--color-primary-100) 40%,
            var(--color-primary-200) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}
</style>