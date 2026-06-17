<!-- components/CircularProgress.vue -->
<script setup lang="ts">
const props = withDefaults(defineProps<{
    value: number        // 0-100
    size?: number        // px
    strokeWidth?: number
    color?: string
    trackColor?: string
    label?: string
}>(), {
    size: 80,
    strokeWidth: 6,
    color: 'var(--ui-primary)',
    trackColor: 'var(--ui-border)',
})

const radius = computed(() => (props.size - props.strokeWidth) / 2)
const circumference = computed(() => 2 * Math.PI * radius.value)
const offset = computed(() => circumference.value - (props.value / 100) * circumference.value)
</script>

<template>
    <div class="relative inline-flex items-center justify-center">
        <svg :width="size" :height="size" :viewBox="`0 0 ${size} ${size}`" class="-rotate-90">
            <!-- Track -->
            <circle :cx="size / 2" :cy="size / 2" :r="radius" fill="none" :stroke="trackColor"
                :stroke-width="strokeWidth" />
            <!-- Progress -->
            <circle :cx="size / 2" :cy="size / 2" :r="radius" fill="none" :stroke="color" :stroke-width="strokeWidth"
                stroke-linecap="round" :stroke-dasharray="circumference" :stroke-dashoffset="offset"
                class="transition-all duration-500" />
        </svg>

        <!-- Center label -->
        <div class="absolute inset-0 flex items-center justify-center">
            <slot>
                <span class="text-xs font-semibold text-highlighted">
                    {{ label ?? `${value}%` }}
                </span>
            </slot>
        </div>
    </div>
</template>