<script setup lang="ts">
interface Props {
    title?: string
    description?: string
    icon?: string
    centered?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    centered: false
})
</script>

<template>
    <div class="flex gap-4 w-full relative group" :class="{
        'flex-col items-center text-center': centered,
        'items-start': !centered
    }">

        <!-- Icon Container -->
        <div v-if="icon"
            class="bg-primary-500/10 text-primary-500 p-4 rounded-2xl shrink-0 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-sm border border-primary-500/10">
            <UIcon :name="icon" class="text-4xl flex shrink-0" />
        </div>

        <div class="flex flex-col gap-1.5" :class="{
            'items-center': centered,
            'max-w-2xl': centered
        }">
            <!-- Heading -->
            <h1 v-if="title || $slots.title" class="text-3xl font-bold tracking-tight transition-colors duration-300">
                <slot name="title">{{ title }}</slot>
            </h1>

            <!-- Description -->
            <p v-if="description || $slots.description" class="text-muted leading-relaxed">
                <slot name="description">{{ description }}</slot>
            </p>
        </div>
    </div>
</template>