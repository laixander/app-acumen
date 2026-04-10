<script setup lang="ts">
import type { AppLogoProps } from '~/types/components'

const props = withDefaults(defineProps<AppLogoProps>(), {
    size: 'base'
})
</script>
<template>
    <div class="flex items-center gap-3">
        <div :class="[
            size === 'lg' ? 'size-20 flex items-center justify-center rounded-3xl shadow-xl' : 'size-9 flex items-center justify-center rounded-xl shadow-lg',
            'relative overflow-hidden',
            'before:absolute before:inset-0 before:bg-gradient-to-br before:from-transparent before:to-black before:mix-blend-overlay',
            `shadow-${theme}-500/50`,
            `bg-${theme}-500`
        ]">
            <UIcon :name="icon" :class="[
                'flex shrink-0 text-white',
                size === 'lg' ? 'size-10' : 'size-5'
            ]" />
        </div>
        <span v-if="name" :class="['text-xl font-racing', `text-${color}`]">{{ name }}</span>
    </div>
</template>