<script setup lang="ts">
definePageMeta({
    layout: false
})
const route = useRoute()
const isDevMode = computed(() => route.query.dev !== undefined)

const features = [
    {
        icon: 'i-lucide-brain-circuit',
        label: 'AI-Generated Lessons',
        desc: 'Tailored to your level and pace',
        color: 'linear-gradient(135deg, #6366f1, #8b5cf6)'
    },
    {
        icon: 'i-lucide-chart-line',
        label: 'Progress Tracking',
        desc: 'Visualize your growth over time',
        color: 'linear-gradient(135deg, #0ea5e9, #06b6d4)'
    },
    {
        icon: 'i-lucide-zap',
        label: 'Smart Assessments',
        desc: 'Test knowledge with instant feedback',
        color: 'linear-gradient(135deg, #f59e0b, #ef4444)'
    }
]

const testimonials = [
    {
        quote: 'Acumen transformed how I study. The AI lessons adapt perfectly to my pace — I passed my certification in just 3 weeks.',
        name: 'Marcus K.',
        role: 'Software Engineer',
        initials: 'MK',
        gradient: 'from-violet-400 to-indigo-600',
        stars: 5
    },
    {
        quote: 'I\'ve tried every study app out there. Acumen is the only one that actually understands where I\'m struggling and fixes it.',
        name: 'Priya S.',
        role: 'Medical Student',
        initials: 'PS',
        gradient: 'from-rose-400 to-pink-600',
        stars: 5
    },
    {
        quote: 'The personalized lesson plans are incredible. It\'s like having a private tutor available 24/7 — for a fraction of the cost.',
        name: 'Jordan T.',
        role: 'UX Designer',
        initials: 'JT',
        gradient: 'from-emerald-400 to-teal-600',
        stars: 5
    },
    {
        quote: 'Went from struggling with algorithms to acing my technical interviews. Acumen\'s structured approach made all the difference.',
        name: 'Lena M.',
        role: 'CS Graduate',
        initials: 'LM',
        gradient: 'from-amber-400 to-orange-500',
        stars: 5
    }
]

const activeSlide = ref(0)
let timer: ReturnType<typeof setInterval> | null = null

function startTimer() {
    timer = setInterval(() => {
        activeSlide.value = (activeSlide.value + 1) % testimonials.length
    }, 5000)
}

function goTo(index: number) {
    activeSlide.value = index
    if (timer) clearInterval(timer)
    startTimer()
}

function prev() { goTo((activeSlide.value - 1 + testimonials.length) % testimonials.length) }
function next() { goTo((activeSlide.value + 1) % testimonials.length) }

onMounted(startTimer)
onUnmounted(() => { if (timer) clearInterval(timer) })

// Login form state
const loginForm = reactive({ email: '', password: '' })
const showPassword = ref(false)
const loginLoading = ref(false)

