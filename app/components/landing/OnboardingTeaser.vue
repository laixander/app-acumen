<script setup lang="ts">
const router = useRouter()

const go = () => router.push('/start')
</script>

<template>
    <NuxtLink to="/start"
        class="group relative w-full max-w-sm flex flex-col gap-4 p-6 rounded-2xl border border-neutral-200/60 dark:border-neutral-800/60 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-xl shadow-xl overflow-hidden cursor-pointer hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500">

        <!-- Ambient glow -->
        <div class="pointer-events-none absolute -top-16 -right-16 w-40 h-40 bg-primary-500 blur-[60px] opacity-0 group-hover:opacity-15 rounded-full transition-opacity duration-700" />

        <!-- Mode preview chips -->
        <div class="flex items-center gap-2">
            <div v-for="m in [
                { icon: 'i-lucide-upload-cloud', color: 'text-primary-500 bg-primary-50 dark:bg-primary-950/40' },
                { icon: 'i-lucide-compass', color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/40' },
                { icon: 'i-lucide-sparkles', color: 'text-violet-500 bg-violet-50 dark:bg-violet-950/40' },
            ]" :key="m.icon"
                class="p-2 rounded-lg transition-transform duration-500 group-hover:scale-110"
                :class="m.color">
                <UIcon :name="m.icon" class="size-4 flex shrink-0" />
            </div>
            <span class="text-[10px] font-bold uppercase tracking-widest text-muted ml-1">3 learning modes</span>
        </div>

        <!-- Copy -->
        <div>
            <h3 class="text-base font-bold mb-1">Try Acumen — no account needed</h3>
            <p class="text-sm text-muted leading-snug">
                Pick your learning mode, take a quick quiz, and see your personalized plan in under 2 minutes.
            </p>
        </div>

        <!-- CTA row -->
        <div class="flex items-center justify-between">
            <span class="text-xs text-muted">Free · No credit card</span>
            <div class="flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:gap-2.5 transition-all duration-300">
                Start now
                <UIcon name="i-lucide-arrow-right" class="size-4" />
            </div>
        </div>
    </NuxtLink>
</template>
