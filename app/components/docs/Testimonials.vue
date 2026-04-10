<script setup lang="ts">
import type { DocsTestimonial } from '~/types/docs'

const props = defineProps<DocsTestimonial>()
</script>
<template>
    <UCard>
        <div class="flex gap-1 mb-6">
            <UIcon name="i-heroicons-star-solid" class="size-5"
                :class="i <= props.rating ? 'text-yellow-400' : 'text-dimmed/30'" v-for="i in 5" :key="'ts1-' + i" />
        </div>
        <p class="text-muted mb-8 text-sm">
            {{ props.content }}
        </p>
        <UUser :name="props.name" :description="props.description"
            :avatar="{ src: props.avatar, alt: props.name, loading: 'lazy' }" :ui="{ description: 'text-dimmed' }" />
    </UCard>
</template>
