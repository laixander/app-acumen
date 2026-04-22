<script setup lang="ts">
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    LineElement,
    BarElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Filler
} from 'chart.js'
import { Line, Bar } from 'vue-chartjs'

ChartJS.register(
    Title,
    Tooltip,
    Legend,
    LineElement,
    BarElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Filler
)

const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: false,
        },
        tooltip: {
            backgroundColor: 'rgba(15, 23, 42, 0.9)',
            padding: 12,
            titleColor: '#fff',
            bodyColor: '#cbd5e1',
            borderColor: 'rgba(255,255,255,0.1)',
            borderWidth: 1,
            cornerRadius: 8
        }
    },
    scales: {
        y: {
            beginAtZero: true,
            grid: {
                color: 'rgba(156, 163, 175, 0.1)',
                drawBorder: false
            },
            ticks: {
                color: 'rgba(156, 163, 175, 0.8)'
            }
        },
        x: {
            grid: {
                display: false
            },
            ticks: {
                color: 'rgba(156, 163, 175, 0.8)'
            }
        }
    },
    interaction: {
        intersect: false,
        mode: 'index' as const,
    },
}

const activityData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
        {
            label: 'Active Learners',
            backgroundColor: 'rgba(14, 165, 233, 0.15)', // light sky blue transparent
            borderColor: 'rgb(14, 165, 233)', // sky blue solid
            borderWidth: 2,
            pointBackgroundColor: 'rgb(14, 165, 233)',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointRadius: 4,
            pointHoverRadius: 6,
            data: [350, 480, 620, 510, 750, 890, 780],
            fill: true,
            tension: 0.4
        }
    ]
}

const completionData = {
    labels: ['Tech', 'Design', 'Business', 'Languages', 'Science', 'Math'],
    datasets: [
        {
            label: 'Topics Completed',
            backgroundColor: 'rgba(139, 92, 246, 0.85)', // violet transparent
            hoverBackgroundColor: 'rgba(139, 92, 246, 1)',
            borderRadius: 6,
            data: [320, 150, 90, 210, 180, 250],
            maxBarThickness: 48
        }
    ]
}
</script>
<template>
    <ContentPanel title="Dashboard">
        <ContentHeading title="Dashboard"
            description="Analyze aggregated learning data to identify platform-wide trends and improve material ingestion benchmarks." />

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
            <UCard :ui="{ body: 'px-4 py-5 sm:p-6' }">
                <div class="flex items-center justify-between">
                    <div class="text-sm font-medium">Total Learners</div>
                    <UIcon name="i-lucide-users" class="text-primary w-5 h-5 opacity-50" />
                </div>
                <div class="text-3xl font-bold mt-2">1,248</div>
                <div class="text-xs text-green-500 font-medium mt-2 flex items-center gap-1">
                    <UIcon name="i-lucide-arrow-up-right" class="w-3 h-3" />
                    <span>12% from last month</span>
                </div>
            </UCard>

            <UCard :ui="{ body: 'px-4 py-5 sm:p-6' }">
                <div class="flex items-center justify-between">
                    <div class="text-sm font-medium">Topics Mastered</div>
                    <UIcon name="i-lucide-book-open-check" class="text-primary w-5 h-5 opacity-50" />
                </div>
                <div class="text-3xl font-bold mt-2">84</div>
                <div class="text-xs text-green-500 font-medium mt-2 flex items-center gap-1">
                    <UIcon name="i-lucide-arrow-up-right" class="w-3 h-3" />
                    <span>5% from last week</span>
                </div>
            </UCard>

            <UCard :ui="{ body: 'px-4 py-5 sm:p-6' }">
                <div class="flex items-center justify-between">
                    <div class="text-sm font-medium">Avg. Generation Time</div>
                    <UIcon name="i-lucide-clock" class="text-primary w-5 h-5 opacity-50" />
                </div>
                <div class="text-3xl font-bold mt-2">2.4s</div>
                <div class="text-xs text-green-500 font-medium mt-2 flex items-center gap-1">
                    <UIcon name="i-lucide-arrow-down-right" class="w-3 h-3" />
                    <span>0.3s from last month</span>
                </div>
            </UCard>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <UCard>
                <div class="flex justify-between items-center mb-6">
                    <h3 class="text-base font-semibold">Active Learners Trend</h3>
                    <UBadge variant="soft" color="primary">Weekly</UBadge>
                </div>
                <div class="h-[280px] w-full">
                    <Line :data="activityData" :options="chartOptions" />
                </div>
            </UCard>

            <UCard>
                <div class="flex justify-between items-center mb-6">
                    <h3 class="text-base font-semibold">Topics by Category</h3>
                    <UBadge variant="soft" color="primary">All Time</UBadge>
                </div>
                <div class="h-[280px] w-full">
                    <Bar :data="completionData" :options="chartOptions" />
                </div>
            </UCard>
        </div>
    </ContentPanel>
</template>
