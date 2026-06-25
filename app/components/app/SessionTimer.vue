<script setup lang="ts">
import { ref, computed, watch, onUnmounted } from 'vue'

const props = defineProps<{
    sessionState: string
    duration: string
}>()

const parseDurationToSeconds = (str: string) => {
    if (!str || str === '—') return 600 // fallback 10 mins
    const matches = str.match(/(\d+)/)
    const value = matches ? parseInt(matches[0]) : 10
    if (str.toLowerCase().includes('hr')) return value * 3600
    return value * 60
}

const timerSeconds = ref(0)
const timerInterval = ref<ReturnType<typeof setInterval> | null>(null)

const timerDisplay = computed(() => {
    const m = Math.floor(timerSeconds.value / 60)
    const s = timerSeconds.value % 60
    return `${m}:${s.toString().padStart(2, '0')}`
})

const timerIsUrgent = computed(() => timerSeconds.value > 0 && timerSeconds.value <= 60)

const startTimer = () => {
    timerSeconds.value = parseDurationToSeconds(props.duration)
    if (timerInterval.value) clearInterval(timerInterval.value)
    timerInterval.value = setInterval(() => {
        if (timerSeconds.value > 0) {
            timerSeconds.value--
        } else {
            clearInterval(timerInterval.value!)
        }
    }, 1000)
}

const stopTimer = () => {
    if (timerInterval.value) {
        clearInterval(timerInterval.value)
    }
}

watch(() => props.sessionState, (state) => {
    if (state === 'active') startTimer()
    else stopTimer()
}, { immediate: true })

onUnmounted(() => stopTimer())
</script>

<template>
    <UCard v-if="sessionState !== 'processing' && sessionState !== 'plan'" variant="soft"
        :ui="{ root: 'shadow-2xl divide-primary/20', body: 'sm:px-4 sm:py-2.5', footer: 'sm:px-4 sm:py-2.5' }">
        <div class="flex flex-col gap-1 items-end">
            <p class="text-[10px] font-semibold uppercase tracking-widest text-dimmed">
                Time Remaining
            </p>
            <div class="flex items-center gap-2" :class="timerIsUrgent ? 'text-red-500' : 'text-primary'">
                <UIcon :name="timerIsUrgent ? 'i-lucide-alarm-clock' : 'i-lucide-timer'" class="size-4 shrink-0"
                    :class="{ 'animate-pulse': timerIsUrgent }" />
                <span class="text-lg font-bold font-mono tabular-nums tracking-tight">
                    {{ sessionState === 'active' || sessionState === 'complete' ? timerDisplay :
                        duration }}
                </span>
            </div>
        </div>
        <template v-if="sessionState === 'active' || sessionState === 'complete'" #footer>
            <UBadge v-if="sessionState === 'active'" label="In Progress" color="primary" variant="subtle"
                icon="i-lucide-circle-dot" class="animate-pulse w-full justify-center" />
            <UBadge v-else-if="sessionState === 'complete'" label="Complete" color="success" variant="subtle"
                icon="i-lucide-check-circle" class="w-full justify-center" />
        </template>
    </UCard>
</template>
