<script setup lang="ts">
import { computed } from 'vue'
import type { DocsSectionProps } from '~/types/docs'

const props = defineProps<DocsSectionProps>()

const sectionId = computed(() => props.id || props.title.toLowerCase().replace(/\s+/g, '-'))
</script>

<template>
    <section :id="sectionId" class="scroll-mt-24">
        <div class="flex items-center gap-3 mb-6">
            <UIcon :name="props.icon" class="size-8 text-primary" />
            <h2 class="text-3xl font-bold tracking-tight">{{ props.title }}</h2>
        </div>
        <slot />
    </section>
</template>