<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const courseStore = useCourseStore()
const workspaceStore = useWorkspaceStore()
const toast = useToast()

const courseId = route.params.courseId as string
const course = computed(() => courseStore.getCourseBySlugOrId(courseId))
const workspace = computed(() => workspaceStore.currentWorkspace)

// Redirect if course is not published
watchEffect(() => {
    if (course.value && !course.value.isPublished) {
        router.replace(`/app/courses/${courseId}/settings`)
    }
})

// Map members with enrollment statuses
const mappedMembers = computed(() => {
    return workspace.value?.members?.map((m: any, i: number) => ({
        ...m,
        isPending: m.isPending !== undefined ? m.isPending : (i % 5 === 0),
        isApproved: m.isApproved !== undefined ? m.isApproved : (i % 5 === 1 || i % 5 === 2 || i % 5 === 4),
        isRejected: m.isRejected !== undefined ? m.isRejected : (i % 5 === 3),
        enrolledAt: m.enrolledAt || `${Math.floor(Math.random() * 12) + 1}h ago`,
        message: m.message || 'I would love to join this course to improve my skills!'
    })) || []
})

const pendingMembers = computed(() => mappedMembers.value.filter((r: any) => r.isPending === true))
const approvedMembers = computed(() => mappedMembers.value.filter((r: any) => r.isApproved === true))
const rejectedMembers = computed(() => mappedMembers.value.filter((r: any) => r.isRejected === true))

const activeTab = ref('pending')

const tabItems = computed(() => [
    {
        label: 'Pending',
        value: 'pending',
        badge: {
            label: String(pendingMembers.value.length),
            color: 'warning' as const,
            variant: 'soft' as const
        }
    },
    {
        label: 'Approved',
        value: 'approved',
        badge: {
            label: String(approvedMembers.value.length),
            color: 'success' as const,
            variant: 'soft' as const
        }
    },
    {
        label: 'Rejected',
        value: 'rejected',
        badge: {
            label: String(rejectedMembers.value.length),
            color: 'error' as const,
            variant: 'soft' as const
        }
    }
])

const currentList = computed(() => {
    if (activeTab.value === 'pending') return pendingMembers.value
    if (activeTab.value === 'approved') return approvedMembers.value
    return rejectedMembers.value
})

// Search
const search = ref('')
const filteredList = computed(() =>
    currentList.value.filter((m: any) =>
        m.name?.toLowerCase().includes(search.value.toLowerCase()) ||
        m.email?.toLowerCase().includes(search.value.toLowerCase())
    )
)

// Member detail panel
const selectedMember = ref<any>(null)
const selectMember = (member: any) => {
    selectedMember.value = member
}

const approveMember = (member: any) => {
    toast.add({ title: `${member.name} approved`, color: 'success', icon: 'i-lucide-check' })
    selectedMember.value = null
}

const rejectMember = (member: any) => {
    toast.add({ title: `${member.name} rejected`, color: 'error', icon: 'i-lucide-x' })
    selectedMember.value = null
}
</script>

