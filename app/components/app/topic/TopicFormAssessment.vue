<script setup lang="ts">
const props = defineProps<{
    modelValue: {
        assessments: Array<{ label: string; value: number }>
    }
}>()

const emit = defineEmits(['update:modelValue'])

const updateValue = (index: number, val: number | undefined) => {
    if (typeof val !== 'number') return

    const newAssess = props.modelValue.assessments.map((item, i) =>
        i === index ? { ...item, value: val } : item
    )
    emit('update:modelValue', { ...props.modelValue, assessments: newAssess })
}
</script>

<template>
    <div class="flex flex-col gap-8">
        <div class="flex items-center gap-4">
            <div class="p-3 bg-primary-100 dark:bg-primary-900/40 rounded-xl">
                <UIcon name="i-lucide-sparkles" class="text-2xl text-primary flex shrink-0" />
            </div>
            <div>
                <h2 class="text-xl font-bold">Key Concepts & Proficiency</h2>
                <p class="text-sm text-muted">Based on your materials, AI found these core topics. Rate your
                    current confidence.</p>
            </div>
        </div>

        <div class="flex flex-col gap-6">
            <UCard v-for="(item, index) in modelValue.assessments" :key="item.label" variant="soft"
                class="dark:bg-muted/20" :ui="{ body: 'p-6 flex flex-col gap-6' }">
                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-3">
                        <div
                            class="w-6 h-6 rounded-md bg-default dark:bg-muted flex items-center justify-center text-[10px] font-bold shadow-xs border border-default">
                            {{ index + 1 }}
                        </div>
                        <h3 class="font-bold text-sm">{{ item.label }}</h3>
                    </div>
                    <span class="text-sm font-bold text-primary">{{ item.value }}%</span>
                </div>

                <div class="px-2">
                    <USlider :model-value="item.value" @update:model-value="v => updateValue(index, v)" :min="0"
                        :max="100" :step="5" />
                </div>

                <div
                    class="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-dimmed px-1">
                    <span>Just Starting</span>
                    <span>Comfortable</span>
                    <span>Mastery</span>
                </div>
            </UCard>
        </div>
    </div>
</template>
