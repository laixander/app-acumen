<script setup lang="ts">
defineProps<{
    modelValue: 'grid' | 'list'
}>()

defineEmits<{
    (e: 'update:modelValue', value: 'grid' | 'list'): void
}>()
</script>

<template>
    <UFieldGroup>
        <UButton :variant="modelValue === 'grid' ? 'solid' : 'soft'"
            :color="modelValue === 'grid' ? 'primary' : 'neutral'" icon="i-lucide-layout-grid" size="sm"
            @click="$emit('update:modelValue', 'grid')" />
        <UButton :variant="modelValue === 'list' ? 'solid' : 'soft'"
            :color="modelValue === 'list' ? 'primary' : 'neutral'" icon="i-lucide-layout-list" size="sm"
            @click="$emit('update:modelValue', 'list')" />
    </UFieldGroup>
</template>
