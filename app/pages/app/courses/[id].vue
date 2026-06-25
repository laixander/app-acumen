<script setup lang="ts">

import { computed, onMounted } from 'vue'

import { GOAL_COLORS } from '~/constants/courses'
import type { SessionState, SessionProcessingLine } from '~/types/session'

const route = useRoute()
const courseStore = useCourseStore()
const lessonStore = useLessonStore()
const toast = useToast()

// Register unsaved-changes guard: dirty while a session is in-flight
// (processing/ready/active). 'complete' and 'plan' are already committed.
const { registerUnsavedCheck } = useUnsavedChanges()
const unregister = registerUnsavedCheck(() =>
    sessionState.value === 'processing' ||
    sessionState.value === 'ready' ||
    sessionState.value === 'active'
)
onUnmounted(unregister)

const course = computed(() => {
    return courseStore.getCourseBySlugOrId(route.params.id as string)
})


// Dynamically count courses authored by the same user so newly created courses are counted
const coursesCountForAuthor = computed(() => {
    if (!course.value?.createdBy?.id) return 0
    return courseStore.courses.filter(t => t.createdBy?.id === course.value!.createdBy!.id).length
})

// Percentage gap left before this course is fully mastered
const masteryGap = computed(() => Math.max(0, 100 - (course.value?.progress ?? 0)))

// Passing rate: % of assessment-type lessons that are completed
const passingRate = computed(() => {
    const assessments = lessonStore.lessons.filter(l => l.type === 'Assessment')
    if (assessments.length === 0) return 0
    const passed = assessments.filter(l => l.status === 'completed').length
    return Math.round((passed / assessments.length) * 100)
})

const { data: serverLessons } = await useFetch(`/api/lessons?courseId=${route.params.id}`)

const lessons = computed(() => {
    const courseId = course.value?.id || (route.params.id as string)
    const local = lessonStore.getLessonsByCourse(courseId)
    return local.length > 0 ? local : (serverLessons.value || [])
})



useHead({
    title: course.value ? `${course.value.title} - LearnFast` : 'Course Not Found'
})

// SessionState Logic
const strongLessons = computed(() => course.value?.strongCourses || [])

const weakLessons = computed(() => course.value?.weakCourses || [])

const weakestCourse = computed(() => weakLessons.value[0] || { name: course.value?.title || 'this course', progress: 0, color: 'text-orange-500' })

const recommendedLesson = computed(() => {
    if (lessonStore.lessons && lessonStore.lessons.length > 0) {
        const courseId = course.value?.id || (route.params.id as string)
        const courseLessons = lessonStore.getLessonsByCourse(courseId)

        const assessmentLesson = courseLessons.find(l => l.type === 'Assessment')
        if (assessmentLesson) return assessmentLesson

        return courseLessons.find(l => l.assessmentId) || courseLessons[0]
    }
    return null
})


const activeAssessment = computed(() => {
    if (!recommendedLesson.value || !recommendedLesson.value.id) return null
    return lessonStore.getAssessmentByLessonId(recommendedLesson.value.id)
})

const sessionState = ref<SessionState>('idle')

const startSession = () => {
    sessionState.value = 'processing'
    window.scrollTo({ top: 0, behavior: 'smooth' })
}

const processingLines = computed<SessionProcessingLine[]>(() => [
    { text: 'Reading your mastery profile...', delay: 800 },
    { text: `You are <span class="text-primary font-bold">weakest on ${weakestCourse.value?.name || 'this course'}</span>. Last practiced 3 days ago — decaying.`, delay: 1500 },
    { text: `You learn faster through <span class="text-primary font-bold">${recommendedLesson.value?.type === 'video' ? 'visual explanations' : 'active problem solving'}</span>. Selecting <span class="text-primary font-bold">${recommendedLesson.value?.title || 'Course Review'}</span>.`, delay: 1500 },
    { text: `Selecting targeted material. Difficulty: <span class="text-primary font-bold">medium</span>. You have time for ${recommendedLesson.value?.duration || '~10 min'}.`, delay: 1500 }
])

const handleProcessingComplete = () => {
    sessionState.value = 'ready'
}

const beginSessionAction = () => {
    sessionState.value = 'active'
    window.scrollTo({ top: 0, behavior: 'smooth' })
}

