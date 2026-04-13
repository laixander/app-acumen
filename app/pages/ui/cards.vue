<script setup lang="ts">
const stats = [
    { label: 'Day Streak', value: '12', icon: 'i-lucide-calendar-days', color: 'orange', trend: 'up', trendValue: '+10%' },
    { label: 'Mins Today', value: '45', icon: 'i-lucide-timer', color: 'indigo', trend: 'down', trendValue: '-5%' },
    { label: 'Lessons Done', value: '8', icon: 'i-lucide-check-circle', color: 'green', trend: 'up', trendValue: '+2' },
]
</script>
<template>
    <ContentPanel title="Cards">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">


            <!-- cards -->

            <UCard v-for="stat in stats" :key="stat.label" variant="soft" :class="`bg-${stat.color}-500/10`"
                :ui="{ body: 'flex items-center gap-3 py-3 px-4' }">
                <div :class="['p-3 rounded-lg', `bg-${stat.color}-500/10`]">
                    <UIcon :name="stat.icon" :class="['text-xl flex shrink-0', `text-${stat.color}-500`]" />
                </div>
                <div>
                    <div class="flex items-center gap-2">
                        <p class="text-lg font-bold leading-none">{{ stat.value }}</p>
                        <UIcon :name="stat.trend === 'up' ? 'i-lucide-trending-up' : 'i-lucide-trending-down'"
                            :class="['text-base', stat.trend === 'up' ? 'text-green-500' : 'text-red-500']" />
                    </div>
                    <p class="text-xs text-muted mt-0.5">{{ stat.label }}</p>
                </div>
                <UBadge :label="stat.trendValue" :color="stat.trend === 'up' ? 'success' : 'error'" variant="soft"
                    size="sm" class="ml-auto" />
            </UCard>

        </div>
    </ContentPanel>
</template>