<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { useLessons } from '~/composables/useLessons'
import { useTopics } from '~/composables/useTopics'
import { computed, ref } from 'vue'
import type { LessonContent } from '~/types/topic'

const route = useRoute()
const router = useRouter()
const { getLessonContentById, getAdjacentLessons, completeLesson, getLessonsByTopic } = useLessons()
const { updateTopicProgress, topics } = useTopics()
const { addLog } = useActivityLogs()

const { data: serverLessonData } = await useFetch<LessonContent>(`/api/lesson/${route.params.id}`)
const localLessonData = getLessonContentById(route.params.id as string)

const lessonData = computed(() => {
    return localLessonData || serverLessonData.value
})

const title = computed(() => {
    return lessonData.value?.title || 'Lesson Viewer'
})

const noteContent = ref('')

const adjacent = computed(() => getAdjacentLessons(route.params.id as string))

const handlePrevious = () => {
    if (adjacent.value.prev) {
        router.push(`/app/lesson/${adjacent.value.prev.id}`)
    }
}

const handleContinue = () => {
    // 1. Mark current as complete in local state
    completeLesson(route.params.id as string)

    // 2. Update topic progress in the topics store
    const topicId = lessonData.value?.topicId
    if (topicId) {
        const topic = topics.value.find(t => t.id === topicId)
        const topicLessons = getLessonsByTopic(topicId)
        const lessonOverview = topicLessons.find(l => l.id === route.params.id)

        if (topic && lessonOverview) {
            addLog(topicId, topic.title, lessonOverview.id, lessonOverview.title, lessonOverview.duration)
        }

        const completedCount = topicLessons.filter(l => l.status === 'completed').length
        const totalCount = topicLessons.length
        const progress = Math.round((completedCount / totalCount) * 100)
        updateTopicProgress(topicId, completedCount, totalCount, progress)
    }

    // 3. Navigate to next lesson or return to topic view
    if (adjacent.value.next) {
        router.push(`/app/lesson/${adjacent.value.next.id}`)
    } else {
        // Last lesson completed!
        router.push(topicId ? `/app/topics/${topicId}` : '/app/dashboard')
    }
}

useHead({
    title: `${title.value} - LearnFast Lesson`
})
</script>

<template>
    <UContainer class="flex flex-col gap-6 py-6">
        <!-- <div v-if="lessonData?.lessonTypes" class="flex items-center gap-2">
            <UBadge v-for="type in lessonData.lessonTypes" :key="type" :label="type" variant="subtle" color="primary" />
        </div> -->
        <ContentHeading :title="lessonData?.title" :description="`${lessonData?.description}`" />
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- Main Content Area -->
            <div class="lg:col-span-2 flex flex-col gap-6">
                <!-- Media Player Placeholder -->
                <UCard class="overflow-hidden aspect-video relative group" :ui="{ body: 'p-0 w-full h-full' }">
                    <div
                        class="absolute inset-0 bg-neutral-900/10 dark:bg-neutral-900/50 flex flex-col items-center justify-center">
                        <UButton icon="i-lucide-play" color="neutral" variant="solid" size="xl"
                            class="rounded-full w-16 h-16 flex items-center justify-center shadow-lg transform transition-transform group-hover:scale-110" />
                        <p class="text-sm font-semibold text-white mt-4 drop-shadow-md">AI Generated Breakdown</p>
                    </div>
                    <img src="https://images.unsplash.com/photo-1610484826967-09c5720778c7?q=80&w=2000&auto=format&fit=crop"
                        class="w-full h-full object-cover mix-blend-overlay opacity-60 dark:opacity-40"
                        alt="Video Placeholder" />
                </UCard>

                <!-- Lesson Transcript / Reading -->
                <UCard>
                    <article class="prose dark:prose-invert max-w-none prose-primary" v-if="lessonData">
                        <!-- <h2 class="text-2xl font-bold tracking-tight mb-4">{{ lessonData.title }}</h2>
                        <p class="lead text-dimmed text-lg mb-6">
                            {{ lessonData.description }}
                        </p> -->

                        <template v-for="(section, idx) in lessonData.sections" :key="idx">
                            <h3 class="text-2xl font-bold mb-3">{{ section.title }}</h3>
                            <p>{{ section.content }}</p>

                            <div v-if="section.aiInsight"
                                class="bg-primary-500/10 border-l-4 border-primary-500 p-4 my-6 rounded-r-lg">
                                <strong class="text-primary-700 dark:text-primary-400 block mb-1">AI
                                    Insight</strong>
                                <p class="m-0 text-primary-600 dark:text-primary-300 text-sm">
                                    {{ section.aiInsight }}
                                </p>
                            </div>
                        </template>
                    </article>

                    <div
                        class="mt-12 pt-6 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
                        <UButton label="Previous Lesson" icon="i-lucide-arrow-left" color="neutral" variant="ghost"
                            :disabled="!adjacent.prev" @click="handlePrevious" />

                        <div class="flex items-center gap-3">
                            <template v-if="lessonData?.assessmentId">
                                <UButton label="Take Assessment to Progress" icon="i-lucide-clipboard-check"
                                    color="primary" size="lg" class="shadow-lg shadow-primary-500/20"
                                    :to="`/app/assessment/${lessonData.assessmentId}`" />
                            </template>
                            <template v-else>
                                <UButton label="Complete & Continue" icon="i-lucide-check-circle" color="neutral"
                                    variant="soft" @click="handleContinue" />
                            </template>
                        </div>
                    </div>
                </UCard>
            </div>
            <!-- Sidebar Tutors / Tools -->
            <div class="flex flex-col gap-6">
                <!-- AI Tutor Prompt -->
                <UCard class="border-2 border-primary-500/20 bg-primary-500/5" :ui="{ body: 'flex flex-col gap-4' }">
                    <div class="flex items-center gap-3">
                        <div class="bg-primary text-white p-2 rounded-xl shadow-md">
                            <UIcon name="i-lucide-sparkles" class="text-xl flex shrink-0" />
                        </div>
                        <h3 class="font-bold">Ask AI Tutor</h3>
                    </div>
                    <p class="text-sm text-dimmed">Stuck on a concept? Your AI tutor knows context about this
                        specific
                        lesson.</p>
                    <UInput placeholder="e.g. Can you explain locality again?" icon="i-lucide-message-square" />
                    <UButton label="Ask Question" block color="primary" />
                </UCard>

                <!-- Lesson Types -->
                <UCard v-if="lessonData" :ui="{ body: 'flex flex-col gap-3' }">
                    <div class="flex items-center gap-2 mb-2">
                        <UIcon name="i-lucide-tag" class="text-neutral-500" />
                        <h3 class="font-bold text-sm uppercase tracking-wider text-muted">Lesson Types</h3>
                    </div>
                    <div class="flex items-center gap-2">
                        <UBadge v-for="lessonType in lessonData.lessonTypes" :key="lessonType" :label="lessonType"
                            variant="soft" color="neutral" />
                    </div>
                </UCard>

                <!-- Notes -->
                <UCard :ui="{ body: 'flex flex-col gap-3' }">
                    <div class="flex items-center gap-2 mb-2">
                        <UIcon name="i-lucide-pen-line" class="text-neutral-500" />
                        <h3 class="font-bold text-sm uppercase tracking-wider text-muted">My Notes</h3>
                    </div>
                    <UTextarea v-model="noteContent" placeholder="Jot down important takeaways..." :rows="6"
                        class="w-full" autoresize />
                    <span class="text-xs text-dimmed text-right">Auto-saving...</span>
                </UCard>
            </div>
        </div>
    </UContainer>
</template>