const handleSessionComplete = () => {
    sessionState.value = 'complete'
    window.scrollTo({ top: 0, behavior: 'smooth' })

    // Simulate analysis update for new courses
    if (course.value && course.value.stats?.[0]?.value === '0%') {
        const total = lessonStore.lessons.length
        const completed = 1
        const progress = Math.round((completed / total) * 100)

        courseStore.updateCourse(course.value.id, {
            progress,
            lessons: `${completed}/${total}`,
            stats: [
                { label: 'Master (Overall)', value: '15%', subtext: 'Initial session complete', icon: 'i-lucide-award' },
                { label: 'Pass Probability', value: '52%', subtext: '+7% improvement', icon: 'i-lucide-line-chart' },
                { label: 'Sessions This Week', value: '1', subtext: '0.5 hrs total', icon: 'i-lucide-calendar-days' }
            ],
            strongCourses: lessonStore.lessons.slice(0, 2).map(l => ({
                name: l.title.split(':').pop()?.trim() || l.title,
                progress: 85,
                color: 'text-green-500'
            })),
            weakCourses: lessonStore.lessons.slice(2, 4).map(l => ({
                name: l.title.split(':').pop()?.trim() || l.title,
                progress: 42,
                color: 'text-orange-500'
            }))
        })
    }
}

const handleViewPlan = () => {
    sessionState.value = 'plan'
    window.scrollTo({ top: 0, behavior: 'smooth' })
}

const resetSession = () => {
    sessionState.value = 'idle'
    window.scrollTo({ top: 0, behavior: 'smooth' })
}

const isConfidentTestModalOpen = ref(false)
const isCancelModalOpen = ref(false)

// --- Timer logic extracted to AppSessionTimer component ---

// Simulation Logic
const simulateDownload = (filename: string) => {
    toast.add({
        id: 'downloading',
        title: 'Downloading...',
        description: `Preparing ${filename}`,
        icon: 'i-lucide-loader-2',
        color: 'primary',
        ui: {
            icon: 'animate-spin'
        }
    })

    setTimeout(() => {
        toast.remove('downloading')
        toast.add({
            title: 'Download Complete',
            description: `${filename} has been saved successfully.`,
            icon: 'i-lucide-check-circle',
            color: 'success'
        })
    }, 2000)
}
</script>

