<script setup lang="ts">
const isOpen = defineModel<boolean>('open', { default: false })
const workspaceStore = useWorkspaceStore()
const workspace = computed(() => workspaceStore.currentWorkspace)

import type { DropdownMenuItem } from '@nuxt/ui'

const items = ref<DropdownMenuItem[]>([
    {
        label: 'Approve',
        icon: 'i-lucide-check',
        color: 'success'
    },
    {
        label: 'Reject',
        icon: 'i-lucide-x',
        color: 'error'
    }
])

const mappedMembers = computed(() => {
    return workspace.value?.members?.map((m: any, i) => ({
        ...m,
        isPending: m.isPending !== undefined ? m.isPending : (i % 5 === 0),
        isApproved: m.isApproved !== undefined ? m.isApproved : (i % 5 === 1 || i % 5 === 2 || i % 5 === 4),
        isRejected: m.isRejected !== undefined ? m.isRejected : (i % 5 === 3)
    })) || []
})

const pendingMembers = computed(() => mappedMembers.value.filter((r: any) => r.isPending === true))
const approvedMembers = computed(() => mappedMembers.value.filter((r: any) => r.isApproved === true))
const rejectedMembers = computed(() => mappedMembers.value.filter((r: any) => r.isRejected === true))

const tabItems = computed(() => [
    {
        label: 'Pending',
        slot: 'pending',
        badge: {
            label: String(pendingMembers.value.length),
            color: 'warning' as const,
            variant: 'soft' as const
        }
    },
    {
        label: 'Approved',
        slot: 'approved',
        badge: {
            label: String(approvedMembers.value.length),
            color: 'success' as const,
            variant: 'soft' as const
        }
    },
    {
        label: 'Rejected',
        slot: 'rejected',
        badge: {
            label: String(rejectedMembers.value.length),
            color: 'error' as const,
            variant: 'soft' as const
        }
    }
])

const isMemberModalOpen = ref(false)
const selectedMember = ref<any>(null)

