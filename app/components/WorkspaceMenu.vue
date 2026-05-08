<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'

const { workspaces, currentWorkspaceId, saveWorkspaces } = useWorkspaces()
const { organizations } = useOrganizations()

const currentWorkspace = computed(() => workspaces.value.find(w => w.id === currentWorkspaceId.value) || workspaces.value[0])

const workspaceOrganization = computed(() => {
    if (!currentWorkspace.value?.organizationId) return null
    return organizations.value.find(org => org.id === currentWorkspace.value?.organizationId) || null
})

const switchWorkspace = (id: string) => {
    currentWorkspaceId.value = id
    saveWorkspaces()

    const ws = workspaces.value.find(w => w.id === id)
    if (ws) {
        const role = getMyRole(ws)
        if (role === 'Member') {
            navigateTo('/app/dashboard')
        }
    }
}

const getMyRole = (ws: any) => {
    const me = ws.members.find((m: any) => m.id === '1')
    return me ? me.role : 'Member'
}

const items = computed<DropdownMenuItem[][]>(() => [
    workspaces.value.map(ws => ({
        label: ws.name,
        icon: ws.icon,
        description: getMyRole(ws),
        onSelect: (e: Event) => {
            e.preventDefault()
            switchWorkspace(ws.id)
        },
        checked: currentWorkspaceId.value === ws.id,
        type: 'checkbox'
    })),
    [
        {
            label: 'Create Workspace',
            icon: 'i-lucide-plus',
            to: '/app/workspaces/new'
        },
        ...(getMyRole(currentWorkspace.value) === 'Owner' || getMyRole(currentWorkspace.value) === 'Admin' ? [{
            label: 'Workspace Settings',
            icon: 'i-lucide-settings-2',
            to: '/app/workspaces/settings'
        }] : [])
    ],
    [
        {
            label: 'Manage Workspaces',
            icon: 'i-lucide-folder-cog',
            to: '/app/workspaces'
        }
    ]
])
</script>

<template>
    <UDropdownMenu :items="items" :modal="false" :content="{ align: 'start', sideOffset: 8 }" :ui="{ content: 'w-56' }">
        <UButton color="neutral" variant="ghost"
            class="group flex items-center gap-2.5 px-2 py-1.5 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-all duration-200">
            <div
                class="flex items-center justify-center w-7 h-7 rounded-md bg-primary-500/10 text-primary-500 group-hover:bg-primary-500 group-hover:text-white transition-all duration-300">
                <UIcon :name="currentWorkspace?.icon" class="w-4 h-4" />
            </div>
            <div class="flex flex-col items-start leading-tight hidden sm:flex">
                <span v-if="workspaceOrganization" class="text-[9px] text-primary-500 font-bold uppercase tracking-tight">
                    {{ workspaceOrganization.name }}
                </span>
                <span class="text-[13px] font-semibold truncate max-w-[100px]">
                    {{ currentWorkspace?.name }}
                </span>
                <span class="text-[10px] text-neutral-500 font-medium">
                    {{ getMyRole(currentWorkspace) }}
                </span>
            </div>
            <UIcon name="i-lucide-chevrons-up-down"
                class="w-3.5 h-3.5 text-neutral-400 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors" />
        </UButton>
    </UDropdownMenu>
</template>
