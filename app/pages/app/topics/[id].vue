<script setup lang="ts">
import { useTopics } from '~/composables/useTopics'
import { useLessons } from '~/composables/useLessons'
import { computed, onMounted } from 'vue'
import { injectAssessmentsIntoTimeline } from '~/utils/seeder'

const route = useRoute()
const { topics } = useTopics()
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

const examInfo = {
    name: 'LET SEPTEMBER 2026',
    daysAway: 28
}

const stats = [
    { label: 'Master (Overall)', value: '62%', subtext: 'from 41% on Day 1', icon: 'i-lucide-award' },
    { label: 'Pass Probability', value: '47%', subtext: 'at current pace', icon: 'i-lucide-line-chart' },
    { label: 'Sessions This Week', value: '12', subtext: '14 hrs total', icon: 'i-lucide-calendar-days' }
]

const strongTopics = [
    { name: 'Philippine History', progress: 88, color: 'text-green-500' },
    { name: 'Filipino Grammar', progress: 84, color: 'text-green-500' },
    { name: 'English Literature', progress: 79, color: 'text-green-500' },
    { name: 'Educational Technology', progress: 76, color: 'text-green-500' }
]

const weakTopics = [
    { name: 'Philippine Government & Rights', progress: 38, color: 'text-orange-500' },
    { name: 'Basic Economics & Taxation', progress: 42, color: 'text-orange-500' },
    { name: 'General Biology', progress: 51, color: 'text-orange-500' },
    { name: 'Plane Geometry', progress: 55, color: 'text-orange-500' }
]

const weakestTopic = weakTopics[0]

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
    <UContainer v-if="topic" class="py-8 flex flex-col gap-10">
        <!-- Header Section -->
        <header class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div class="flex flex-col gap-1">
                <h1 class="text-4xl font-bold tracking-tight">
                    Welcome back, <span class="text-primary">{{ userProfile.name }}.</span>
                </h1>
                <p class="text-muted">You're making great progress towards your goal.</p>
            </div>
            <div class="flex flex-col items-end gap-1 text-right border-l-2 border-primary/20 pl-4">
                <span class="text-xs font-semibold tracking-wider text-muted uppercase">
                    {{ topic.learningGoal ||
                        'Target Exam' }} · {{ examInfo.name }}</span>
                <span class="text-3xl font-bold text-primary">{{ examInfo.daysAway }} Days Away</span>
            </div>
        </header>

        <!-- Stats Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <UCard v-for="(stat, i) in stats" :key="i" variant="soft" class="relative overflow-hidden group"
                :ui="{ body: 'p-6 flex flex-col gap-2' }">
                <div class="flex items-center justify-between mb-2">
                    <div class="flex flex-col">
                        <span class="text-xs font-bold tracking-wider text-muted uppercase">{{ stat.label }}</span>
                        <span class="text-5xl font-bold tracking-tight mt-2" :class="i === 1 ? 'text-primary' : ''">{{
                            stat.value
                            }}</span>
                        <span class="text-sm text-dimmed mt-1">{{ stat.subtext }}</span>
                    </div>
                    <div
                        class="bg-primary/10 text-primary p-4 rounded-2xl ring-4 ring-primary/5 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                        <UIcon :name="stat.icon" class="text-2xl flex" />
                    </div>
                </div>

            </UCard>
        </div>

        <!-- Topics Analysis Section -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <!-- Strong Topics -->
            <UCard variant="soft" :ui="{ body: 'p-8 flex flex-col gap-8' }">
                <div class="flex items-center gap-2">
                    <UIcon name="i-lucide-trending-up" class="text-green-500" />
                    <h2 class="text-sm font-bold tracking-wider text-green-500 uppercase">Strong Topics</h2>
                </div>

                <div class="flex flex-col gap-6">
                    <div v-for="t in strongTopics" :key="t.name" class="flex flex-col gap-2.5">
                        <div class="flex items-center justify-between">
                            <span class="font-bold">{{ t.name }}</span>
                            <span class="text-xs text-muted font-medium">{{ t.progress }}%</span>
                        </div>
                        <UProgress :model-value="t.progress" color="green" size="sm" />
                    </div>
                </div>
            </UCard>

            <!-- Weak Topics -->
            <UCard variant="soft" :ui="{ body: 'p-8 flex flex-col gap-8' }">
                <div class="flex items-center gap-2">
                    <UIcon name="i-lucide-alert-circle" class="text-orange-500" />
                    <h2 class="text-sm font-bold tracking-wider text-orange-500 uppercase">Weak Topics — Focus Areas
                    </h2>
                </div>

                <div class="flex flex-col gap-6">
                    <div v-for="t in weakTopics" :key="t.name" class="flex flex-col gap-2.5">
                        <div class="flex items-center justify-between">
                            <span class="font-bold">{{ t.name }}</span>
                            <span class="text-xs text-muted font-medium">{{ t.progress }}%</span>
                        </div>
                        <UProgress :model-value="t.progress" color="orange" size="sm" />
                    </div>
                </div>
            </UCard>
        </div>

        <!-- Premium CTA Box (Horizontal) -->
        <UCard
            class="overflow-hidden relative border-none ring-1 ring-primary/20 shadow-2xl shadow-primary/5 bg-gradient-to-r from-white to-neutral-50/50 dark:from-neutral-900 dark:to-neutral-900/50"
            :ui="{ body: 'p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 relative z-10' }">
            <!-- Decorative Glows -->
            <div class="absolute top-0 left-0 w-1/2 h-full bg-primary/5 rounded-full blur-[100px] -translate-x-1/2">
            </div>

            <div
                class="flex flex-col md:flex-row items-center md:items-start gap-6 text-center md:text-left flex-1 relative z-10">
                <div class="bg-primary/10 text-primary p-4 rounded-2xl ring-4 ring-primary/5 shrink-0">
                    <UIcon name="i-lucide-sparkles" class="text-3xl flex animate-pulse" />
                </div>

                <div class="flex flex-col gap-2">
                    <h3 class="text-xs font-bold tracking-[0.2em] text-primary uppercase">Recommended for you</h3>
                    <p class="text-3xl font-bold tracking-tight leading-tight">
                        Focus on <span class="text-primary underline decoration-primary/30 underline-offset-8">{{
                            weakestTopic?.name }}</span>
                    </p>
                    <p class="text-muted max-w-lg">
                        Acumen identifies this as your highest impact area for improvement. Ready to master it?
                    </p>
                </div>
            </div>

            <UButton label="Press Play" icon="i-lucide-play-circle" size="xl" color="primary"
                class="rounded-full px-12 py-5 uppercase text-sm font-semibold tracking-[0.2em] hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 shrink-0 relative z-10" />
        </UCard>
    </UContainer>

    <!-- 404 Empty State -->
    <div v-else class="flex flex-col items-center justify-center py-20 text-center">
        <UIcon name="i-lucide-file-search-corner" class="text-6xl text-dimmed mb-4" />
        <h2 class="text-2xl font-bold">Topic not found</h2>
        <p class="text-muted mt-2">The topic you're looking for doesn't exist or has been deleted.</p>
        <UButton label="Back to Dashboard" color="primary" variant="subtle" to="/app/dashboard" class="mt-6" />
    </div>
</template>

<style scoped></style>
