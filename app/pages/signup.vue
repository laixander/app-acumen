<script setup lang="ts">
import { ref, reactive, computed } from 'vue'

definePageMeta({
    layout: false
})

const toast = useToast()
const step = ref(1)
const loading = ref(false)

const form = reactive({
    email: '',
    code: ['', '', '', '', '', ''],
    fullName: '',
    password: '',
    confirmPassword: ''
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
            toast.add({ title: 'Account created!', description: 'Welcome to LearnFast! You can now log in.' })
            navigateTo('/login')
        }, 1000)
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
                <UIcon name="i-lucide-brain-circuit" class="w-10 h-10" />
                <span class="text-2xl font-racing">LearnFast</span>
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
                    <template v-for="i in 3" :key="i">
                        <div class="flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold transition-colors"
                            :class="[
                                step > i ? 'bg-primary text-white dark:text-neutral-900' : step === i ? 'bg-primary/20 text-primary-600 dark:text-primary-400' : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-400'
                            ]">
                            <UIcon v-if="step > i" name="i-lucide-check" class="w-4 h-4" />
                            <span v-else>{{ i }}</span>
                        </div>
                        <div v-if="i < 3" class="w-8 h-px transition-colors"
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
                        Create Account
                    </UButton>
                </div>
            </div>
        </div>
    </div>
</template>