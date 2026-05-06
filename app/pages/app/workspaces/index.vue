<script setup lang="ts">
const { workspaces, currentWorkspaceId, saveWorkspaces } = useWorkspaces()

const switchWorkspace = (id: string) => {
    currentWorkspaceId.value = id
    saveWorkspaces()
    
    const ws = workspaces.value.find(w => w.id === id)
    if (ws) {
        const role = getMyRole(ws)
        if (role === 'Member') {
            navigateTo('/app/dashboard')
        } else {
            navigateTo({
                path: '/app/workspaces/settings',
                query: { from: 'manage' }
            })
        }
    }
}

// Filter workspaces where the current user is an Owner or Admin
const manageableWorkspaces = computed(() => workspaces.value.filter(ws => {
    const me = ws.members.find(m => m.id === '1')
    return me && (me.role === 'Owner' || me.role === 'Admin')
}))

// Filter workspaces where the current user is just a Member
const joinedWorkspaces = computed(() => workspaces.value.filter(ws => {
    const me = ws.members.find(m => m.id === '1')
    return me && me.role === 'Member'
}))

const pendingInvitations = ref([
    {
        id: 'inv_1',
        workspaceName: 'Acme Marketing',
        invitedBy: 'Alice Freeman',
        role: 'Member',
        sentAt: '1 day ago'
    }
])

const acceptInvitation = (id: string) => {
    pendingInvitations.value = pendingInvitations.value.filter(inv => inv.id !== id)
    // Add logic to join workspace
}

const declineInvitation = (id: string) => {
    pendingInvitations.value = pendingInvitations.value.filter(inv => inv.id !== id)
}

const getMyRole = (ws: any) => {
    const me = ws.members.find((m: any) => m.id === '1')
    return me ? me.role : 'Member'
}
</script>

