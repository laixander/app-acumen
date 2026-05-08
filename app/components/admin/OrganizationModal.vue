<script setup lang="ts">
import type { Organization } from '~/types/organization'

const props = defineProps<{
    open: boolean
    organization?: Organization | null
}>()

const emit = defineEmits(['update:open'])

const { addOrganization, updateOrganization } = useOrganizations()
const { user } = useUser()
const toast = useToast()

const isOpen = computed({
    get: () => props.open,
    set: (value) => emit('update:open', value)
})

const isEdit = computed(() => !!props.organization)

const form = reactive({
    name: '',
    type: 'University' as Organization['type'],
    plan: 'Free' as Organization['plan'],
    description: '',
    website: ''
})

const typeOptions = [
    { label: 'University', value: 'University', icon: 'i-lucide-graduation-cap' },
    { label: 'School', value: 'School', icon: 'i-lucide-school' },
    { label: 'Company', value: 'Company', icon: 'i-lucide-building-2' },
    { label: 'Personal', value: 'Personal', icon: 'i-lucide-user' }
]

const { plans } = usePlans()
const activePlans = computed(() => plans.value.filter(p => p.status === 'Active'))
const planOptions = computed(() => activePlans.value.map(p => ({
    label: p.name,
    value: p.name,
    icon: p.name === 'Enterprise' ? 'i-lucide-shield-check' : (p.name === 'Pro' ? 'i-lucide-zap' : 'i-lucide-sparkles')
})))

const resetForm = () => {
    form.name = ''
    form.type = 'University'
    form.plan = 'Free'
    form.description = ''
    form.website = ''
}

// Watch for organization prop changes to fill form
watch(() => props.organization, (newOrg) => {
    if (newOrg) {
        form.name = newOrg.name
        form.type = newOrg.type
        form.plan = newOrg.plan || 'Free'
        form.description = newOrg.description || ''
        form.website = newOrg.website || ''
    } else {
        resetForm()
    }
}, { immediate: true })

const handleSubmit = () => {
    if (!form.name) return

    if (isEdit.value && props.organization) {
        updateOrganization(props.organization.id, {
            name: form.name,
            type: form.type,
            plan: form.plan,
            description: form.description,
            website: form.website,
            logo: typeOptions.find(opt => opt.value === form.type)?.icon,
            updatedAt: new Date().toISOString()
        })
        toast.add({ title: 'Organization updated successfully!', color: 'success' })
    } else {
        const newOrg: Organization = {
            id: `org_${Math.random().toString(36).substr(2, 9)}`,
            name: form.name,
            slug: form.name.toLowerCase().replace(/\s+/g, '-'),
            type: form.type,
            plan: form.plan,
            status: 'Active',
            description: form.description,
            website: form.website,
            logo: typeOptions.find(opt => opt.value === form.type)?.icon,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            members: [
                {
                    id: '1',
                    name: user.value.profile.fullName,
                    email: user.value.profile.email,
                    role: 'Owner',
                    orgRole: 'Org_Owner',
                    avatar: user.value.profile.avatar,
                    status: 'online'
                }
            ]
        }
        addOrganization(newOrg)
        toast.add({ title: 'Organization created successfully!', color: 'success' })
    }

    isOpen.value = false
    if (!isEdit.value) resetForm()
}
</script>

<template>
    <UModal v-model:open="isOpen">
        <template #content>
            <div class="p-6 flex flex-col gap-6">
                <div class="flex flex-col gap-1">
                    <h3 class="text-xl font-bold">{{ isEdit ? 'Edit Organization' : 'Add New Organization' }}</h3>
                    <p class="text-sm text-neutral-500">
                        {{ isEdit ? 'Update the details for this institution.' : 'Create a new institutional or corporate account.' }}
                    </p>
                </div>

                <form @submit.prevent="handleSubmit" class="flex flex-col gap-5">
                    <UFormField label="Organization Name" required>
                        <UInput v-model="form.name" placeholder="e.g. Stanford University" class="w-full" />
                    </UFormField>

                    <div class="grid gap-4" :class="isEdit ? 'grid-cols-1' : 'grid-cols-2'">
                        <UFormField label="Type">
                            <USelect v-model="form.type" :items="typeOptions" class="w-full" />
                        </UFormField>

                        <UFormField v-if="!isEdit" label="Plan">
                            <USelect v-model="form.plan" :items="planOptions" class="w-full" />
                        </UFormField>
                    </div>

                    <UFormField label="Website (Optional)">
                        <UInput v-model="form.website" placeholder="https://..." class="w-full" />
                    </UFormField>

                    <UFormField label="Description">
                        <UTextarea v-model="form.description" placeholder="Short description of the institution..."
                            class="w-full" :rows="3" />
                    </UFormField>

                    <div class="flex items-center justify-end gap-3 mt-2">
                        <UButton label="Cancel" variant="ghost" color="neutral" @click="isOpen = false" />
                        <UButton type="submit" :label="isEdit ? 'Save Changes' : 'Create Organization'" color="primary"
                            :disabled="!form.name" />
                    </div>
                </form>
            </div>
        </template>
    </UModal>
</template>
