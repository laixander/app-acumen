<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'


import { computed, ref, watchEffect } from 'vue'
import type { LessonContent } from '~/types/course'
import type { ChatQuote } from '~/types/chat'

definePageMeta({
    middleware: [
        function (to, from) {
            if (!to.meta.breadcrumb) to.meta.breadcrumb = {}
        }
    ]
})

const route = useRoute()
const router = useRouter()
const lessonStore = useLessonStore()
const courseStore = useCourseStore()

const { data: serverLessonData } = await useFetch<LessonContent>(`/api/lesson/${route.params.lessonId}`)
const localLessonData = computed(() => lessonStore.getLessonContentById(route.params.lessonId as string))

const lessonData = computed(() => {
    return localLessonData.value || serverLessonData.value
})

const title = computed(() => {
    return lessonData.value?.title || 'Lesson Viewer'
})

const adjacent = computed(() => lessonStore.getAdjacentLessons(route.params.lessonId as string))

const course = computed(() => {
    const courseId = route.params.courseId as string
    if (!courseId) return null
    return courseStore.getCourseBySlugOrId(courseId)
})

watchEffect(() => {
    if (course.value) {
        (route.meta.breadcrumb as Record<string, string>)[route.params.courseId as string] = course.value.title;
    }
    if (lessonData.value) {
        (route.meta.breadcrumb as Record<string, string>)[route.params.lessonId as string] = lessonData.value.title;
    }
})

const handlePrevious = () => {
    if (adjacent.value.prev) {
        router.push(`/app/courses/${route.params.courseId}/${adjacent.value.prev.id}`)
    }
}

const handleContinue = () => {
    lessonStore.completeLesson(route.params.lessonId as string)

    const courseId = route.params.courseId as string
    if (courseId) {
        const courseObj = courseStore.getCourseBySlugOrId(courseId)
        const actualCourseId = courseObj?.id || courseId
        const courseLessons = lessonStore.getLessonsByCourse(actualCourseId)

        const completedCount = courseLessons.filter(l => l.status === 'completed').length
        const totalCount = courseLessons.length
        const progress = Math.round((completedCount / totalCount) * 100)
        if (courseObj?.id) courseStore.updateCourseProgress(courseObj.id, progress)
    }

    if (adjacent.value.next) {
        router.push(`/app/courses/${route.params.courseId}/${adjacent.value.next.id}`)
    } else {
        router.push(courseId ? `/app/courses/${courseId}` : '/app/dashboard')
    }
}

useHead({
    title: `${title.value} - LearnFast Lesson`
})

const pendingQuote = ref<ChatQuote | null>(null)

const handleAskAboutLine = (payload: ChatQuote) => {
    pendingQuote.value = payload
}

// Notes Logic
const isNotesOpen = ref(false)
const newNoteContent = ref('')

const lessonNotes = computed(() => {
    const notes = [...lessonStore.getNotesByLessonId(route.params.lessonId as string)]
    return notes.sort((a, b) => {
        if (a.isPinned && !b.isPinned) return -1
        if (!a.isPinned && b.isPinned) return 1
        return b.createdAt - a.createdAt
    })
})

const pinnedCount = computed(() => lessonNotes.value.filter(n => n.isPinned).length)

const handleAddNote = () => {
    if (newNoteContent.value.trim()) {
        lessonStore.addNote(route.params.lessonId as string, newNoteContent.value.trim())
        newNoteContent.value = ''
    }
}

const handleDeleteNote = (noteId: string) => {
    lessonStore.deleteNote(route.params.lessonId as string, noteId)
}

const handleTogglePinNote = (noteId: string) => {
    lessonStore.togglePinNote(route.params.lessonId as string, noteId)
}

const handleLineAddNote = (payload: { line: string, sectionIdx: number, lineIdx: number }) => {
    const quote = `> "${payload.line}"\n\n`
    newNoteContent.value = newNoteContent.value ? newNoteContent.value + '\n\n' + quote : quote
    isNotesOpen.value = true
}
</script>

<template>
    <UContainer class="py-6">
        <!-- Breadcrumbs -->
        <div v-if="course" class="flex justify-between items-center">
            <AppBreadcrumb />
            <div class="flex gap-2">
                <UButton label="Close" leading-icon="i-lucide-x" color="neutral" variant="soft" size="sm"
                    :to="`/app/courses/${course.id}`" :ui="{ leadingIcon: 'size-3' }" />
            </div>
        </div>
        <!-- <nav class="flex items-center gap-2 text-sm text-neutral-500">
            <ULink to="/app/courses/collection" class="hover:text-primary transition-colors">Collection</ULink>
            <UIcon name="i-lucide-chevron-right" class="w-3.5 h-3.5" />
            <template v-if="course">
                <ULink :to="`/app/courses/${course.id}`" class="hover:text-primary transition-colors">{{ course.title }}
                </ULink>
                <UIcon name="i-lucide-chevron-right" class="w-3.5 h-3.5" />
            </template>
<ULink :to="`/app/courses/${lessonData?.courseId}`" class="hover:text-primary transition-colors">
    Lessons</ULink>
