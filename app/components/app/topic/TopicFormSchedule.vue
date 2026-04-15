<script setup lang="ts">
const props = defineProps<{
    modelValue: {
        duration: string
        availability: string
    }
}>()

const emit = defineEmits(['update:modelValue'])

const durations = [
    { label: '1 week', value: '1 week', icon: 'i-lucide-calendar-days' },
    { label: '2 weeks', value: '2 weeks', icon: 'i-lucide-calendar-range' },
    { label: '1 month', value: '1 month', icon: 'i-lucide-calendar' },
    { label: 'Ongoing', value: 'Ongoing', icon: 'i-lucide-infinity' }
]

const availabilities = [
    { label: 'Light', value: 'Light (2-3h/week)', icon: 'i-lucide-battery-low' },
    { label: 'Standard', value: 'Standard (5-7h/week)', icon: 'i-lucide-battery-medium' },
    { label: 'Intensive', value: 'Intensive (10-15h/week)', icon: 'i-lucide-battery-full' },
    { label: 'Full-time', value: 'Full-time (30h+/week)', icon: 'i-lucide-zap' }
]

const updateField = (field: string, value: any) => {
    emit('update:modelValue', { ...props.modelValue, [field]: value })
}
</script>

<template>
    <div class="flex flex-col gap-8">
        <div class="flex items-center gap-4">
            <div class="p-3 bg-primary-100 dark:bg-primary-900/40 rounded-xl">
                <UIcon name="i-lucide-clock" class="text-2xl text-primary flex shrink-0" />
            </div>
            <div>
                <h2 class="text-xl font-bold">Schedule & Duration</h2>
                <p class="text-sm text-muted">How much time can you realistically commit?</p>
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
            <!-- Duration -->
            <UFormField label="How long do you want this topic to last?">
                <div class="flex flex-col gap-3 mt-4">
                    <UCard v-for="d in durations" :key="d.value" class="cursor-pointer transition-all duration-200"
                        :class="[
                            modelValue.duration === d.value
                                ? 'ring-2 ring-primary bg-primary-50 dark:bg-primary-900/20'
                                : 'hover:ring-2 hover:ring-primary-300 dark:hover:ring-primary-700'
                        ]" :ui="{ body: 'p-3 flex items-center gap-3' }" @click="updateField('duration', d.value)">
                        <UIcon :name="d.icon" class="text-lg shrink-0"
                            :class="modelValue.duration === d.value ? 'text-primary' : 'text-dimmed'" />
                        <span class="text-sm font-medium"
                            :class="modelValue.duration === d.value ? 'text-primary-700 dark:text-primary-300' : 'text-toned'">{{
                                d.label }}</span>
                        <div v-if="modelValue.duration === d.value" class="ml-auto">
                            <UIcon name="i-lucide-check" class="text-primary shrink-0" />
                        </div>
                    </UCard>
                </div>
            </UFormField>

            <!-- Availability -->
            <UFormField label="What is your weekly availability?">
                <div class="flex flex-col gap-3 mt-4">
                    <UCard v-for="a in availabilities" :key="a.value" class="cursor-pointer transition-all duration-200"
                        :class="[
                            modelValue.availability === a.value
                                ? 'ring-2 ring-primary bg-primary-50 dark:bg-primary-900/20'
                                : 'hover:ring-2 hover:ring-primary-300 dark:hover:ring-primary-700'
                        ]" :ui="{ body: 'p-3 flex items-center gap-3' }" @click="updateField('availability', a.value)">
                        <UIcon :name="a.icon" class="text-lg shrink-0"
                            :class="modelValue.availability === a.value ? 'text-primary' : 'text-dimmed'" />
                        <span class="text-sm font-medium"
                            :class="modelValue.availability === a.value ? 'text-primary-700 dark:text-primary-300' : 'text-toned'">{{
                                a.label }}</span>
                        <div v-if="modelValue.availability === a.value" class="ml-auto">
                            <UIcon name="i-lucide-check" class="text-primary shrink-0" />
                        </div>
                    </UCard>
                </div>
            </UFormField>
        </div>
    </div>
</template>
