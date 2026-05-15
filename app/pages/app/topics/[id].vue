<script setup lang="ts">
import { useTopics } from '~/composables/useTopics'
import { useLessons } from '~/composables/useLessons'
import { computed, onMounted, ref, nextTick } from 'vue'
import { injectAssessmentsIntoTimeline } from '~/utils/seeder'
import { TOPIC_CONTENT_MAP } from '~/utils/seeder/topics'
import { GOAL_COLORS } from '~/constants/topics'
import type { SessionState, SessionProcessingLine } from '~/types/session'

const route = useRoute()
const { topics, updateTopic } = useTopics()
const { getLessonsByTopic, addAssessments, addLessonContents, updateLessonsForTopic } = useLessons()

const topic = computed(() => {
    return topics.value.find(t => t.id === route.params.id)
})

const { data: serverLessons } = await useFetch(`/api/lessons?topicId=${route.params.id}`)

const lessons = computed(() => {
    const local = getLessonsByTopic(route.params.id as string)
    return local.length > 0 ? local : (serverLessons.value || [])
})

// Mock data for the specific screenshot view
const userProfile = {
    name: 'Alex'
}

// Dynamic data from topic seeder
const examInfo = computed(() => topic.value?.examInfo || {
    name: 'LET SEPTEMBER 2026',
    daysAway: 28
})

const stats = computed(() => topic.value?.stats || [
    { label: 'Master (Overall)', value: '0%', subtext: 'No data yet', icon: 'i-lucide-award' },
    { label: 'Pass Probability', value: '0%', subtext: 'at current pace', icon: 'i-lucide-line-chart' },
    { label: 'Sessions This Week', value: '0', subtext: '0 hrs total', icon: 'i-lucide-calendar-days' }
])

const strongLessons = computed(() => topic.value?.strongTopics || [])

const weakLessons = computed(() => topic.value?.weakTopics || [])

const weakestTopic = computed(() => weakLessons.value[0] || { name: topic.value?.title || 'this topic', progress: 0, color: 'text-orange-500' })

const recommendedLesson = computed(() => {
    // 1. Try static map first
    const mappedContent = TOPIC_CONTENT_MAP[route.params.id as string]
    if (mappedContent && mappedContent.lessons.length > 0) {
        const lesson = mappedContent.lessons.find(l => l.assessment) || mappedContent.lessons[0]
        return lesson
    }

    // 2. Fallback to local lessons list
    if (lessons.value && lessons.value.length > 0) {
        // Try to find an assessment lesson first
        const assessmentLesson = lessons.value.find(l => l.type === 'Assessment')
        if (assessmentLesson) return assessmentLesson
        
        // Otherwise try one with assessmentId
        return lessons.value.find(l => l.assessmentId) || lessons.value[0]
    }

    return null
})

const { getAssessmentByLessonId } = useLessons()
const activeAssessment = computed(() => {
    if (!recommendedLesson.value) return null
    // If it's from static map and has assessment attached
    if ('assessment' in recommendedLesson.value && recommendedLesson.value.assessment) {
        return recommendedLesson.value.assessment
    }
    // Otherwise look up in store
    if (!recommendedLesson.value.id) return null
    return getAssessmentByLessonId(recommendedLesson.value.id)
})

const sessionState = ref<SessionState>('idle')

const startSession = () => {
    sessionState.value = 'processing'
    window.scrollTo({ top: 0, behavior: 'smooth' })
}

const processingLines = computed<SessionProcessingLine[]>(() => [
    { text: 'Reading your mastery profile...', delay: 800 },
    { text: `You are <span class="text-primary font-bold">weakest on ${weakestTopic.value?.name || 'this topic'}</span>. Last practiced 3 days ago — decaying.`, delay: 1500 },
    { text: `You learn faster through <span class="text-primary font-bold">${recommendedLesson.value?.type === 'video' ? 'visual explanations' : 'active problem solving'}</span>. Selecting <span class="text-primary font-bold">${recommendedLesson.value?.title || 'Topic Review'}</span>.`, delay: 1500 },
    { text: `Selecting targeted material. Difficulty: <span class="text-primary font-bold">medium</span>. You have time for ${recommendedLesson.value?.duration || '~10 min'}.`, delay: 1500 }
])

const handleProcessingComplete = () => {
    sessionState.value = 'ready'
}

