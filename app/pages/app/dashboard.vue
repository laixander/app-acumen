<script setup lang="ts">
const topics = [
    { title: 'Introduction to Algebra', progress: 80, tag: 'Math', lessons: '10/12', lastStudied: '2 hrs ago', icon: 'i-lucide-function-square' },
    { title: 'World War II Overview', progress: 55, tag: 'History', lessons: '6/11', lastStudied: '1 day ago', icon: 'i-lucide-landmark' },
    { title: "Newton's Laws of Motion", progress: 30, tag: 'Science', lessons: '3/10', lastStudied: '3 days ago', icon: 'i-lucide-microscope' },
    { title: 'Spanish Basics', progress: 65, tag: 'Language', lessons: '8/12', lastStudied: 'Yesterday', icon: 'i-lucide-languages' },
    { title: 'Reading Comprehension', progress: 90, tag: 'English', lessons: '9/10', lastStudied: 'Just now', icon: 'i-lucide-book-open' },
]

const stats = [
    { label: 'Day Streak', value: '12', icon: 'i-lucide-calendar-days', color: 'amber', trend: 'up', trendValue: '+10%' },
    { label: 'Mins Today', value: '45', icon: 'i-lucide-timer', color: 'indigo', trend: 'down', trendValue: '-5%' },
    { label: 'Lessons Done', value: '8', icon: 'i-lucide-trophy', color: 'emerald', trend: 'up', trendValue: '+2' },
]

const recommended = [
    { title: 'Cell Biology 101', tag: 'Science', icon: 'i-lucide-microscope' },
    { title: 'The French Revolution', tag: 'History', icon: 'i-lucide-landmark' },
    { title: 'Algebra: Quadratics', tag: 'Math', icon: 'i-lucide-function-square' },
]
</script>

<template>
    <ContentPanel title="Dashboard">
        <div class="w-full lg:max-w-6xl mx-auto flex flex-col gap-6">

            <!-- Welcome Card -->
            <UCard class="shadow-sm"
                :ui="{ root: 'relative overflow-hidden', body: 'flex items-center justify-between gap-8 relative z-10' }">
                <!-- Mesh Background -->
                <div
                    class="absolute inset-0 bg-gradient-to-tr from-primary-500/10 to-transparent pointer-events-none" />

                <div class="flex-1">
                    <h2 class="text-2xl font-bold">Welcome back, Alex!</h2>
                    <p class="text-muted mt-1">You're making great progress! Ready to learn something new today?</p>
                    <div class="flex items-center gap-4 mt-6">
                        <UButton label="New Topic" icon="i-lucide-plus-circle" color="primary" size="lg" />
                        <UAvatarGroup size="sm">
                            <UAvatar v-for="i in 4" :key="i" :src="`https://i.pravatar.cc/128?u=${i}`"
                                icon="i-lucide-user" />
                        </UAvatarGroup>
                        <span class="text-xs text-dimmed">Learning alongside others</span>
                    </div>
                </div>
                <div class="flex-1">
                    <AppWeeklyActivityChart />
                </div>
            </UCard>

            <!-- 2 Column Layout -->
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">

                <!-- First Column: List of Topics -->
                <div class="lg:col-span-2 flex flex-col gap-4">
                    <!-- View all button -->
                    <div class="flex items-center justify-between h-5">
                        <h3 class="text-sm font-semibold text-muted uppercase tracking-wide">Your Topics</h3>
                        <UButton label="View all" icon="i-lucide-arrow-right" color="primary" variant="ghost" size="sm"
                            class="ml-auto uppercase" to="/app/my-topics" />
                    </div>
                    <div class="grid lg:grid-cols-2 gap-4">
                        <UCard v-for="topic in topics" :key="topic.title" variant="subtle"
                            class="transition-all duration-200 hover:-translate-y-1 hover:ring-2 hover:ring-primary-500/50 cursor-pointer"
                            :ui="{ header: 'p-0 sm:p-0 relative', body: '' }">
                            <template #header>
                                <Placeholder />
                                <div class="absolute top-4 left-4 bg-primary/10 p-2 rounded-lg">
                                    <UIcon :name="topic.icon" class="text-lg text-primary flex shrink-0" />
                                </div>
                            </template>
                            <div class="flex items-center gap-4">
                                <div class="flex-1 min-w-0">
                                    <div class="flex items-center justify-between mb-1.5">
                                        <span class="text-sm font-medium truncate">{{ topic.title }}</span>
                                        <UBadge :label="topic.tag" variant="soft" size="sm" class="ml-2 shrink-0" />
                                    </div>
                                    <UProgress :model-value="topic.progress" size="xs" color="primary" />
                                </div>
                                <span class="text-xs font-semibold text-primary shrink-0">{{ topic.progress }}%</span>
                                <UButton icon="i-lucide-play" color="primary" variant="ghost" />
                            </div>
                            <div class="flex items-center gap-4 text-xs text-dimmed mt-4">
                                <span class="flex items-center gap-1">
                                    <UIcon name="i-lucide-book-open" class="size-4" /> {{ topic.lessons }} lessons
                                </span>
                                <span class="flex items-center gap-1">
                                    <UIcon name="i-lucide-clock" class="size-4" /> {{ topic.lastStudied }}
                                </span>
                            </div>
                        </UCard>
                    </div>
                </div>

                <!-- Second Column: Stats & Recommended -->
                <div class="flex flex-col gap-4">

                    <!-- Stat Cards -->
                    <h3 class="text-sm font-semibold text-muted uppercase tracking-wide">Stats</h3>
                    <div class="grid grid-cols-3 lg:grid-cols-1 gap-3">
                        <UCard v-for="stat in stats" :key="stat.label" variant="soft" :class="`bg-${stat.color}-500/10`"
                            :ui="{ body: 'flex items-center gap-3 py-3 px-4' }">
                            <div :class="['p-3 rounded-xl', `bg-${stat.color}-500/10`]">
                                <UIcon :name="stat.icon" :class="['text-xl flex shrink-0', `text-${stat.color}-500`]" />
                            </div>
                            <div>
                                <div class="flex items-center gap-2">
                                    <p class="text-lg font-bold leading-none">{{ stat.value }}</p>
                                    <UIcon
                                        :name="stat.trend === 'up' ? 'i-lucide-trending-up' : 'i-lucide-trending-down'"
                                        :class="['text-base', stat.trend === 'up' ? 'text-green-500' : 'text-red-500']" />
                                </div>
                                <p class="text-xs text-muted mt-0.5">{{ stat.label }}</p>
                            </div>
                            <UBadge :label="stat.trendValue" :color="stat.trend === 'up' ? 'success' : 'error'"
                                variant="soft" size="sm" class="ml-auto" />
                        </UCard>
                    </div>

                    <!-- Recommended For You -->
                    <h3 class="text-sm font-semibold text-muted uppercase tracking-wide mt-2">Recommended for You</h3>
                    <div class="flex flex-col gap-2">
                        <UCard variant="soft" :ui="{ body: 'flex flex-col gap-4 relative z-10' }"
                            class="bg-neutral-800 dark:bg-neutral-950/50">
                            <p class="text-sm text-dimmed dark:text-muted flex items-center gap-2">
                                <UIcon name="i-lucide-sparkles" class="text-lg text-primary shrink-0" />
                                Based on your interests in AI & Data Science.
                            </p>
                            <div class="flex flex-col gap-2">
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
                        </UCard>
                    </div>

                </div>

            </div>

        </div>
    </ContentPanel>
</template>
