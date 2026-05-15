<script setup lang="ts">
defineEmits(['select-upload', 'select-explore'])

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
            <div v-for="door in doors" :key="door.id"
                class="group relative flex flex-col p-8 rounded-[2rem] border border-neutral-200/50 dark:border-neutral-800/50 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl shadow-sm hover:shadow-2xl transition-all duration-700 cursor-pointer overflow-hidden"
                :class="[
                    door.id === 'upload' ? 'hover:shadow-primary-500/10 hover:border-primary-500/50 dark:hover:border-primary-500/50' : 'hover:shadow-emerald-500/10 hover:border-emerald-500/50 dark:hover:border-emerald-500/50'
                ]"
                @click="$emit(`select-${door.id}`)">
                <!-- Background Glow -->
                <div class="absolute -top-32 -right-32 w-80 h-80 blur-[100px] opacity-0 group-hover:opacity-20 transition-opacity duration-700"
                    :class="door.id === 'upload' ? 'bg-primary-500' : 'bg-emerald-500'"></div>

                <div class="flex items-start justify-between mb-8">
                    <div class="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500"
                        :class="door.id === 'upload' ? 'text-primary-500' : 'text-emerald-500'">
                        <UIcon :name="door.icon" class="w-8 h-8 flex" />
                    </div>
                    <div
                        class="px-3 py-1 rounded-full text-xs font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 transition-colors"
                        :class="[
                            door.id === 'upload'
                                ? 'group-hover:bg-primary-50 dark:group-hover:bg-primary-950/30 group-hover:text-primary-600'
                                : 'group-hover:bg-emerald-50 dark:group-hover:bg-emerald-950/30 group-hover:text-emerald-600'
                        ]">
                        {{ door.title }}
                    </div>
                </div>

                <div class="space-y-4 flex-grow">
                    <h3 class="text-2xl font-bold text-neutral-900 dark:text-white">
                        {{ door.subtitle }}
                    </h3>
                    <p class="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                        {{ door.description }}
                    </p>

                    <div class="pt-4 border-t border-neutral-100 dark:border-neutral-800">
                        <p class="text-sm italic text-neutral-500 dark:text-neutral-500">
                            "{{ door.reference }}"
                        </p>
                    </div>
                </div>

                <div class="mt-8 flex items-center gap-2 font-medium"
                    :class="door.id === 'upload' ? 'text-primary-600 dark:text-primary-400' : 'text-emerald-600 dark:text-emerald-400'">
                    <span>{{ door.action }}</span>
                    <UIcon name="i-lucide-arrow-right" class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
