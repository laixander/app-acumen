<script setup lang="ts">
import { useTopics } from '~/composables/useTopics'
import { useDashboard } from '~/composables/useDashboard'
import { ref, onMounted, onUnmounted } from 'vue'

const { topics, pinnedTopics, continueLearningTopic, recentTopics } = useTopics()
const { stats, recommendedTopics: recommended } = useDashboard()
const { user } = useUser()

const firstName = computed(() => user.value.profile.fullName.split(' ')[0])
const recommendedMessage = computed(() => {
    return recommended.value.length > 0
        ? "Based on your interests in AI & Data Science."
        : "No recommendations right now."
})

const insights = [
    {
        title: 'Daily Insight',
        text: 'You typically focus better in the mornings. Consider a quick 10-minute session now to boost retention.',
        icon: 'i-lucide-sun'
    },
    {
        title: 'Study Tip',
        text: 'Reviewing "Algebra Core" will help you master this week\'s Algebra tasks 20% faster.',
        icon: 'i-lucide-lightbulb'
    },
    {
        title: 'Goal Tracker',
        text: 'You are 85% of the way to your weekly goal. Just one more lesson to hit your milestone!',
        icon: 'i-lucide-target'
    },
    {
        title: 'Knowledge Gap',
        text: 'It looks like Checkpoint 2 was a bit tough. We recommend a quick review of Module 8.',
        icon: 'i-lucide-brain-circuit'
    }
]

const currentIndex = ref(0)
let intervalId: any = null

const currentInsight = computed(() => {
    return insights[currentIndex.value % insights.length]
})

onMounted(() => {
    intervalId = setInterval(() => {
        currentIndex.value++
    }, 10000)
})

onUnmounted(() => {
    if (intervalId) clearInterval(intervalId)
})
</script>

