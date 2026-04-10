<script setup lang="ts">
import type { DocsStep } from '~/types/docs'

withDefaults(defineProps<{
    items?: DocsStep[]
}>(), {
    items: () => []
})
</script>

<template>
    <template v-if="items.length">
        <!-- Connecting Line -->
        <div class="hidden md:block absolute top-[28px] left-[15%] right-[15%] h-[2px] bg-muted -z-10">
        </div>

        <div v-for="(item, index) in items" :key="index" class="flex flex-col items-center text-center">
            <div
                :class="[
                    'w-14 h-14 rounded-2xl flex items-center justify-center mb-6 z-10 transition-transform hover:scale-105',
                    item.variant === 'solid'
                        ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/30 ring-4 ring-white dark:ring-neutral-900'
                        : 'bg-white dark:bg-neutral-900 border-2 border-primary-100 dark:border-primary-900/50 text-primary'
                ]">
                <UIcon :name="item.icon" class="w-6 h-6" />
            </div>
            <UBadge color="primary" variant="subtle" class="mb-3 rounded-full">Step {{ index + 1 }}</UBadge>
            <h3 class="font-bold mb-2">{{ item.title }}</h3>
            <p class="text-sm text-dimmed text-pretty px-4">
                {{ item.description }}
            </p>
        </div>
    </template>
</template>