function submitLogin() {
    if (!loginForm.email || !loginForm.password) return
    loginLoading.value = true
    setTimeout(() => {
        loginLoading.value = false
        navigateTo('/app/dashboard')
    }, 900)
}
</script>
<template>
    <div class="fixed inset-0 grid grid-cols-1 lg:grid-cols-2 bg-background">
        <!-- Left Panel — Premium Dark -->
        <div class="hidden lg:flex flex-col p-12 text-white h-full relative overflow-hidden login-panel">

            <!-- Layered gradient background -->
            <div class="absolute inset-0 z-0 login-panel-bg" />

            <!-- Animated floating orbs -->
            <div class="absolute inset-0 z-0 pointer-events-none">
                <div class="orb orb-1" />
                <div class="orb orb-2" />
                <div class="orb orb-3" />
            </div>

            <!-- Subtle grid overlay -->
            <div
                class="pointer-events-none absolute inset-0 z-[2] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_70%_75%_at_50%_0%,black_40%,transparent_100%)]">
            </div>
            <!-- <div class="absolute inset-0 z-0 login-grid-overlay pointer-events-none" /> -->

            <!-- Logo Header -->
            <div class="relative z-10 flex items-center gap-3">
                <AppLogo name="Acumen" icon="i-lucide-brain-circuit" theme="white" size="lg" naked />
            </div>

            <!-- Body Content -->
            <div class="relative z-10 flex-1 flex flex-col justify-center gap-10">

                <!-- Headline -->
                <div class="space-y-4">
                    <UBadge color="primary" variant="outline"
                        class="inline-flex items-center gap-2 w-fit px-3 py-1.5 text-xs font-medium tracking-wide uppercase">
                        <span class="w-1.5 h-1.5 rounded-full bg-primary-400 animate-pulse" />
                        AI-Powered Learning
                    </UBadge>
                    <h1 class="text-5xl font-bold leading-tight tracking-tight">
                        Welcome back to <span class="text-primary">Acumen</span>
                        <!-- <span class="login-gradient-text">Acumen</span> -->
                    </h1>
                    <p class="text-base font-light leading-relaxed text-white/60 max-w-md">
                        Your personalized lessons and progress are waiting. Pick up exactly where you left off.
                    </p>
                </div>

                <!-- Feature pills -->
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <UCard v-for="feat in features" :key="feat.label" variant="soft"
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

                <!-- Testimonial Carousel -->

                <UCard variant="outline" class="bg-transparent ring-primary-800/20 rounded-2xl divide-primary-800/20"
                    :ui="{ body: 'relative min-h-[148px]', footer: 'flex items-center justify-between' }">
                    <!-- Slides -->
                    <TransitionGroup name="tslide">
                        <div v-for="(t, i) in testimonials" :key="i" v-show="activeSlide === i"
                            class="absolute inset-0 p-4 sm:p-6 space-y-3">
                            <!-- Stars -->
                            <div class="flex gap-0.5">
                                <UIcon v-for="s in t.stars" :key="s" name="i-ri-star-fill"
                                    class="size-3.5 text-amber-400" />
                            </div>
                            <!-- Quote -->
                            <p class="text-sm leading-relaxed text-white/70 font-light">
                                "{{ t.quote }}"
                            </p>
                            <!-- Author -->
                            <div class="flex items-center gap-2.5 pt-1">
                                <div class="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 bg-gradient-to-br"
                                    :class="t.gradient">
                                    {{ t.initials }}
                                </div>
                                <div>
                                    <div class="text-xs font-semibold text-white/80">{{ t.name }}</div>
                                    <div class="text-[10px] text-white/40">{{ t.role }}</div>
                                </div>
                            </div>
                        </div>
                    </TransitionGroup>

                    <!-- Controls -->
                    <template #footer>
                        <!-- Dot indicators -->
                        <div class="flex items-center gap-1.5">
                            <button v-for="(_, i) in testimonials" :key="i" @click="goTo(i)" class="testimonial-dot"
                                :class="activeSlide === i ? 'testimonial-dot--active' : ''"
                                :aria-label="`Go to testimonial ${i + 1}`" />
                        </div>
                        <!-- Prev / Next -->
                        <div class="flex items-center gap-1">
                            <button @click="prev" class="testimonial-arrow" aria-label="Previous testimonial">
                                <UIcon name="i-lucide-chevron-left" class="size-3.5" />
                            </button>
                            <button @click="next" class="testimonial-arrow" aria-label="Next testimonial">
                                <UIcon name="i-lucide-chevron-right" class="size-3.5" />
                            </button>
                        </div>
                    </template>
                </UCard>
            </div>

            <!-- Footer -->
            <div class="relative z-10 text-xs text-white/35 font-medium">
                &copy; {{ new Date().getFullYear() }} Acumen · All rights reserved
            </div>
        </div>

        <!-- Right Panel — Premium Login -->
        <div class="relative flex items-center justify-center px-6 py-12 lg:px-16 overflow-y-auto">

            <!-- Back to home -->
            <NuxtLink to="/"
                class="absolute top-6 left-6 lg:top-8 lg:left-10 inline-flex items-center gap-1.5 text-xs text-muted hover:text-foreground transition-colors z-10 group">
                <UIcon name="i-lucide-arrow-left" class="size-3.5 group-hover:-translate-x-0.5 transition-transform" />
                Back to home
            </NuxtLink>

            <div class="w-full max-w-sm my-auto">

                <!-- Header -->
                <div class="mb-8">
                    <div class="flex items-center gap-2 mb-6 lg:hidden">
                        <AppLogo name="Acumen" icon="i-lucide-brain-circuit" theme="primary" size="lg" naked />
                    </div>
                    <h2 class="text-2xl font-bold tracking-tight mb-1.5">Sign in to Acumen</h2>
                    <p class="text-sm text-muted">Welcome back — your lessons are waiting.</p>
                </div>

                <!-- Form -->
                <form class="space-y-4" @submit.prevent="submitLogin">

                    <!-- Email -->
                    <div class="space-y-1.5">
                        <label for="login-email"
                            class="text-xs font-medium text-foreground/70 uppercase tracking-wide">Email
                            address</label>
                        <UInput id="login-email" v-model="loginForm.email" type="email" placeholder="you@example.com"
                            size="lg" variant="soft" class="w-full" autocomplete="email" @keydown.enter="submitLogin" />
                    </div>

                    <!-- Password -->
                    <div class="space-y-1.5">
                        <div class="flex items-center justify-between">
                            <label for="login-password"
                                class="text-xs font-medium text-foreground/70 uppercase tracking-wide">Password</label>
                            <button type="button" class="text-xs text-primary hover:underline font-medium">Forgot
                                password?</button>
                        </div>
                        <UInput id="login-password" v-model="loginForm.password"
                            :type="showPassword ? 'text' : 'password'" placeholder="••••••••" size="lg" variant="soft"
                            class="w-full" autocomplete="current-password" :ui="{ trailing: 'pe-1' }"
                            @keydown.enter="submitLogin">
                            <template #trailing>
                                <UButton color="neutral" variant="link" size="sm"
                                    :icon="showPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                                    :aria-label="showPassword ? 'Hide password' : 'Show password'"
                                    @click="showPassword = !showPassword" />
                            </template>
                        </UInput>
                    </div>

                    <!-- Remember me -->
                    <div class="flex items-center gap-2 pt-1">
                        <input id="remember" type="checkbox" class="rp-checkbox" />
                        <label for="remember" class="text-sm text-muted cursor-pointer select-none">Remember me for 30
                            days</label>
                    </div>

                    <!-- Submit -->
                    <UButton type="submit" block size="lg" :loading="loginLoading" class="mt-2" @click="submitLogin">
                        Sign in
                        <template #trailing>
                            <UIcon name="i-lucide-arrow-right" class="size-4" />
                        </template>
                    </UButton>

                </form>

                <!-- Divider -->
                <div class="flex items-center gap-3 my-6">
                    <div class="flex-1 h-px bg-muted/30" />
                    <span class="text-xs text-muted">or continue with</span>
                    <div class="flex-1 h-px bg-muted/30" />
                </div>

                <!-- Google SSO -->
                <button type="button" class="rp-google-btn w-full" @click="submitLogin">
                    <svg class="size-4 flex-shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            fill="#4285F4" />
                        <path
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            fill="#34A853" />
                        <path
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                            fill="#FBBC05" />
                        <path
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            fill="#EA4335" />
                    </svg>
                    <span class="text-sm font-medium">Continue with Google</span>
                </button>

                <!-- Sign up link -->
                <p class="text-center text-sm text-muted mt-6">
                    Don't have an account?
                    <NuxtLink to="/signup" class="text-primary font-medium hover:underline">Create one free</NuxtLink>
                </p>
            </div>

            <LoginFab v-if="isDevMode" />
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

