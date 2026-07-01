<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const courseStore = useCourseStore()

const courseId = route.params.courseId as string
const course = computed(() => courseStore.getCourseBySlugOrId(courseId))

// Redirect if course is not published
watchEffect(() => {
    if (course.value && !course.value.isPublished) {
        router.replace(`/app/courses/${courseId}/settings`)
    }
})

const workspaceStore = useWorkspaceStore()
const workspace = computed(() => workspaceStore.currentWorkspace)

// Wire up from approved members, but mock the progress stats for the UI
const members = computed(() => {
    // 1. Replicate enrollments.vue logic to determine if approved
    const mapped = workspace.value?.members?.map((m: any, i: number) => ({
        ...m,
        isApproved: m.isApproved !== undefined ? m.isApproved : (i % 5 === 1 || i % 5 === 2 || i % 5 === 4)
    })) || []

    // 2. Filter for approved members only
    const approved = mapped.filter((r: any) => r.isApproved === true)

    // 3. Attach mock progress data
    const targetDates = ['Aug 8 target', 'Sep 12 target', 'Oct 1 target', 'No target', 'Dec 15 target', 'No target']
    const lastActives = ['4d ago', '2h ago', '1w ago', 'Yesterday', 'Never', 'Just now', '3w ago']
    
    return approved.map((m: any, i: number) => {
        const completedTopics = i === 0 ? 3 : i === 1 ? 1 : Math.floor(Math.random() * 9)
        const totalTopics = 9
        const percentage = Math.round((completedTopics / totalTopics) * 100)
        return {
            ...m,
            completedTopics,
            totalTopics,
            percentage,
            masteryGap: 100 - percentage,
            passingRate: percentage === 0 ? 0 : Math.min(100, percentage + Math.floor(Math.random() * 40 + 10)),
            targetDate: targetDates[i % targetDates.length],
            lastActive: lastActives[i % lastActives.length]
        }
    })
})
</script>

<template>
    <UContainer class="max-w-5xl py-8" v-if="course">
        <div class="flex flex-col gap-8">
            <!-- Header -->
            <div class="flex items-center justify-between gap-4">
                <div class="flex items-center gap-4">
                    <UButton icon="i-lucide-arrow-left" color="neutral" variant="ghost" size="sm"
                        :to="`/app/courses/${courseId}`" />
                    <div class="flex items-center gap-3">
                        <div
                            class="w-10 h-10 flex items-center justify-center rounded-xl bg-primary-500/10 text-primary-500 border border-primary-500/20">
                            <UIcon :name="course.icon || 'i-lucide-book'" class="text-xl" />
                        </div>
                        <div>
                            <h1 class="text-2xl font-bold tracking-tight">Learner Progress</h1>
                            <p class="text-sm text-neutral-500 truncate max-w-sm">{{ course.title }}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="flex flex-col gap-4">

                <UCard :ui="{ body: 'p-0 sm:p-0' }" class="overflow-hidden">
                    <div class="flex flex-col">
                        <div v-for="(member, index) in members" :key="member.id"
                            class="flex items-center justify-between p-4 sm:p-6"
                            :class="{ 'border-b border-default': index !== members.length - 1 }">

                            <!-- User Info -->
                            <div class="flex items-center gap-4 w-1/3">
                                <div class="relative shrink-0">
                                    <UAvatar :src="member.avatar" :alt="member.name" size="lg"
                                        :ui="{ root: 'bg-neutral-100 dark:bg-neutral-800' }" />
                                    <div class="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white dark:border-neutral-900"
                                        :class="member.status === 'online' ? 'bg-emerald-500' : 'bg-neutral-300 dark:bg-neutral-600'">
                                        <span v-if="member.status === 'online'"
                                            class="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-75"></span>
                                    </div>
                                </div>
                                <div class="flex flex-col">
                                    <span class="font-bold text-sm sm:text-base">{{ member.name }}</span>
                                    <span class="text-xs sm:text-sm text-dimmed">{{ member.completedTopics }}/{{
                                        member.totalTopics }} lessons</span>
                                </div>
                            </div>

                            <!-- Progress Bar & Stats -->
                            <div class="flex flex-col gap-1.5 flex-1 max-w-[240px]">
                                <div class="flex items-center gap-3">
                                    <UProgress :model-value="member.percentage" color="primary" size="sm" />
                                    <span class="font-bold text-sm text-primary w-10 text-right">{{ member.percentage }}%</span>
                                </div>
                                <div class="flex items-center gap-2 text-[10px] sm:text-xs text-dimmed">
                                    <div><span class="text-primary font-bold">{{ member.masteryGap }}%</span> mastery gap</div>
                                    <UIcon name="i-lucide-dot" class="size-3" />
                                    <div><span class="text-primary font-bold">{{ member.passingRate }}%</span> pass rate</div>
                                </div>
                            </div>

                            <!-- Target and Last Active -->
                            <div class="flex items-center justify-end gap-8 w-1/3 text-xs sm:text-sm text-dimmed">
                                <div class="w-24 text-right">{{ member.targetDate }}</div>
                                <div class="w-16 text-right">{{ member.lastActive }}</div>
                            </div>

                        </div>
                    </div>
                </UCard>
            </div>
        </div>
    </UContainer>
</template>
