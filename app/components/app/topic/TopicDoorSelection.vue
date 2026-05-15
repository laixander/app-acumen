<script setup lang="ts">
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
            <div v-for="door in doors" :key="door.id"
                class="group relative flex flex-col p-8 rounded-[2rem] border border-neutral-200/50 dark:border-neutral-800/50 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl shadow-sm hover:shadow-2xl transition-all duration-700 cursor-pointer overflow-hidden"
                :class="[
                    door.id === 'upload'
                        ? 'hover:shadow-primary-500/10 hover:border-primary-500/50 dark:hover:border-primary-500/50'
                        : 'hover:shadow-emerald-500/10 hover:border-emerald-500/50 dark:hover:border-emerald-500/50'
                ]" @click="emit(`select-${door.id}`)">
                <!-- Background Glow -->
                <div class="absolute -top-32 -right-32 w-80 h-80 blur-[100px] opacity-0 group-hover:opacity-20 transition-opacity duration-700"
                    :class="door.id === 'upload' ? 'bg-primary-500' : 'bg-emerald-500'" />

                <div class="flex items-start justify-between mb-8">
                    <div class="p-4 rounded-2xl group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500"
                        :class="door.id === 'upload' ? 'bg-primary-50 dark:bg-primary-950/30 text-primary-500' : 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-500'">
                        <UIcon :name="door.icon" class="w-8 h-8 flex" />
                    </div>
                    <div class="px-3 py-1 rounded-full text-xs font-medium transition-colors" :class="[
                        door.id === 'upload'
                            ? 'bg-primary-50 dark:bg-primary-950/30 text-primary-600 dark:text-primary-400'
                            : 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400'
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
                    :class="door.id === 'upload' ? 'text-primary-600 dark:text-primary-400' : 'text-emerald-600 dark:text-emerald-400'">
                    <span>{{ door.action }}</span>
                    <UIcon name="i-lucide-arrow-right" class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
            </div>

            <!-- AI Prompt Door — spans full width -->
            <div
                class="group relative md:col-span-2 flex flex-col sm:flex-row rounded-[2rem] border border-violet-200/60 dark:border-violet-800/40 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl shadow-sm hover:shadow-2xl hover:shadow-violet-500/10 hover:border-violet-500/50 dark:hover:border-violet-500/40 transition-all duration-700 overflow-hidden">

                <!-- Left: info panel -->
                <div
                    class="relative flex flex-col justify-between p-8 sm:w-72 shrink-0 border-b sm:border-b-0 sm:border-r border-violet-100 dark:border-violet-900/40 overflow-hidden">
                    <div
                        class="absolute -top-24 -left-24 w-64 h-64 bg-violet-500 blur-[80px] opacity-0 group-hover:opacity-15 transition-opacity duration-700 pointer-events-none" />

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
                        <div class="pt-3 border-t border-violet-100 dark:border-violet-900/40">
                            <p class="text-xs italic text-neutral-500">
                                "The AI interprets your goal and builds a personalized plan around it."
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Right: prompt input -->
                <div class="flex flex-col flex-1 p-8 gap-5 justify-between">
                    <div class="flex flex-col gap-2">
                        <label class="text-xs font-bold uppercase tracking-widest text-violet-500">
                            What do you want to learn?
                        </label>
                        <textarea v-model="promptText" rows="4"
                            placeholder="e.g. I want to understand how transformer models work from scratch, for a machine learning interview next month..."
                            class="w-full resize-none rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 px-4 py-3 text-sm text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 outline-none focus:border-violet-400 dark:focus:border-violet-600 focus:ring-2 focus:ring-violet-500/20 transition-all duration-300" />
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
            </div>
        </div>

        <div class="text-center">
            <p class="text-sm text-neutral-400 dark:text-neutral-600">
                Either way, the AI assesses you on day one and builds your program from there.
            </p>
        </div>
    </div>
</template>
