<script setup lang="ts">
definePageMeta({
    layout: false
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
                <AppLogo name="LearnFast" icon="i-lucide-brain-circuit" theme="white" size="lg" naked />
            </div>

            <!-- Body Text -->
            <div class="relative z-10 flex-1 flex flex-col justify-center max-w-md">
                <h1 class="text-5xl font-bold mb-6">Welcome back!</h1>
                <p class="text-lg font-light leading-relaxed">
                    Continue your learning journey. Your personalized lessons and progress are waiting for you.
                </p>
            </div>

            <!-- Footer -->
            <div class="relative z-10 text-sm opacity-80 font-medium">
                &copy; {{ new Date().getFullYear() }} LearnFast
            </div>
        </div>

        <!-- Right Panel (Login Form) -->
        <div class="relative flex items-center justify-center p-12 bg-elevated/50 lg:bg-transparent overflow-y-auto">
            <!-- Back Link -->
            <NuxtLink to="/"
                class="absolute top-6 right-6 lg:top-12 lg:right-12 inline-flex items-center gap-2 text-sm text-muted hover:text-primary transition-colors z-10">
                Back to home
                <UIcon name="i-lucide-arrow-right" class="size-4" />
            </NuxtLink>

            <div class="w-full max-w-sm lg:max-w-md my-auto pt-10 lg:pt-0">
                <AuthForm class="w-full max-w-sm lg:max-w-md" />
                <div class="text-center text-sm pt-4 lg:pt-6">
                    <span class="text-muted">Don't have an account? </span>
                    <NuxtLink to="/signup" class="text-primary font-medium hover:underline">Sign up</NuxtLink>
                </div>
            </div>
            <LoginFab />
        </div>
    </div>
</template>