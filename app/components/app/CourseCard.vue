<script setup lang="ts">


import type { Course } from '~/types/course'
import { GOAL_COLORS } from '~/constants/courses'

const props = withDefaults(defineProps<{
    course: Course
    showActions?: boolean
    isHero?: boolean
}>(), {
    showActions: true,
    isHero: false
})

const courseStore = useCourseStore()
const lessonStore = useLessonStore()
const toast = useToast()

const isRenameOpen = ref(false)
const isArchiveOpen = ref(false)
const isDeleteOpen = ref(false)
const newTitle = ref(props.course.title)

const handleRename = () => {
    if (newTitle.value && newTitle.value !== props.course.title) {
        courseStore.updateCourse(props.course.id, { title: newTitle.value })
        isRenameOpen.value = false
        toast.add({
            title: 'Course Renamed',
            description: `Successfully renamed to ${newTitle.value}`,
            color: 'success'
        })
    }
}

const handleArchive = () => {
    courseStore.updateCourse(props.course.id, { status: 'Archived' })
    isArchiveOpen.value = false
    toast.add({
        title: 'Course Archived',
        description: 'This course has been moved to archives.',
        color: 'neutral'
    })
}

const handleDelete = () => {
    courseStore.deleteCourse(props.course.id)
    isDeleteOpen.value = false
    toast.add({
        title: 'Course Deleted',
        description: 'The course has been removed from your library.',
        color: 'success'
    })
}

const actions = computed(() => [
    [
        //     {
        //     label: 'Rename',
        //     icon: 'i-lucide-pencil',
        //     onSelect: () => {
        //         newTitle.value = props.course.title
        //         isRenameOpen.value = true
        //     }
        // }, 
        {
            label: 'Settings',
            icon: 'i-lucide-settings',
            onSelect: () => {
                navigateTo(`/app/courses/${generateSlug(props.course.title)}/settings`)
            }
        },
        {
            label: 'Archive',
            icon: 'i-lucide-archive',
            onSelect: () => {
                isArchiveOpen.value = true
            }
        }],
    [{
        label: 'Delete',
        icon: 'i-lucide-trash',
        color: 'red' as const,
        onSelect: () => {
            isDeleteOpen.value = true
        }
    }]
])

// Remaining progress to reach 100% mastery
const masteryGap = computed(() => Math.max(0, 100 - (props.course.progress ?? 0)))

// Passing rate: same formula as lessons page — completed assessments / total assessments
const passingRate = computed(() => {
    const courseLessons = lessonStore.getLessonsByCourse(props.course.id)
    const assessments = courseLessons.filter(l => l.type === 'Assessment')
    if (assessments.length === 0) return 0
    const passed = assessments.filter(l => l.status === 'completed').length
    return Math.round((passed / assessments.length) * 100)
})

// Lesson completion count from actual lesson list
const lessonProgress = computed(() => {
    const courseLessons = lessonStore.getLessonsByCourse(props.course.id)
    const done = courseLessons.filter(l => l.status === 'completed').length
    return { done, total: courseLessons.length }
})
</script>

