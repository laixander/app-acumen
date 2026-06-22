<script setup lang="ts">

import { COURSE_TAGS, COURSE_STATUSES, COURSE_SORT_OPTIONS } from '~/constants/courses'

const searchQuery = ref('')
const selectedTag = ref('All')
const currentStatus = ref('Ongoing')
const viewMode = ref<'grid' | 'list'>('grid')
const sortBy = ref('Recent')

const tags = COURSE_TAGS
const statuses = COURSE_STATUSES
const sortOptions = COURSE_SORT_OPTIONS

const courseStore = useCourseStore()

const filteredCourses = computed(() => {
    return courseStore.courses
        .filter(course => {
            const matchesSearch = course.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                course.tag.toLowerCase().includes(searchQuery.value.toLowerCase())
            const matchesTag = selectedTag.value === 'All' || course.tag === selectedTag.value
            const matchesStatus = currentStatus.value === 'All' || course.status === currentStatus.value
            return matchesSearch && matchesTag && matchesStatus
        })
        .sort((a, b) => {
            if (sortBy.value === 'Progress') return b.progress - a.progress
            if (sortBy.value === 'Alphabetical') return a.title.localeCompare(b.title)
            return 0 // 'Recent' is default (already roughly sorted)
        })
})

</script>

<template>
    <UContainer class="flex flex-col gap-8 py-12">
        <header class="flex items-end gap-4">
            <ContentHeading title="Course Collection" description="Manage and organize your learning course." />
            <div class="flex items-center gap-2 shrink-0">
                <UInput v-model="searchQuery" icon="i-lucide-search" placeholder="Search course..." size="sm"
                    class="w-64" />
                <USelect v-model="sortBy" :items="sortOptions" size="sm" class="w-32">
                    <template #leading>
                        <UIcon name="i-lucide-list-filter" class="size-4" />
                    </template>
                </USelect>
                <USeparator orientation="vertical" class="mx-2 h-6" />
                <UButton label="New Course" icon="i-lucide-plus" color="primary" size="sm" to="/app/courses/new" />
            </div>
        </header>

        <div class="flex flex-col gap-6 relative">
            <!-- Status Tabs -->
            <div class="flex items-center gap-4 border-b border-neutral-200 dark:border-neutral-800">
                <UButton v-for="status in statuses" :key="status"
                    class="px-4 py-2 text-sm font-medium transition-colors relative"
                    :class="currentStatus === status ? 'text-primary pointer-events-none' : 'text-dimmed hover:text-neutral-900 dark:hover:text-white'"
                    variant="link" @click="currentStatus = status">
                    {{ status }}
                    <div v-if="currentStatus === status"
                        class="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
                </UButton>
                <!-- <AppViewModeToggle v-model="viewMode" class="ml-auto" /> -->
            </div>

            <div v-if="filteredCourses.length > 0"
                :class="[viewMode === 'grid' ? 'grid lg:grid-cols-3 gap-6' : 'flex flex-col gap-4']">
                <AppCourseCard v-for="course in filteredCourses" :key="course.title" :course="course" :view-mode="viewMode" />
            </div>

            <!-- Empty State -->
            <div v-else
                class="flex flex-col items-center justify-center py-20 px-4 text-center bg-neutral-50 dark:bg-neutral-900/50 rounded-2xl border-2 border-dashed border-neutral-200 dark:border-neutral-800">
                <div class="bg-primary/10 p-4 rounded-full mb-4">
                    <UIcon :name="courseStore.courses.length === 0 ? 'i-lucide-database' : 'i-lucide-inbox'"
                        class="flex text-4xl text-primary" />
                </div>
                <h3 class="text-lg font-bold">{{ courseStore.courses.length === 0 ? 'You have no courses yet' : 'No courses found' }}
                </h3>
                <p class="text-dimmed max-w-xs mt-1">
                    {{
                        courseStore.courses.length === 0 ?
                            "It looks empty here. Add a new course or use the seeder button below to test things out!" :
                            "We couldn't find any courses matching your current filters. Try adjusting them!"
                    }}
                </p>
                <div class="flex items-center gap-3 mt-6">
                    <UButton v-if="courseStore.courses.length > 0" label="Clear Filters" color="neutral" variant="ghost"
                        @click="searchQuery = ''; selectedTag = 'All'; currentStatus = 'All'" />
                    <UButton v-else label="Create Course" color="primary" to="/app/courses/new" />
                </div>
            </div>
        </div>
    </UContainer>
</template>