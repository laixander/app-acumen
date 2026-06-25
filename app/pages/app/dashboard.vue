<script setup lang="ts">

const courseStore = useCourseStore()
const dashboardStore = useDashboardStore()
const workspaceStore = useWorkspaceStore()
const stats = computed(() => dashboardStore.stats)
const recommended = computed(() => dashboardStore.recommendedCourses)
const recentCourses = computed(() => courseStore.workspaceCourses.slice(0, 3))
const userStore = useUserStore()

const firstName = computed(() => userStore.profile.fullName.split(' ')[0])
const currentWorkspace = computed(() =>
    workspaceStore.workspaces.find(w => w.id === workspaceStore.currentWorkspaceId) || workspaceStore.workspaces[0]
)
const isHero = computed(() => courseStore.workspaceCourses.length === 0)

const recommendedMessage = computed(() => {
    return recommended.value.length > 0
        ? "Based on your interests in AI & Data Science."
        : "No recommendations right now."
})
</script>

<template>
    <UContainer class="flex flex-col gap-8 py-10">
        <div
            class="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]">
        </div>

        <!-- Dashboard Header -->
        <Transition appear enter-active-class="transition-all duration-700 delay-100"
            enter-from-class="opacity-0 translate-y-4" enter-to-class="opacity-100 translate-y-0">
            <div v-if="isHero" class="flex flex-col items-center text-center">
                <div
                    class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-500 text-xs font-semibold uppercase tracking-wider mb-4">
                    <UIcon name="i-lucide-sparkles" class="animate-pulse" /><span>AI Learning Engine</span>
                </div>
                <h1 class="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-balance">
                    What do you want to <span class="text-primary-500 italic">learn</span> today?
                </h1>
                <p class="text-lg text-muted font-light max-w-xl text-pretty">
                    Describe your goals, upload a syllabus, or pick a subject. We'll build a personalized learning
                    path in seconds.
                </p>
            </div>
            <div v-else class="flex flex-col items-center gap-2">
                <div
                    class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-500 text-xs font-semibold uppercase tracking-wider">
                    <UIcon :name="currentWorkspace?.icon || 'i-lucide-layout-dashboard'" class="animate-pulse" />
                    <span>{{ currentWorkspace?.name || 'Dashboard' }}</span>
                </div>
                <ContentHeading description="You're making great progress! Ready to learn something new today?"
                    centered>
                    <template #title>
                        <span class="text-primary">Welcome back,</span> {{ firstName }}!
                    </template>
                </ContentHeading>
            </div>
        </Transition>

        <!-- AI Prompt Section -->
        <AppDashboardAIPrompt :is-hero="isHero" />

        <!-- Hero stats -->
        <Transition appear enter-active-class="transition-all duration-700 delay-500"
            enter-from-class="opacity-0 translate-y-4" enter-to-class="opacity-100 translate-y-0">
            <div v-if="isHero" class="flex flex-wrap justify-center gap-6">
                <div v-for="(stat, i) in [{ label: 'Learning Paths Generated', value: '12.4k+', icon: 'i-lucide-git-branch' }, { label: 'Active Learners', value: '5k+', icon: 'i-lucide-users' }, { label: 'Courses Covered', value: '800+', icon: 'i-lucide-book-open' }]"
                    :key="i" class="flex items-center gap-3 text-muted">
                    <div class="p-2 rounded-lg bg-accented/40">
                        <UIcon :name="stat.icon" class="text-lg flex" />
                    </div>
                    <div class="text-left">
                        <div class="text-sm font-bold">{{ stat.value }}</div>
                        <div class="text-xs text-dimmed uppercase tracking-tighter">{{ stat.label }}</div>
                    </div>
                </div>
            </div>
        </Transition>

        <template v-if="courseStore.workspaceCourses.length > 0">

            <!-- Sections Layout -->
            <div class="flex flex-col gap-10">

                <!-- Stat Cards -->
                <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    <UCard v-for="stat in stats" :key="stat.label" variant="soft" :class="`bg-${stat.color}-500/10`"
                        :ui="{ body: 'flex flex-col items-start sm:flex-row sm:items-center gap-3 py-3 px-4' }">
                        <div :class="['p-3 rounded-xl ml-auto sm:ml-0', `bg-${stat.color}-500/10`]">
                            <UIcon :name="stat.icon" :class="['text-xl flex shrink-0', `text-${stat.color}-500`]" />
                        </div>
                        <div>
                            <div class="flex items-center gap-2">
                                <p class="text-lg font-bold leading-none">{{ stat.value }}</p>
                                <UBadge v-if="stat.showTrend" :label="stat.trendValue"
                                    :color="stat.trend === 'up' ? 'success' : 'error'" variant="soft" size="sm"
                                    class="sm:hidden" />
                                <UIcon v-if="stat.showTrend"
                                    :name="stat.trend === 'up' ? 'i-lucide-trending-up' : 'i-lucide-trending-down'"
                                    :class="['text-base', stat.trend === 'up' ? 'text-green-500' : 'text-red-500']" />
                            </div>
                            <p class="text-xs text-muted mt-0.5">{{ stat.label }}</p>
                        </div>
                        <UBadge v-if="stat.showTrend" :label="stat.trendValue"
                            :color="stat.trend === 'up' ? 'success' : 'error'" variant="soft" size="sm"
                            class="hidden sm:inline-flex sm:ml-auto" />
                    </UCard>
                </div>

                <!-- Second Section: 2 Column Layout -->
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    <!-- 1st Column: Recent Courses & Pinned Courses -->
                    <div class="lg:col-span-3 flex flex-col gap-8">
                        <ClientOnly>
                            <template v-if="courseStore.courses.length > 0">
                                <!-- Section: Recent Courses -->
                                <div v-if="recentCourses.length > 0" class="flex flex-col gap-4">
                                    <div class="flex items-center justify-between h-5">
                                        <h3 class="text-sm font-semibold text-muted uppercase tracking-wide">Recent
                                            Courses</h3>
                                        <UButton label="View all" icon="i-lucide-arrow-right" color="primary"
                                            variant="ghost" size="sm" class="uppercase" to="/app/courses/collection" />
                                    </div>
                                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                        <AppCourseCard v-for="course in recentCourses" :key="course.title"
                                            :course="course" />
                                    </div>
                                </div>
                            </template>
                        </ClientOnly>
                    </div>

                    <!-- 2nd Column: Recommended For You -->
                    <!-- <div v-if="courseStore.courses.length > 0" class="flex flex-col gap-4">
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
                                <div v-else
                                    class="flex flex-col items-center justify-center py-6 text-center border-2 border-dashed border-neutral-700/50 rounded-xl">
                                    <p class="text-xs text-muted max-w-[180px]">
                                        Seed data or start learning to get personalized suggestions.
                                    </p>
                                </div>
                            </UCard>
                        </div>
                        <div class="flex flex-col gap-4">
                            <UCard variant="subtle" class="grow">
                                <template #header>
                                    <h3 class="text-sm font-semibold text-muted uppercase tracking-wide">Weekly Activity
                                    </h3>
                                </template>
                                <AppWeeklyActivityChart />
                            </UCard>
                        </div>
                    </div> -->

                </div>

            </div>

        </template>

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
