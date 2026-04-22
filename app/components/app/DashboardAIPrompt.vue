<script setup lang="ts">
interface Props {
    isHero?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    isHero: false
})
const { user } = useUser()

const firstName = computed(() => user.value.profile.fullName.split(' ')[0])

const prompt = ref('')
const fileInput = ref<HTMLInputElement | null>(null)

const handleUpload = () => {
    fileInput.value?.click()
}

const onFileChange = (e: Event) => {
    const target = e.target as HTMLInputElement
    if (target.files?.length) {
        // Handle file logic
        console.log('Files selected:', target.files)
    }
}

const generate = () => {
    if (!prompt.value) return
    console.log('Generating path for:', prompt.value)
    // Navigate to generation flow or emit event
}

const advancedActions = [
    { label: 'Upload PDF', icon: 'i-lucide-file-text', color: 'blue' },
    { label: 'Link Website', icon: 'i-lucide-link', color: 'green' },
    { label: 'Use Template', icon: 'i-lucide-layout-template', color: 'purple' }
]
</script>

<template>
    <div :class="[
        'relative transition-all duration-700 ease-in-out',
        isHero ? 'py-12 md:py-20 flex flex-col items-center justify-center text-center' : 'w-full'
    ]">
        <!-- Background Glow for Hero -->
        <div class="absolute -top-20 inset-x-0 h-64 bg-primary-500/10 blur-[120px] rounded-full pointer-events-none" />

        <div :class="['w-full transition-all duration-500', isHero ? 'max-w-3xl' : '']">
            <!-- Title & Description (Hero Only) -->
            <Transition appear enter-active-class="transition-all duration-700 delay-100"
                enter-from-class="opacity-0 translate-y-4" enter-to-class="opacity-100 translate-y-0">
                <div v-if="isHero" class="mb-10 flex flex-col items-center">
                    <div
                        class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-500 text-xs font-semibold uppercase tracking-wider mb-4">
                        <UIcon name="i-lucide-sparkles" class="animate-pulse" />
                        <span>AI Learning Engine</span>
                    </div>
                    <h1 class="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-balance">
                        What do you want to <span class="text-primary-500 italic">learn</span> today?
                    </h1>
                    <p class="text-lg text-muted font-light max-w-xl text-pretty">
                        Describe your goals, upload a syllabus, or paste a link. We'll build a personalized learning
                        path in seconds.
                    </p>
                </div>
                <div v-else class="flex flex-col items-center gap-2 mb-10">
                    <!-- welcome back centered -->
                    <div
                        class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-500 text-xs font-semibold uppercase tracking-wider mb-4">
                        <UIcon name="i-lucide-sparkles" class="text-primary animate-pulse" />
                        <span>Create New Topic</span>
                    </div>
                    <ContentHeading :title="`Welcome back, ${firstName}!`"
                        description="You're making great progress! Ready to learn something new today?" centered />
                </div>
            </Transition>

            <!-- Prompt Input Area -->
            <Transition appear enter-active-class="transition-all duration-700 delay-300"
                enter-from-class="opacity-0 scale-95" enter-to-class="opacity-100 scale-100">
                <div class="">
                    <!-- Glass Container -->
                    <UCard
                        :ui="{ root: `relative group border-0 ${isHero ? 'rounded-2xl' : 'rounded-xl'} shadow-2xl  hover:shadow-primary/50 hover:ring-4 hover:ring-primary-500/40 transition-all duration-300`, body: 'p-0 sm:p-0' }">

                        <UTextarea v-model="prompt"
                            placeholder="e.g., I want to learn advanced Quantum Computing with a focus on Cryptography..."
                            :ui="{ root: 'w-full transition-all duration-300', base: `ring-0 ${isHero ? 'rounded-t-2xl' : 'rounded-t-xl'} rounded-b-none p-6` }"
                            autoresize :rows="isHero ? 8 : 5" @keydown.meta.enter="generate"
                            @keydown.ctrl.enter="generate" />

                        <!-- Action Bar -->
                        <div
                            class="flex items-center justify-between p-4 bg-neutral-50/50 dark:bg-neutral-900/50 border-t border-neutral-100 dark:border-neutral-800">
                            <div class="flex items-center gap-2">
                                <UButton icon="i-lucide-paperclip" variant="ghost" color="neutral" class="rounded-full"
                                    @click="handleUpload">
                                    <span class="hidden sm:inline">Attach</span>
                                </UButton>
                                <input ref="fileInput" type="file" class="hidden" multiple @change="onFileChange" />

                                <div class="w-px h-4 bg-neutral-200 dark:bg-neutral-700 mx-1" />

                                <UButton label="Advanced Options" variant="link" class="rounded-full"
                                    icon="i-lucide-wand" />
                                <!-- <div class="hidden sm:flex items-center gap-1">
                                    <UButton v-for="action in advancedActions" :key="action.label"
                                        :icon="action.icon" variant="ghost" color="neutral" size="xs"
                                        class="rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800">
                                        {{ action.label }}
                                    </UButton>
                                </div> -->
                                <UButton icon="i-lucide-more-horizontal" variant="ghost" color="neutral" size="xs"
                                    class="sm:hidden rounded-lg" />
                            </div>

                            <UButton label="Generate Topic" color="primary" size="lg"
                                class="rounded-full px-4 font-bold shadow-lg shadow-primary-500/20" :disabled="!prompt"
                                @click="generate">
                                <template #leading>
                                    <UIcon name="i-lucide-sparkles" class="animate-pulse" />
                                </template>
                            </UButton>
                        </div>

                        <!-- Subtle reflection effect -->
                        <div
                            class="absolute -inset-8 bg-gradient-to-tr from-transparent via-transparent to-primary-300/40 dark:to-primary-500/20 blur opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    </UCard>
                </div>
            </Transition>

            <!-- Secondary Actions (Hero Only) -->
            <Transition appear enter-active-class="transition-all duration-700 delay-500"
                enter-from-class="opacity-0 translate-y-4" enter-to-class="opacity-100 translate-y-0">
                <div v-if="isHero" class="mt-12 flex flex-wrap justify-center gap-6">
                    <div v-for="(stat, index) in [
                        { label: 'Learning Paths Generated', value: '12.4k+', icon: 'i-lucide-git-branch' },
                        { label: 'Active Learners', value: '5k+', icon: 'i-lucide-users' },
                        { label: 'Topics Covered', value: '800+', icon: 'i-lucide-book-open' }
                    ]" :key="index" class="flex items-center gap-3 text-muted">
                        <div class="p-2 rounded-lg bg-accented/40">
                            <UIcon :name="stat.icon" class="text-lg flex" />
                        </div>
                        <div class="text-left">
                            <div class="text-sm font-bold">{{ stat.value }}</div>
                            <div class="text-xs text-dimmed uppercase tracking-tighter">{{ stat.label }}</div>
                        </div>
                    </div>
                </div>
            </Transition>
        </div>
    </div>
</template>

<style scoped>
textarea::-webkit-scrollbar {
    width: 6px;
}

textarea::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 10px;
}

.dark textarea::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.1);
}
</style>
