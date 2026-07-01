<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const courseStore = useCourseStore()

// Register unsaved-changes guard for open edit modals
const { registerUnsavedCheck } = useUnsavedChanges()
const unregister = registerUnsavedCheck(() =>
    isEditNameModalOpen.value ||
    isEditDescModalOpen.value ||
    isEditGoalModalOpen.value ||
    isEditScheduleModalOpen.value
)
onUnmounted(unregister)

const courseId = route.params.courseId as string
const course = computed(() => courseStore.getCourseBySlugOrId(courseId))

// Modals State
const isEditNameModalOpen = ref(false)
const newCourseName = ref(course.value?.title || '')

const isEditDescModalOpen = ref(false)
const newCourseDesc = ref(course.value?.description || '')

const isEditGoalModalOpen = ref(false)
const newCourseGoal = ref(course.value?.learningGoal || 'Mastery')

const isEditScheduleModalOpen = ref(false)
const scheduleForm = reactive({
    targetFinishDate: course.value?.targetFinishDate ? new Date(course.value.targetFinishDate).toISOString().split('T')[0] : '',
    sessionsPerWeek: course.value?.sessionsPerWeek || 3,
    itemsPerWeek: course.value?.itemsPerWeek || 5
})

const focusedScheduleField = ref<string | null>(null)

const openScheduleModal = (field: string) => {
    scheduleForm.targetFinishDate = course.value?.targetFinishDate ? new Date(course.value.targetFinishDate).toISOString().split('T')[0] : ''
    scheduleForm.sessionsPerWeek = course.value?.sessionsPerWeek || 3
    scheduleForm.itemsPerWeek = course.value?.itemsPerWeek || 5
    focusedScheduleField.value = field
    isEditScheduleModalOpen.value = true
}

const saveSchedule = () => {
    if (!course.value) return

    let targetDate: number | undefined = undefined
    if (scheduleForm.targetFinishDate) {
        const [y, m, d] = scheduleForm.targetFinishDate.split('-').map(Number) as [number, number, number]
        targetDate = new Date(y, m - 1, d).getTime()
    }

    courseStore.updateCourse(courseId, {
        targetFinishDate: targetDate,
        sessionsPerWeek: Number(scheduleForm.sessionsPerWeek),
        itemsPerWeek: Number(scheduleForm.itemsPerWeek)
    })
    isEditScheduleModalOpen.value = false
}

const isArchiveModalOpen = ref(false)
const isDeleteModalOpen = ref(false)

// Removed local goalOptions in favor of auto-imported GOAL_OPTIONS

// Actions
const saveName = () => {
    if (newCourseName.value && newCourseName.value !== course.value?.title) {
        courseStore.updateCourse(course.value!.id, { title: newCourseName.value })
        const newSlug = generateSlug(newCourseName.value)
        if (newSlug !== courseId) {
            router.replace(`/app/courses/${newSlug}/settings`)
        }
    }
    isEditNameModalOpen.value = false
}

const saveDesc = () => {
    if (newCourseDesc.value !== course.value?.description) {
        courseStore.updateCourse(courseId, { description: newCourseDesc.value })
    }
    isEditDescModalOpen.value = false
}

const saveGoal = (goal: string) => {
    courseStore.updateCourse(courseId, { learningGoal: goal as any })
    isEditGoalModalOpen.value = false
}

const handleDeleteCourse = () => {
    courseStore.deleteCourse(courseId)
    isDeleteModalOpen.value = false
    router.push('/app/courses/collection')
}

const handleArchiveCourse = () => {
    courseStore.updateCourse(courseId, { status: 'Archived' })
    isArchiveModalOpen.value = false
    router.push('/app/courses/collection')
}

const notificationsEnabled = ref(course.value?.notificationsEnabled ?? true)

const toggleNotifications = (val: boolean) => {
    notificationsEnabled.value = val
    useToast().add({
        title: val ? 'Notifications Enabled' : 'Notifications Disabled',
        description: val ? 'You will now receive course updates.' : 'You will no longer receive course updates.',
        icon: val ? 'i-lucide-bell-ring' : 'i-lucide-bell-off',
        color: val ? 'primary' : 'neutral'
    })
}

