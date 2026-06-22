<script setup lang="ts">
const props = defineProps<{
    isOnboarding?: boolean
}>()

const emit = defineEmits(['select-upload', 'select-explore', 'select-prompt'])

const promptText = ref('')

const doors = [
    {
        id: 'upload',
        title: 'Upload Mode',
        subtitle: 'Bring your own material',
        description: 'For board exams, licensure, law, nursing, accounting, engineering — anything jurisdiction-specific.',
        reference: 'The AI uses only your material as the source. Every fact traces back to what you uploaded.',
        icon: 'i-lucide-upload-cloud',
        color: 'primary',
        action: 'Upload reviewer, notes, or textbook'
    },
    {
        id: 'explore',
        title: 'Explore Mode',
        subtitle: 'Pick a subject. Start mastering.',
        description: 'For school subjects that don\'t change by country — Math, Sciences, Languages, Humanities.',
        reference: 'The AI teaches from a curriculum aligned with universal principles, no upload needed.',
        icon: 'i-lucide-compass',
        color: 'emerald',
        action: 'Select a subject'
    }
] as const
</script>

<template>
    <div class="flex flex-col gap-12">
        <div class="text-center max-w-2xl mx-auto space-y-4">
            <h1 class="text-3xl font-semibold tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
                How do you want to start?
            </h1>
            <p class="text-lg text-neutral-500 dark:text-neutral-400 leading-relaxed">
                Whether you're prepping for a board exam with a 2,000-page reviewer, or trying to finally crack high
                school physics — Acumen has a door for you.
            </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">

            <!-- Upload & Explore doors -->
            <UCard v-for="door in doors" :key="door.id" variant="subtle"
                class="group rounded-[2rem] backdrop-blur-xl shadow-sm hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden"
                :ui="{
                    body: 'relative flex flex-col h-full sm:p-8',
                }" :class="[
                    door.id === 'upload'
                        ? 'hover:shadow-primary-500/10 hover:ring-primary-500/50 dark:hover:ring-primary-500/50'
                        : 'hover:shadow-warning-500/10 hover:ring-warning-500/50 dark:hover:ring-warning-500/50'
                ]" @click="emit(`select-${door.id}`)">
                <!-- Background Glow -->
                <div class="absolute -top-32 -right-32 w-80 h-80 blur-[100px] opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                    :class="door.id === 'upload' ? 'bg-primary-500' : 'bg-warning-500'" />

                <div class="flex items-start justify-between mb-8">
                    <div class="p-4 rounded-2xl group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500"
                        :class="door.id === 'upload' ? 'bg-primary-50 dark:bg-primary-950/30 text-primary-500' : 'bg-warning-50 dark:bg-warning-950/30 text-warning-500'">
                        <UIcon :name="door.icon" class="w-8 h-8 flex" />
                    </div>
                    <div class="px-3 py-1 rounded-full text-xs font-medium transition-colors" :class="[
                        door.id === 'upload'
                            ? 'bg-primary-50 dark:bg-primary-950/30 text-primary-600 dark:text-primary-400'
                            : 'bg-warning-50 dark:bg-warning-950/30 text-warning-600 dark:text-warning-400'
                    ]">
                        {{ door.title }}
                    </div>
                </div>

                <div class="space-y-4 flex-grow">
                    <h3 class="text-2xl font-bold text-neutral-900 dark:text-white">{{ door.subtitle }}</h3>
                    <p class="text-neutral-600 dark:text-neutral-400 leading-relaxed">{{ door.description }}</p>
                    <div class="pt-4 border-t border-neutral-100 dark:border-neutral-800">
                        <p class="text-sm italic text-neutral-500 dark:text-neutral-500">"{{ door.reference }}"</p>
                    </div>
                </div>

                <div class="mt-8 flex items-center gap-2 font-medium"
                    :class="door.id === 'upload' ? 'text-primary-600 dark:text-primary-400' : 'text-warning-600 dark:text-warning-400'">
                    <span>{{ door.action }}</span>
                    <UIcon name="i-lucide-arrow-right" class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
            </UCard>

            <!-- AI Prompt Door — spans full width -->
            <UCard v-if="!isOnboarding" variant="subtle" :ui="{ body: 'p-0 sm:p-0 relative flex flex-col sm:flex-row' }"
                class="group md:col-span-2 rounded-[2rem] shadow-sm hover:shadow-2xl hover:shadow-violet-500/10 hover:ring-violet-500/50 dark:hover:ring-violet-500/40 transition-all duration-300 overflow-hidden">

                <div
                    class="absolute z-0 -top-24 -right-24 w-64 h-64 bg-violet-500 blur-[80px] opacity-0 group-hover:opacity-15 transition-opacity duration-300 pointer-events-none" />

                <!-- Left: info panel -->
                <div
                    class="relative flex flex-col justify-between p-8 sm:w-72 shrink-0 border-b sm:border-b-0 sm:border-r border-neutral-100 dark:border-neutral-800 overflow-hidden">

                    <div class="flex items-start justify-between mb-6">
                        <div
                            class="p-4 rounded-2xl bg-violet-50 dark:bg-violet-950/40 text-violet-500 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                            <UIcon name="i-lucide-sparkles" class="w-8 h-8 flex" />
                        </div>
                        <div
                            class="px-3 py-1 rounded-full text-xs font-medium bg-violet-50 dark:bg-violet-950/30 text-violet-500 dark:text-violet-400">
                            AI Prompt Mode
                        </div>
                    </div>

                    <div class="space-y-3 flex-grow">
                        <h3 class="text-2xl font-bold text-neutral-900 dark:text-white">Just describe it.</h3>
                        <p class="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                            Tell the AI what you want to learn — no files, no category list. It generates a full
                            curriculum from your words.
                        </p>
                        <div class="pt-3 border-t border-neutral-100 dark:border-neutral-800">
                            <p class="text-xs italic text-neutral-500">
                                "The AI interprets your goal and builds a personalized plan around it."
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Right: prompt input -->
                <div class="relative z-10 flex flex-col flex-1 p-8 gap-5 justify-between">
                    <div class="flex flex-col gap-2">
                        <label class="text-xs font-bold uppercase tracking-widest text-violet-500">
                            What do you want to learn?
                        </label>
                        <UTextarea v-model="promptText" :rows="5" variant="subtle"
                            placeholder="e.g. I want to understand how transformer models work from scratch..."
                            style="--ui-primary: var(--color-violet-500); --ui-primary-elevated: var(--color-violet-400);"
                            :ui="{
                                base: 'resize-none transition-all duration-300 rounded-2xl px-4 py-3 w-full'
                            }" />
                        <p class="text-[11px] text-neutral-400 dark:text-neutral-600">
                            Be specific — mention your goal, timeline, or level if relevant.
                        </p>
                    </div>

                    <div class="flex items-center justify-between gap-4 flex-wrap">
                        <!-- Example chips -->
                        <div class="flex flex-wrap gap-2">
                            <button
                                v-for="example in ['ML fundamentals for interviews', 'Spanish for travel', 'Intro to investing']"
                                :key="example"
                                class="text-xs px-3 py-1.5 rounded-full border border-violet-200 dark:border-violet-800/50 text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/20 hover:bg-violet-100 dark:hover:bg-violet-900/30 transition-colors cursor-pointer"
                                @click="promptText = example">
                                {{ example }}
                            </button>
                        </div>

                        <UButton label="Begin Assessment" trailing-icon="i-lucide-arrow-right"
                            :disabled="!promptText.trim()" color="violet" variant="soft"
                            :ui="{ trailingIcon: 'size-4' }"
                            class="rounded-full px-6 shrink-0 disabled:opacity-40 disabled:cursor-not-allowed"
                            @click="emit('select-prompt', promptText.trim())" />
                    </div>
                </div>
            </UCard>
        </div>

        <div class="text-center">
            <p class="text-sm text-neutral-400 dark:text-neutral-600">
                Either way, the AI assesses you on day one and builds your program from there.
            </p>
        </div>
    </div>
</template>