<UIcon name="i-lucide-chevron-right" class="w-3.5 h-3.5" />
<span class="font-medium text-neutral-900 dark:text-neutral-100">{{ lessonData?.title }}</span>
</nav> -->

        <div class="flex items-center justify-between mt-6">
            <ContentHeading :title="lessonData?.title" :description="`${lessonData?.description}`" />
            <UButton label="Open Notes" icon="i-lucide-notebook-pen" color="neutral" variant="outline"
                @click="isNotesOpen = true" />
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
            <!-- Left Side: Lesson Details -->
            <div class="flex flex-col gap-6 col-span-2">

                <!-- Lesson Transcript / Reading -->
                <UCard class="overflow-visible">
                    <LessonTranscript v-if="lessonData?.sections" :sections="lessonData.sections"
                        @ask-ai="handleAskAboutLine" @open-notes="isNotesOpen = true" @add-note="handleLineAddNote" />

                    <div
                        class="mt-12 pt-6 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
                        <UButton label="Previous Lesson" icon="i-lucide-arrow-left" color="neutral" variant="ghost"
                            :disabled="!adjacent.prev" @click="handlePrevious" />

                        <div class="flex items-center gap-3">
                            <template v-if="lessonData?.assessmentId">
                                <UButton label="Start Checkpoint Assessment" icon="i-lucide-zap" color="primary"
                                    size="lg"
                                    class="rounded-full px-8 shadow-lg shadow-primary-500/20 uppercase text-xs font-bold tracking-widest hover:scale-105 transition-transform"
                                    :to="`/app/assessment/${lessonData.assessmentId}`" />
                            </template>
                            <template v-else>
                                <UButton label="Complete & Continue" icon="i-lucide-check-circle" color="neutral"
                                    variant="soft" @click="handleContinue" />
                            </template>
                        </div>
                    </div>
                </UCard>
            </div>

            <!-- Right Side: AI Chat Panel -->
            <AppAiChatPanel v-model:pendingQuote="pendingQuote" />
        </div>
    </UContainer>

    <!-- Notes Slideover -->
    <USlideover v-model:open="isNotesOpen" title="Lesson Notes" description="Add your personal notes for this lesson.">
        <template #content>
            <div class="flex flex-col gap-6 p-6 h-full overflow-hidden">
                <!-- Add Note Area -->
                <div class="flex flex-col gap-3 shrink-0">
                    <UTextarea v-model="newNoteContent" placeholder="Jot down your thoughts..." :rows="4" autofocus />
                    <div class="flex items-center justify-between">
                        <span class="text-xs font-bold uppercase tracking-widest text-neutral-400">
                            {{ lessonNotes.length }} {{ lessonNotes.length === 1 ? 'Note' : 'Notes' }}
                            <template v-if="pinnedCount > 0">
                                • {{ pinnedCount }} Pinned
                            </template>
                        </span>
                        <UButton label="Add Note" icon="i-lucide-plus" color="primary" @click="handleAddNote"
                            :disabled="!newNoteContent.trim()" />
                    </div>
                </div>

                <!-- Notes List -->
                <div class="flex-1 overflow-y-auto pr-2 flex flex-col gap-4">
                    <div v-if="lessonNotes.length === 0"
                        class="text-sm text-neutral-500 dark:text-neutral-400 text-center py-12 flex flex-col items-center gap-2">
                        <UIcon name="i-lucide-notebook" class="text-4xl text-neutral-300 dark:text-neutral-700" />
                        No notes yet. Add one above!
                    </div>
                    <div v-for="note in lessonNotes" :key="note.id"
                        class="group relative bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-4 rounded-xl shadow-sm flex flex-col gap-2 transition-all hover:border-primary-500/30"
                        :class="note.isPinned ? 'border-primary-200 dark:border-primary-800/50 bg-primary-50/30 dark:bg-primary-900/10' : ''">
                        <div
                            class="absolute top-2 right-2 opacity-0 lg:group-hover:opacity-100 transition-opacity flex items-center gap-1">
                            <UTooltip :text="note.isPinned ? 'Unpin note' : 'Pin note'">
                                <UButton :icon="note.isPinned ? 'i-lucide-pin-off' : 'i-lucide-pin'"
                                    :color="note.isPinned ? 'primary' : 'neutral'" variant="ghost" size="xs"
                                    @click="handleTogglePinNote(note.id)" />
                            </UTooltip>
                            <UTooltip text="Delete note">
                                <UButton icon="i-lucide-trash-2" color="red" variant="ghost" size="xs"
                                    @click="handleDeleteNote(note.id)" />
                            </UTooltip>
                        </div>
                        <UIcon v-if="note.isPinned" name="i-lucide-pin"
                            class="absolute top-4 left-3 text-primary-500 w-3.5 h-3.5 opacity-60" />
                        <div class="text-sm text-neutral-700 dark:text-neutral-300 whitespace-pre-wrap pr-16 leading-relaxed"
                            :class="note.isPinned ? 'pl-5' : ''">{{ note.content }}</div>
                        <div class="text-[10px] text-neutral-400 font-mono uppercase tracking-widest mt-1"
                            :class="note.isPinned ? 'pl-5' : ''">{{ new Date(note.createdAt).toLocaleString() }}</div>
                    </div>
                </div>
            </div>
        </template>
    </USlideover>
</template>