<template>
    <UContainer class="flex flex-col gap-8 py-10">

        <!-- Welcome Card -->
        <UCard class="shadow-sm"
            :ui="{ root: 'relative overflow-hidden', body: 'flex flex-col lg:flex-row justify-between gap-8 relative z-10' }">
            <!-- Mesh Background -->
            <div class="absolute inset-0 bg-gradient-to-tr from-primary-500/10 to-transparent pointer-events-none" />

            <div class="flex-1 flex flex-col justify-center">
                <ContentHeading :title="`Welcome back, ${firstName}!`"
                    description="You're making great progress! Ready to learn something new today?" />
                <div class="flex items-center gap-4 mt-6">
                    <UButton label="New Topic" icon="i-lucide-plus-circle" color="primary" size="lg"
                        to="/app/topics/new" />
                    <!-- <UAvatarGroup size="sm">
                        <UAvatar v-for="i in 4" :key="i" :src="`https://i.pravatar.cc/128?u=${i}`"
                            icon="i-lucide-user" />
                    </UAvatarGroup>
                    <span class="text-xs text-dimmed">Learning alongside others</span> -->
                </div>
            </div>
            <div v-if="currentInsight"
                class="bg-primary-500/10 border-l-4 border-primary-500 p-4 pl-6 rounded-r-lg transition-all hover:bg-primary-500/15 cursor-default relative overflow-hidden flex flex-col justify-center max-w-100 text-left">

                <Transition name="fade-header" mode="out-in">
                    <div :key="currentIndex" class="flex items-center gap-2 mb-1">
                        <UIcon :name="currentInsight.icon" class="text-primary-500" />
                        <strong class="text-primary-700 dark:text-primary-400 block pb-0.5">
                            {{ currentInsight.title }}
                        </strong>
                    </div>
                </Transition>

                <Transition name="fade-content" mode="out-in">
                    <p :key="currentIndex"
                        class="m-0 text-primary-600 dark:text-primary-300/50 text-sm leading-relaxed">
                        {{ currentInsight.text }}
                    </p>
                </Transition>
            </div>
        </UCard>

        <!-- Sections Layout -->
        <div class="flex flex-col gap-10">

            <!-- First Section: 2 Column Layout -->
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">

                <!-- 1st Column: Continue Learning & Empty State -->
                <div class="lg:col-span-2 flex flex-col gap-8">
                    <ClientOnly>
                        <template v-if="topics.length > 0">
                            <!-- Section: Continue Learning (Hero) -->
                            <div v-if="continueLearningTopic" class="flex flex-col gap-4">
                                <div class="flex items-center justify-between">
                                    <h3 class="text-sm font-semibold text-muted uppercase tracking-wide">Continue
                                        Learning</h3>
                                    <UIcon name="i-lucide-sparkles" class="text-primary animate-pulse" />
                                </div>
                                <AppTopicCard :topic="continueLearningTopic" is-hero :show-actions="false" />
                            </div>
                        </template>

                        <!-- Empty State -->
                        <template v-else>
                            <div
                                class="flex flex-col items-center justify-center py-20 px-4 text-center bg-neutral-50 dark:bg-neutral-900/50 rounded-xl border-2 border-dashed border-neutral-200 dark:border-neutral-800 h-full">
                                <div class="bg-primary/10 p-4 rounded-full mb-4">
                                    <UIcon name="i-lucide-database" class="flex text-4xl text-primary" />
                                </div>
                                <h3 class="text-lg font-bold">Your dashboard is empty</h3>
                                <p class="text-dimmed max-w-xs mt-1 text-pretty">
                                    Get started by adding some topics, or use the seeder button below to generate test
                                    data.
                                </p>
                                <div class="flex items-center gap-3 mt-6">
                                    <UButton label="Create Topic" color="primary" icon="i-lucide-plus"
                                        to="/app/topics/new" />
                                </div>
                            </div>
                        </template>

                        <template #fallback>
                            <div
                                class="flex flex-col items-center justify-center py-20 px-4 text-center bg-neutral-50 dark:bg-neutral-900/50 rounded-xl border-2 border-dashed border-neutral-200 dark:border-neutral-800 h-[calc(100%-2rem)]">
                                <div class="bg-primary/10 p-4 rounded-full mb-4">
                                    <UIcon name="i-lucide-loader-2" class="flex text-4xl text-primary animate-spin" />
                                </div>
                                <h3 class="text-lg font-bold">Loading dashboard...</h3>
                            </div>
                        </template>
                    </ClientOnly>
                </div>

                <!-- 2nd Column: Stats & Weekly Activity -->
                <div class="flex flex-col gap-4">
                    <!-- Stat Cards -->
                    <h3 class="text-sm font-semibold text-muted uppercase tracking-wide">Stats</h3>

                    <UCard v-for="stat in stats" :key="stat.label" variant="soft" :class="`bg-${stat.color}-500/10`"
                        :ui="{ body: 'flex items-center gap-3 py-3 px-4' }">
                        <div :class="['p-3 rounded-xl', `bg-${stat.color}-500/10`]">
                            <UIcon :name="stat.icon" :class="['text-xl flex shrink-0', `text-${stat.color}-500`]" />
                        </div>
                        <div>
                            <div class="flex items-center gap-2">
                                <p class="text-lg font-bold leading-none">{{ stat.value }}</p>
                                <UIcon v-if="stat.showTrend"
                                    :name="stat.trend === 'up' ? 'i-lucide-trending-up' : 'i-lucide-trending-down'"
                                    :class="['text-base', stat.trend === 'up' ? 'text-green-500' : 'text-red-500']" />
                            </div>
                            <p class="text-xs text-muted mt-0.5">{{ stat.label }}</p>
                        </div>
                        <UBadge v-if="stat.showTrend" :label="stat.trendValue"
                            :color="stat.trend === 'up' ? 'success' : 'error'" variant="soft" size="sm"
                            class="ml-auto" />
                    </UCard>

                    <!-- Chart Bar -->
                    <UCard variant="subtle" class="grow">
                        <template #header>
                            <h3 class="text-sm font-semibold text-muted uppercase tracking-wide">Weekly Activity</h3>
                        </template>
                        <AppWeeklyActivityChart />
                    </UCard>
                </div>

            </div>

            <!-- Second Section: 2 Column Layout -->
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">

                <!-- 1st Column: Recent Topics & Pinned Topics -->
                <div class="lg:col-span-2 flex flex-col gap-8">
                    <ClientOnly>
                        <template v-if="topics.length > 0">
                            <!-- Section: Recent Topics -->
                            <div v-if="recentTopics.length > 0" class="flex flex-col gap-4">
                                <div class="flex items-center justify-between h-5">
                                    <h3 class="text-sm font-semibold text-muted uppercase tracking-wide">Recent</h3>
                                    <UButton label="View all" icon="i-lucide-arrow-right" color="primary"
                                        variant="ghost" size="sm" class="uppercase" to="/app/topics/collection" />
                                </div>
                                <div class="grid md:grid-cols-2 gap-6">
                                    <AppTopicCard v-for="topic in recentTopics" :key="topic.title" :topic="topic" />
                                </div>
                            </div>

                            <!-- Section: Pinned Topics -->
                            <div v-if="pinnedTopics.length > 0" class="flex flex-col gap-4">
                                <div class="flex items-center justify-between">
                                    <h3 class="text-sm font-semibold text-muted uppercase tracking-wide">Pinned</h3>
                                    <UIcon name="i-lucide-pin" class="text-primary opacity-50" />
                                </div>
                                <div class="grid md:grid-cols-2 gap-6">
                                    <AppTopicCard v-for="topic in pinnedTopics" :key="topic.title" :topic="topic" />
                                </div>
                            </div>
                        </template>
                    </ClientOnly>
                </div>

                <!-- 2nd Column: Recommended For You -->
                <div class="flex flex-col gap-4">
                    <h3 class="text-sm font-semibold text-muted uppercase tracking-wide">Recommended for You</h3>
                    <div class="flex flex-col gap-2">
                        <UCard variant="soft" :ui="{ body: 'flex flex-col gap-4 relative z-10' }"
                            class="bg-neutral-800 dark:bg-neutral-950/50">
                            <p class="text-sm text-dimmed dark:text-muted flex items-center gap-2">
                                <UIcon name="i-lucide-sparkles" class="text-lg text-primary shrink-0" />
                                {{ recommendedMessage }}
                            </p>

                            <div v-if="recommended.length > 0" class="flex flex-col gap-2">
                                <UCard v-for="rec in recommended" :key="rec.title" variant="soft"
                                    :ui="{ body: 'flex items-center gap-3 sm:p-4' }"
                                    class="bg-neutral-500/10 hover:bg-neutral-500/20 dark:bg-neutral-900/40 hover:dark:bg-neutral-900/90 transition-colors duration-200 cursor-pointer">
                                    <UIcon :name="rec.icon" class="text-lg text-primary shrink-0" />
                                    <div class="flex-1 min-w-0">
                                        <p class="text-sm text-white font-medium truncate">{{ rec.title }}</p>
                                        <p class="text-xs text-dimmed dark:text-muted">{{ rec.tag }}</p>
                                    </div>
                                    <UButton icon="i-lucide-plus" size="xs" variant="ghost" color="primary" />
                                </UCard>
                            </div>

                            <!-- Recommendations Empty State -->
                            <div v-else
                                class="flex flex-col items-center justify-center py-6 text-center border-2 border-dashed border-neutral-700/50 rounded-xl">
                                <p class="text-xs text-muted max-w-[180px]">
                                    Seed data or start learning to get personalized suggestions.
                                </p>
                            </div>
                        </UCard>
                    </div>
                </div>

            </div>

        </div>

    </UContainer>
</template>

<style scoped>
/* Header Stagger: In first, Out second */
.fade-header-enter-active {
    transition: all 0.4s ease;
    transition-delay: 0.1s;
}

.fade-header-leave-active {
    transition: all 0.3s ease;
    transition-delay: 0.2s;
}

/* Content Stagger: In second, Out first */
.fade-content-enter-active {
    transition: all 0.4s ease;
    transition-delay: 0.3s;
}

.fade-content-leave-active {
    transition: all 0.3s ease;
    transition-delay: 0s;
}

.fade-header-enter-from,
.fade-content-enter-from {
    opacity: 0;
    transform: translateY(10px);
}

.fade-header-leave-to,
.fade-content-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}
</style>
