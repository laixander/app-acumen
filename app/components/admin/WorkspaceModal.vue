<script setup lang="ts">
import type { Workspace } from '~/types/workspace'

const props = defineProps<{
    open: boolean
    workspace?: Workspace | null
    organizationId?: string | null
}>()

const emit = defineEmits(['update:open'])

const { addWorkspace, updateWorkspace } = useWorkspaces()
const { user } = useUser()
const toast = useToast()

const isOpen = computed({
    get: () => props.open,
    set: (value) => emit('update:open', value)
})

const isEdit = computed(() => !!props.workspace)

const form = reactive({
    name: '',
    description: '',
    icon: 'i-lucide-folder',
    plan: 'Pro' as Workspace['plan'],
    color: 'blue' as Workspace['color']
})

const planOptions = [
    { label: 'Free', value: 'Free' },
    { label: 'Pro', value: 'Pro' },
    { label: 'Enterprise', value: 'Enterprise' }
]

const colorOptions = [
    { label: 'Blue', value: 'blue' },
    { label: 'Green', value: 'green' },
    { label: 'Purple', value: 'purple' },
    { label: 'Orange', value: 'orange' },
    { label: 'Red', value: 'red' }
]

const iconOptions = [
    { label: 'Folder', value: 'i-lucide-folder' },
    { label: 'Users', value: 'i-lucide-users' },
    { label: 'Book', value: 'i-lucide-book' },
    { label: 'Briefcase', value: 'i-lucide-briefcase' },
    { label: 'Code', value: 'i-lucide-code' },
    { label: 'Graduation Cap', value: 'i-lucide-graduation-cap' }
]

const resetForm = () => {
    form.name = ''
    form.description = ''
    form.icon = 'i-lucide-folder'
    form.plan = 'Pro'
    form.color = 'blue'
}

watch(() => props.workspace, (newWs) => {
    if (newWs) {
        form.name = newWs.name
        form.description = newWs.description || ''
        form.icon = newWs.icon || 'i-lucide-folder'
        form.plan = newWs.plan
        form.color = newWs.color || 'blue'
    } else {
        resetForm()
    }
}, { immediate: true })

const handleSubmit = () => {
    if (!form.name) return

    if (isEdit.value && props.workspace) {
        updateWorkspace(props.workspace.id, {
            name: form.name,
            description: form.description,
            icon: form.icon,
            plan: form.plan,
            color: form.color
        })
        toast.add({ title: 'Workspace updated successfully!', color: 'success' })
    } else {
        const newWs: Workspace = {
            id: `ws_${Math.random().toString(36).substr(2, 9)}`,
            organizationId: props.organizationId || undefined,
            name: form.name,
            description: form.description,
            icon: form.icon,
            plan: form.plan,
            color: form.color,
            tokens: 0,
            maxTokens: form.plan === 'Enterprise' ? 100000 : (form.plan === 'Pro' ? 50000 : 5000),
            lastActive: 'Just now',
            members: [
                {
                    id: '1',
                    name: user.value.profile.fullName,
                    email: user.value.profile.email,
                    role: 'Admin',
                    avatar: user.value.profile.avatar,
                    status: 'online'
                }
            ],
            pendingInvites: []
        }
        addWorkspace(newWs)
        toast.add({ title: 'Workspace created successfully!', color: 'success' })
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
                    <h3 class="text-xl font-bold">{{ isEdit ? 'Edit Workspace' : 'Add New Workspace' }}</h3>
                    <p class="text-sm text-neutral-500">
                        {{ isEdit ? 'Update workspace settings.' : 'Create a new workspace for this organization.' }}
                    </p>
                </div>

                <form @submit.prevent="handleSubmit" class="flex flex-col gap-5">
                    <UFormField label="Workspace Name" required>
                        <UInput v-model="form.name" placeholder="e.g. Computer Science Dept" class="w-full" />
                    </UFormField>

                    <UFormField label="Description">
                        <UTextarea v-model="form.description" placeholder="Short description..." class="w-full"
                            :rows="2" />
                    </UFormField>

                    <div class="grid grid-cols-2 gap-4">
                        <UFormField label="Plan">
                            <USelect v-model="form.plan" :items="planOptions" class="w-full" />
                        </UFormField>
                        <UFormField label="Color">
                            <USelect v-model="form.color" :items="colorOptions" class="w-full" />
                        </UFormField>
                    </div>

                    <UFormField label="Icon">
                        <USelect v-model="form.icon" :items="iconOptions" class="w-full" />
                    </UFormField>

                    <div class="flex items-center justify-end gap-3 mt-2">
                        <UButton label="Cancel" variant="ghost" color="neutral" @click="isOpen = false" />
                        <UButton type="submit" :label="isEdit ? 'Save Changes' : 'Create Workspace'" color="primary"
                            :disabled="!form.name" />
                    </div>
                </form>
            </div>
        </template>
    </UModal>
</template>
