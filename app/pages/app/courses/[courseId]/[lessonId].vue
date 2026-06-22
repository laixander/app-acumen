<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'


import { computed, ref, watchEffect } from 'vue'
import type { LessonContent } from '~/types/course'
import type { ChatQuote } from '~/types/chat'

definePageMeta({
    middleware: [
        function (to, from) {
            if (!to.meta.breadcrumb) to.meta.breadcrumb = {}
        }
    ]
})

const route = useRoute()
const router = useRouter()
const lessonStore = useLessonStore()
const courseStore = useCourseStore()

const { data: serverLessonData } = await useFetch<LessonContent>(`/api/lesson/${route.params.lessonId}`)
const localLessonData = computed(() => lessonStore.getLessonContentById(route.params.lessonId as string))

const lessonData = computed(() => {
    return localLessonData.value || serverLessonData.value
})

const title = computed(() => {
    return lessonData.value?.title || 'Lesson Viewer'
})

const adjacent = computed(() => lessonStore.getAdjacentLessons(route.params.lessonId as string))

const course = computed(() => {
    const courseId = route.params.courseId as string
    if (!courseId) return null
    return courseStore.getCourseBySlugOrId(courseId)
})

watchEffect(() => {
    if (course.value) {
        (route.meta.breadcrumb as Record<string, string>)[route.params.courseId as string] = course.value.title;
    }
    if (lessonData.value) {
        (route.meta.breadcrumb as Record<string, string>)[route.params.lessonId as string] = lessonData.value.title;
    }
})

const handlePrevious = () => {
    if (adjacent.value.prev) {
        router.push(`/app/courses/${route.params.courseId}/${adjacent.value.prev.id}`)
    }
}

const handleContinue = () => {
    lessonStore.completeLesson(route.params.lessonId as string)

    const courseId = route.params.courseId as string
    if (courseId) {
        const course = courseStore.getCourseBySlugOrId(courseId)
        const actualCourseId = course?.id || courseId
        const courseLessons = lessonStore.getLessonsByCourse(actualCourseId)

        const completedCount = courseLessons.filter(l => l.status === 'completed').length
        const totalCount = courseLessons.length
        const progress = Math.round((completedCount / totalCount) * 100)
        if (course?.id) courseStore.updateCourseProgress(course.id, progress)
    }

    if (adjacent.value.next) {
        router.push(`/app/courses/${route.params.courseId}/${adjacent.value.next.id}`)
    } else {
        router.push(courseId ? `/app/courses/lessons/${courseId}` : '/app/dashboard')
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
            <ULink to="/app/courses/collection" class="hover:text-primary transition-colors">Collection</ULink>
            <UIcon name="i-lucide-chevron-right" class="w-3.5 h-3.5" />
            <template v-if="course">
                <ULink :to="`/app/courses/${course.id}`" class="hover:text-primary transition-colors">{{ course.title }}
                </ULink>
                <UIcon name="i-lucide-chevron-right" class="w-3.5 h-3.5" />
            </template>
            <ULink :to="`/app/courses/lessons/${lessonData?.courseId}`" class="hover:text-primary transition-colors">
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
