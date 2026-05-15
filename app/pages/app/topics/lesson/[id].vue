<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { useLessons } from '~/composables/useLessons'
import { useTopics } from '~/composables/useTopics'
import { computed, ref } from 'vue'
import type { LessonContent } from '~/types/topic'
import type { ChatQuote } from '~/types/chat'

const route = useRoute()
const router = useRouter()
const { getLessonContentById, getAdjacentLessons, completeLesson, getLessonsByTopic } = useLessons()
const { updateTopicProgress, topics } = useTopics()

const { data: serverLessonData } = await useFetch<LessonContent>(`/api/lesson/${route.params.id}`)
const localLessonData = computed(() => getLessonContentById(route.params.id as string))

const lessonData = computed(() => {
    return localLessonData.value || serverLessonData.value
})

const title = computed(() => {
    return lessonData.value?.title || 'Lesson Viewer'
})

const adjacent = computed(() => getAdjacentLessons(route.params.id as string))

const handlePrevious = () => {
    if (adjacent.value.prev) {
        router.push(`/app/topics/lesson/${adjacent.value.prev.id}`)
    }
}

const handleContinue = () => {
    completeLesson(route.params.id as string)

    const topicId = lessonData.value?.topicId
    if (topicId) {
        const topic = topics.value.find(t => t.id === topicId)
        const topicLessons = getLessonsByTopic(topicId)

        const completedCount = topicLessons.filter(l => l.status === 'completed').length
        const totalCount = topicLessons.length
        const progress = Math.round((completedCount / totalCount) * 100)
        updateTopicProgress(topicId, completedCount, totalCount, progress)
    }

    if (adjacent.value.next) {
        router.push(`/app/topics/lesson/${adjacent.value.next.id}`)
    } else {
        router.push(topicId ? `/app/topics/lessons/${topicId}` : '/app/dashboard')
    }
}

useHead({
    title: `${title.value} - LearnFast Lesson`
})

const pendingQuote = ref<ChatQuote | null>(null)

const handleAskAboutLine = (payload: ChatQuote) => {
    pendingQuote.value = payload
}
</script>

<template>
    <UContainer class="py-6">
        <ContentHeading :title="lessonData?.title" :description="`${lessonData?.description}`" class="mb-6" />

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <!-- Left Side: Lesson Details -->
            <div class="flex flex-col gap-6">
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
                    <LessonTranscript v-if="lessonData?.sections" :sections="lessonData.sections"
                        @ask-ai="handleAskAboutLine" />

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

            <!-- Right Side: AI Chat Panel -->
            <AiChatPanel v-model:pendingQuote="pendingQuote" />
        </div>
    </UContainer>
</template>