<template>
    <UCard variant="subtle"
        class="transition-all duration-300 cursor-pointer overflow-hidden group shadow-sm dark:shadow-none" :class="[
            course.status === 'Archived'
                ? 'opacity-20 grayscale-[0.50] hover:opacity-90 hover:grayscale-0'
                : 'hover:-translate-y-1.5 hover:ring-2 hover:ring-primary-500/50 hover:shadow-xl',
            course.isPinned ? 'border-primary-500/30' : ''
        ]" :ui="{
            body: 'relative flex flex-col gap-4 h-full'
        }" @click="navigateTo(`/app/courses/${generateSlug(course.title)}`)">

        <!-- Mesh Gradient Overlay -->
        <div
            class="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-transparent pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity" />

        <div class="flex items-center gap-2">
            <div class="bg-primary/20 backdrop-blur-md p-2 rounded-xl relative">
                <UIcon :name="course.icon" class="text-xl text-primary flex shrink-0" />
            </div>

            <div class="flex items-center flex-1 min-w-0 gap-2">
                <div class="font-semibold truncate min-w-0"
                    :class="{ 'text-neutral-400': course.status === 'Archived' }">{{ course.title }}</div>
                <div class="flex items-center gap-1.5 shrink-0">
                    <UBadge v-if="course.status === 'Archived'" label="Archived" color="neutral" variant="subtle"
                        size="sm" />
                    <UBadge :label="course.tag" variant="soft" size="sm" />
                </div>
            </div>
            <!-- Setting Button -->
            <UButton icon="i-lucide-settings-2" variant="ghost" size="xs" @click.stop
                @click="navigateTo(`/app/courses/${generateSlug(course.title)}/settings`)" />
            <!-- Dropdown Menu -->
            <!-- <UDropdownMenu v-if="showActions" :items="actions" :content="{
                align: 'end',
                side: 'bottom',
                sideOffset: 8
            }" size="sm">
                <UButton icon="i-lucide-more-horizontal" color="neutral" variant="ghost" size="xs" @click.stop />
            </UDropdownMenu> -->
        </div>

        <p class="text-xs text-dimmed line-clamp-2 flex-1">{{ course.description || 'No description provided.' }}</p>

        <div class="flex items-center gap-2 w-full">
            <!-- Mastery Percentage -->
            <div
                class="flex items-center gap-1.5 bg-neutral-100 dark:bg-neutral-800/80 rounded-lg px-2.5 py-1.5 flex-1">
                <UIcon name="i-lucide-trending-up" class="size-3.5 text-yellow-500 shrink-0" />
                <div class="flex flex-col leading-none gap-0.5">
                    <span class="text-[9px] font-bold uppercase tracking-wider text-muted">Mastery Gap</span>
                    <span class="text-xs font-bold text-yellow-500">{{ masteryGap }}%</span>
                </div>
            </div>
            <!-- Passing Rate -->
            <div
                class="flex items-center gap-1.5 bg-neutral-100 dark:bg-neutral-800/80 rounded-lg px-2.5 py-1.5 flex-1">
                <UIcon name="i-lucide-target" class="size-3.5 text-lime-500 shrink-0" />
                <div class="flex flex-col leading-none gap-0.5">
                    <span class="text-[9px] font-bold uppercase tracking-wider text-muted">Passing Rate</span>
                    <span class="text-xs font-bold text-lime-500">{{ passingRate }}%</span>
                </div>
            </div>
        </div>

        <!-- Overall Progress -->
        <div class="flex flex-col gap-1.5">
            <div class="flex items-center justify-between">
                <span class="text-[9px] font-bold uppercase tracking-wider text-muted">Overall Progress</span>
                <span class="text-[10px] font-bold text-primary">{{ course.progress }}%</span>
            </div>
            <UProgress :model-value="course.progress" color="primary" size="xs" />
        </div>

        <!-- Last Studied + Lesson Count -->
        <div class="flex items-center justify-between text-[10px] text-muted">
            <div class="flex items-center gap-1">
                <UIcon name="i-lucide-clock" class="size-3 shrink-0" />
                <span>{{ course.lastStudied || 'Not studied yet' }}</span>
            </div>
            <div class="flex items-center gap-1">
                <UIcon name="i-lucide-book-open" class="size-3 shrink-0" />
                <span v-if="lessonProgress.total > 0">{{ lessonProgress.done }}/{{ lessonProgress.total }}
                    lessons</span>
                <span v-else>{{ course.lessons }}</span>
            </div>
        </div>

        <USeparator />

        <!-- Grid View Workspace/Creator Meta -->
        <div v-if="course.createdBy" class="flex items-center justify-between">
            <div class="flex items-center gap-2">
                <UAvatar :src="course.createdBy.avatar" :alt="course.createdBy.name" size="xs"
                    class="ring-1 ring-neutral-200 dark:ring-neutral-800" />
                <div class="flex flex-col">
                    <span
                        class="text-[9px] text-neutral-400 font-bold uppercase tracking-wider leading-none mb-0.5">Author</span>
                    <span class="text-[10px] text-neutral-700 dark:text-neutral-300 font-medium leading-none">{{
                        course.createdBy.name }}</span>
                </div>
            </div>
        </div>
    </UCard>

    <!-- Rename Modal -->
    <UModal v-model:open="isRenameOpen">
        <template #content>
            <div class="p-6 flex flex-col gap-6">
                <div class="flex items-center gap-4">
                    <div
                        class="w-12 h-12 rounded-full flex items-center justify-center shrink-0 bg-primary-50 dark:bg-primary-950/30 text-primary-600">
                        <UIcon name="i-lucide-pencil" class="text-2xl" />
                    </div>
                    <div>
                        <h3 class="text-xl font-bold leading-tight">Rename Course</h3>
                        <p class="text-sm text-neutral-500 mt-1">Change the display name of your study course.</p>
                    </div>
                </div>

                <UFormField label="New Title" name="title">
                    <UInput v-model="newTitle" placeholder="e.g. Advanced Vue.js Patterns" class="w-full" size="lg"
                        autofocus @keyup.enter="handleRename" />
                </UFormField>

                <div class="flex items-center justify-end gap-3 pt-2">
                    <UButton label="Cancel" variant="ghost" color="neutral" @click="isRenameOpen = false" />
                    <UButton label="Save Changes" color="primary" @click="handleRename" />
                </div>
            </div>
        </template>
    </UModal>

    <!-- Archive Confirmation Modal -->
    <UModal v-model:open="isArchiveOpen">
        <template #content>
            <div class="p-6 flex flex-col gap-6">
                <div class="flex items-center gap-4">
                    <div
                        class="w-12 h-12 rounded-full flex items-center justify-center shrink-0 bg-warning-50 dark:bg-warning-950/30 text-warning-600">
                        <UIcon name="i-lucide-archive" class="text-2xl" />
                    </div>
                    <div>
                        <h3 class="text-xl font-bold leading-tight">Archive Course?</h3>
                        <p class="text-sm text-neutral-500 mt-1">This will hide it from your active dashboard.</p>
                    </div>
                </div>

                <p class="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    Are you sure you want to archive <span class="font-bold text-neutral-900 dark:text-white">"{{
                        course.title }}"</span>? You can still find it later in the Archived tab.
                </p>

                <div class="flex items-center justify-end gap-3 pt-2">
                    <UButton label="Cancel" variant="ghost" color="neutral" @click="isArchiveOpen = false" />
                    <UButton label="Archive Course" color="warning" @click="handleArchive" />
                </div>
            </div>
        </template>
    </UModal>

    <!-- Delete Confirmation Modal -->
    <UModal v-model:open="isDeleteOpen">
        <template #content>
            <div class="p-6 flex flex-col gap-6">
                <div class="flex items-center gap-4">
                    <div
                        class="w-12 h-12 rounded-full flex items-center justify-center shrink-0 bg-error-50 dark:bg-error-950/30 text-error-600">
                        <UIcon name="i-lucide-alert-triangle" class="text-2xl" />
                    </div>
                    <div>
                        <h3 class="text-xl font-bold leading-tight">Delete Course?</h3>
                        <p class="text-sm text-neutral-500 mt-1">This action cannot be undone.</p>
                    </div>
                </div>

                <p class="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    Are you sure you want to delete <span class="font-bold text-neutral-900 dark:text-white">"{{
                        course.title }}"</span>? All associated lessons and progress will be permanently removed.
                </p>

                <div class="flex items-center justify-end gap-3 pt-2">
                    <UButton label="Cancel" variant="ghost" color="neutral" @click="isDeleteOpen = false" />
                    <UButton label="Delete Course" color="error" @click="handleDelete" />
                </div>
            </div>
        </template>
    </UModal>
</template>
