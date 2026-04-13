<script setup lang="ts">
import type { AppLogoProps } from '~/types/components'

const props = withDefaults(defineProps<AppLogoProps>(), {
    size: 'base',
    naked: false
})
</script>
<template>
    <div class="flex items-center gap-2">
        <div :class="[
            !naked && [
                size === 'lg' && [`drop-shadow-${theme}-500`, 'relative drop-shadow-2xl/60'],
            ]
        ]">
            <div :class="[
                !naked && [
                    size === 'lg' ? 'size-20 before:absolute before:inset-0 before:bg-gradient-to-br before:from-transparent before:to-black before:mix-blend-overlay relative overflow-hidden' : 'size-9',
                    'flex items-center justify-center rounded-none squircle',
                    `bg-${theme}-500`
                ]
            ]">
                <UIcon :name="icon" :class="[
                    'flex shrink-0 relative z-10',
                    naked ? (theme === 'white' ? 'text-white' : `text-${theme}-500`) : 'text-white',
                    size === 'lg' ? 'size-10' : 'size-5'
                ]" />
                <!-- Light Reflection Blob -->
                <div v-if="!naked && size === 'lg'"
                    class="absolute -top-[10%] -left-[10%] bg-white/20 blur-md rounded-full size-16" />
            </div>
        </div>
        <span v-if="name" :class="[
            size === 'lg' ? 'text-2xl' : 'text-xl',
            'font-brand',
            `text-${color}`
        ]">{{ name }}</span>
    </div>
</template>