<script setup lang="ts">
import { Bar } from 'vue-chartjs'
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const { weeklyStats } = useActivityLogs()

// Map JS getDay() (0=Sun…6=Sat) → Mon-based index (0=Mon…6=Sun)
const todayIndex = (new Date().getDay() + 6) % 7

const barColors = Array.from({ length: 7 }, (_, i) =>
    i === todayIndex ? 'rgba(99, 102, 241, 1)' : 'rgba(99, 102, 241, 0.3)'
)

const chartData = computed(() => ({
    labels: weeklyStats.value.labels,
    datasets: [
        {
            label: 'Minutes Studied',
            data: weeklyStats.value.data,
            backgroundColor: barColors,
            borderRadius: 6,
            borderSkipped: false,
        },
    ],
}))

const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: { display: false },
        tooltip: {
            callbacks: {
                label: (ctx: any) => ` ${ctx.parsed.y} min`,
            },
        },
    },
    scales: {
        x: {
            grid: { display: false },
            ticks: { font: { size: 11 } },
        },
        y: {
            grid: { color: 'rgba(0,0,0,0.05)' },
            ticks: {
                font: { size: 11 },
                maxTicksLimit: 5
            },
            beginAtZero: true,
        },
    },
}
</script>

<template>
    <div class="h-36">
        <Bar :data="chartData" :options="chartOptions" />
    </div>
</template>
