<script setup lang="ts">
const { user } = useUser()

// In a real app, this would be fetched from an API
const workspace = ref({
    name: 'Personal Workspace',
    members: [
        { id: '1', name: user.value.profile.fullName, email: user.value.profile.email, role: 'Owner', avatar: user.value.profile.avatar, isOnline: true },
        { id: '2', name: 'Sarah Chen', email: 'sarah@example.com', role: 'Admin', avatar: 'https://i.pravatar.cc/150?u=sarah', isOnline: true },
        { id: '3', name: 'Mike Johnson', email: 'mike@example.com', role: 'Member', avatar: 'https://i.pravatar.cc/150?u=mike', isOnline: false }
    ],
    pendingInvites: [
        { id: 'p1', email: 'david.miller@example.com', role: 'Member', sentAt: '2 hours ago' }
    ]
})

const isInviteModalOpen = ref(false)
const inviteEmail = ref('')
const inviteRole = ref('Member')

const isConfirmRemoveModalOpen = ref(false)
const itemToRemove = ref<{ id: string, name: string, type: 'member' | 'invite' } | null>(null)

const isTransferModalOpen = ref(false)
const memberToTransferTo = ref<{ id: string, name: string } | null>(null)

const confirmRemove = (id: string, name: string, type: 'member' | 'invite') => {
    itemToRemove.value = { id, name, type }
    isConfirmRemoveModalOpen.value = true
}

const executeRemove = () => {
    if (!itemToRemove.value) return
    if (itemToRemove.value.type === 'member') {
        workspace.value.members = workspace.value.members.filter(m => m.id !== itemToRemove.value!.id)
    } else {
        workspace.value.pendingInvites = workspace.value.pendingInvites.filter(i => i.id !== itemToRemove.value!.id)
    }
    isConfirmRemoveModalOpen.value = false
    itemToRemove.value = null
}

const confirmTransfer = (id: string, name: string) => {
    memberToTransferTo.value = { id, name }
    isTransferModalOpen.value = true
}

const executeTransfer = () => {
    if (!memberToTransferTo.value) return

    const currentOwner = workspace.value.members.find(m => m.role === 'Owner')
    const nextOwner = workspace.value.members.find(m => m.id === memberToTransferTo.value!.id)

    if (currentOwner && nextOwner) {
        currentOwner.role = 'Admin'
        nextOwner.role = 'Owner'
    }

    isTransferModalOpen.value = false
    memberToTransferTo.value = null
}

const updateRole = (id: string, newRole: string) => {
    const member = workspace.value.members.find(m => m.id === id)
    if (member) member.role = newRole
}

const sendInvitation = () => {
    if (!inviteEmail.value) return
    workspace.value.pendingInvites.push({
        id: Date.now().toString(),
        email: inviteEmail.value,
        role: inviteRole.value,
        sentAt: 'Just now'
    })
    inviteEmail.value = ''
    isInviteModalOpen.value = false
}

const getMemberActions = (member: any) => [
    [
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
                    <div class="flex items-center justify-between px-2">
                        <h2 class="text-sm font-bold text-neutral-400 uppercase tracking-widest">Active Members ({{
                            workspace.members.length }})</h2>
                    </div>
                    <UCard :ui="{ body: 'p-0 sm:p-0 overflow-hidden' }">
                        <div class="divide-y divide-neutral-100 dark:divide-neutral-800">
                            <div v-for="member in workspace.members" :key="member.id"
                                class="p-4 flex items-center justify-between group hover:bg-neutral-50 dark:hover:bg-neutral-900/50 transition-colors">
                                <div class="flex items-center gap-4">
                                    <div class="relative">
                                        <UAvatar :src="member.avatar" :alt="member.name" size="md" />
                                        <div class="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white dark:border-neutral-900 shadow-sm"
                                            :class="member.isOnline ? 'bg-emerald-500' : 'bg-neutral-300 dark:bg-neutral-700'">
                                            <span v-if="member.isOnline"
                                                class="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-75"></span>
                                        </div>
                                    </div>
                                    <div class="flex flex-col">
                                        <div class="flex items-center gap-2">
                                            <span class="font-bold text-neutral-900 dark:text-neutral-100">{{
                                                member.name }}</span>
                                            <span
                                                class="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-500"
                                                v-if="!member.isOnline">Offline</span>
                                        </div>
                                        <span class="text-sm text-neutral-500">{{ member.email }}</span>
                                    </div>
                                </div>
                                <div class="flex items-center gap-4">
                                    <UBadge variant="subtle" :color="member.role === 'Owner' ? 'primary' : 'neutral'">{{
                                        member.role }}</UBadge>
                                    <UDropdownMenu v-if="member.role !== 'Owner'" :items="getMemberActions(member)"
                                        :modal="false">
                                        <UButton icon="i-lucide-more-horizontal" variant="ghost" color="neutral" />
                                    </UDropdownMenu>
                                </div>
                            </div>
                        </div>
                    </UCard>
                </div>

                <!-- Pending Invites -->
                <div v-if="workspace.pendingInvites.length > 0" class="flex flex-col gap-4">
                    <div class="flex items-center justify-between px-2">
                        <h2 class="text-sm font-bold text-neutral-400 uppercase tracking-widest">Pending Invitations
                        </h2>
                    </div>
                    <UCard :ui="{ body: 'p-0 sm:p-0 overflow-hidden' }">
                        <div class="divide-y divide-neutral-100 dark:divide-neutral-800">
                            <div v-for="invite in workspace.pendingInvites" :key="invite.id"
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
