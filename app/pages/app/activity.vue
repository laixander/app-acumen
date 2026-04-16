<script setup lang="ts">
import type { TabsItem } from '@nuxt/ui'

const { logs, totalMinutesThisWeek, averageMinutesPerDay, currentStreak } = useActivityLogs()

const stats = computed(() => [
    { label: 'Total Studied', value: `${Math.floor(totalMinutesThisWeek.value / 60)}h ${totalMinutesThisWeek.value % 60}m`, icon: 'i-lucide-clock', color: 'primary' },
    { label: 'Avg / Day', value: `${averageMinutesPerDay.value}m`, icon: 'i-lucide-calendar-days', color: 'green' },
    { label: 'Completed Lessons', value: logs.value.length.toString(), icon: 'i-lucide-check-circle', color: 'teal' }
])

const items = [
    {
        label: 'Study Logs',
        icon: 'i-lucide-book-open',
        slot: 'study-logs' as const
    },
    {
        label: 'Session Logs',
        icon: 'i-lucide-shield-check',
        slot: 'session-logs' as const
    }
] satisfies TabsItem[]
</script>

<template>
    <UContainer class="py-12 flex flex-col gap-8">
        <header class="flex items-start gap-4">
            <!-- <div class="p-2 bg-primary/10 rounded-lg">
                <UIcon name="i-lucide-clipboard-list" class="text-3xl text-primary flex shrink-0" />
            </div> -->
            <div class="flex flex-col gap-2">
                <h1 class="text-3xl font-bold tracking-tight">Activity Logs</h1>
                <p class="text-muted">Track your learning progress and session history.</p>
            </div>
        </header>

        <!-- Stats Overview -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <UCard v-for="stat in stats" :key="stat.label" class="shadow-sm border-neutral-200 dark:border-neutral-800">
                <div class="flex items-center gap-4">
                    <div :class="[
                        'p-3 rounded-xl',
                        `bg-${stat.color}-500/10`,
                        `text-${stat.color}-500`
                    ]">
                        <UIcon :name="stat.icon" class="text-2xl flex" />
                    </div>
                    <div>
                        <p class="text-sm font-medium text-muted">{{ stat.label }}</p>
                        <p class="text-2xl font-bold">{{ stat.value }}</p>
                    </div>
                </div>
            </UCard>
        </div>

        <UTabs :items="items" variant="link" :ui="{ indicator: 'h-[2px]' }" class="gap-4 w-full">
            <template #study-logs>
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <div class="lg:col-span-3">
                        <UCard class="shadow-sm" :ui="{ body: 'p-0 sm:p-0' }">
                            <!-- <template #header>
                                <h3 class="text-sm font-semibold text-muted uppercase tracking-wide">Study Session Logs
                                </h3>
                            </template> -->
                            <AppActivityLogsTable />
                        </UCard>
                    </div>

                    <!-- <div class="flex flex-col gap-4">
                    <UCard>
                        <template #header>
                            <h3 class="text-sm font-semibold text-muted uppercase tracking-wide">Weekly Activity</h3>
                        </template>
                        <AppWeeklyActivityChart />
                    </UCard>

                    <UCard>
                        <template #header>
                            <h3 class="text-sm font-semibold text-muted uppercase tracking-wide">Learning Streak</h3>
                        </template>
                        <div class="flex items-center gap-3">
                            <div class="p-3 rounded-xl bg-orange-500/10">
                                <UIcon name="i-lucide-flame" class="text-2xl flex shrink-0 text-orange" />
                            </div>
                            <div>
                                <p class="text-lg font-bold">{{ currentStreak }} {{ currentStreak === 1 ? 'Day' : 'Days' }}
                                </p>
                                <p class="text-xs text-muted">Keep it up! You're on fire.</p>
                            </div>
                        </div>
                    </UCard>
                </div> -->
                </div>
            </template>

            <template #session-logs>
                <!-- Session Logs -->
                <UCard class="shadow-sm" :ui="{ body: 'p-0 sm:p-0' }">
                    <!-- <template #header>
                        <h3 class="text-sm font-semibold text-muted uppercase tracking-wide">Session Logs</h3>
                    </template> -->
                    <AppSessionLogsTable />
                </UCard>
            </template>
        </UTabs>
    </UContainer>
</template>