const beginSessionAction = () => {
    sessionState.value = 'active'
    window.scrollTo({ top: 0, behavior: 'smooth' })
}

const handleSessionComplete = () => {
    sessionState.value = 'complete'
    window.scrollTo({ top: 0, behavior: 'smooth' })

    // Simulate analysis update for new topics
    if (topic.value && topic.value.stats?.[0]?.value === '0%') {
        const total = lessons.value.length
        const completed = 1
        const progress = Math.round((completed / total) * 100)

        updateTopic(route.params.id as string, {
            progress,
            lessons: `${completed}/${total}`,
            stats: [
                { label: 'Master (Overall)', value: '15%', subtext: 'Initial session complete', icon: 'i-lucide-award' },
                { label: 'Pass Probability', value: '52%', subtext: '+7% improvement', icon: 'i-lucide-line-chart' },
                { label: 'Sessions This Week', value: '1', subtext: '0.5 hrs total', icon: 'i-lucide-calendar-days' }
            ],
            strongTopics: lessons.value.slice(0, 2).map(l => ({
                name: l.title.split(':').pop()?.trim() || l.title,
                progress: 85,
                color: 'text-green-500'
            })),
            weakTopics: lessons.value.slice(2, 4).map(l => ({
                name: l.title.split(':').pop()?.trim() || l.title,
                progress: 42,
                color: 'text-orange-500'
            }))
        })
    }
}

const handleViewPlan = () => {
    sessionState.value = 'plan'
    window.scrollTo({ top: 0, behavior: 'smooth' })
}

const resetSession = () => {
    sessionState.value = 'idle'
    window.scrollTo({ top: 0, behavior: 'smooth' })
}

const assessmentCard = ref<any>(null)

const injectAssessments = () => {
    if (!topic.value) return
    const currentLessons = [...lessons.value]
    if (currentLessons.length === 0) return

    const hasQuizzes = currentLessons.some(l => l.type === 'Assessment')
    if (hasQuizzes) return

    const {
        newTimeline,
        newAssessments,
        newContents
    } = injectAssessmentsIntoTimeline(route.params.id as string, topic.value.title, currentLessons as any[])

    updateLessonsForTopic(route.params.id as string, newTimeline)
    addLessonContents(newContents)
    addAssessments(newAssessments)
}

onMounted(() => {
    injectAssessments()
})

useHead({
    title: topic.value ? `${topic.value.title} - Acumen` : 'Topic Not Found'
})
</script>

