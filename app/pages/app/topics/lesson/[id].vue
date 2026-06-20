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

const topic = computed(() => {
    const topicId = lessonData.value?.topicId
    if (!topicId) return null
    return topics.value.find(t => t.id === topicId)
})

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
        <!-- Breadcrumbs -->
        <AppBreadcrumb />
        <!-- <nav class="flex items-center gap-2 text-sm text-neutral-500">
            <ULink to="/app/topics/collection" class="hover:text-primary transition-colors">Collection</ULink>
            <UIcon name="i-lucide-chevron-right" class="w-3.5 h-3.5" />
            <template v-if="topic">
                <ULink :to="`/app/topics/${topic.id}`" class="hover:text-primary transition-colors">{{ topic.title }}
                </ULink>
                <UIcon name="i-lucide-chevron-right" class="w-3.5 h-3.5" />
            </template>
            <ULink :to="`/app/topics/lessons/${lessonData?.topicId}`" class="hover:text-primary transition-colors">
                Lessons</ULink>
            <UIcon name="i-lucide-chevron-right" class="w-3.5 h-3.5" />
            <span class="font-medium text-neutral-900 dark:text-neutral-100">{{ lessonData?.title }}</span>
        </nav> -->

        <ContentHeading :title="lessonData?.title" :description="`${lessonData?.description}`" class="mt-6" />

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
            <!-- Left Side: Lesson Details -->
            <div class="flex flex-col gap-6 col-span-2">

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
                                <UButton 
                                    label="Start Checkpoint Assessment" 
                                    icon="i-lucide-zap"
                                    color="primary" 
                                    size="lg" 
                                    class="rounded-full px-8 shadow-lg shadow-primary-500/20 uppercase text-xs font-bold tracking-widest hover:scale-105 transition-transform"
                                    :to="`/app/assessment/${lessonData.assessmentId}`" 
                                />
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
            <AppAiChatPanel v-model:pendingQuote="pendingQuote" />
        </div>
    </UContainer>
</template>