const updateSessions = (val: number) => {
    courseStore.updateCourse(courseId, { sessionsPerWeek: val })
}

const updateItems = (val: number) => {
    courseStore.updateCourse(courseId, { itemsPerWeek: val })
}

// Formatters
const formatDate = (ts?: number) => {
    if (!ts) return 'Not set'
    return new Date(ts).toLocaleDateString()
}

// Sections Configuration
interface SettingsItemBadge {
    label: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    color?: any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    variant?: any
}

interface SettingsItem {
    label: string
    value?: string
    icon: string
    color: string
    action?: () => void
    isToggle?: boolean
    badge?: SettingsItemBadge
}

interface SettingsSection {
    title: string
    items: SettingsItem[]
}

const sections = computed<SettingsSection[]>(() => [
    {
        title: 'Course Details',
        items: [
            {
                label: 'Course Name',
                value: course.value?.title || '',
                icon: 'i-lucide-edit-3',
                color: 'blue',
                action: () => {
                    newCourseName.value = course.value?.title || ''
                    isEditNameModalOpen.value = true
                }
            },
            {
                label: 'Course Description',
                value: course.value?.description || 'No description provided.',
                icon: 'i-lucide-align-left',
                color: 'blue',
                action: () => {
                    newCourseDesc.value = course.value?.description || ''
                    isEditDescModalOpen.value = true
                }
            },
            {
                label: 'Learning Goal',
                value: course.value?.learningGoal || 'Mastery',
                icon: 'i-lucide-target',
                color: 'emerald',
                action: () => { isEditGoalModalOpen.value = true }
            },
            // Status
            {
                label: 'Status',
                badge: {
                    label: course.value?.isPublished ? 'Shared' : 'Private',
                    color: (course.value?.isPublished ? 'success' : 'warning') as any,
                    variant: 'subtle' as const
                },
                icon: 'i-lucide-radio',
                color: course.value?.isPublished ? 'success' : 'warning',
                action: () => { isPublishModalOpen.value = true }
            },
        ]
    },
    {
        title: 'Schedule & Targets',
        items: [
            {
                label: 'Target Finish Date',
                value: formatDate(course.value?.targetFinishDate),
                icon: 'i-lucide-calendar',
                color: 'purple',
                action: () => { openScheduleModal('targetFinishDate') }
            },
            {
                label: 'Sessions per Week',
                value: `${course.value?.sessionsPerWeek || 3} sessions`,
                icon: 'i-lucide-calendar-days',
                color: 'purple',
                action: () => { openScheduleModal('sessionsPerWeek') }
            },
            {
                label: 'Items per Week',
                value: `${course.value?.itemsPerWeek || 5} items`,
                icon: 'i-lucide-list-todo',
                color: 'purple',
                action: () => { openScheduleModal('itemsPerWeek') }
            }
        ]
    },
    {
        title: 'Notifications',
        items: [
            {
                label: 'Course Updates & Reminders',
                value: notificationsEnabled.value ? 'Enabled' : 'Disabled',
                icon: 'i-lucide-bell',
                color: 'blue',
                action: () => toggleNotifications(!notificationsEnabled.value),
                isToggle: true
            }
        ]
    }
])


const isPublishModalOpen = ref(false)

const toast = useToast()

const publishCourse = () => {
    if (!course.value) return
    const newStatus = !course.value.isPublished
    
    // Close modal first
    isPublishModalOpen.value = false
    
    // Wait for the modal transition to finish before updating the state
    setTimeout(() => {
        if (!course.value) return
        courseStore.updateCourse(course.value.id, {
            isPublished: newStatus,
            shareableLink: newStatus ? `https://acumen.app/course/${course.value.id}/enroll` : '',
            autoEnroll: newStatus ? true : false
        })
        toast.add({ title: newStatus ? 'Course Shared' : 'Course set to Private', color: 'success' })
    }, 200)
}

