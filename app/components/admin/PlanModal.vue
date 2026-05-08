<script setup lang="ts">
import type { Plan } from '~/types/plan'

const props = defineProps<{
    open: boolean
    plan?: Plan | null
}>()

const emit = defineEmits(['update:open'])

const { addPlan, updatePlan } = usePlans()
const toast = useToast()

const isOpen = computed({
    get: () => props.open,
    set: (value) => emit('update:open', value)
})

const isEdit = computed(() => !!props.plan)

const form = reactive({
    name: '',
    description: '',
    price: 0,
    interval: 'monthly' as const,
    tokenLimit: 1000000,
    features: [] as string[],
    status: 'Active' as const
})

const featureInput = ref('')

const resetForm = () => {
    form.name = ''
    form.description = ''
    form.price = 0
    form.interval = 'monthly'
    form.tokenLimit = 1000000
    form.features = []
    form.status = 'Active'
}

watch(() => props.plan, (newPlan) => {
    if (newPlan) {
        form.name = newPlan.name
        form.description = newPlan.description
        form.price = newPlan.price
        form.interval = newPlan.interval
        form.tokenLimit = newPlan.tokenLimit
        form.features = [...newPlan.features]
        form.status = newPlan.status
    } else {
        resetForm()
    }
}, { immediate: true })

const addFeature = () => {
    if (featureInput.value.trim()) {
        form.features.push(featureInput.value.trim())
        featureInput.value = ''
    }
}

const removeFeature = (index: number) => {
    form.features.splice(index, 1)
}

const handleSubmit = () => {
    if (isEdit.value && props.plan) {
        updatePlan(props.plan.id, { ...form })
        toast.add({ title: 'Plan updated successfully', color: 'success' })
    } else {
        const newPlan: Plan = {
            id: `plan_${Math.random().toString(36).substr(2, 9)}`,
            ...form,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }
        addPlan(newPlan)
        toast.add({ title: 'Plan created successfully', color: 'success' })
    }
    isOpen.value = false
}
</script>

<template>
    <UModal v-model:open="isOpen" :ui="{ width: 'sm:max-w-xl' }">
        <template #content>
            <div class="p-6 flex flex-col gap-6">
                <div class="flex flex-col gap-1">
                    <h3 class="text-xl font-bold">{{ isEdit ? 'Edit Subscription Plan' : 'Create New Plan' }}</h3>
                    <p class="text-sm text-neutral-500">
                        Define the pricing and limits for this platform tier.
                    </p>
                </div>

                <form @submit.prevent="handleSubmit" class="flex flex-col gap-5">
                    <UFormField label="Plan Name" required>
                        <UInput v-model="form.name" placeholder="e.g. Pro, Growth, Enterprise" class="w-full" />
                    </UFormField>

                    <UFormField label="Description">
                        <UTextarea v-model="form.description" placeholder="What is included in this plan?" class="w-full" :rows="2" />
                    </UFormField>

                    <div class="grid grid-cols-2 gap-4">
                        <UFormField label="Price ($)">
                            <UInput v-model.number="form.price" type="number" step="0.01" class="w-full" />
                        </UFormField>
                        <UFormField label="Billing Interval">
                            <USelect v-model="form.interval" :items="['monthly', 'yearly']" class="w-full" />
                        </UFormField>
                    </div>

                    <UFormField label="Monthly Token Limit">
                        <template #hint>
                            <span class="text-[10px] text-neutral-400">Current: {{ (form.tokenLimit / 1000000).toFixed(1) }}M tokens</span>
                        </template>
                        <UInput v-model.number="form.tokenLimit" type="number" step="100000" class="w-full" />
                    </UFormField>

                    <UFormField label="Features">
                        <div class="flex flex-col gap-3">
                            <div class="flex gap-2">
                                <UInput v-model="featureInput" placeholder="Add a feature..." class="grow" @keydown.enter.prevent="addFeature" />
                                <UButton icon="i-lucide-plus" color="neutral" variant="soft" @click="addFeature" />
                            </div>
                            <div class="flex flex-wrap gap-2">
                                <UBadge v-for="(feature, index) in form.features" :key="index" variant="subtle" color="neutral" class="pr-1">
                                    {{ feature }}
                                    <UButton icon="i-lucide-x" variant="ghost" color="neutral" size="xs" class="ml-1" @click="removeFeature(index)" />
                                </UBadge>
                            </div>
                        </div>
                    </UFormField>

                    <UFormField label="Status">
                        <URadioGroup v-model="form.status" :items="['Active', 'Inactive']" orientation="horizontal" />
                    </UFormField>

                    <div class="flex items-center justify-end gap-3 mt-4">
                        <UButton label="Cancel" variant="ghost" color="neutral" @click="isOpen = false" />
                        <UButton type="submit" :label="isEdit ? 'Save Changes' : 'Create Plan'" color="primary" :disabled="!form.name" />
                    </div>
                </form>
            </div>
        </template>
    </UModal>
</template>