/* ── Panel base: light = deep tinted neutral, dark = darkest neutral ── */
.login-panel {
    background: var(--color-neutral-950);
}

/* Light mode: slightly lighter base with a primary tint */
:root:not(.dark) .login-panel {
    background: color-mix(in srgb, var(--color-neutral-900) 90%, var(--color-primary-950, var(--color-primary-900)) 10%);
}

/* ── Layered radial gradient background ── */
.login-panel-bg {
    background:
        radial-gradient(ellipse 80% 60% at 10% 0%,
            color-mix(in srgb, var(--color-primary-500) 28%, transparent) 0%,
            transparent 60%),
        radial-gradient(ellipse 60% 50% at 90% 100%,
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

:root:not(.dark) .login-panel-bg {
    background:
        radial-gradient(ellipse 80% 60% at 10% 0%,
            color-mix(in srgb, var(--color-primary-500) 22%, transparent) 0%,
            transparent 60%),
        radial-gradient(ellipse 60% 50% at 90% 100%,
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
.orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(60px);
    opacity: 0.4;
    animation: float-orb linear infinite;
}

:root:not(.dark) .orb {
    opacity: 0.3;
}

.orb-1 {
    width: 380px;
    height: 380px;
    top: -100px;
    left: -80px;
    background: radial-gradient(circle, var(--color-primary-500) 0%, transparent 70%);
    animation-duration: 18s;
    animation-delay: 0s;
}

.orb-2 {
    width: 280px;
    height: 280px;
    bottom: 60px;
    right: -60px;
    background: radial-gradient(circle, var(--color-primary-600) 0%, transparent 70%);
    animation-duration: 24s;
    animation-delay: -8s;
    opacity: 0.25;
}

:root:not(.dark) .orb-2 {
    opacity: 0.2;
}

.orb-3 {
    width: 200px;
    height: 200px;
    top: 45%;
    left: 40%;
    background: radial-gradient(circle, var(--color-primary-400) 0%, transparent 70%);
    animation-duration: 20s;
    animation-delay: -4s;
    opacity: 0.18;
}

:root:not(.dark) .orb-3 {
    opacity: 0.14;
}

@keyframes float-orb {
    0% {
        transform: translate(0, 0) scale(1);
    }

    25% {
        transform: translate(18px, -22px) scale(1.04);
    }

    50% {
        transform: translate(-12px, 16px) scale(0.97);
    }

    75% {
        transform: translate(20px, 10px) scale(1.02);
    }

    100% {
        transform: translate(0, 0) scale(1);
    }
}

/* ── Dot grid overlay ── */
.login-grid-overlay {
    background-image: radial-gradient(circle,
            color-mix(in srgb, var(--color-neutral-100) 8%, transparent) 1px,
            transparent 1px);
    background-size: 28px 28px;
    mask-image: radial-gradient(ellipse 85% 90% at 50% 50%, black 40%, transparent 100%);
}

:root:not(.dark) .login-grid-overlay {
    background-image: radial-gradient(circle,
            color-mix(in srgb, var(--color-neutral-100) 12%, transparent) 1px,
            transparent 1px);
}

/* ── Gradient text on heading: primary-300 → primary-200 ── */
.login-gradient-text {
    background: linear-gradient(100deg,
            var(--color-primary-300) 0%,
            var(--color-primary-200) 40%,
            var(--color-primary-300) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

:root:not(.dark) .login-gradient-text {
    background: linear-gradient(100deg,
            var(--color-primary-200) 0%,
            var(--color-primary-100) 40%,
            var(--color-primary-200) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

/* ── Testimonial carousel ── */
.testimonial-carousel {
    position: relative;
}

.tslide-enter-active,
.tslide-leave-active {
    transition: opacity 0.45s ease, transform 0.45s ease;
    position: absolute;
    inset: 0;
}

.tslide-enter-from {
    opacity: 0;
    transform: translateX(12px);
}

.tslide-leave-to {
    opacity: 0;
    transform: translateX(-12px);
}

.tslide-enter-to,
.tslide-leave-from {
    opacity: 1;
    transform: translateX(0);
}

/* Dot indicators */
.testimonial-dot {
    width: 6px;
    height: 6px;
    border-radius: 9999px;
    background: rgba(255, 255, 255, 0.2);
    transition: width 0.3s ease, background 0.3s ease;
    cursor: pointer;
    border: none;
    padding: 0;
    flex-shrink: 0;
}

.testimonial-dot--active {
    width: 20px;
    background: rgba(255, 255, 255, 0.7);
}

/* Arrow buttons */
.testimonial-arrow {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    border-radius: 6px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(255, 255, 255, 0.05);
    color: rgba(255, 255, 255, 0.5);
    cursor: pointer;
    transition: background 0.2s ease, color 0.2s ease;
}

.testimonial-arrow:hover {
    background: rgba(255, 255, 255, 0.12);
    color: rgba(255, 255, 255, 0.9);
}

/* ── Right Panel: checkbox ── */
.rp-checkbox {
    appearance: none;
    -webkit-appearance: none;
    width: 16px;
    height: 16px;
    border-radius: 4px;
    border: 1.5px solid color-mix(in srgb, currentColor 30%, transparent);
    background: transparent;
    cursor: pointer;
    flex-shrink: 0;
    position: relative;
    transition: background 0.15s ease, border-color 0.15s ease;
}

.rp-checkbox:checked {
    background: var(--color-primary-500);
    border-color: var(--color-primary-500);
}

.rp-checkbox:checked::after {
    content: '';
    position: absolute;
    inset: 0;
    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12'%3E%3Cpath d='M2 6l3 3 5-5' stroke='white' stroke-width='1.8' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") center/10px no-repeat;
}

/* ── Right Panel: Google button ── */
.rp-google-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 10px 16px;
    border-radius: 10px;
    border: 1px solid color-mix(in srgb, currentColor 15%, transparent);
    background: transparent;
    cursor: pointer;
    transition: background 0.18s ease, transform 0.15s ease, box-shadow 0.18s ease;
}

.rp-google-btn:hover {
    background: color-mix(in srgb, currentColor 5%, transparent);
    transform: translateY(-1px);
    box-shadow: 0 4px 16px -4px rgba(0, 0, 0, 0.12);
}

.rp-google-btn:active {
    transform: translateY(0);
}
</style>