<template>
    <UContainer v-if="course" class="py-6">
        <Transition name="fade" mode="out-in">
            <div v-if="sessionState === 'idle'" class="flex flex-col gap-6">
                <!-- Breadcrumbs -->
                <div class="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                    <AppBreadcrumb />
                    <div class="flex gap-2">
                        <UButton label="Course Settings" icon="i-lucide-settings-2" variant="soft" size="sm"
                            :to="`/app/courses/${course.id}/settings`" />
                        <UButton label="Close" leading-icon="i-lucide-x" color="neutral" variant="soft" size="sm"
                            to="/app/courses/collection" :ui="{ leadingIcon: 'size-3' }" />
                    </div>
                </div>
                <!-- <nav class="flex items-center gap-2 text-sm text-neutral-500">
                    <ULink to="/app/courses/collection" class="hover:text-primary transition-colors">Collection</ULink>
                    <UIcon name="i-lucide-chevron-right" class="w-3.5 h-3.5" />
                    <ULink :to="`/app/courses/${course.id}`" class="hover:text-primary transition-colors">{{ course.title }}
                    </ULink>
                    <UIcon name="i-lucide-chevron-right" class="w-3.5 h-3.5" />
                    <span class="font-medium text-neutral-900 dark:text-neutral-100">Lessons</span>
                </nav> -->

                <div class="flex flex-col gap-8 pb-12">
                    <!-- Hero Section -->
                    <UCard class="relative overflow-hidden" variant="outline" :ui="{ body: 'p-6 sm:p-10' }">
                        <div
                            class="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-transparent to-transparent pointer-events-none" />

                        <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <ContentHeading :title="course.title" :icon="course.icon">
                                <template #description>
                                    <div
                                        class="text-dimmed max-w-lg flex flex-col sm:flex-row items-start sm:items-center gap-2">
                                        <!-- Percentage to mastery -->
                                        <div class="flex items-center gap-2">
                                            <span class="text-primary font-bold">{{ masteryGap }}%</span> more to
                                            mastery!
                                        </div>
                                        <UIcon name="i-lucide-dot" class="size-6 flex text-dimmed hidden sm:block" />
                                        <!-- An AI-curated learning path tailored for you. -->
                                        <div class="flex items-center gap-2">
                                            <span class="text-primary font-bold">{{ passingRate }}%</span> passing rate
                                        </div>
                                    </div>
                                </template>
                            </ContentHeading>

                            <UButton @click="isConfidentTestModalOpen = true" label="Confident Test"
                                trailing-icon="i-lucide-arrow-right" size="xl" color="primary"
                                :ui="{ trailingIcon: 'size-4' }"
                                class="rounded-full px-8 py-4 uppercase text-sm font-semibold tracking-widest hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 shrink-0 relative z-10 w-fit" />

                            <!-- <div class="flex flex-col items-end gap-1 text-right border-l-2 border-primary/20 pl-4">
                                <span class="text-xs font-semibold tracking-wider text-muted uppercase whitespace-nowrap">
                                    {{ course.learningGoal || 'Target Exam' }} · {{ course.examInfo?.name ?? '—' }}
                                </span>
                                <span class="text-3xl font-bold text-primary whitespace-nowrap">{{ course.examInfo?.daysAway ?? '?' }} Days Away</span>
                            </div> -->
                        </div>
                    </UCard>

                    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <!-- Main Timeline Column -->
                        <div class="md:col-span-2 flex flex-col gap-6">

                            <div
                                class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-default pb-4">
                                <h2 class="text-lg font-bold flex items-center gap-2">
                                    <UIcon name="i-lucide-list-ordered" class="text-primary" />
                                    Lesson Timeline
                                </h2>
                                <!-- <UBadge label="Generated by AI" variant="soft" color="neutral" size="sm"
                                    class="text-dimmed uppercase tracking-wider text-xs font-medium px-2 py-1 rounded-md" /> -->
                                <div class="flex items-center gap-2">
                                    <UBadge variant="soft" color="neutral" size="sm" icon="i-lucide-check"
                                        class="text-dimmed uppercase tracking-wider text-xs font-medium px-2 py-1 rounded-md">
                                        {{lessons.filter(l => l.status === 'completed').length}}/{{ lessons.length }}
                                    </UBadge>
                                    <UBadge variant="soft" color="neutral" size="sm"
                                        class="text-dimmed uppercase tracking-wider text-xs font-medium px-2 py-1 rounded-md">
                                        {{ lessons.length }} Lessons
                                    </UBadge>
                                    <UBadge variant="soft" color="neutral" size="sm"
                                        class="text-dimmed uppercase tracking-wider text-xs font-medium px-2 py-1 rounded-md">
                                        {{lessons.filter(l => l.type === 'Assessment').length}} Assessments
                                    </UBadge>
                                </div>
                            </div>

                            <!-- TIMELINE COMPONENT -->
                            <div class="relative pl-6 ml-2 mt-4 space-y-8">
                                <!-- Vertical Line -->
                                <div
                                    class="flex flex-col absolute -left-[1px] top-0 bottom-0 w-0.5 h-full py-12 rounded-full">
                                    <div class="bg-muted flex-1" />
                                </div>

                                <div v-for="(lesson, index) in lessons" :key="index" class="relative group">
                                    <!-- Timeline Dot / Icon -->
                                    <div class="absolute top-8 -left-[38px] w-7 h-7 rounded-full flex items-center justify-center border-[3px] border-white dark:border-neutral-900 z-10 transition-colors duration-300"
                                        :class="{
                                            'bg-green-500 text-white': lesson.status === 'completed',
                                            'shadow-[0_0_15px_rgba(var(--color-primary-500),0.5)]': lesson.status === 'current',
                                            'bg-primary-500 text-white': lesson.status === 'current' && lesson.color === 'primary',
                                            'bg-orange-500 text-white': lesson.status === 'current' && lesson.color === 'orange',
                                            'bg-purple-500 text-white': lesson.status === 'current' && lesson.color === 'purple',
                                            'bg-neutral-200 dark:bg-neutral-800 text-dimmed': lesson.status === 'locked'
                                        }">
                                        <UIcon v-if="lesson.status === 'completed'" name="i-lucide-check"
                                            class="text-sm" />
                                        <div v-else-if="lesson.status === 'current'"
                                            class="w-2 h-2 rounded-full bg-white animate-ping" />
                                        <div v-else
                                            class="w-1.5 h-1.5 rounded-full bg-neutral-400 dark:bg-neutral-600" />
                                    </div>

                                    <!-- Content Card -->
                                    <UCard variant="subtle" class="transition-all duration-300 transform" :class="{
                                        'opacity-50 grayscale-[0.3] hover:grayscale-0 hover:opacity-100 cursor-pointer'
                                            : lesson.status === 'completed',
                                        'ring-2 shadow-md transform -translate-y-1 relative overflow-hidden cursor-pointer'
                                            : lesson.status === 'current',
                                        'ring-primary-500': lesson.status === 'current' && lesson.color === 'primary',
                                        'ring-orange-500': lesson.status === 'current' && lesson.color === 'orange',
                                        'ring-purple-500': lesson.status === 'current' && lesson.color === 'purple',
                                        'opacity-100 grayscale-0 pointer-events-none'
                                            : lesson.status === 'locked',
                                        'hover:-translate-y-1 hover:shadow-md cursor-pointer'
                                            : lesson.status !== 'locked' && lesson.status !== 'current'
                                    }" :ui="{ body: 'flex items-start gap-4 p-4 sm:p-5' }"
                                        @click="lesson.status !== 'locked' && navigateTo(`/app/courses/${route.params.id}/${lesson.id}`)">
                                        <template v-if="lesson.status === 'current'">
                                            <div v-if="lesson.color === 'primary'"
                                                class="absolute inset-0 bg-primary-500/5 pointer-events-none" />
                                            <div v-if="lesson.color === 'orange'"
                                                class="absolute inset-0 bg-orange-500/5 pointer-events-none" />
                                            <div v-if="lesson.color === 'purple'"
                                                class="absolute inset-0 bg-purple-500/5 pointer-events-none" />
                                        </template>
                                        <div class="bg-neutral-100 dark:bg-neutral-800 p-2.5 rounded-lg shrink-0"
                                            :class="{
                                                'text-primary-500 dark:text-primary-400 bg-primary-100 dark:bg-primary-500/10': lesson.status === 'current' && lesson.color === 'primary',
                                                'text-orange-500 dark:text-orange-400 bg-orange-100 dark:bg-orange-500/10': lesson.status === 'current' && lesson.color === 'orange',
                                                'text-purple-500 dark:text-purple-400 bg-purple-100 dark:bg-purple-500/10': lesson.status === 'current' && lesson.color === 'purple'
                                            }">
                                            <UIcon :name="lesson.status === 'locked' ? 'i-lucide-lock' : lesson.icon"
                                                class="text-lg flex" />
                                        </div>
                                        <div class="flex-1 min-w-0">
                                            <div class="flex items-center justify-between gap-2">
                                                <h3 class="font-bold text-base truncate" :class="{
                                                    'text-primary-600 dark:text-primary-400': lesson.status === 'current' && lesson.color === 'primary',
                                                    'text-orange-600 dark:text-orange-400': lesson.status === 'current' && lesson.color === 'orange',
                                                    'text-purple-600 dark:text-purple-400': lesson.status === 'current' && lesson.color === 'purple'
                                                }">
                                                    {{ lesson.title }}
                                                </h3>
                                                <UBadge variant="subtle" size="sm"
                                                    :color="lesson.status === 'current' ? 'primary' : 'neutral'"
                                                    class="shrink-0 font-medium font-mono">
                                                    {{ lesson.duration }}
                                                </UBadge>
                                            </div>
                                            <p class="text-sm text-dimmed mt-1.5 leading-relaxed truncate">{{
                                                lesson.summary
                                            }}
                                            </p>
                                        </div>
                                    </UCard>
                                </div>
                            </div>
                        </div>

                        <!-- Sidebar Content -->
                        <div>
                            <div class="flex flex-col gap-6 sticky top-20">
                                <!-- Progress Card -->
                                <AppCourseWidgetProgress :progress="course.progress" />

                                <!-- Description Card -->
                                <AppCourseWidgetDescription :description="course.description" />

                                <!-- Learning Goal Card -->
                                <AppCourseWidgetLearningGoal :goal="course.learningGoal" />

                                <!-- Schedule and Targets Card -->
                                <AppCourseWidgetSchedule :target-finish-date="course.targetFinishDate"
                                    :sessions-per-week="course.sessionsPerWeek" :items-per-week="course.itemsPerWeek" />

                                <!-- Tags Card (commented out in original) -->
                                <!-- <UCard variant="soft" :ui="{ body: 'p-5 flex flex-col' }">
                                    <div class="flex items-center justify-between mb-2">
                                        <span class="text-sm font-semibold uppercase tracking-wider text-muted">
                                            Tags
                                        </span>
                                    </div>
                                    <div class="flex flex-wrap gap-2">
                                        <UBadge :label="course.tag" variant="soft" />
                                        <UBadge v-if="course.learningGoal" :label="course.learningGoal" variant="subtle"
                                            :color="GOAL_COLORS[course.learningGoal]" />
                                    </div>
                                </UCard> -->

                                <!-- Knowledge Sources Details -->
                                <AppCourseWidgetContext :title="course.title" @download="simulateDownload" />

                                <!-- Author Widget -->
                                <AppCourseWidgetAuthor v-if="course.createdBy" :author="course.createdBy"
                                    :course-count="coursesCountForAuthor" />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <!-- Session Container -->
            <div v-else class="relative flex flex-col gap-6">
                <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div class="flex flex-col gap-1 w-full">
                        <p class="text-muted">Confident Test</p>
                        <h1 class="text-3xl font-bold tracking-tight truncate">{{ course.title }}</h1>
                    </div>
                    <!-- Cancel Assessment Button -->
                    <UButton v-if="['processing', 'ready', 'active'].includes(sessionState)" label="Cancel Assessment"
                        variant="soft" color="neutral" icon="i-lucide-x" @click="isCancelModalOpen = true"
                        :ui="{ leadingIcon: 'size-3' }" size="sm" />
                </div>
                <UCard ref="assessmentCard"
                    class="w-full relative border-none ring-1 ring-primary/20 shadow-2xl shadow-primary/5 overflow-hidden transition-all duration-500"
                    :ui="{ body: 'p-0 sm:p-0' }">

                    <AppSessionProcessing v-if="sessionState === 'processing'" :lines="processingLines"
                        @complete="handleProcessingComplete" />

                    <AppSessionReady v-else-if="sessionState === 'ready'"
                        :course-name="weakestCourse?.name || 'Current Course'"
                        :module-title="recommendedLesson?.title || 'Scenario Court'" difficulty="Medium"
                        :duration="recommendedLesson?.duration || '~10 min'" @start="beginSessionAction" />

                    <AppSessionActive v-else-if="sessionState === 'active' && recommendedLesson"
                        :questions="activeAssessment?.questions || []"
                        :module-title="recommendedLesson.title || 'Course Review'" @close="resetSession"
                        @complete="handleSessionComplete" />

                    <AppSessionComplete v-else-if="sessionState === 'complete'"
                        :module-title="activeAssessment?.title || 'Course Review'"
                        :what-you-did-well="activeAssessment?.whatYouDidWell || 'Understanding core concepts'"
                        :where-you-struggled="activeAssessment?.whereYouStruggled || 'Applying logic to complex scenarios'"
                        :pass-prob-before="activeAssessment?.passProbBefore || '45%'"
                        :pass-prob-after="activeAssessment?.passProbAfter || '62%'"
                        :ai-final-comment="activeAssessment?.aiFinalComment || 'You are making steady progress. Keep focusing on the application of rules.'"
                        @close="resetSession" @view-plan="handleViewPlan" />

                    <AppSessionReadinessPlan v-else-if="sessionState === 'plan'" :weakest-course="weakestCourse"
                        @close="resetSession" />
                </UCard>
            </div>
        </Transition>
    </UContainer>

    <!-- 404 Empty State -->
    <div v-else class="flex flex-col items-center justify-center py-20 text-center">
        <UIcon name="i-lucide-file-search-corner" class="text-6xl text-dimmed mb-4" />
        <h2 class="text-2xl font-bold">Course not found</h2>
        <p class="text-muted mt-2">The course you're looking for doesn't exist or has been deleted.</p>
        <UButton label="Back to Dashboard" color="primary" variant="subtle" to="/app/dashboard" class="mt-6" />
    </div>

    <!-- Timer Widget -->
    <div class="fixed bottom-6 right-6 z-50 transition-all duration-500 ease-in-out">
        <AppSessionTimer v-if="sessionState !== 'idle'" :session-state="sessionState"
            :duration="recommendedLesson?.duration ?? '—'"
            class="shadow-2xl ring-1 ring-primary/20 backdrop-blur-md bg-background/80" />
    </div>

    <!-- Confirm Modal -->
    <AdminConfirmModal v-model:open="isConfidentTestModalOpen" title="Start Confident Test?"
        description="Taking this test will recalibrate your lesson timeline — Acumen AI will re-order and tailor the material based on your results, optimising your journey to mastery."
        confirm-label="Yes, Start Test" confirm-color="primary"
        @confirm="() => { isConfidentTestModalOpen = false; startSession() }" />

    <!-- Cancel Assessment Modal -->
    <AdminConfirmModal v-model:open="isCancelModalOpen" title="Cancel Assessment?"
        description="Are you sure you want to cancel the current assessment? Your progress will be lost."
        confirm-label="Yes, Cancel" confirm-color="error"
        @confirm="() => { isCancelModalOpen = false; resetSession(); toast.add({ title: 'Assessment Cancelled', description: 'Your session has been successfully cancelled.', color: 'red' }) }" />
</template>
<style scoped>
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-fade-in {
    animation: fadeIn 0.4s ease-out forwards;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.4s ease, transform 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: translateY(15px);
}
</style>