<script setup lang="ts">
const { currentWorkspace: workspace, saveWorkspaces } = useWorkspaces()

const searchQuery = ref('')
const roleFilter = ref('All Roles')
const page = ref(1)
const itemsPerPage = 8

const filteredMembers = computed(() => {
    if (!workspace.value) return []
    let result = workspace.value.members
    if (roleFilter.value !== 'All Roles') {
        result = result.filter(m => m.role === roleFilter.value)
    }
    if (searchQuery.value) {
        const q = searchQuery.value.toLowerCase()
        result = result.filter(m => m.name.toLowerCase().includes(q) || m.email.toLowerCase().includes(q))
    }
    return result
})

const paginatedMembers = computed(() => {
    const start = (page.value - 1) * itemsPerPage
    return filteredMembers.value.slice(start, start + itemsPerPage)
})

watch([searchQuery, roleFilter], () => {
    page.value = 1
})

const isInviteModalOpen = ref(false)
const inviteEmail = ref('')
const inviteRole = ref('Member')

const isConfirmRemoveModalOpen = ref(false)
const itemToRemove = ref<{ id: string, name: string, type: 'member' | 'invite' } | null>(null)

const isTransferModalOpen = ref(false)
const memberToTransferTo = ref<{ id: string, name: string } | null>(null)

const isTokenModalOpen = ref(false)
const selectedMemberForTokens = ref<{ id: string, name: string, tokens: number } | null>(null)
const tokenAmountToGive = ref(100)

const openTokenModal = (member: any) => {
    selectedMemberForTokens.value = { 
        id: member.id, 
        name: member.name, 
        tokens: member.tokens || 0 
    }
    tokenAmountToGive.value = 100
    isTokenModalOpen.value = true
}

const executeTokenDistribution = () => {
    if (!selectedMemberForTokens.value || !workspace.value) return
    
    const member = workspace.value.members.find(m => m.id === selectedMemberForTokens.value!.id)
    if (member) {
        member.tokens = (member.tokens || 0) + tokenAmountToGive.value
        if (workspace.value.tokens !== undefined) {
            workspace.value.tokens = Math.max(0, workspace.value.tokens - tokenAmountToGive.value)
        }
        saveWorkspaces()
    }
    
    isTokenModalOpen.value = false
    selectedMemberForTokens.value = null
}

const confirmRemove = (id: string, name: string, type: 'member' | 'invite') => {
    itemToRemove.value = { id, name, type }
    isConfirmRemoveModalOpen.value = true
}

const executeRemove = () => {
    if (!itemToRemove.value || !workspace.value) return
    if (itemToRemove.value.type === 'member') {
        workspace.value.members = workspace.value.members.filter(m => m.id !== itemToRemove.value!.id)
    } else {
        workspace.value.pendingInvites = workspace.value.pendingInvites.filter(i => i.id !== itemToRemove.value!.id)
    }
    saveWorkspaces()
    isConfirmRemoveModalOpen.value = false
    itemToRemove.value = null
}

const confirmTransfer = (id: string, name: string) => {
    memberToTransferTo.value = { id, name }
    isTransferModalOpen.value = true
}

const executeTransfer = () => {
    if (!memberToTransferTo.value || !workspace.value) return

    const currentOwner = workspace.value.members.find(m => m.role === 'Owner')
    const nextOwner = workspace.value.members.find(m => m.id === memberToTransferTo.value!.id)

    if (currentOwner && nextOwner) {
        currentOwner.role = 'Admin'
        nextOwner.role = 'Owner'
        saveWorkspaces()
    }

    isTransferModalOpen.value = false
    memberToTransferTo.value = null
}

const updateRole = (id: string, newRole: 'Owner' | 'Admin' | 'Member') => {
    if (!workspace.value) return
    const member = workspace.value.members.find(m => m.id === id)
    if (member) {
        member.role = newRole
        saveWorkspaces()
    }
}

const sendInvitation = () => {
    if (!inviteEmail.value || !workspace.value) return
    workspace.value.pendingInvites.push({
        id: Date.now().toString(),
        email: inviteEmail.value,
        role: inviteRole.value as 'Admin' | 'Member',
        sentAt: 'Just now'
    })
    saveWorkspaces()
    inviteEmail.value = ''
    isInviteModalOpen.value = false
}

const getMemberActions = (member: any) => [
    [
        {
            label: 'Give Tokens',
            icon: 'i-lucide-zap',
            onSelect: () => openTokenModal(member)
        },
        {
            label: 'Change Role',
            icon: 'i-lucide-shield-check',
            children: [
                { label: 'Admin', onSelect: () => updateRole(member.id, 'Admin') },
                { label: 'Member', onSelect: () => updateRole(member.id, 'Member') }
            ]
        },
        {
            label: 'Transfer Ownership',
            icon: 'i-lucide-crown',
            color: 'warning' as const,
            onSelect: () => confirmTransfer(member.id, member.name)
        }
    ],
    [
        {
            label: 'Remove Member',
            icon: 'i-lucide-user-minus',
            color: 'error' as const,
            onSelect: () => confirmRemove(member.id, member.name, 'member')
        }
    ]
]