const openMemberDetails = (member: any) => {
    selectedMember.value = member
    isMemberModalOpen.value = true
}
</script>
<template>
    <USlideover v-model:open="isOpen" title="Enrollment List" description="Manage enrollment requests" class="min-w-xl"
        :ui="{ body: 'p-0 sm:p-0' }">
        <!-- enrollment list -->
        <template #body>
            <UTabs :items="tabItems" variant="link" size="sm" :ui="{
                root: 'gap-0',
                content: 'p-4 sm:p-6'
            }">
                <template #pending="{ item }">
                    <UCard
                        :ui="{ body: 'p-0 sm:p-0 overflow-hidden', root: 'shadow-sm border-neutral-200 dark:border-neutral-800' }">
                        <div class="divide-y divide-neutral-100 dark:divide-neutral-800">
                            <div v-for="member in pendingMembers" :key="member.id"
                                class="flex items-center justify-between p-4 hover:bg-neutral-50 dark:hover:bg-neutral-900/50 transition-colors">
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
                                <div class="flex items-center gap-2">
                                    <!-- Create a button that opens a modal to view the member's profile.  -->
                                    <!-- <UButton icon="i-lucide-eye" color="neutral" variant="ghost" size="xs"
                                        @click="openMemberDetails(member)" /> -->

                                    <UDropdownMenu :items="items" :content="{
                                        align: 'end',
                                        side: 'bottom',
                                        sideOffset: 8
                                    }">
                                        <UButton icon="i-lucide-ellipsis" color="neutral" variant="ghost" size="xs" />
                                    </UDropdownMenu>
                                </div>
                            </div>
                        </div>
                    </UCard>
                </template>
                <template #approved="{ item }">
                    <UCard
                        :ui="{ body: 'p-0 sm:p-0 overflow-hidden', root: 'shadow-sm border-neutral-200 dark:border-neutral-800' }">
                        <div class="divide-y divide-neutral-100 dark:divide-neutral-800">
                            <div v-for="member in approvedMembers" :key="member.id"
                                class="flex items-center justify-between p-4 hover:bg-neutral-50 dark:hover:bg-neutral-900/50 transition-colors">
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
                                <UBadge color="emerald" variant="subtle">Approved</UBadge>
                            </div>
                        </div>
                    </UCard>
                </template>
                <template #rejected="{ item }">
                    <UCard
                        :ui="{ body: 'p-0 sm:p-0 overflow-hidden', root: 'shadow-sm border-neutral-200 dark:border-neutral-800' }">
                        <div class="divide-y divide-neutral-100 dark:divide-neutral-800">
                            <div v-for="member in rejectedMembers" :key="member.id"
                                class="flex items-center justify-between p-4 hover:bg-neutral-50 dark:hover:bg-neutral-900/50 transition-colors opacity-75">
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
                                <UBadge color="error" variant="subtle">Rejected</UBadge>
                            </div>
                        </div>
                    </UCard>
                </template>
            </UTabs>
        </template>
    </USlideover>



    <!-- Premium Member Detail Modal -->
    <UModal v-model:open="isMemberModalOpen" class="w-full max-w-xl">
        <template #content v-if="selectedMember">
            <div
                class="relative pb-6 bg-gradient-to-r from-blue-500/20 via-indigo-500/20 to-purple-500/20 bg-transparent flex flex-col items-center">

                <div class="relative mt-8 z-10">
                    <UAvatar :src="selectedMember.avatar" :alt="selectedMember.name" size="3xl"
                        class="ring-4 ring-white dark:ring-neutral-900 shadow-xl" />
                    <div class="absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-4 border-white dark:border-neutral-900 shadow-sm"
                        :class="selectedMember.status === 'online' ? 'bg-emerald-500' : 'bg-neutral-300 dark:bg-neutral-700'">
                        <span v-if="selectedMember.status === 'online'"
                            class="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-75"></span>
                    </div>
                </div>

                <div class="mt-4 text-center z-10">
                    <h3 class="text-xl font-bold tracking-tight text-neutral-900 dark:text-white">{{ selectedMember.name
                    }}</h3>
                    <p class="text-sm text-neutral-500 dark:text-neutral-400 mt-1">{{ selectedMember.email }}</p>
                </div>

                <div class="mt-4 flex items-center justify-center gap-2 z-10">
                    <UBadge color="primary" variant="subtle" size="sm" class="rounded-full px-3">Pro Plan</UBadge>
                    <UBadge color="neutral" variant="subtle" size="sm" class="rounded-full px-3">14 Courses Completed
                    </UBadge>
                </div>
            </div>

            <div class="p-6 space-y-6">
                <!-- Details Section -->
                <div>
                    <h4
                        class="text-[11px] font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mb-3 ml-1">
                        Enrollment Request</h4>
                    <div
                        class="bg-neutral-50 dark:bg-neutral-900/50 p-4 rounded-xl border border-neutral-100 dark:border-neutral-800 space-y-3">
                        <div class="flex justify-between items-center">
                            <span class="text-sm text-neutral-500 dark:text-neutral-400">Course</span>
                            <span class="text-sm font-medium text-neutral-900 dark:text-white">Advanced UI/UX
                                Design</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <span class="text-sm text-neutral-500 dark:text-neutral-400">Request Date</span>
                            <span class="text-sm font-medium text-neutral-900 dark:text-white">Today at 10:42 AM</span>
                        </div>
                        <div
                            class="flex justify-between items-start pt-2 mt-2 border-t border-neutral-200 dark:border-neutral-800">
                            <span class="text-sm text-neutral-500 dark:text-neutral-400">Message</span>
                            <span
                                class="text-sm font-medium text-neutral-900 dark:text-white text-right max-w-[200px]">I
                                would love to join this course to improve my frontend skills!</span>
                        </div>
                    </div>
                </div>

                <!-- Action Buttons -->
                <div class="flex items-center gap-3 pt-2">
                    <UButton icon="i-lucide-check" color="emerald" size="lg"
                        class="flex-1 justify-center rounded-xl font-semibold shadow-sm hover:shadow-md transition-all"
                        label="Approve Enrollment" @click="isMemberModalOpen = false" />
                    <UButton icon="i-lucide-x" color="error" variant="soft" size="lg"
                        class="flex-1 justify-center rounded-xl font-semibold" label="Reject"
                        @click="isMemberModalOpen = false" />
                </div>
            </div>
        </template>
    </UModal>
</template>
