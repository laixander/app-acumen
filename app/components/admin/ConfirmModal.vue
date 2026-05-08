<script setup lang="ts">
const props = defineProps<{
    open: boolean
    title: string
    description: string
    confirmLabel?: string
    confirmColor?: 'primary' | 'error' | 'success' | 'warning' | 'info' | 'neutral'
    loading?: boolean
}>()

const emit = defineEmits(['update:open', 'confirm'])

const isOpen = computed({
    get: () => props.open,
    set: (value) => emit('update:open', value)
})

const colorClasses = computed(() => {
    switch (props.confirmColor) {
        case 'error': return 'text-error-600 bg-error-50 dark:bg-error-950/30'
        case 'success': return 'text-green-600 bg-green-50 dark:bg-green-950/30'
        case 'warning': return 'text-warning-600 bg-warning-50 dark:bg-warning-950/30'
        case 'info': return 'text-info-600 bg-info-50 dark:bg-info-950/30'
        default: return 'text-primary-600 bg-primary-50 dark:bg-primary-950/30'
    }
})

const iconName = computed(() => {
    if (props.confirmColor === 'error') return 'i-lucide-alert-triangle'
    if (props.confirmColor === 'success') return 'i-lucide-check-circle'
    return 'i-lucide-help-circle'
})
</script>

<template>
    <UModal v-model:open="isOpen">
        <template #content>
            <div class="p-6 flex flex-col gap-6">
                <div class="flex items-center gap-4">
                    <div :class="[
                        'w-12 h-12 rounded-full flex items-center justify-center shrink-0',
                        colorClasses
                    ]">
                        <UIcon :name="iconName" class="text-2xl" />
                    </div>
                    <h3 class="text-xl font-bold leading-tight">{{ title }}</h3>
                </div>

                <p class="text-neutral-500 leading-relaxed">{{ description }}</p>

                <div class="flex items-center justify-end gap-3 pt-2">
                    <UButton label="Cancel" variant="ghost" color="neutral" @click="isOpen = false" />
                    <UButton :label="confirmLabel || 'Confirm'" :color="confirmColor || 'primary'" :loading="loading"
                        @click="emit('confirm')" />
                </div>
            </div>
        </template>
    </UModal>
</template>
