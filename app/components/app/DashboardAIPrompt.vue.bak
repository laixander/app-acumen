<script setup lang="ts">
import { useTopics } from '~/composables/useTopics'
import { useLessons } from '~/composables/useLessons'
import { injectAssessmentsIntoTimeline, generateBaseLessonsForTopic } from '~/utils/seeder'
import { slugify } from '~/utils/format'

interface Props {
    isHero?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    isHero: false
})
const { user } = useUser()
const router = useRouter()
const { addTopic } = useTopics()
const { addLessons, addLessonContents, addAssessments } = useLessons()

const firstName = computed(() => user.value.profile.fullName.split(' ')[0])

const prompt = ref('')
const isGenerating = ref(false)

const files = ref<Array<{ name: string; size: string; type: string }>>([])

const handleUpload = () => {
    const newFile = {
        name: `Study_Materials_${files.value.length + 1}.pdf`,
        size: '2.4 MB',
        type: 'pdf'
    }
    files.value.push(newFile)
}

const removeFile = (index: number) => {
    files.value.splice(index, 1)
}

const generate = () => {
    if (!prompt.value) return
    isGenerating.value = true
}

const confirmFinish = () => {
    let title = prompt.value
    if (title.length > 50) {
        title = title.substring(0, 50) + '...'
    }

    const topicId = slugify(title || 'Untitled Topic')

    const {
        baseLessons,
        baseContents,
        baseAssessments
    } = generateBaseLessonsForTopic(topicId, title)

    const {
        newTimeline,
        newAssessments,
        newContents: injectedContents
    } = injectAssessmentsIntoTimeline(topicId, title, baseLessons, 0, baseLessons.length, false, baseAssessments)

    addLessons(newTimeline)
    addLessonContents([...baseContents, ...injectedContents])
    addAssessments(newAssessments)

    addTopic({
        title: title,
        progress: 0,
        tag: 'New',
        status: 'Ongoing',
        lessons: `0/${newTimeline.length}`,
        lastStudied: 'Just now',
        lastStudiedAt: Date.now(),
        icon: 'i-lucide-sparkles',
        isPinned: false,
        learningGoal: 'Mastery'
    })

    router.push(`/app/topics/${topicId}`)
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
                enter-from-class="opacity-0 translate-y-4" enter-to-class="opacity-100 translate-y-0"
                leave-active-class="transition-all duration-500 ease-in" leave-from-class="opacity-100 translate-y-0"
                leave-to-class="opacity-0 -translate-y-4">
                <div v-if="isHero && !isGenerating" class="mb-10 flex flex-col items-center">
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
                <div v-else-if="!isGenerating" class="flex flex-col items-center gap-2 mb-10">
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
            <Transition appear mode="out-in" enter-active-class="transition-all duration-700 delay-300"
                enter-from-class="opacity-0 scale-95" enter-to-class="opacity-100 scale-100"
                leave-active-class="transition-all duration-300 ease-in" leave-from-class="opacity-100 scale-100"
                leave-to-class="opacity-0 scale-95">
                <div v-if="!isGenerating" class="">
                    <!-- Glass Container -->
                    <UCard
                        :ui="{ root: `relative group border-0 ${isHero ? 'rounded-2xl' : 'rounded-xl'} shadow-2xl  hover:shadow-primary/50 hover:ring-4 hover:ring-primary-500/40 transition-all duration-300`, body: 'p-0 sm:p-0 flex flex-col' }">

                        <UTextarea v-model="prompt"
                            placeholder="e.g., I want to learn advanced Quantum Computing with a focus on Cryptography..."
                            :ui="{ root: 'w-full transition-all duration-300', base: `ring-0 ${isHero ? 'rounded-t-2xl' : 'rounded-t-xl'} rounded-b-none p-6` }"
                            autoresize :rows="isHero ? 8 : 5" @keydown.meta.enter="generate"
                            @keydown.ctrl.enter="generate" />

                        <!-- File upload simulation -->
                        <div v-if="files.length > 0" class="flex flex-wrap gap-2 px-6 py-4">
                            <div v-for="(file, index) in files" :key="index"
                                class="flex items-center gap-2 bg-neutral-100 dark:bg-neutral-800 rounded-lg px-3 py-1.5 border border-neutral-200 dark:border-neutral-700">
                                <UIcon name="i-lucide-file-text" class="text-red-500 text-sm shrink-0" />
                                <span class="text-xs font-medium truncate max-w-[150px]">{{ file.name }}</span>
                                <UButton icon="i-lucide-x" variant="ghost" color="neutral" size="xs" :padded="false"
                                    class="ml-1 shrink-0" @click="removeFile(index)" />
                            </div>
                        </div>

                        <!-- Action Bar -->
                        <div
                            class="flex items-center justify-between p-4 bg-neutral-50/50 dark:bg-neutral-900/50 border-t border-neutral-100 dark:border-neutral-800">
                            <div class="flex items-center gap-2">
                                <UButton icon="i-lucide-paperclip" variant="ghost" color="neutral" class="rounded-full"
                                    @click="handleUpload">
                                    <span class="hidden sm:inline">Attach</span>
                                </UButton>

                                <div class="w-px h-4 bg-neutral-200 dark:bg-neutral-700 mx-1" />

                                <UButton label="Advanced Options" variant="link" class="rounded-full"
                                    icon="i-lucide-wand" to="/app/topics/new" />
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
                                class="rounded-full px-4 shadow-lg shadow-primary-500/20" :disabled="!prompt"
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
                <div v-else class="py-12">
                    <AppTopicGenerating @finish="confirmFinish" />
                </div>
            </Transition>

            <!-- Secondary Actions (Hero Only) -->
            <Transition appear enter-active-class="transition-all duration-700 delay-500"
                enter-from-class="opacity-0 translate-y-4" enter-to-class="opacity-100 translate-y-0"
                leave-active-class="transition-all duration-300 ease-in" leave-from-class="opacity-100 translate-y-0"
                leave-to-class="opacity-0 translate-y-4">
                <div v-if="isHero && !isGenerating" class="mt-12 flex flex-wrap justify-center gap-6">
                    <div v-for="(stat, index) in [
                        { label: 'Learning Paths Generated', value: '12.4k+', icon: 'i-lucide-git-branch' },
                        { label: 'Active Learners', value: '5k+', icon: 'i-lucide-users' },
                        { label: 'Topics Covered', value: '800+', icon: 'i-lucide-book-open' }
                    ]" :key="index" class="flex items-center gap-3 text-muted">
                        <div class="p-2 rounded-lg bg-accented/40">
                            <UIcon :name="stat.icon" class="text-lg flex" />
                        </div>
                        <div class="text-left">
                            <div class="text-sm font-bold">
                                {{ stat.value }}
                            </div>
                            <div class="text-xs text-dimmed uppercase tracking-tighter">
                                {{ stat.label }}
                            </div>
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