<template>
    <UContainer class="py-12">
        <div class="flex flex-col gap-10">
            <!-- Breadcrumbs -->
            <nav class="flex items-center gap-2 text-sm text-neutral-500 -mb-6">
                <ULink to="/app/dashboard" class="hover:text-primary transition-colors">App</ULink>
                <UIcon name="i-lucide-chevron-right" class="w-3.5 h-3.5" />
                <span class="font-medium text-neutral-900 dark:text-neutral-100">Manage Workspaces</span>
            </nav>

            <!-- Header -->
            <header class="flex items-center justify-between gap-4">
                <div class="flex flex-col gap-1">
                    <h1 class="text-3xl font-extrabold tracking-tight">Manage Workspaces</h1>
                    <p class="text-neutral-500 text-lg">Overview of all organizations and teams you are a part of.</p>
                </div>
                <UButton icon="i-lucide-plus" label="New Workspace" color="primary" size="lg"
                    to="/app/workspaces/new" />
            </header>

            <!-- Pending Invitations Section -->
            <div v-if="pendingInvitations.length > 0" class="flex flex-col gap-4">
                <div class="flex items-center gap-2 px-1">
                    <UIcon name="i-lucide-mailbox" class="text-primary-500 text-xl" />
                    <h2 class="text-sm font-bold uppercase tracking-widest text-neutral-500">Pending Invitations ({{
                        pendingInvitations.length }})</h2>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <UCard v-for="inv in pendingInvitations" :key="inv.id"
                        :ui="{ root: 'bg-primary-50/30 border-primary-100 dark:bg-primary-950/10 dark:border-primary-900/30' }">
                        <div class="flex items-center justify-between gap-4">
                            <div class="flex items-center gap-4">
                                <div
                                    class="w-12 h-12 rounded-xl bg-primary-500/10 text-primary-500 flex items-center justify-center border border-primary-500/20">
                                    <UIcon name="i-lucide-building-2" class="text-2xl" />
                                </div>
                                <div class="flex flex-col">
                                    <span class="font-bold text-neutral-900 dark:text-neutral-100">{{ inv.workspaceName
                                    }}</span>
                                    <span class="text-sm text-neutral-500">Invited by {{ inv.invitedBy }} • {{
                                        inv.sentAt }}</span>
                                </div>
                            </div>
                            <div class="flex items-center gap-2">
                                <UButton label="Decline" variant="ghost" color="neutral" size="sm"
                                    @click="declineInvitation(inv.id)" />
                                <UButton label="Accept" color="primary" size="sm" @click="acceptInvitation(inv.id)" />
                            </div>
                        </div>
                    </UCard>
                </div>
            </div>

            <!-- All Workspaces Grid -->
            <div class="flex flex-col gap-6">
                <div class="flex items-center justify-between px-1">
                    <h2 class="text-sm font-bold uppercase tracking-widest text-neutral-500">Manageable Workspaces ({{
                        manageableWorkspaces.length }})</h2>
                    <div class="flex items-center gap-2">
                        <UInput icon="i-lucide-search" placeholder="Search workspaces..." size="sm" class="w-64" />
                    </div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <UCard v-for="ws in manageableWorkspaces" :key="ws.id"
                        class="group hover:ring-2 hover:ring-primary-500/50 transition-all duration-300 shadow-sm hover:shadow-xl cursor-pointer"
                        @click="switchWorkspace(ws.id)">
                        <div class="flex flex-col gap-6 p-1">
                            <!-- Top Info -->
                            <div class="flex items-start justify-between gap-4">
                                <div class="flex items-center gap-4">
                                    <div
                                        class="w-14 h-14 rounded-2xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center border border-neutral-200 dark:border-neutral-700 group-hover:bg-primary-500/10 group-hover:border-primary-500/20 group-hover:text-primary-500 transition-colors">
                                        <UIcon :name="ws.icon" class="text-3xl" />
                                    </div>
                                    <div class="flex flex-col text-left">
                                        <span class="font-bold text-xl text-neutral-900 dark:text-neutral-100 line-clamp-1">{{ ws.name }}</span>
                                        <div class="flex items-center gap-2">
                                            <UBadge variant="subtle" size="sm" :color="getMyRole(ws) === 'Owner' ? 'primary' : 'neutral'">{{ getMyRole(ws) }}</UBadge>
                                            <span class="text-xs text-neutral-500">{{ ws.lastActive }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Stats -->
                            <div class="grid grid-cols-3 gap-4 p-3 rounded-xl bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-100 dark:border-neutral-800">
                                <div class="flex flex-col items-center gap-0.5">
                                    <span class="text-lg font-bold text-neutral-900 dark:text-neutral-100">{{ ws.members.length }}</span>
                                    <span class="text-[10px] uppercase font-bold text-neutral-500 tracking-wider">Members</span>
                                </div>
                                <div class="flex flex-col items-center gap-0.5 border-x border-neutral-200 dark:border-neutral-800">
                                    <span class="text-lg font-bold text-neutral-900 dark:text-neutral-100">{{ (ws as any).lessons || 0 }}</span>
                                    <span class="text-[10px] uppercase font-bold text-neutral-500 tracking-wider">Lessons</span>
                                </div>
                                <div class="flex flex-col items-center gap-0.5">
                                    <span class="text-lg font-bold text-neutral-900 dark:text-neutral-100">{{ ws.plan }}</span>
                                    <span class="text-[10px] uppercase font-bold text-neutral-500 tracking-wider">Plan</span>
                                </div>
                            </div>

                            <!-- Footer Action -->
                            <div class="flex items-center justify-between pt-2">
                                <div class="flex -space-x-2">
                                    <UAvatar v-for="m in ws.members.slice(0, 3)" :key="m.id" :src="m.avatar || `https://i.pravatar.cc/100?u=${m.id}`" size="xs" class="ring-2 ring-white dark:ring-neutral-900" />
                                    <div v-if="ws.members.length > 3" class="w-6 h-6 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-[10px] font-bold text-neutral-500 ring-2 ring-white dark:ring-neutral-900">
                                        +{{ ws.members.length - 3 }}
                                    </div>
                                </div>
                                <UButton label="Workspace Settings" variant="link" color="primary" icon-right="i-lucide-arrow-right" size="sm" class="p-0" />
                            </div>
                        </div>
                    </UCard>
                </div>
            </div>

            <!-- Joined Workspaces Grid -->
            <div v-if="joinedWorkspaces.length > 0" class="flex flex-col gap-6">
                <div class="flex items-center justify-between px-1">
                    <h2 class="text-sm font-bold uppercase tracking-widest text-neutral-500">Joined Workspaces ({{
                        joinedWorkspaces.length }})</h2>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <UCard v-for="ws in joinedWorkspaces" :key="ws.id"
                        class="group hover:ring-2 hover:ring-primary-500/50 transition-all duration-300 shadow-sm hover:shadow-xl cursor-pointer"
                        @click="switchWorkspace(ws.id)">
                        <div class="flex flex-col gap-6 p-1">
                            <!-- Top Info -->
                            <div class="flex items-start justify-between gap-4">
                                <div class="flex items-center gap-4">
                                    <div
                                        class="w-14 h-14 rounded-2xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center border border-neutral-200 dark:border-neutral-700 group-hover:bg-primary-500/10 group-hover:border-primary-500/20 group-hover:text-primary-500 transition-colors">
                                        <UIcon :name="ws.icon" class="text-3xl" />
                                    </div>
                                    <div class="flex flex-col text-left">
                                        <span class="font-bold text-xl text-neutral-900 dark:text-neutral-100 line-clamp-1">{{ ws.name }}</span>
                                        <div class="flex items-center gap-2">
                                            <UBadge variant="subtle" size="sm" :color="getMyRole(ws) === 'Owner' ? 'primary' : 'neutral'">{{ getMyRole(ws) }}</UBadge>
                                            <span class="text-xs text-neutral-500">{{ ws.lastActive }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Stats -->
                            <div class="grid grid-cols-3 gap-4 p-3 rounded-xl bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-100 dark:border-neutral-800">
                                <div class="flex flex-col items-center gap-0.5">
                                    <span class="text-lg font-bold text-neutral-900 dark:text-neutral-100">{{ ws.members.length }}</span>
                                    <span class="text-[10px] uppercase font-bold text-neutral-500 tracking-wider">Members</span>
                                </div>
                                <div class="flex flex-col items-center gap-0.5 border-x border-neutral-200 dark:border-neutral-800">
                                    <span class="text-lg font-bold text-neutral-900 dark:text-neutral-100">{{ (ws as any).lessons || 0 }}</span>
                                    <span class="text-[10px] uppercase font-bold text-neutral-500 tracking-wider">Lessons</span>
                                </div>
                                <div class="flex flex-col items-center gap-0.5">
                                    <span class="text-lg font-bold text-neutral-900 dark:text-neutral-100">{{ ws.plan }}</span>
                                    <span class="text-[10px] uppercase font-bold text-neutral-500 tracking-wider">Plan</span>
                                </div>
                            </div>

                            <!-- Footer Action -->
                            <div class="flex items-center justify-between pt-2">
                                <div class="flex -space-x-2">
                                    <UAvatar v-for="m in ws.members.slice(0, 3)" :key="m.id" :src="m.avatar || `https://i.pravatar.cc/100?u=${m.id}`" size="xs" class="ring-2 ring-white dark:ring-neutral-900" />
                                    <div v-if="ws.members.length > 3" class="w-6 h-6 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-[10px] font-bold text-neutral-500 ring-2 ring-white dark:ring-neutral-900">
                                        +{{ ws.members.length - 3 }}
                                    </div>
                                </div>
                                <UButton label="View Workspace" variant="link" color="primary" icon-right="i-lucide-arrow-right" size="sm" class="p-0" />
                            </div>
                        </div>
                    </UCard>
                </div>
            </div>
        </div>
    </UContainer>
</template>