<template>
    <UContainer v-if="topic" class="py-6 flex flex-col gap-10">
        <!-- Breadcrumbs -->
        <nav class="flex items-center gap-2 text-sm text-neutral-500">
            <ULink to="/app/topics/collection" class="hover:text-primary transition-colors">Collection</ULink>
            <UIcon name="i-lucide-chevron-right" class="w-3.5 h-3.5" />
            <span class="font-medium text-neutral-900 dark:text-neutral-100">{{ topic.title }}</span>
        </nav>

        <!-- Header Section -->
        <header class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div class="flex flex-col gap-1">
                <h1 class="text-4xl font-bold tracking-tight">
                    Welcome back, <span class="text-primary">{{ userProfile.name }}.</span>
                </h1>
                <p class="text-muted">You're making great progress towards your goal.</p>
            </div>

            <div class="flex items-center gap-4">
                <UTooltip text="Open Lessons">
                    <UButton variant="soft" square class="p-2 rounded-xl flex flex-col items-center gap-0.5"
                        :to="`/app/topics/lessons/${route.params.id}`">
                        <UIcon name="i-lucide-book-open" class="size-7" />
                        <span class="text-[9px] font-bold uppercase tracking-wider opacity-80">Lessons</span>
                    </UButton>
                </UTooltip>
                <div class="flex flex-col items-end gap-1 text-right border-l-2 border-primary/20 pl-4">
                    <span class="text-xs font-semibold tracking-wider text-muted uppercase">
                        {{ topic.learningGoal || 'Target Exam' }} · {{ examInfo.name }}</span>
                    <span class="text-3xl font-bold text-primary">{{ examInfo.daysAway }} Days Away</span>
                </div>
            </div>
        </header>

        <Transition name="fade" mode="out-in">
            <div v-if="sessionState === 'idle'" class="flex flex-col gap-8 w-full">
                <!-- Stats Grid -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <UCard v-for="(stat, i) in stats" :key="i" variant="soft" class="relative overflow-hidden group"
                        :ui="{ body: 'flex flex-col gap-2' }">
                        <div class="flex items-center justify-between mb-2">
                            <div class="flex flex-col">
                                <span class="text-xs font-bold tracking-wider text-muted uppercase">{{ stat.label
                                    }}</span>
                                <span class="text-5xl font-bold tracking-tight mt-2"
                                    :class="i === 1 ? 'text-primary' : ''">{{ stat.value }}</span>
                                <span class="text-sm text-dimmed mt-1">{{ stat.subtext }}</span>
                            </div>
                            <div
                                class="bg-primary/10 text-primary p-4 rounded-2xl ring-4 ring-primary/5 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                                <UIcon :name="stat.icon" class="text-2xl flex" />
                            </div>
                        </div>
                    </UCard>
                </div>

                <!-- Lessons Analysis -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <!-- Strong Lessons -->
                    <UCard variant="soft" class="bg-green-50 dark:bg-green-500/10"
                        :ui="{ body: 'relative flex flex-col gap-8' }">
                        <!-- <div class="absolute inset-0 overflow-hidden rounded-xl pointer-events-none">
                            <div class="absolute -top-16 -right-16 w-64 h-64 bg-green-500/20 rounded-full blur-[64px]">
                            </div>
                        </div> -->
                        <div class="relative z-10 flex items-center gap-2">
                            <UIcon name="i-lucide-trending-up" class="text-green-500" />
                            <h2 class="text-sm font-bold tracking-wider text-green-500 uppercase">Strong Lessons</h2>
                        </div>
                        <div v-if="strongLessons.length > 0" class="relative z-10 flex flex-col gap-6">
                            <div v-for="t in strongLessons" :key="t.name" class="flex flex-col gap-2.5">
                                <div class="flex items-center justify-between">
                                    <span class="font-medium">{{ t.name }}</span>
                                    <span class="text-xs text-muted font-medium">{{ t.progress }}%</span>
                                </div>
                                <UProgress :model-value="t.progress" color="success" size="sm" :ui="{
                                    base: 'bg-green-100 dark:bg-green-800'
                                }" />
                            </div>
                        </div>
                        <div v-else class="relative z-10 py-8 flex flex-col items-center justify-center text-center gap-3">
                            <div class="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600">
                                <UIcon name="i-lucide-sparkles" class="text-xl" />
                            </div>
                            <div class="space-y-1">
                                <p class="text-sm font-bold text-green-700 dark:text-green-400">Analysis Pending</p>
                                <p class="text-xs text-green-600/70 dark:text-green-500/50 max-w-[200px]">Complete your first lessons to identify your strengths.</p>
                            </div>
                        </div>
                    </UCard>

                    <!-- Weak Lessons -->
                    <UCard variant="soft" class="bg-amber-50 dark:bg-amber-500/10"
                        :ui="{ body: 'relative flex flex-col gap-8' }">
                        <!-- <div class="absolute inset-0 overflow-hidden rounded-xl pointer-events-none">
                            <div class="absolute -top-16 -right-16 w-64 h-64 bg-amber-500/20 rounded-full blur-[64px]">
                            </div>
                        </div> -->
                        <div class="relative z-10 flex items-center gap-2">
                            <UIcon name="i-lucide-trending-down" class="text-amber-500" />
                            <h2 class="text-sm font-bold tracking-wider text-amber-500 uppercase">Weak Lessons — Focus
                                Areas</h2>
                        </div>
                        <div v-if="weakLessons.length > 0" class="relative z-10 flex flex-col gap-6">
                            <div v-for="t in weakLessons" :key="t.name" class="flex flex-col gap-2.5">
                                <div class="flex items-center justify-between">
                                    <span class="font-medium">{{ t.name }}</span>
                                    <span class="text-xs text-muted font-medium">{{ t.progress }}%</span>
                                </div>
                                <UProgress :model-value="t.progress" color="warning" size="sm" :ui="{
                                    base: 'bg-amber-100 dark:bg-amber-800'
                                }" />
                            </div>
                        </div>
                        <div v-else class="relative z-10 py-8 flex flex-col items-center justify-center text-center gap-3">
                            <div class="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600">
                                <UIcon name="i-lucide-zap" class="text-xl" />
                            </div>
                            <div class="space-y-1">
                                <p class="text-sm font-bold text-amber-700 dark:text-amber-400">Collecting Insights</p>
                                <p class="text-xs text-amber-600/70 dark:text-amber-500/50 max-w-[200px]">We'll track your challenges once you start practicing.</p>
                            </div>
                        </div>
                    </UCard>
                </div>

                <!-- Begin Session Card -->
                <UCard class="bg-neutral-900 border-none relative overflow-hidden group shadow-2xl"
                    :ui="{ body: 'p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-10' }">
                    <div
                        class="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent opacity-50">
                    </div>
                    <div class="flex flex-col gap-3 relative z-10">
                        <div class="flex items-center gap-3 text-primary mb-2">
                            <UIcon name="i-lucide-zap" class="w-5 h-5 animate-pulse" />
                            <span class="tracking-[0.3em] uppercase font-bold text-xs">Ready to Focus?</span>
                        </div>
                        <h2 class="text-3xl md:text-4xl font-bold text-white leading-tight">Your next
                            personalized<br /><span class="text-primary italic">session is ready.</span></h2>
                        <p class="text-neutral-400 text-lg max-w-md">We've identified a key weakness in <span
                                class="text-white font-medium">{{ weakestTopic?.name }}</span> and prepared a 10-minute
                            deep dive.</p>
                    </div>
                    <UButton @click="startSession" label="Begin Session" trailing-icon="i-lucide-arrow-right" size="xl"
                        color="primary"
                        class="rounded-full px-12 py-5 uppercase text-sm font-semibold tracking-[0.2em] hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 shrink-0 relative z-10" />
                </UCard>
            </div>

            <!-- Session Container -->
            <UCard v-else ref="assessmentCard"
                class="w-full relative border-none ring-1 ring-primary/20 shadow-2xl shadow-primary/5 overflow-hidden transition-all duration-500"
                :ui="{ body: 'p-0 sm:p-0' }">

                <AppSessionProcessing v-if="sessionState === 'processing'" :lines="processingLines"
                    @complete="handleProcessingComplete" />

                <AppSessionReady v-else-if="sessionState === 'ready'"
                    :topic-name="weakestTopic?.name || 'Current Topic'"
                    :module-title="recommendedLesson?.title || 'Scenario Court'" difficulty="Medium"
                    :duration="recommendedLesson?.duration || '~10 min'" @start="beginSessionAction" />

                <AppSessionActive v-else-if="sessionState === 'active' && recommendedLesson"
                    :questions="activeAssessment?.questions || []"
                    :module-title="recommendedLesson.title || 'Topic Review'" @close="resetSession"
                    @complete="handleSessionComplete" />

                <AppSessionComplete v-else-if="sessionState === 'complete'"
                    :module-title="activeAssessment?.title || 'Topic Review'"
                    :what-you-did-well="activeAssessment?.whatYouDidWell || 'Understanding core concepts'"
                    :where-you-struggled="activeAssessment?.whereYouStruggled || 'Applying logic to complex scenarios'"
                    :pass-prob-before="activeAssessment?.passProbBefore || '45%'"
                    :pass-prob-after="activeAssessment?.passProbAfter || '62%'"
                    :ai-final-comment="activeAssessment?.aiFinalComment || 'You are making steady progress. Keep focusing on the application of rules.'"
                    @close="resetSession" @view-plan="handleViewPlan" />

                <AppSessionReadinessPlan v-else-if="sessionState === 'plan'" :weakest-topic="weakestTopic"
                    @close="resetSession" />
            </UCard>
        </Transition>
    </UContainer>

    <!-- 404 Empty State -->
    <div v-else class="flex flex-col items-center justify-center py-20 text-center">
        <UIcon name="i-lucide-file-search-corner" class="text-6xl text-dimmed mb-4" />
        <h2 class="text-2xl font-bold">Topic not found</h2>
        <p class="text-muted mt-2">The topic you're looking for doesn't exist or has been deleted.</p>
        <UButton label="Back to Dashboard" color="primary" variant="subtle" to="/app/dashboard" class="mt-6" />
    </div>

</template>

<style scoped>
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-fade-in {
    animation: fadeIn 0.4s ease-out forwards;
}

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
