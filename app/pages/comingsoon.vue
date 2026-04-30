<script setup lang="ts">
import { ref } from 'vue'

definePageMeta({
  layout: 'guest'
})

useSeoMeta({
  title: 'Coming Soon - Acumen',
  description: 'Something amazing is in the works. Get ready for the next generation of AI-Assisted Learning with Acumen.'
})

const email = ref('')
const loading = ref(false)
const submitted = ref(false)

const subscribe = async () => {
  if (!email.value) return
  loading.value = true
  // Mock API call
  setTimeout(() => {
    loading.value = false
    submitted.value = true
  }, 1200)
}
</script>

<template>
  <div class="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center relative overflow-hidden py-20 px-4">
    <!-- Background Glow for Hero -->
    <div class="absolute -top-20 inset-x-0 h-64 bg-primary-500/10 blur-[120px] rounded-full pointer-events-none" />
    <div
      class="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]">
    </div>
    <!-- Ambient Background Effects -->
    <div class="absolute inset-0 z-0 pointer-events-none flex items-center justify-center overflow-hidden">
      <div
        class="absolute w-[600px] h-[600px] bg-primary/20 dark:bg-primary/10 rounded-full blur-[100px] opacity-70 animate-pulse mix-blend-screen"
        style="animation-duration: 8s;"></div>
      <div
        class="absolute w-[400px] h-[400px] bg-blue-500/20 dark:bg-blue-500/10 rounded-full blur-[80px] opacity-50 mix-blend-screen translate-x-32 -translate-y-32">
      </div>
      <div
        class="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay">
      </div>
    </div>

    <!-- Content -->
    <div class="relative z-10 max-w-2xl mx-auto text-center space-y-10">
      <div class="space-y-4">
        <UBadge variant="subtle" color="primary"
          class="rounded-full px-4 py-1.5 backdrop-blur-md border border-primary/20 animate-fade-in-up">
          <UIcon name="i-lucide-rocket" class="w-4 h-4 mr-2" />
          Development in Progress
        </UBadge>

        <h1 class="text-5xl md:text-7xl font-bold tracking-tight text-neutral-900 dark:text-white">
          Something <span
            class="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-blue-500">Amazing</span><br />is
          Coming
        </h1>

        <p class="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto leading-relaxed mt-6">
          We're crafting the next generation of AI-assisted learning. Personalized paths, dynamic assessments, and
          interactive tutoring.
        </p>
      </div>

      <!-- Subscription Form -->
      <div
        class="max-w-md mx-auto p-6 rounded-3xl bg-white/40 dark:bg-neutral-900/40 backdrop-blur-xl border border-white/20 dark:border-white/5 shadow-2xl transition-all duration-500 mt-10">
        <div v-if="submitted" class="flex flex-col items-center space-y-4 py-4 animate-fade-in">
          <div
            class="size-16 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
            <UIcon name="i-lucide-check" class="size-8 text-emerald-500" />
          </div>
          <h3 class="text-xl font-semibold text-neutral-900 dark:text-white">You're on the list!</h3>
          <p class="text-sm text-neutral-500 dark:text-neutral-400">We'll notify you as soon as we launch.</p>
        </div>

        <form v-else @submit.prevent="subscribe" class="flex flex-col space-y-4">
          <div class="text-left">
            <label class="text-sm font-medium text-neutral-700 dark:text-neutral-300 ml-1">Get early access</label>
            <div class="mt-2 flex relative">
              <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                <UIcon name="i-lucide-mail" class="size-5" />
              </div>
              <input v-model="email" type="email" required placeholder="Enter your email address"
                class="w-full pl-11 pr-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-black/50 backdrop-blur-sm focus:ring-2 focus:ring-primary-500 outline-none transition-all placeholder:text-neutral-400"
                :disabled="loading" />
            </div>
          </div>
          <UButton type="submit" color="primary" size="lg"
            class="w-full flex justify-center py-3 text-base rounded-xl shadow-lg shadow-primary-500/20"
            :loading="loading" trailing-icon="i-lucide-arrow-right">
            Notify Me
          </UButton>
        </form>
      </div>

      <!-- Back to Home -->
      <div class="pt-8">
        <UButton to="/" variant="link" color="neutral" icon="i-lucide-arrow-left">
          Back to Home
        </UButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes fade-in-up {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fade-in-up 0.8s ease-out forwards;
}

@keyframes fade-in {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

.animate-fade-in {
  animation: fade-in 0.5s ease-out forwards;
}
</style>