<template>
    <UContainer class="max-w-7xl py-6" v-if="course">
        <div class="flex flex-col gap-8">
            <!-- Header -->
            <div class="flex items-center justify-between gap-4">
                <div class="flex items-center gap-4">
                    <UButton icon="i-lucide-arrow-left" color="neutral" variant="ghost" size="sm"
                        :to="`/app/courses/${courseId}/settings`" />
                    <div class="flex items-center gap-3">
                        <div
                            class="w-10 h-10 flex items-center justify-center rounded-xl bg-primary-500/10 text-primary-500 border border-primary-500/20">
                            <UIcon :name="course.icon || 'i-lucide-book'" class="text-xl" />
                        </div>
                        <div>
                            <h1 class="text-2xl font-bold tracking-tight">Enrollment Management</h1>
                            <p class="text-sm text-neutral-500 truncate max-w-sm">{{ course.title }}</p>
                        </div>
                    </div>
                </div>
                <div class="flex items-center gap-2">
                    <!-- <UBadge color="success" variant="subtle" class="gap-1.5">
                        <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse inline-block"></span>
                        Published
                    </UBadge> -->
                    <!-- <UButton label="Settings" icon="i-lucide-settings" color="neutral" variant="soft" size="sm"
                        :to="`/app/courses/${courseId}/settings`" /> -->
                </div>
            </div>

            <!-- Stats Row -->
            <div class="grid grid-cols-3 gap-4">
                <UCard variant="subtle"
                    :ui="{ root: 'ring-warning-200 dark:ring-warning-800/40 bg-warning-50 dark:bg-warning-900/10' }">
                    <div class="flex items-center gap-4">
                        <div
                            class="w-10 h-10 rounded-xl bg-warning-100 dark:bg-warning-900/30 flex items-center justify-center text-warning-500">
                            <UIcon name="i-lucide-clock" class="text-xl" />
                        </div>
                        <div>
                            <p class="text-2xl font-bold text-warning-900 dark:text-warning-100">
                                {{ pendingMembers.length }}
                            </p>
                            <p class="text-xs text-warning-600 dark:text-warning-400 font-medium">Pending Review</p>
                        </div>
                    </div>
                </UCard>
                <UCard variant="subtle"
                    :ui="{ root: 'ring-emerald-200 dark:ring-emerald-800/40 bg-emerald-50 dark:bg-emerald-900/10' }">
                    <div class="flex items-center gap-4">
                        <div
                            class="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-500">
                            <UIcon name="i-lucide-user-check" class="text-xl" />
                        </div>
                        <div>
                            <p class="text-2xl font-bold text-emerald-900 dark:text-emerald-100">
                                {{ approvedMembers.length }}
                            </p>
                            <p class="text-xs text-emerald-600 dark:text-emerald-400 font-medium">Approved</p>
                        </div>
                    </div>
                </UCard>
                <UCard variant="subtle"
                    :ui="{ root: 'ring-red-200 dark:ring-red-800/40 bg-red-50 dark:bg-red-900/10' }">
                    <div class="flex items-center gap-4">
                        <div
                            class="w-10 h-10 rounded-xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-500">
                            <UIcon name="i-lucide-user-x" class="text-xl" />
                        </div>
                        <div>
                            <p class="text-2xl font-bold text-red-900 dark:text-red-100">
                                {{ rejectedMembers.length }}
                            </p>
                            <p class="text-xs text-red-600 dark:text-red-400 font-medium">Rejected</p>
                        </div>
                    </div>
                </UCard>
            </div>

            <!-- Main Content: List + Detail Panel -->
            <div class="flex gap-6 min-h-[520px]">

                <!-- Left: List -->
                <div class="flex flex-col gap-4 flex-1 min-w-0">
                    <!-- Tabs + Search -->
                    <div class="flex items-center justify-between gap-4">
                        <UTabs v-model="activeTab" :items="tabItems" variant="link" color="neutral" size="sm"
                            @update:model-value="selectedMember = null" />
                        <UInput v-model="search" placeholder="Search members..." icon="i-lucide-search" size="sm"
                            class="w-52" />
                    </div>

                    <!-- Member List -->
                    <UCard
                        :ui="{ body: 'p-0 sm:p-0 overflow-hidden', root: 'flex-1 shadow-sm border-neutral-200 dark:border-neutral-800' }"
                        variant="subtle">
                        <div v-if="filteredList.length" class="divide-y divide-default">
                            <div v-for="member in filteredList" :key="member.id"
                                class="flex items-center gap-4 px-5 py-4 cursor-pointer transition-all" :class="[
                                    selectedMember?.id === member.id
                                        ? 'bg-primary-50 dark:bg-primary-900/10 border-l-4 border-l-primary-500'
                                        : 'hover:bg-neutral-50 dark:hover:bg-neutral-900/40 border-l-0'
                                ]" @click="selectMember(member)">
                                <div class="relative shrink-0">
                                    <UAvatar :src="member.avatar" :alt="member.name" size="md" />
                                    <div class="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white dark:border-neutral-900"
                                        :class="member.status === 'online' ? 'bg-emerald-500' : 'bg-neutral-300 dark:bg-neutral-600'">
                                        <span v-if="member.status === 'online'"
                                            class="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-75"></span>
                                    </div>
                                </div>

                                <div class="flex-1 min-w-0">
                                    <div class="flex items-center gap-2">
                                        <span class="font-semibold text-neutral-900 dark:text-neutral-100 truncate">{{
                                            member.name }}</span>
                                        <span v-if="member.role"
                                            class="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-500 shrink-0">{{
                                                member.role }}</span>
                                    </div>
                                    <p class="text-sm text-neutral-500 truncate">{{ member.email }}</p>
                                </div>

                                <div class="flex items-center gap-3 shrink-0">
                                    <span class="text-xs text-neutral-400">{{ member.enrolledAt }}</span>
                                    <UBadge v-if="activeTab === 'approved'" color="success" variant="subtle" size="xs">
                                        Approved</UBadge>
                                    <UBadge v-else-if="activeTab === 'rejected'" color="error" variant="subtle"
                                        size="xs">Rejected</UBadge>
                                    <UBadge v-else color="warning" variant="subtle" size="xs">Pending</UBadge>
                                </div>
                            </div>
                        </div>

                        <!-- Empty state -->
                        <div v-else class="flex flex-col items-center justify-center py-20 gap-3 text-neutral-400">
                            <UIcon name="i-lucide-users" class="text-4xl opacity-40" />
                            <p class="text-sm font-medium">No {{ activeTab }} enrollments</p>
                        </div>
                    </UCard>
                </div>

                <!-- Right: Detail Panel -->
                <div class="w-80 shrink-0">
                    <!-- Placeholder when nothing selected -->
                    <div v-if="!selectedMember"
                        class="h-full flex flex-col items-center justify-center text-center gap-3 text-neutral-400 rounded-2xl border-2 border-dashed border-neutral-200 dark:border-neutral-800 p-8">
                        <div
                            class="w-14 h-14 rounded-2xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
                            <UIcon name="i-lucide-mouse-pointer-click" class="text-2xl opacity-50" />
                        </div>
                        <div>
                            <p class="text-sm font-semibold text-neutral-500">Select a member</p>
                            <p class="text-xs text-neutral-400 mt-1">Click any member to view their enrollment request
                            </p>
                        </div>
                    </div>

                    <!-- Member detail -->
                    <UCard v-else variant="subtle" :ui="{ root: 'shadow-sm h-full', body: 'p-0 sm:p-0' }">
                        <!-- Profile header -->
                        <div class="flex flex-col items-center p-4 sm:p-6 overflow-hidden">
                            <div class="relative">
                                <UAvatar :src="selectedMember.avatar" :alt="selectedMember.name" size="2xl"
                                    class="ring-4 ring-white dark:ring-neutral-900 shadow-xl" />
                                <div class="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-4 border-white dark:border-neutral-900"
                                    :class="selectedMember.status === 'online' ? 'bg-emerald-500' : 'bg-neutral-300 dark:bg-neutral-600'">
                                    <span v-if="selectedMember.status === 'online'"
                                        class="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-75"></span>
                                </div>
                            </div>
                            <div class="mt-4 text-center z-10">
                                <h3 class="text-lg font-bold tracking-tight">{{ selectedMember.name }}</h3>
                                <p class="text-sm text-neutral-500">{{ selectedMember.email }}</p>
                            </div>
                            <div class="mt-3 flex gap-2 z-10">
                                <UBadge color="primary" variant="subtle" size="sm">
                                    {{ selectedMember.role || 'Member' }}
                                </UBadge>
                                <UBadge :color="selectedMember.status === 'online' ? 'success' : 'neutral'"
                                    variant="subtle" size="sm">
                                    {{ selectedMember.status === 'online' ? 'Online' : 'Offline' }}
                                </UBadge>
                            </div>
                        </div>

                        <!-- Request details -->
                        <div class="p-4 sm:p-6 space-y-4">
                            <p class="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Enrollment
                                Request</p>

                            <div class="space-y-3">
                                <div class="flex justify-between items-center">
                                    <span class="text-xs text-neutral-500">Requested</span>
                                    <span class="text-xs font-medium">{{ selectedMember.enrolledAt }}</span>
                                </div>
                                <div class="flex justify-between items-center">
                                    <span class="text-xs text-neutral-500">Role</span>
                                    <span class="text-xs font-medium">{{ selectedMember.role }}</span>
                                </div>
                            </div>

                            <div
                                class="bg-neutral-50 dark:bg-neutral-900/50 rounded-xl p-3 border border-neutral-100 dark:border-neutral-800">
                                <p class="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-2">Message
                                </p>
                                <p class="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">{{
                                    selectedMember.message }}</p>
                            </div>
                        </div>

                        <!-- Actions — only for pending -->
                        <div v-if="activeTab === 'pending'" class="p-4 sm:p-6 flex flex-col gap-2">
                            <UButton block label="Approve" icon="i-lucide-check" variant="soft"
                                class="flex-1 justify-center font-semibold" @click="approveMember(selectedMember)" />
                            <UButton block label="Reject" icon="i-lucide-x" color="error" variant="soft"
                                class="flex-1 justify-center font-semibold" @click="rejectMember(selectedMember)" />
                        </div>
                        <div v-else class="p-4 sm:p-6 border-t border-neutral-100 dark:border-neutral-800">
                            <UButton v-if="activeTab === 'approved'" label="Revoke Approval" icon="i-lucide-user-x"
                                color="error" variant="soft" block @click="rejectMember(selectedMember)" />
                            <UButton v-else label="Re-approve" icon="i-lucide-user-check" variant="soft" block
                                @click="approveMember(selectedMember)" />
                        </div>
                    </UCard>
                </div>
            </div>
        </div>
    </UContainer>
</template>
