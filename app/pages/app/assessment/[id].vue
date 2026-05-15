<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { useLessons } from '~/composables/useLessons'
import { useTopics } from '~/composables/useTopics'
import { ref, computed, onMounted } from 'vue'
import type { Assessment } from '~/types/topic'
import type { SessionState, SessionProcessingLine } from '~/types/session'

const route = useRoute()
const router = useRouter()
const { getAssessmentByLessonId, completeLesson, getLessonsByTopic } = useLessons()
const { updateTopicProgress, topics } = useTopics()
const { addLog } = useActivityLogs()

const { data: serverAssessmentData } = await useFetch<Assessment>(`/api/assessment/${route.params.id}`)
const localAssessmentData = getAssessmentByLessonId(route.params.id as string)

const assessmentData = computed(() => {
    return (localAssessmentData || serverAssessmentData.value) as Assessment | null
})

const title = computed(() => {
    return assessmentData.value?.title || 'Assessment'
})

useHead({ title: `${title.value} - LearnFast Assessment` })

const sessionState = ref<SessionState>('processing')
const questions = computed(() => assessmentData.value?.questions || [])
const answers = ref<Record<string | number, string>>({})

const processingLines = computed<SessionProcessingLine[]>(() => [
    { text: 'Analyzing lesson requirements...', delay: 800 },
    { text: 'Generating targeted assessment scenarios...', delay: 1200 },
    { text: 'Integrating Reasoning Probes...', delay: 1000 },
    { text: 'System ready.', delay: 500 }
])

const handleProcessingComplete = () => {
    sessionState.value = 'ready'
}

const beginSessionAction = () => {
    sessionState.value = 'active'
}

const handleSessionComplete = (finalAnswers: Record<string | number, string>) => {
    answers.value = finalAnswers
    sessionState.value = 'complete'
}

const calculatedScore = computed(() => {
    if (questions.value.length === 0) return 0
    let score = 0
    questions.value.forEach(q => {
        if (answers.value[q.id] === (q.correct as string)) score++
    })
    return Math.round((score / questions.value.length) * 100)
})

const resetSession = () => {
    router.push(`/app/topics/${assessmentData.value?.topicId}`)
}

const handleViewPlan = () => {
    sessionState.value = 'plan'
}

// Completion logic for progress updates
const finalizeAssessment = () => {
    completeLesson(route.params.id as string);

    // Trigger Progress Update
    const topicId = assessmentData.value?.topicId;
    if (topicId) {
        const topic = topics.value.find(t => t.id === topicId)
        const topicLessons = getLessonsByTopic(topicId);
        const lessonOverview = topicLessons.find(l => l.assessmentId === route.params.id || l.id === assessmentData.value?.lessonId)

        if (topic && lessonOverview) {
            addLog(topicId, topic.title, lessonOverview.id, lessonOverview.title, lessonOverview.duration)
        }

        const completedCount = topicLessons.filter(l => l.status === 'completed').length;
        const totalCount = topicLessons.length;
        const progress = Math.round((completedCount / totalCount) * 100);
        updateTopicProgress(topicId, completedCount, totalCount, progress);
    }

    router.push(`/app/topics/${assessmentData.value?.topicId}`)
}

const description = computed(() => {
    const id = route.params.id?.toString() || ''
    if (id.includes('-final')) return 'Final Assessment'
    if (id.includes('-quiz-')) return 'Checkpoint Quiz'
    return 'Lesson Knowledge Check'
})

</script>

<template>
    <UContainer class="py-6">
        <!-- title + description base on previous route context: if lessons, Checkpoint Quiz/Final Assessment -->
        <ContentHeading :title="title" :description="description" class="mb-6" />
        <Transition name="fade" mode="out-in">
            <UCard :key="sessionState"
                class="w-full relative border-none ring-1 ring-primary/20 shadow-2xl shadow-primary/5 overflow-hidden transition-all duration-500"
                :ui="{ body: 'p-0 sm:p-0' }">
                <AppSessionProcessing v-if="sessionState === 'processing'" :lines="processingLines"
                    @complete="handleProcessingComplete" />

                <AppSessionReady v-else-if="sessionState === 'ready'"
                    :topic-name="assessmentData?.title || 'Checkpoint'" :module-title="description" difficulty="Medium"
                    :duration="`${questions.length * 2} min`" @start="beginSessionAction" />

                <AppSessionActive v-else-if="sessionState === 'active'" :questions="questions"
                    :module-title="assessmentData?.title || 'Assessment'" @close="resetSession"
                    @complete="handleSessionComplete" />

                <AppSessionComplete v-else-if="sessionState === 'complete'"
                    :module-title="assessmentData?.title || 'Assessment'"
                    :what-you-did-well="calculatedScore >= 70 ? 'Strong grasp of core concepts and reasoning.' : 'Partial understanding of the topic basics.'"
                    :where-you-struggled="calculatedScore >= 70 ? 'Keep practicing complex applications.' : 'Needs review on fundamental principles.'"
                    :pass-prob-before="assessmentData?.passProbBefore || '45%'"
                    :pass-prob-after="calculatedScore >= 70 ? (assessmentData?.passProbAfter || '75%') : assessmentData?.passProbBefore || '45%'"
                    :ai-final-comment="calculatedScore >= 70 ? 'Excellent work. Your reasoning shows deep integration of the material.' : 'Don\'t worry, this is part of the learning curve. Review the lesson and try again!'"
                    @close="finalizeAssessment" @view-plan="handleViewPlan" />

                <AppSessionReadinessPlan v-else-if="sessionState === 'plan'" @close="finalizeAssessment" />
            </UCard>
        </Transition>
    </UContainer>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.4s ease, transform 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: translateY(15px);
}
</style>