</script>

<template>
    <UContainer class="max-w-4xl py-12">
        <div class="flex flex-col gap-8">
            <!-- Breadcrumbs -->
            <nav class="flex items-center gap-2 text-sm text-neutral-500">
                <ULink to="/app/dashboard" class="hover:text-primary transition-colors">App</ULink>
                <UIcon name="i-lucide-chevron-right" class="w-3.5 h-3.5" />
                <ULink to="/app/workspaces/settings" class="hover:text-primary transition-colors">Workspace Settings
                </ULink>
                <UIcon name="i-lucide-chevron-right" class="w-3.5 h-3.5" />
                <span class="font-medium text-neutral-900 dark:text-neutral-100">Team Members</span>
            </nav>

            <!-- Header -->
            <header class="flex items-center justify-between gap-4">
                <div class="flex flex-col gap-1">
                    <h1 class="text-3xl font-bold tracking-tight">Team Members</h1>
                    <p class="text-neutral-500">Manage who has access to your workspace and what they can do.</p>
                </div>
                <UButton icon="i-lucide-plus" label="Invite Member" color="primary" @click="isInviteModalOpen = true" />
            </header>

            <!-- Members List -->
            <div class="flex flex-col gap-6">
                <!-- Active Members -->
                <div class="flex flex-col gap-4">
                    <div class="flex items-center justify-between px-2 gap-4">
                        <h2 class="text-sm font-bold text-neutral-400 uppercase tracking-widest whitespace-nowrap hidden sm:block">
                            Active Members ({{ filteredMembers.length }})
                        </h2>
                        <div class="flex items-center gap-2 flex-1 sm:flex-none justify-end -mr-2">
                            <USelect v-model="roleFilter" :items="['All Roles', 'Owner', 'Admin', 'Member']" size="lg" class="w-32" />
                            <UInput v-model="searchQuery" icon="i-lucide-search" placeholder="Search members..." size="lg"
                                class="w-full sm:w-64" />
                        </div>
                    </div>
                    <UCard :ui="{ body: 'p-0 sm:p-0 overflow-hidden' }">
                        <div class="divide-y divide-neutral-100 dark:divide-neutral-800">
                            <div v-for="member in paginatedMembers" :key="member.id"
                                class="p-4 flex items-center justify-between group hover:bg-neutral-50 dark:hover:bg-neutral-900/50 transition-colors">
                                <div class="flex items-center gap-4">
                                    <div class="relative">
                                        <UAvatar :src="member.avatar" :alt="member.name" size="md" />
                                        <div class="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white dark:border-neutral-900 shadow-sm"
                                            :class="member.status === 'online' ? 'bg-emerald-500' : 'bg-neutral-300 dark:bg-neutral-700'">
                                            <span v-if="member.status === 'online'"
                                                class="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-75"></span>
                                        </div>
                                    </div>
                                    <div class="flex flex-col">
                                        <div class="flex items-center gap-2">
                                            <span class="font-bold text-neutral-900 dark:text-neutral-100">{{
                                                member.name }}</span>
                                            <span
                                                class="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-500"
                                                v-if="member.status !== 'online'">Offline</span>
                                        </div>
                                        <span class="text-sm text-neutral-500">{{ member.email }}</span>
                                    </div>
                                </div>
                                <div class="flex items-center gap-4">
                                    <div v-if="member.tokens" class="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-amber-50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-400 border border-amber-100 dark:border-amber-900/50">
                                        <UIcon name="i-lucide-zap" class="w-3.5 h-3.5" />
                                        <span class="text-xs font-bold">{{ member.tokens }}</span>
                                    </div>
                                    <UBadge variant="subtle" :color="member.role === 'Owner' ? 'primary' : 'neutral'">{{
                                        member.role }}</UBadge>
                                    <UDropdownMenu v-if="member.role !== 'Owner'" :items="getMemberActions(member)"
                                        :modal="false">
                                        <UButton icon="i-lucide-more-horizontal" variant="ghost" color="neutral" />
                                    </UDropdownMenu>
                                </div>
                            </div>
                        </div>

                        <div v-if="filteredMembers.length === 0" class="p-8 flex flex-col items-center justify-center text-center">
                            <div class="w-12 h-12 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mb-3">
                                <UIcon name="i-lucide-users" class="text-2xl text-neutral-400" />
                            </div>
                            <p class="text-neutral-900 dark:text-neutral-100 font-medium mb-1">
                                {{ (workspace?.members?.length ?? 0) === 0 ? 'No members yet' : 'No members found' }}
                            </p>
                            <p class="text-sm text-neutral-500">
                                {{ (workspace?.members?.length ?? 0) === 0 ? 'Invite someone to join this workspace.' : `No members matching "${searchQuery}" or selected role.` }}
                            </p>
                            <UButton v-if="(workspace?.members?.length ?? 0) === 0" icon="i-lucide-plus" label="Invite Member" color="primary" class="mt-4" @click="isInviteModalOpen = true" />
                        </div>

                        <div v-if="filteredMembers.length > itemsPerPage"
                            class="p-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
                            <span class="text-sm text-neutral-500 hidden sm:inline">
                                Showing {{ (page - 1) * itemsPerPage + 1 }} to {{ Math.min(page * itemsPerPage,
                                    filteredMembers.length) }} of {{ filteredMembers.length }}
                            </span>
                            <div class="flex-1 sm:flex-none flex justify-center sm:justify-end">
                                <UPagination :page="page" @update:page="(p) => page = p" :items-per-page="itemsPerPage"
                                    :total="filteredMembers.length" :show-controls="true" show-edges size="md"
                                    variant="soft" />
                            </div>
                        </div>
                    </UCard>
                </div>

                <!-- Pending Invites -->
                <div class="flex flex-col gap-4">
                    <div class="flex items-center justify-between px-2">
                        <h2 class="text-sm font-bold text-neutral-400 uppercase tracking-widest">Pending Invitations
                        </h2>
                    </div>
                    <UCard :ui="{ body: 'p-0 sm:p-0 overflow-hidden' }">
                        <div v-if="(workspace?.pendingInvites?.length ?? 0) > 0" class="divide-y divide-neutral-100 dark:divide-neutral-800">
                            <div v-for="invite in workspace?.pendingInvites" :key="invite.id"
                                class="p-4 flex items-center justify-between group hover:bg-neutral-50 dark:hover:bg-neutral-900/50 transition-colors">
                                <div class="flex items-center gap-4">
                                    <div
                                        class="w-10 h-10 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-500">
                                        <UIcon name="i-lucide-mail" class="text-xl" />
                                    </div>
                                    <div class="flex flex-col">
                                        <span class="font-bold text-neutral-900 dark:text-neutral-100">{{ invite.email
                                            }}</span>
                                        <span class="text-sm text-neutral-500">Sent {{ invite.sentAt }}</span>
                                    </div>
                                </div>
                                <div class="flex items-center gap-4">
                                    <UBadge variant="subtle" color="warning">Pending {{ invite.role }}</UBadge>
                                    <UButton icon="i-lucide-x" variant="ghost" color="error" size="sm"
                                        @click="confirmRemove(invite.id, invite.email, 'invite')" />
                                </div>
                            </div>
                        </div>

                        <div v-else class="p-8 flex flex-col items-center justify-center text-center text-neutral-500">
                            <div class="w-10 h-10 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mb-3">
                                <UIcon name="i-lucide-mail-open" class="text-xl text-neutral-400" />
                            </div>
                            <p class="text-neutral-900 dark:text-neutral-100 font-medium mb-1">No pending invitations</p>
                            <p class="text-sm">Invitations you send will appear here until they are accepted.</p>
                        </div>
                    </UCard>
                </div>
            </div>
        </div>

        <!-- Modals (Invite, Transfer, Removal) -->
        <UModal v-model:open="isInviteModalOpen">
            <template #content>
                <div class="p-6 flex flex-col gap-6">
                    <div class="flex flex-col gap-1">
                        <h3 class="text-lg font-bold">Invite to Workspace</h3>
                        <p class="text-sm text-neutral-500">Add members to collaborate on this workspace.</p>
                    </div>
                    <div class="flex flex-col gap-4">
                        <UFormField label="Email Address">
                            <UInput v-model="inviteEmail" placeholder="colleague@example.com" class="w-full" />
                        </UFormField>
                        <UFormField label="Role">
                            <USelect v-model="inviteRole" :items="['Admin', 'Member']" class="w-full" />
                        </UFormField>
                    </div>
                    <div class="flex items-center justify-end gap-3">
                        <UButton label="Cancel" variant="ghost" color="neutral" @click="isInviteModalOpen = false" />
                        <UButton label="Send Invitation" color="primary" @click="sendInvitation" />
                    </div>
                </div>
            </template>
        </UModal>

        <UModal v-model:open="isTransferModalOpen">
            <template #content>
                <div class="p-6 flex flex-col gap-6">
                    <div class="flex items-center gap-4 text-warning-600">
                        <div
                            class="w-12 h-12 rounded-full bg-warning-50 dark:bg-warning-950/30 flex items-center justify-center">
                            <UIcon name="i-lucide-crown" class="text-2xl" />
                        </div>
                        <h3 class="text-xl font-bold">Transfer Ownership?</h3>
                    </div>
                    <p class="text-neutral-500">
                        You are about to transfer ownership of this workspace to <strong>"{{ memberToTransferTo?.name
                            }}"</strong>.
                        <br><br>
                        You will become an **Admin** and will no longer have full control over billing.
                    </p>
                    <div class="flex items-center justify-end gap-3">
                        <UButton label="Cancel" variant="ghost" color="neutral" @click="isTransferModalOpen = false" />
                        <UButton label="Transfer Ownership" color="warning" @click="executeTransfer" />
                    </div>
                </div>
            </template>
        </UModal>

        <UModal v-model:open="isTokenModalOpen">
            <template #content>
                <div class="p-6 flex flex-col gap-6">
                    <div class="flex items-center gap-4">
                        <div class="w-12 h-12 rounded-full bg-amber-50 dark:bg-amber-950/30 flex items-center justify-center">
                            <UIcon name="i-lucide-zap" class="text-2xl text-amber-600" />
                        </div>
                        <div class="flex flex-col gap-1">
                            <h3 class="text-xl font-bold">Distribute Tokens</h3>
                            <p class="text-sm text-neutral-500">Give AI tokens to <strong>{{ selectedMemberForTokens?.name }}</strong></p>
                        </div>
                    </div>

                    <div class="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
                        <div class="flex flex-col gap-0.5">
                            <span class="text-xs text-neutral-500 uppercase font-bold tracking-wider">Workspace Balance</span>
                            <div class="flex items-center gap-1.5">
                                <UIcon name="i-lucide-zap" class="w-4 h-4 text-amber-500" />
                                <span class="text-lg font-bold">{{ workspace?.tokens }} tokens</span>
                            </div>
                        </div>
                        <div class="w-px h-8 bg-neutral-200 dark:bg-neutral-800" />
                        <div class="flex flex-col gap-0.5 items-end">
                            <span class="text-xs text-neutral-500 uppercase font-bold tracking-wider">Member's Current</span>
                            <span class="text-lg font-bold">{{ selectedMemberForTokens?.tokens }} tokens</span>
                        </div>
                    </div>

                    <div class="flex flex-col gap-3">
                        <label class="text-sm font-bold text-neutral-700 dark:text-neutral-300 px-1">Amount to Give</label>
                        <UInput v-model="tokenAmountToGive" type="number" size="xl" class="w-full"
                            placeholder="e.g. 500" icon="i-lucide-zap" />
                        <div class="flex flex-wrap gap-2 mt-1">
                            <UButton v-for="amount in [100, 500, 1000, 5000]" :key="amount" 
                                :label="`+${amount}`" variant="soft" color="neutral" size="xs"
                                @click="tokenAmountToGive = (tokenAmountToGive || 0) + amount" />
                        </div>
                    </div>

                    <div class="flex items-center justify-end gap-3 pt-2">
                        <UButton label="Cancel" variant="ghost" color="neutral" @click="isTokenModalOpen = false" />
                        <UButton label="Distribute Tokens" color="primary" icon="i-lucide-send"
                            :disabled="!tokenAmountToGive || tokenAmountToGive > (workspace?.tokens || 0)"
                            @click="executeTokenDistribution" />
                    </div>
                </div>
            </template>
        </UModal>

        <UModal v-model:open="isConfirmRemoveModalOpen">
            <template #content>
                <div class="p-6 flex flex-col gap-6">
                    <div class="flex items-center gap-4 text-error-600">
                        <div
                            class="w-12 h-12 rounded-full bg-error-50 dark:bg-error-950/30 flex items-center justify-center">
                            <UIcon :name="itemToRemove?.type === 'member' ? 'i-lucide-user-minus' : 'i-lucide-mail-x'"
                                class="text-2xl" />
                        </div>
                        <h3 class="text-xl font-bold">{{ itemToRemove?.type === 'member' ? 'Remove Member?'
                            : 'Cancel Invitation?' }}</h3>
                    </div>
                    <p class="text-neutral-500">
                        Are you sure you want to {{ itemToRemove?.type === 'member' ? 'remove'
                            : 'cancel the invitation for' }}
                        <strong>"{{ itemToRemove?.name }}"</strong>?
                    </p>
                    <div class="flex items-center justify-end gap-3">
                        <UButton label="Go Back" variant="ghost" color="neutral"
                            @click="isConfirmRemoveModalOpen = false" />
                        <UButton :label="itemToRemove?.type === 'member' ? 'Remove Member' : 'Cancel Invite'"
                            color="error" @click="executeRemove" />
                    </div>
                </div>
            </template>
        </UModal>
    </UContainer>
</template>