const toggleAutoEnroll = () => {
    if (!course.value) return
    courseStore.updateCourse(course.value.id, { autoEnroll: !course.value.autoEnroll })
}

const copied = ref(false)

const copyShareableLink = () => {
    if (!course.value?.shareableLink) return
    navigator.clipboard.writeText(course.value.shareableLink)
    toast.add({ title: 'Link copied to clipboard!', color: 'success' })
    copied.value = true
    setTimeout(() => { copied.value = false }, 2000)
}

</script>

<template>
    <UContainer class="max-w-4xl py-6">
        <div v-if="course" class="flex flex-col gap-10">
            <!-- Breadcrumbs -->
            <!-- <div class="flex justify-between items-center">
                <AppBreadcrumb />
                <UButton label="Close" leading-icon="i-lucide-x" color="neutral" variant="soft" size="sm"
                    :to="`/app/courses/${course.id}`" :ui="{ leadingIcon: 'size-3' }" />
            </div> -->

            <!-- Header -->
            <header class="flex items-center justify-between gap-4">
                <div class="flex items-center gap-4">
                    <UButton icon="i-lucide-arrow-left" color="neutral" variant="ghost" size="sm"
                        :to="`/app/courses/${courseId}`" />
                    <div class="flex items-center gap-3">
                        <div
                            class="w-10 h-10 flex items-center justify-center rounded-xl bg-primary-500/10 text-primary-500 border border-primary-500/20">
                            <UIcon :name="course.icon || 'i-lucide-book'" class="text-xl" />
                        </div>
                        <div>
                            <h1 class="text-2xl font-bold tracking-tight">Course Settings</h1>
                            <p class="text-sm text-neutral-500 truncate max-w-sm">{{ course.title }}</p>
                        </div>
                    </div>
                </div>
                <!-- <UBadge v-if="course.isPublished" color="success" variant="subtle" class="gap-1.5">
                    <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse inline-block"></span>
                    Shared
                </UBadge> -->
            </header>

            <!-- Dynamic Sections -->
            <div v-for="section in sections" :key="section.title" class="flex flex-col gap-4">
                <h2 class="text-xs font-bold text-neutral-400 uppercase tracking-[0.2em] px-2">
                    {{ section.title }}
                </h2>

                <UCard
                    :ui="{ body: 'p-0 sm:p-0 overflow-hidden', root: 'shadow-sm border-neutral-200 dark:border-neutral-800' }">
                    <div class="divide-y divide-neutral-100 dark:divide-neutral-800">
                        <div v-for="item in section.items" :key="item.label" @click="item.action ? item.action() : null"
                            class="p-5 hover:bg-neutral-50 dark:hover:bg-neutral-900/50 transition-colors group cursor-pointer">
                            <div class="flex items-center justify-between">
                                <div class="flex items-center gap-4">
                                    <div
                                        class="w-10 h-10 flex items-center justify-center rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200/50 dark:border-neutral-700/50">
                                        <UIcon :name="item.icon" class="text-lg text-neutral-500" />
                                    </div>
                                    <div class="flex flex-col">
                                        <span class="font-bold text-neutral-700 dark:text-neutral-200">{{ item.label
                                            }}</span>
                                    </div>
                                </div>

                                <div class="flex items-center gap-4">
                                    <UBadge v-if="item.badge" :color="item.badge.color" :variant="item.badge.variant">
                                        {{ item.badge.label }}
                                    </UBadge>
                                    <span v-else-if="!item.isToggle"
                                        class="text-neutral-500 dark:text-neutral-400 font-medium truncate max-w-[200px] sm:max-w-md">{{
                                            item.value }}</span>
                                    <USwitch v-if="item.isToggle" v-model="notificationsEnabled" @click.stop
                                        @update:model-value="toggleNotifications" />
                                    <UButton v-else icon="i-lucide-chevron-right" variant="ghost" color="neutral"
                                        size="xs" />
                                </div>
                            </div>

                            <!-- Shared Settings -->
                            <UCard v-if="item.label === 'Status' && course?.isPublished" variant="soft" class="mt-4"
                                :ui="{ body: 'flex flex-col gap-6' }" @click.stop>
                                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <div class="flex flex-col gap-1">
                                        <p class="text-sm font-semibold">
                                            Enrollment List
                                        </p>
                                        <p class="text-xs text-muted">View and manage
                                            members who
                                            have requested to enroll in this course.</p>
                                    </div>
                                    <UButton label="Manage" leading-icon="i-lucide-users" variant="soft"
                                        :ui="{ leadingIcon: 'size-4' }" :to="`/app/courses/${courseId}/enrollments`" />
                                </div>
                                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <div class="flex flex-col gap-1">
                                        <p class="text-sm font-semibold">
                                            Auto-Enrollment
                                        </p>
                                        <p class="text-xs text-muted">Automatically
                                            approve members
                                            who enroll in this course.</p>
                                    </div>
                                    <USwitch :model-value="course.autoEnroll" @update:model-value="toggleAutoEnroll" />
                                </div>
                                <div class="flex flex-col gap-2">
                                    <p class="text-sm font-semibold">
                                        Shareable Link</p>
                                    <div class="flex gap-2">
                                        <UInput :model-value="course.shareableLink" readonly variant="subtle"
                                            class="flex-1" :ui="{
                                                base: 'text-primary-900 dark:text-primary-100 font-mono text-sm bg-white/50 dark:bg-black/20'
                                            }" />
                                        <UButton variant="soft" :icon="copied ? 'i-lucide-check' : 'i-lucide-copy'"
                                            :label="copied ? 'Copied' : 'Copy'" :ui="{ leadingIcon: 'size-4' }"
                                            @click="copyShareableLink" />
                                    </div>
                                </div>
                            </UCard>
                        </div>
                    </div>
                </UCard>
            </div>

            <!-- add publish zone with sharable link and auto-enrolled switch -->
            <!-- <div class="flex flex-col gap-4">
                <h2 class="text-xs font-bold uppercase tracking-[0.2em] px-2"
                    :class="course?.isPublished ? 'text-warning-500' : 'text-success-500'">
                    {{ course?.isPublished ? 'Unshare Course' : 'Share Course' }}
                </h2>

                <UCard
                    :ui="{ root: course?.isPublished ? 'ring-warning-200 dark:ring-warning-800 bg-warning-50 dark:bg-warning-900/10' : 'ring-success-200 dark:ring-success-800 bg-success-50 dark:bg-success-900/10' }">
                    <div class="flex flex-col md:flex-row md:items-center justify-between p-6 gap-6">
                        <div class="flex flex-col gap-1">
                            <p class="font-bold"
                                :class="course?.isPublished ? 'text-warning-900 dark:text-warning-100' : 'text-success-900 dark:text-success-100'">
                                {{ course?.isPublished ? 'Unshare Course' : 'Share Course' }}
                            </p>
                            <p class="text-sm"
                                :class="course?.isPublished ? 'text-warning-600 dark:text-warning-400' : 'text-success-600 dark:text-success-400'">
                                {{ course?.isPublished
                                    ? 'Unpublishing this course will hide it from the catalog and prevent new enrollments.'
                                    : 'Publishing this course will make it visible to all members.'
                                }}
                            </p>
                        </div>
                        <UButton :icon="course?.isPublished ? 'i-lucide-eye-off' : 'i-lucide-check'"
                            :color="course?.isPublished ? 'warning' : 'success'" variant="soft"
                            :label="course?.isPublished ? 'Unshare' : 'Share'" @click="isPublishModalOpen = true" />
                    </div>
                    <div v-if="course?.isPublished"
                        class="border-t border-warning-200/50 dark:border-warning-800/50 p-6 flex flex-col gap-6">
                        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div class="flex flex-col gap-1">
                                <p class="text-sm font-semibold text-warning-900 dark:text-warning-100">Enrollment List
                                </p>
                                <p class="text-xs text-warning-600 dark:text-warning-400">View and manage members who
                                    have requested to enroll in this course.</p>
                            </div>
                            <UButton label="Manage" leading-icon="i-lucide-users" color="warning" variant="soft"
                                size="sm" :ui="{ leadingIcon: 'size-3' }"
                                :to="`/app/courses/${courseId}/enrollments`" />
                        </div>
                        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div class="flex flex-col gap-1">
                                <p class="text-sm font-semibold text-warning-900 dark:text-warning-100">Auto-Enrollment
                                </p>
                                <p class="text-xs text-warning-600 dark:text-warning-400">Automatically approve members
                                    who enroll in this course.</p>
                            </div>
                            <USwitch :model-value="course.autoEnroll" color="warning"
                                @update:model-value="toggleAutoEnroll" />
                        </div>
                        <div class="flex flex-col gap-2">
                            <p class="text-sm font-semibold text-warning-900 dark:text-warning-100">Shareable Link</p>
                            <div class="flex gap-2">
                                <UInput :model-value="course.shareableLink" readonly variant="subtle" class="flex-1"
                                    :ui="{
                                        base: 'text-warning-900 dark:text-warning-100 font-mono text-sm bg-white/50 dark:bg-black/20'
                                    }" />
                                <UButton icon="i-lucide-copy" color="warning" variant="soft"
                                    @click="copyShareableLink" />
                            </div>
                        </div>
                    </div>
                </UCard>
            </div> -->

            <!-- Archive Zone -->
            <div class="flex flex-col gap-4">
                <h2 class="text-xs font-bold text-purple-400 uppercase tracking-[0.2em] px-2">
                    Archive Course
                </h2>
                <UCard :ui="{ root: 'ring-purple-200 dark:ring-purple-800 bg-purple-100 dark:bg-purple-800/10' }">
                    <div class="flex items-center justify-between p-6">
                        <div class="flex flex-col gap-1">
                            <p class="font-bold text-purple-900 dark:text-purple-100">Archive Course</p>
                            <p class="text-sm text-purple-500">
                                Archiving this course will hide it from your main collection but keep all your data.
                            </p>
                        </div>
                        <UButton icon="i-lucide-archive" color="purple" variant="soft" label="Archive"
                            @click="isArchiveModalOpen = true" />
                    </div>
                </UCard>
            </div>

            <!-- Danger Zone -->
            <div class="flex flex-col gap-4">
                <h2 class="text-xs font-bold text-error-500 dark:text-error-400 uppercase tracking-[0.2em] px-2">
                    Danger Zone
                </h2>
                <UCard :ui="{ root: 'ring-error-200 dark:ring-error-800 bg-error-100 dark:bg-error-800/10' }">
                    <div class="flex items-center justify-between p-6">
                        <div class="flex flex-col gap-1">
                            <p class="font-bold text-error-900 dark:text-error-100">Delete Course</p>
                            <p class="text-sm text-error-500">
                                Permanently remove this course and all its progress data. This action is irreversible.
                            </p>
                        </div>
                        <UButton label="Delete Course" icon="i-lucide-trash-2" color="error" variant="soft"
                            @click="isDeleteModalOpen = true" />
                    </div>
                </UCard>
            </div>
        </div>

        <!-- 404 Empty State -->
        <div v-else class="flex flex-col items-center justify-center py-20 text-center">
            <UIcon name="i-lucide-file-search-corner" class="text-6xl text-neutral-400 mb-4" />
            <h2 class="text-2xl font-bold">Course not found</h2>
            <p class="text-neutral-500 mt-2">The course you're looking for doesn't exist or has been deleted.</p>
            <UButton label="Back to Dashboard" color="primary" variant="subtle" to="/app/dashboard" class="mt-6" />
        </div>

        <!-- Modals -->
        <UModal v-model:open="isEditNameModalOpen">
            <template #content>
                <div class="p-6 flex flex-col gap-6">
                    <div class="flex flex-col gap-1">
                        <h3 class="text-lg font-bold">Rename Course</h3>
                        <p class="text-sm text-neutral-500">Enter a new name for your course.</p>
                    </div>
                    <UInput v-model="newCourseName" class="w-full" autofocus @keyup.enter="saveName" />
                    <div class="flex items-center justify-end gap-3">
                        <UButton label="Cancel" variant="ghost" color="neutral" @click="isEditNameModalOpen = false" />
                        <UButton label="Save Changes" color="primary" @click="saveName" />
                    </div>
                </div>
            </template>
        </UModal>

        <UModal v-model:open="isEditDescModalOpen">
            <template #content>
                <div class="p-6 flex flex-col gap-6">
                    <div class="flex flex-col gap-1">
                        <h3 class="text-lg font-bold">Edit Description</h3>
                        <p class="text-sm text-neutral-500">Provide a brief description of what this course covers.</p>
                    </div>
                    <UTextarea v-model="newCourseDesc" class="w-full" :rows="4" autofocus />
                    <div class="flex items-center justify-end gap-3">
                        <UButton label="Cancel" variant="ghost" color="neutral" @click="isEditDescModalOpen = false" />
                        <UButton label="Save Changes" color="primary" @click="saveDesc" />
                    </div>
                </div>
            </template>
        </UModal>

        <UModal v-model:open="isEditGoalModalOpen">
            <template #content>
                <div class="p-6 flex flex-col gap-6">
                    <div class="flex flex-col gap-1">
                        <h3 class="text-lg font-bold">Select Learning Goal</h3>
                        <p class="text-sm text-neutral-500">Choose the primary objective for this course.</p>
                    </div>
                    <div class="flex flex-col gap-3">
                        <UCard v-for="goal in GOAL_OPTIONS" :key="goal.id" @click="saveGoal(goal.id)" variant="subtle"
                            class="cursor-pointer transition-all hover:ring-2 hover:ring-primary-500/50"
                            :class="{ 'ring-2 ring-primary-500 bg-primary-50 dark:bg-primary-900/20': course?.learningGoal === goal.id }"
                            :ui="{ body: 'p-4 flex items-start gap-4' }">
                            <div class="p-2 rounded-lg shrink-0"
                                :class="course?.learningGoal === goal.id ? 'bg-primary-100 text-primary-600 dark:bg-primary-900/50 dark:text-primary-400' : 'bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400'">
                                <UIcon :name="goal.icon" class="text-xl flex" />
                            </div>
                            <div class="flex flex-col gap-0.5">
                                <span class="font-bold text-sm"
                                    :class="course?.learningGoal === goal.id ? 'text-primary-700 dark:text-primary-300' : 'text-neutral-900 dark:text-neutral-100'">{{
                                        goal.label }}</span>
                                <span class="text-xs text-neutral-500">{{ goal.description }}</span>
                            </div>
                        </UCard>
                    </div>
                </div>
            </template>
        </UModal>

        <UModal v-model:open="isEditScheduleModalOpen">
            <template #content>
                <div class="p-6 flex flex-col gap-6">
                    <div class="flex flex-col gap-1">
                        <h3 class="text-lg font-bold">Edit Schedule & Targets</h3>
                        <p class="text-sm text-neutral-500">Set your goals and timeline for this course.</p>
                    </div>

                    <div class="grid lg:grid-cols-2 gap-4">
                        <UFormField label="Target Finish Date" hint="Optional" class="lg:col-span-2">
                            <UInput type="date" v-model="scheduleForm.targetFinishDate" icon="i-lucide-calendar"
                                class="w-full" :autofocus="focusedScheduleField === 'targetFinishDate'" />
                        </UFormField>
                        <UFormField label="Sessions per Week">
                            <UInput type="number" min="1" max="14" v-model="scheduleForm.sessionsPerWeek"
                                icon="i-lucide-calendar-days" class="w-full"
                                :autofocus="focusedScheduleField === 'sessionsPerWeek'" />
                        </UFormField>
                        <UFormField label="Items per Week">
                            <UInput type="number" min="1" max="100" v-model="scheduleForm.itemsPerWeek"
                                icon="i-lucide-list-todo" class="w-full"
                                :autofocus="focusedScheduleField === 'itemsPerWeek'" />
                        </UFormField>
                    </div>

                    <div class="flex items-center justify-end gap-3 mt-2">
                        <UButton label="Cancel" variant="ghost" color="neutral"
                            @click="isEditScheduleModalOpen = false" />
                        <UButton label="Save Changes" color="primary" @click="saveSchedule" />
                    </div>
                </div>
            </template>
        </UModal>

        <!-- add publish modal here -->
        <UModal v-model:open="isPublishModalOpen">
            <template #content>
                <div class="p-6 flex flex-col gap-6">
                    <div class="flex items-center gap-4"
                        :class="course?.isPublished ? 'text-warning-600' : 'text-success-600'">
                        <div class="w-12 h-12 rounded-full flex items-center justify-center"
                            :class="course?.isPublished ? 'bg-warning-50 dark:bg-warning-950/30' : 'bg-success-50 dark:bg-success-950/30'">
                            <UIcon :name="course?.isPublished ? 'i-lucide-eye-off' : 'i-lucide-check'"
                                class="text-2xl" />
                        </div>
                        <h3 class="text-xl font-bold">{{ course?.isPublished ? 'Unshare Course?' : 'Share Course?'
                        }}</h3>
                    </div>
                    <p class="text-neutral-500">
                        {{ course?.isPublished
                            ? 'Are you sure you want to unshare? This course will no longer be visible to new members.'
                            : 'Sharing this course will make it visible to all members.'
                        }}
                    </p>
                    <div class="flex items-center justify-end gap-3 mt-2">
                        <UButton label="Cancel" variant="ghost" color="neutral" @click="isPublishModalOpen = false" />
                        <UButton :label="course?.isPublished ? 'Unshare' : 'Share'"
                            :color="course?.isPublished ? 'warning' : 'success'" @click="publishCourse" />
                    </div>
                </div>
            </template>
        </UModal>

        <UModal v-model:open="isArchiveModalOpen">
            <template #content>
                <div class="p-6 flex flex-col gap-6">
                    <div class="flex items-center gap-4 text-violet-600">
                        <div
                            class="w-12 h-12 rounded-full bg-violet-50 dark:bg-violet-950/30 flex items-center justify-center">
                            <UIcon name="i-lucide-archive" class="text-2xl" />
                        </div>
                        <h3 class="text-xl font-bold">Archive Course?</h3>
                    </div>
                    <p class="text-neutral-500">
                        This course will be moved to the Archived tab. You will not lose any lessons or progress data.
                    </p>
                    <div class="flex items-center justify-end gap-3">
                        <UButton label="Cancel" variant="ghost" color="neutral" @click="isArchiveModalOpen = false" />
                        <UButton label="Archive Course" color="violet" @click="handleArchiveCourse" />
                    </div>
                </div>
            </template>
        </UModal>

        <UModal v-model:open="isDeleteModalOpen">
            <template #content>
                <div class="p-6 flex flex-col gap-6">
                    <div class="flex items-center gap-4 text-error-600">
                        <div
                            class="w-12 h-12 rounded-full bg-error-50 dark:bg-error-950/30 flex items-center justify-center">
                            <UIcon name="i-lucide-alert-triangle" class="text-2xl" />
                        </div>
                        <h3 class="text-xl font-bold">Delete Course?</h3>
                    </div>
                    <p class="text-neutral-500">
                        This action cannot be undone. All data, lessons, and progress associated with
                        "<span class="font-bold text-neutral-900 dark:text-white">{{ course?.title }}</span>" will be
                        permanently deleted.
                    </p>
                    <div class="flex items-center justify-end gap-3">
                        <UButton label="Cancel" variant="ghost" color="neutral" @click="isDeleteModalOpen = false" />
                        <UButton label="Yes, Delete Course" color="error" @click="handleDeleteCourse" />
                    </div>
                </div>
            </template>
        </UModal>


    </UContainer>
</template>
