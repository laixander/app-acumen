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
</script>
<template>
    <div class="fixed inset-0 grid grid-cols-1 lg:grid-cols-2 bg-background">
        <!-- Left Panel -->
        <div class="
        hidden lg:flex flex-col bg-primary p-12 text-white h-full relative overflow-hidden
        before:absolute before:inset-0 before:bg-gradient-to-br before:from-transparent before:to-black/80 before:mix-blend-overlay before:z-0
        ">
            <!-- Background Shapes -->
            <div class="absolute inset-0 z-0 pointer-events-none">
                <!-- Top Left Circle -->
                <div class="absolute -top-[200px] -left-[200px] w-200 h-200 rounded-full bg-white/10 mix-blend-overlay">
                </div>

                <!-- Bottom Right Circle -->
                <div class="absolute top-[50%] -right-[300px] w-240 h-240 rounded-full bg-black/5 mix-blend-overlay">
                </div>

                <!-- Center Hollow Circle -->
                <div
                    class="absolute top-[20%] left-[40%] w-100 h-100 rounded-full border-[40px] border-white/5 mix-blend-overlay">
                </div>

                <!-- Some abstract geometric additions -->
                <div
                    class="absolute bottom-[20%] left-[10%] w-32 h-32 rounded-3xl bg-white/10 mix-blend-overlay rotate-45">
                </div>
            </div>

            <!-- Logo Header -->
            <div class="relative z-10 flex items-center gap-3">
                <AppLogo name="Acumen" icon="i-lucide-brain-circuit" theme="white" size="lg" naked />
            </div>

            <!-- Body Text -->
            <div class="relative z-10 flex-1 flex flex-col justify-center max-w-md">
                <h1 class="text-5xl font-bold mb-6">Start learning smarter today</h1>
                <p class="text-lg font-light leading-relaxed">
                    Create your account and get instant access to AI-powered learning tools, personalized lesson plans,
                    and progress tracking.
                </p>
                <div class="mt-8 space-y-3">
                    <div class="flex items-center gap-3 text-indigo-100">
                        <div class="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                            <UIcon name="i-lucide-check" class="size-3 text-white" />
                        </div>
                        <span class="text-sm font-light text-white">AI analyzes your materials</span>
                    </div>
                    <div class="flex items-center gap-3 text-indigo-100">
                        <div class="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                            <UIcon name="i-lucide-check" class="size-3 text-white" />
                        </div>
                        <span class="text-sm font-light text-white">Personalized lesson plans</span>
                    </div>
                    <div class="flex items-center gap-3 text-indigo-100">
                        <div class="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                            <UIcon name="i-lucide-check" class="size-3 text-white" />
                        </div>
                        <span class="text-sm font-light text-white">Track your progress</span>
                    </div>
                </div>
            </div>

            <!-- Footer -->
            <div class="relative z-10 text-sm opacity-80 font-medium">
                &copy; {{ new Date().getFullYear() }} LearnFast
            </div>
        </div>

        <!-- Right Panel (register form wizard) -->
        <div class="relative flex items-center justify-center p-12 bg-elevated/50 lg:bg-transparent overflow-y-auto">
            <!-- Back Link -->
            <NuxtLink to="/"
                class="absolute top-6 right-6 lg:top-12 lg:right-12 inline-flex items-center gap-2 text-sm text-muted hover:text-primary transition-colors z-10">
                Back to home
                <UIcon name="i-lucide-arrow-right" class="size-4" />
            </NuxtLink>

            <div class="w-full max-w-sm lg:max-w-md my-auto pt-10 lg:pt-0">

                <!-- Stepper UI -->
                <div class="flex items-center gap-3 mb-10">
                    <template v-for="i in (shouldShowPayment ? 4 : 3)" :key="i">
                        <div class="flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold transition-colors"
                            :class="[
                                step > i ? 'bg-primary text-white dark:text-neutral-900' : step === i ? 'bg-primary/20 text-primary-600 dark:text-primary-400' : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-400'
                            ]">
                            <UIcon v-if="step > i" name="i-lucide-check" class="w-4 h-4" />
                            <span v-else>{{ i }}</span>
                        </div>
                        <div v-if="i < (shouldShowPayment ? 4 : 3)" class="w-8 h-px transition-colors"
                            :class="[step > i ? 'bg-primary' : 'bg-neutral-200 dark:bg-neutral-700']"></div>
                    </template>
                </div>

                <!-- 01. create your account -->
                <div v-if="step === 1" class="space-y-6">
                    <div>
                        <h2 class="text-2xl font-bold mb-2">Create your account</h2>
                        <p class="text-muted text-sm">Enter your email to get started.</p>
                    </div>
                    <UFormField label="Email address">
                        <UInput v-model="form.email" type="email" placeholder="you@example.com" variant="soft" size="lg"
                            class="w-full" @keydown.enter="nextStep" />
                    </UFormField>
                    <UButton label="Continue" trailing-icon="i-lucide-arrow-right" block size="lg" @click="nextStep"
                        :loading="loading" :ui="{ trailingIcon: 'ms-0' }" />
                    <div class="text-center text-sm pt-2">
                        <span class="text-dimmed">Already have an account? </span>
                        <NuxtLink to="/login" class="text-primary font-medium hover:underline">Log in</NuxtLink>
                    </div>
                </div>

                <!-- 02. check your email -->
                <div v-else-if="step === 2" class="space-y-6">
                    <div class="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-2">
                        <UIcon name="i-lucide-mail" class="w-6 h-6" />
                    </div>
                    <div>
                        <h2 class="text-2xl font-bold mb-2">Check your email</h2>
                        <p class="text-muted text-sm">We've sent a 6-digit code to
                            <span class="font-bold text-default">{{ form.email }}</span>
                        </p>
                    </div>
                    <UFormField label="Verification code">
                        <UPinInput v-model="form.code" :length="6" variant="soft" size="xl" class="mt-2"
                            :ui="{ root: 'w-full justify-between', base: 'w-12 h-16' }" />
                    </UFormField>

                    <div class="text-center space-y-4">
                        <UButton label="Verify Email" trailing-icon="i-lucide-arrow-right" block size="lg"
                            @click="nextStep" :loading="loading" :ui="{ trailingIcon: 'ms-0' }" />
                        <UButton label="Resend code" block variant="ghost" color="neutral" size="lg"
                            @click="resendCode" />
                    </div>
                </div>

                <!-- 03. complete your profile -->
                <div v-else-if="step === 3" class="space-y-6">
                    <div>
                        <h2 class="text-2xl font-bold mb-2 text-neutral-900 dark:text-white">Complete your profile</h2>
                        <p class="text-neutral-500 text-sm">Just a few more details to personalize your experience.</p>
                    </div>
                    <UFormField label="Full name">
                        <UInput v-model="form.fullName" placeholder="John Doe" variant="soft" size="lg"
                            @keydown.enter="nextStep" class="w-full" />
                    </UFormField>
                    <UFormField label="Password">
                        <UInput v-model="form.password" placeholder="Password" variant="soft" size="lg" :color="color"
                            :type="showPassword ? 'text' : 'password'" :aria-invalid="score < 4"
                            aria-describedby="password-strength" :ui="{ trailing: 'pe-1' }" class="w-full">
                            <template #trailing>
                                <UButton color="neutral" variant="link" size="sm"
                                    :icon="showPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                                    :aria-label="showPassword ? 'Hide password' : 'Show password'"
                                    :aria-pressed="showPassword" aria-controls="password"
                                    @click="showPassword = !showPassword" />
                            </template>
                        </UInput>
                    </UFormField>

                    <UProgress :color="color" :indicator="text" :model-value="score" :max="4" size="sm" />

                    <p id="password-strength" class="text-sm font-medium">
                        {{ text }}. Must contain:
                    </p>

                    <ul class="space-y-1" aria-label="Password requirements">
                        <li v-for="(req, index) in strength" :key="index" class="flex items-center gap-0.5"
                            :class="req.met ? 'text-success' : 'text-muted'">
                            <UIcon :name="req.met ? 'i-lucide-circle-check' : 'i-lucide-circle-x'"
                                class="size-4 shrink-0 text-dimmed" />
                            <span class="text-sm font-light">
                                {{ req.text }}
                                <span class="sr-only">
                                    {{ req.met ? ' - Requirement met' : ' - Requirement not met' }}
                                </span>
                            </span>
                        </li>
                    </ul>

                    <UFormField label="Confirm Password">
                        <UInput v-model="form.confirmPassword" placeholder="Confirm Password" variant="soft" size="lg"
                            :type="showConfirmPassword ? 'text' : 'password'" :ui="{ trailing: 'pe-1' }" class="w-full"
                            @keydown.enter="nextStep">
                            <template #trailing>
                                <UButton color="neutral" variant="link" size="sm"
                                    :icon="showConfirmPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                                    :aria-label="showConfirmPassword ? 'Hide password' : 'Show password'"
                                    :aria-pressed="showConfirmPassword" aria-controls="confirm-password"
                                    @click="showConfirmPassword = !showConfirmPassword" />
                            </template>
                        </UInput>
                    </UFormField>
                    <UButton block size="xl" color="primary" @click="nextStep" :loading="loading" class="mt-4">
                        {{ shouldShowPayment ? 'Continue to Payment' : 'Create Account' }}
                    </UButton>
                </div>

                <!-- 04. payment information -->
                <div v-else-if="step === 4" class="space-y-6">
                    <div>
                        <h2 class="text-2xl font-bold mb-2">Payment method</h2>
                        <p class="text-muted text-sm">Safe and secure payment. Cancel anytime.</p>
                    </div>

                    <!-- Card Preview (Visual) -->
                    <div class="relative w-full aspect-[1.586/1] bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-2xl p-6 text-white overflow-hidden shadow-xl mb-4">
                        <div class="absolute top-0 right-0 w-64 h-full bg-gradient-to-l from-white/5 to-transparent pointer-events-none" />
                        <div class="flex justify-between items-start relative z-10">
                            <UIcon name="i-lucide-contact" class="w-10 h-10 text-white/40" />
                            <div class="flex gap-1.5 items-center">
                                <div class="w-8 h-5 rounded bg-white/20" />
                                <div class="w-8 h-5 rounded bg-white/10" />
                            </div>
                        </div>
                        <div class="mt-8 relative z-10">
                            <div class="text-xl tracking-[0.2em] font-mono">
                                {{ form.card.number || '•••• •••• •••• ••••' }}
                            </div>
                        </div>
                        <div class="mt-6 flex justify-between relative z-10">
                            <div>
                                <div class="text-[10px] uppercase tracking-widest text-white/40 mb-1">Card Holder</div>
                                <div class="text-sm font-medium">{{ form.fullName || 'YOUR NAME' }}</div>
                            </div>
                            <div class="text-right">
                                <div class="text-[10px] uppercase tracking-widest text-white/40 mb-1">Expires</div>
                                <div class="text-sm font-medium">{{ form.card.expiry || 'MM/YY' }}</div>
                            </div>
                        </div>
                    </div>

                    <div class="space-y-4">
                        <UFormField label="Card number">
                            <UInput v-model="form.card.number" placeholder="0000 0000 0000 0000" variant="soft" size="lg" icon="i-lucide-credit-card" />
                        </UFormField>

                        <div class="grid grid-cols-2 gap-4">
                            <UFormField label="Expiry date">
                                <UInput v-model="form.card.expiry" placeholder="MM/YY" variant="soft" size="lg" />
                            </UFormField>
                            <UFormField label="CVC">
                                <UInput v-model="form.card.cvc" placeholder="•••" type="password" variant="soft" size="lg" />
                            </UFormField>
                        </div>
                    </div>

                    <div class="bg-neutral-50 dark:bg-neutral-800/50 p-4 rounded-xl border border-neutral-100 dark:border-neutral-800">
                        <div class="flex justify-between text-sm mb-1">
                            <span class="text-muted">{{ planInfo.name }} Plan Subscription</span>
                            <span class="font-bold">${{ planInfo.price }}.00</span>
                        </div>
                        <div class="flex justify-between text-xs text-dimmed">
                            <span>Billed monthly</span>
                            <span>VAT (0%)</span>
                        </div>
                    </div>

                    <UButton block size="xl" color="primary" @click="nextStep" :loading="loading">
                        Confirm & Pay
                    </UButton>
                    <p class="text-[10px] text-center text-muted px-4 leading-relaxed">
                        By clicking "Confirm & Pay", you agree to our Terms of Service and Privacy Policy. You can cancel your subscription at any time.
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>