<script setup lang="ts">
import { useTopics } from '~/composables/useTopics'
import { useLessons } from '~/composables/useLessons'
import { computed, onMounted, ref } from 'vue'
import { injectAssessmentsIntoTimeline } from '~/utils/seeder'
import { TOPIC_CONTENT_MAP } from '~/utils/seeder/topics'

const route = useRoute()
const { topics } = useTopics()
const { getLessonsByTopic, addAssessments, addLessonContents, updateLessonsForTopic } = useLessons()

const topic = computed(() => {
    return topics.value.find(t => t.id === route.params.id)
})

const { data: serverLessons } = await useFetch(`/api/lessons?topicId=${route.params.id}`)

const lessons = computed(() => {
    const local = getLessonsByTopic(route.params.id as string)
    return local.length > 0 ? local : (serverLessons.value || [])
})

// Mock data for the specific screenshot view
const userProfile = {
    name: 'Alex'
}

// Dynamic data from topic seeder
const examInfo = computed(() => topic.value?.examInfo || {
    name: 'LET SEPTEMBER 2026',
    daysAway: 28
})

const stats = computed(() => topic.value?.stats || [
    { label: 'Master (Overall)', value: '0%', subtext: 'No data yet', icon: 'i-lucide-award' },
    { label: 'Pass Probability', value: '0%', subtext: 'at current pace', icon: 'i-lucide-line-chart' },
    { label: 'Sessions This Week', value: '0', subtext: '0 hrs total', icon: 'i-lucide-calendar-days' }
])

const strongTopics = computed(() => topic.value?.strongTopics || [])

const weakTopics = computed(() => topic.value?.weakTopics || [])

const weakestTopic = computed(() => weakTopics.value[0])

const recommendedLesson = computed(() => {
    const content = TOPIC_CONTENT_MAP[route.params.id as string]
    if (!content) return null
    // Prefer lessons with assessments for the "Begin Session" flow
    return content.lessons.find(l => l.assessment) || content.lessons[0]
})

type SessionState = 'idle' | 'processing' | 'ready' | 'active' | 'complete'
const sessionState = ref<SessionState>('idle')
const activeLines = ref<string[]>([])

const processingLines = computed(() => [
    { text: 'Reading your mastery profile...', delay: 800 },
    { text: `You are <span class="text-primary font-bold">weakest on ${weakestTopic.value?.name || 'this topic'}</span>. Last practiced 3 days ago — decaying.`, delay: 1500 },
    { text: `You learn faster through <span class="text-primary font-bold">${recommendedLesson.value?.type === 'video' ? 'visual explanations' : 'active problem solving'}</span>. Selecting <span class="text-primary font-bold">${recommendedLesson.value?.title || 'Topic Review'}</span>.`, delay: 1500 },
    { text: `Selecting targeted material. Difficulty: <span class="text-primary font-bold">medium</span>. You have time for ${recommendedLesson.value?.duration || '~10 min'}.`, delay: 1500 }
])

const startSession = async () => {
    sessionState.value = 'processing'
    window.scrollTo({ top: 0, behavior: 'smooth' })
    activeLines.value = []
    for (const line of processingLines.value) {
        await new Promise(r => setTimeout(r, line.delay))
        activeLines.value.push(line.text)
    }
    await new Promise(r => setTimeout(r, 800))
    sessionState.value = 'ready'
}

const currentQuestionIndex = ref(0)
const selectedOptionId = ref<string | null>(null)
const reasoningText = ref('')

const questions = computed(() => {
    const lessonQuestions = recommendedLesson.value?.assessment?.questions
    if (lessonQuestions && lessonQuestions.length > 0) return lessonQuestions
    
    // Fallback questions if no assessment is found in the seeder
    return [
        { 
            id: 1, 
            text: `Based on your profile, which aspect of ${topic.value?.title || 'this topic'} do you find most challenging?`, 
            options: [
                { id: 'a', label: 'Core Concepts & Theory' },
                { id: 'b', label: 'Practical Applications' },
                { id: 'c', label: 'Problem Solving Speed' },
                { id: 'd', label: 'Retention & Recall' }
            ],
            correct: 'a' 
        }
    ]
})
const currentQuestion = computed(() => questions.value[currentQuestionIndex.value])

const beginSessionAction = () => {
    sessionState.value = 'active'
    currentQuestionIndex.value = 0
    selectedOptionId.value = null
    reasoningText.value = ''
    isReasoningSubmitted.value = false
    isEvaluating.value = false
    window.scrollTo({ top: 0, behavior: 'smooth' })
}

const isReasoningSubmitted = ref(false)
const isEvaluating = ref(false)

const submitReasoning = async () => {
    if (!reasoningText.value) return
    isEvaluating.value = true
    await new Promise(r => setTimeout(r, 1500))
    isEvaluating.value = false
    isReasoningSubmitted.value = true
}

const selectOption = (id: string) => {
    if (selectedOptionId.value) return // Prevent changing answer once selected
    selectedOptionId.value = id
}

const nextQuestion = () => {
    if (currentQuestionIndex.value < questions.value.length - 1) {
        currentQuestionIndex.value++
        selectedOptionId.value = null
        reasoningText.value = ''
        isReasoningSubmitted.value = false
        isEvaluating.value = false
    } else {
        sessionState.value = 'complete'
    }
}

const injectAssessments = () => {
    if (!topic.value) return
    const currentLessons = [...lessons.value]
    if (currentLessons.length === 0) return

    const hasQuizzes = currentLessons.some(l => l.type === 'Assessment')
    if (hasQuizzes) return

    const {
        newTimeline,
        newAssessments,
        newContents
    } = injectAssessmentsIntoTimeline(route.params.id as string, topic.value.title, currentLessons as any[])

    updateLessonsForTopic(route.params.id as string, newTimeline)
    addLessonContents(newContents)
    addAssessments(newAssessments)
}

onMounted(() => {
    injectAssessments()
})

useHead({
    title: topic.value ? `${topic.value.title} - Acumen` : 'Topic Not Found'
})
</script>

<template>
    <UContainer v-if="topic" class="py-8 flex flex-col gap-10">
        <!-- Breadcrumbs -->
        <nav class="flex items-center gap-2 text-sm text-neutral-500">
            <ULink to="/app/topics/collection" class="hover:text-primary transition-colors">Collection</ULink>
            <!-- <template v-if="$route.query.from === 'manage'">
                <UIcon name="i-lucide-chevron-right" class="w-3.5 h-3.5" />
                <ULink to="/app/workspaces" class="hover:text-primary transition-colors">Manage Workspaces</ULink>
            </template> -->
            <UIcon name="i-lucide-chevron-right" class="w-3.5 h-3.5" />
            <span class="font-medium text-neutral-900 dark:text-neutral-100">{{ topic.title }}</span>
        </nav>
        <!-- Header Section -->
        <header class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div class="flex flex-col gap-1">
                <h1 class="text-4xl font-bold tracking-tight">
                    Welcome back, <span class="text-primary">{{ userProfile.name }}.</span>
                </h1>
                <p class="text-muted">You're making great progress towards your goal.</p>
            </div>
            <div class="flex flex-col items-end gap-1 text-right border-l-2 border-primary/20 pl-4">
                <span class="text-xs font-semibold tracking-wider text-muted uppercase">
                    {{ topic.learningGoal ||
                        'Target Exam' }} · {{ examInfo.name }}</span>
                <span class="text-3xl font-bold text-primary">{{ examInfo.daysAway }} Days Away</span>
            </div>
        </header>

        <Transition name="fade" mode="out-in">
            <div v-if="sessionState === 'idle'" class="flex flex-col gap-8 w-full">
            <!-- Stats Grid -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <UCard v-for="(stat, i) in stats" :key="i" variant="soft" class="relative overflow-hidden group"
                :ui="{ body: 'flex flex-col gap-2' }">
                <div class="flex items-center justify-between mb-2">
                    <div class="flex flex-col">
                        <span class="text-xs font-bold tracking-wider text-muted uppercase">{{ stat.label }}</span>
                        <span class="text-5xl font-bold tracking-tight mt-2" :class="i === 1 ? 'text-primary' : ''">{{
                            stat.value
                        }}</span>
                        <span class="text-sm text-dimmed mt-1">{{ stat.subtext }}</span>
                    </div>
                    <div
                        class="bg-primary/10 text-primary p-4 rounded-2xl ring-4 ring-primary/5 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                        <UIcon :name="stat.icon" class="text-2xl flex" />
                    </div>
                </div>
            </UCard>
        </div>

        <!-- Topics Analysis Section -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <!-- Strong Topics -->
            <UCard variant="soft" :ui="{ body: 'relative flex flex-col gap-8' }">
                <div class="absolute inset-0 overflow-hidden rounded-xl pointer-events-none">
                    <div class="absolute -top-16 -right-16 w-64 h-64 bg-green-500/10 rounded-full blur-[64px]"></div>
                </div>
                <div class="relative z-10 flex items-center gap-2">
                    <UIcon name="i-lucide-trending-up" class="text-green-500" />
                    <h2 class="text-sm font-bold tracking-wider text-green-500 uppercase">Strong Topics</h2>
                </div>
                <div class="relative z-10 flex flex-col gap-6">
                    <div v-for="t in strongTopics" :key="t.name" class="flex flex-col gap-2.5">
                        <div class="flex items-center justify-between">
                            <span class="font-medium">{{ t.name }}</span>
                            <span class="text-xs text-muted font-medium">{{ t.progress }}%</span>
                        </div>
                        <UProgress :model-value="t.progress" color="green" size="sm" />
                    </div>
                </div>
            </UCard>

            <!-- Weak Topics -->
            <UCard variant="soft" :ui="{ body: 'relative p-8 flex flex-col gap-8' }">
                <div class="absolute inset-0 overflow-hidden rounded-xl pointer-events-none">
                    <div class="absolute -top-16 -right-16 w-64 h-64 bg-orange-500/10 rounded-full blur-[64px]"></div>
                </div>
                <div class="relative z-10 flex items-center gap-2">
                    <UIcon name="i-lucide-alert-circle" class="text-orange-500" />
                    <h2 class="text-sm font-bold tracking-wider text-orange-500 uppercase">Weak Topics — Focus Areas
                    </h2>
                </div>
                <div class="relative z-10 flex flex-col gap-6">
                    <div v-for="t in weakTopics" :key="t.name" class="flex flex-col gap-2.5">
                        <div class="flex items-center justify-between">
                            <span class="font-medium">{{ t.name }}</span>
                            <span class="text-xs text-muted font-medium">{{ t.progress }}%</span>
                        </div>
                        <UProgress :model-value="t.progress" color="orange" size="sm" />
                    </div>
                </div>
            </UCard>
        </div>

            <!-- Premium CTA Box (Horizontal) -->
            <UCard
                class="overflow-hidden relative border-none ring-1 ring-primary/20 shadow-2xl shadow-primary/5 bg-gradient-to-r from-white to-neutral-50/50 dark:from-neutral-900 dark:to-neutral-900/50"
            :ui="{ body: 'p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 relative z-10' }">
            <!-- Decorative Glows -->
            <div class="absolute top-0 left-0 w-1/2 h-full bg-primary/5 rounded-full blur-[100px] -translate-x-1/2">
            </div>

            <div
                class="flex flex-col md:flex-row items-center md:items-start gap-6 text-center md:text-left flex-1 relative z-10">
                <div class="bg-primary/10 text-primary p-4 rounded-2xl ring-4 ring-primary/5 shrink-0">
                    <UIcon name="i-lucide-sparkles" class="text-3xl flex animate-pulse" />
                </div>

                <div class="flex flex-col gap-2">
                    <h3 class="text-xs font-bold tracking-[0.2em] text-primary uppercase">Recommended for you</h3>
                    <p class="text-3xl font-bold tracking-tight leading-tight">
                        Focus on <span class="text-primary underline decoration-primary/30 underline-offset-8">{{
                            weakestTopic?.name }}</span>
                    </p>
                    <p class="text-muted max-w-lg">
                        Acumen identifies this as your highest impact area for improvement. Ready to master it?
                    </p>
                </div>
            </div>

            <UButton @click="startSession" label="Press Play" icon="i-lucide-play-circle" size="xl" color="primary"
                class="rounded-full px-12 py-5 uppercase text-sm font-semibold tracking-[0.2em] hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 shrink-0 relative z-10" />
            </UCard>
            </div>

            <!-- AI Processing & Ready Screen -->
            <UCard v-else class="w-full relative border-none ring-1 ring-primary/20 shadow-2xl shadow-primary/5 overflow-hidden transition-all duration-500" :ui="{ body: 'p-0 sm:p-0' }">
            <!-- Processing State -->
            <div v-if="sessionState === 'processing'" class="p-8 md:p-16 flex flex-col gap-6 font-mono text-sm text-neutral-500 dark:text-neutral-400 min-h-[400px] justify-center items-start w-full max-w-4xl mx-auto">
                <div class="flex items-center gap-3 text-primary mb-4 border border-primary/30 px-4 py-2 rounded-full bg-primary/10">
                    <UIcon name="i-lucide-cpu" class="w-4 h-4 animate-pulse" />
                    <span class="tracking-widest uppercase font-bold text-[10px]">Acumen AI Engine</span>
                </div>
                <div class="flex flex-col gap-5 text-base text-neutral-700 dark:text-neutral-300">
                    <div v-for="(line, idx) in activeLines" :key="idx" class="animate-fade-in" v-html="line"></div>
                </div>
                <div v-if="activeLines.length < processingLines.length" class="flex gap-2 mt-4 items-center">
                    <span class="w-2.5 h-2.5 bg-neutral-400 dark:bg-neutral-600 rounded-full animate-bounce" style="animation-delay: 0ms"></span>
                    <span class="w-2.5 h-2.5 bg-neutral-400 dark:bg-neutral-600 rounded-full animate-bounce" style="animation-delay: 150ms"></span>
                    <span class="w-2.5 h-2.5 bg-neutral-400 dark:bg-neutral-600 rounded-full animate-bounce" style="animation-delay: 300ms"></span>
                </div>
            </div>

            <!-- Ready State -->
            <div v-else-if="sessionState === 'ready'" class="p-8 md:p-16 flex flex-col items-center justify-center gap-12 min-h-[400px] animate-fade-in bg-gradient-to-b from-white to-neutral-50/50 dark:from-neutral-900 dark:to-neutral-900/50">
                <div class="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-5xl">
                    <!-- Card 1 -->
                    <div class="bg-white dark:bg-neutral-900 ring-1 ring-neutral-200 dark:ring-neutral-800 rounded-2xl p-8 flex flex-col items-center justify-center gap-4 text-center shadow-sm">
                        <span class="text-[10px] tracking-[0.2em] uppercase text-neutral-500 dark:text-neutral-400 font-semibold">Topic</span>
                        <span class="text-xl font-bold leading-tight text-primary">{{ weakestTopic?.name }}</span>
                    </div>
                    <!-- Card 2 -->
                    <div class="bg-white dark:bg-neutral-900 ring-1 ring-neutral-200 dark:ring-neutral-800 rounded-2xl p-8 flex flex-col items-center justify-center gap-4 text-center shadow-sm">
                        <span class="text-[10px] tracking-[0.2em] uppercase text-neutral-500 dark:text-neutral-400 font-semibold">Module</span>
                        <span class="text-xl font-bold leading-tight text-primary">{{ recommendedLesson?.title || 'Scenario Court' }}</span>
                    </div>
                    <!-- Card 3 -->
                    <div class="bg-white dark:bg-neutral-900 ring-1 ring-neutral-200 dark:ring-neutral-800 rounded-2xl p-8 flex flex-col items-center justify-center gap-4 text-center shadow-sm">
                        <span class="text-[10px] tracking-[0.2em] uppercase text-neutral-500 dark:text-neutral-400 font-semibold">Difficulty</span>
                        <span class="text-xl font-bold leading-tight text-primary">Medium</span>
                    </div>
                    <!-- Card 4 -->
                    <div class="bg-white dark:bg-neutral-900 ring-1 ring-neutral-200 dark:ring-neutral-800 rounded-2xl p-8 flex flex-col items-center justify-center gap-4 text-center shadow-sm">
                        <span class="text-[10px] tracking-[0.2em] uppercase text-neutral-500 dark:text-neutral-400 font-semibold">Duration</span>
                        <span class="text-xl font-bold leading-tight text-primary">{{ recommendedLesson?.duration || '~10 min' }}</span>
                    </div>
                </div>

                <UButton @click="beginSessionAction" label="Begin Session" trailing-icon="i-lucide-arrow-right" size="xl" color="primary" class="rounded-full px-16 py-5 uppercase text-sm font-semibold tracking-[0.2em] hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30" />
            </div>

            <!-- Active Session State -->
            <div v-else-if="sessionState === 'active' && currentQuestion" class="p-8 md:p-12 flex flex-col gap-10 animate-fade-in bg-white dark:bg-neutral-900">
                <!-- Progress Header -->
                <div class="flex items-center justify-between w-full max-w-3xl mx-auto border-b border-neutral-100 dark:border-neutral-800 pb-6">
                    <div class="flex flex-col gap-1">
                        <span class="text-[10px] tracking-widest uppercase font-bold text-primary">{{ recommendedLesson?.title }}</span>
                        <h2 class="text-xl font-bold">Question {{ currentQuestionIndex + 1 }} of {{ questions.length }}</h2>
                    </div>
                    <UButton icon="i-lucide-x" color="neutral" variant="ghost" @click="sessionState = 'idle'" class="rounded-full" />
                </div>

                <div class="flex flex-col gap-12 w-full max-w-3xl mx-auto">
                    <!-- Question Text -->
                    <div class="text-2xl font-medium leading-relaxed text-neutral-900 dark:text-neutral-100">
                        {{ currentQuestion.text }}
                    </div>

                    <!-- Multiple Choice Options -->
                    <div class="grid grid-cols-1 gap-4">
                        <button 
                            v-for="option in currentQuestion.options" 
                            :key="option.id"
                            @click="selectOption(option.id)"
                            :disabled="!!selectedOptionId"
                            :class="[
                                'flex items-center gap-4 p-6 rounded-2xl border-2 transition-all duration-300 text-left group relative overflow-hidden',
                                // Correct Answer (after selection)
                                selectedOptionId && option.id === currentQuestion.correct
                                    ? 'border-green-500 bg-green-500/5 ring-4 ring-green-500/5'
                                    : '',
                                // Wrong Selected Answer
                                selectedOptionId === option.id && option.id !== currentQuestion.correct
                                    ? 'border-red-500 bg-red-500/5 ring-4 ring-red-500/5'
                                    : '',
                                // Idle State
                                !selectedOptionId 
                                    ? 'border-neutral-100 dark:border-neutral-800 hover:border-primary/50 hover:bg-neutral-50 dark:hover:bg-neutral-800/50'
                                    : '',
                                // Unselected & Not Correct (Fade out)
                                selectedOptionId && option.id !== currentQuestion.correct && selectedOptionId !== option.id
                                    ? 'opacity-40 border-neutral-100 dark:border-neutral-800'
                                    : ''
                            ]"
                        >
                            <div :class="[
                                'w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm transition-colors',
                                selectedOptionId && option.id === currentQuestion.correct ? 'bg-green-500 text-white' : 
                                selectedOptionId === option.id && option.id !== currentQuestion.correct ? 'bg-red-500 text-white' :
                                'bg-neutral-100 dark:bg-neutral-800 text-neutral-500'
                            ]">
                                {{ option.id.toUpperCase() }}
                            </div>
                            <span class="flex-1 font-medium">{{ option.label }}</span>
                            <UIcon v-if="selectedOptionId && option.id === currentQuestion.correct" name="i-lucide-check-circle-2" class="text-green-500 w-6 h-6 animate-fade-in" />
                            <UIcon v-else-if="selectedOptionId === option.id && option.id !== currentQuestion.correct" name="i-lucide-x-circle" class="text-red-500 w-6 h-6 animate-fade-in" />
                        </button>
                    </div>

                    <!-- Probing Reasoning Section -->
                    <Transition name="fade">
                        <div v-if="selectedOptionId" class="flex flex-col gap-8 p-8 md:p-10 rounded-4xl bg-white dark:bg-[#0a0a0a] text-neutral-900 dark:text-white border border-neutral-100 dark:border-neutral-800 shadow-2xl animate-fade-in relative overflow-hidden">
                            <div class="flex items-center gap-2 text-[10px] tracking-[0.2em] font-bold uppercase text-primary relative z-10">
                                <div class="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
                                <span>Acumen AI</span>
                                <span class="text-neutral-300 dark:text-neutral-600">·</span>
                                <span class="text-neutral-500 dark:text-neutral-400">Probing Your Reasoning</span>
                            </div>

                            <div class="text-xl md:text-2xl leading-relaxed text-neutral-800 dark:text-neutral-200 relative z-10 italic">
                                Good choice. But explain it to me — why <span class="text-primary not-italic font-bold">{{ currentQuestion?.options?.find(o => o.id === selectedOptionId)?.label }}</span> and not, say, <span class="text-orange-400/80 not-italic font-bold">{{ currentQuestion?.options?.find(o => o.id !== selectedOptionId)?.label }}</span>? Those sound related.
                            </div>
                            
                            <UTextarea 
                                v-model="reasoningText"
                                placeholder="Type your reasoning here..."
                                :rows="4"
                                :disabled="isReasoningSubmitted || isEvaluating"
                                class="w-full relative z-10"
                                :ui="{ 
                                    base: 'bg-neutral-50 dark:bg-neutral-900/50 border-neutral-200 dark:border-neutral-800 focus:border-primary/50 transition-all duration-300 text-lg py-4 px-6 rounded-2xl placeholder:text-neutral-400 dark:placeholder:text-neutral-700 focus:ring-primary/20'
                                }"
                            />

                            <div v-if="!isReasoningSubmitted" class="flex justify-start relative z-10">
                                <UButton 
                                    label="Submit Reasoning" 
                                    trailing-icon="i-lucide-arrow-right"
                                    size="xl"
                                    color="primary"
                                    :loading="isEvaluating"
                                    @click="submitReasoning"
                                    class="rounded-full px-10 py-4 uppercase text-xs font-bold tracking-[0.2em] hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg shadow-primary/20"
                                />
                            </div>

                            <!-- Acumen Evaluates Section -->
                            <Transition name="fade">
                                <div v-if="isReasoningSubmitted" class="flex flex-col gap-6 pt-10 mt-2 border-t border-neutral-100 dark:border-neutral-800/50 relative z-10 animate-fade-in">
                                    <div class="flex items-center gap-2 text-[10px] tracking-[0.2em] font-bold uppercase text-primary">
                                        <span>→ Acumen Evaluates</span>
                                    </div>
                                    
                                    <div class="text-lg md:text-xl leading-relaxed text-neutral-700 dark:text-neutral-300 italic">
                                        Close, but be specific. <span class="text-primary not-italic font-bold">{{ currentQuestion?.options?.find(o => o.id === currentQuestion?.correct)?.label }}</span> happens after thorough analysis — you identify the core mechanics. Here, the logic is sound, and it's specifically about the <span class="text-neutral-800 dark:text-neutral-100 not-italic font-bold">underlying principles</span>. The trigger matters. Try articulating it that way.
                                    </div>

                                    <div class="flex justify-start pt-4">
                                        <button 
                                            @click="nextQuestion"
                                            class="flex items-center gap-3 text-[10px] tracking-[0.4em] font-bold uppercase text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors group"
                                        >
                                            <span>{{ currentQuestionIndex === questions.length - 1 ? 'See Your Insights' : 'Next Scenario' }}</span>
                                            <UIcon name="i-lucide-arrow-right" class="w-3.5 h-3.5 transition-transform group-hover:translate-x-2" />
                                        </button>
                                    </div>
                                </div>
                            </Transition>
                        </div>
                    </Transition>
                </div>
            </div>

            <!-- Session Complete State -->
            <div v-else-if="sessionState === 'complete'" class="p-8 md:p-16 flex flex-col items-center justify-center text-center gap-10 animate-fade-in bg-white dark:bg-neutral-900 min-h-[500px]">
                <div class="flex flex-col items-center gap-6">
                    <div class="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                        <UIcon name="i-lucide-award" class="w-10 h-10 text-primary" />
                    </div>
                    <div class="flex flex-col gap-2">
                        <span class="text-[10px] tracking-[0.4em] uppercase font-bold text-primary">Session Complete</span>
                        <h2 class="text-4xl font-bold tracking-tight text-neutral-900 dark:text-white">Great job!</h2>
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                    <!-- Card 1: What you did well -->
                    <div class="flex flex-col gap-6 p-8 rounded-4xl bg-green-50/50 dark:bg-green-900/10 border border-green-100 dark:border-green-900/20 shadow-sm transition-all duration-500 animate-fade-in text-left">
                        <div class="flex items-center gap-3 text-[10px] tracking-widest uppercase font-bold text-green-600 dark:text-green-400">
                            <UIcon name="i-lucide-trending-up" class="w-4 h-4" />
                            <span>What you did well</span>
                        </div>
                        <p class="text-lg font-medium text-neutral-800 dark:text-neutral-200 leading-relaxed">
                            {{ recommendedLesson?.assessment?.whatYouDidWell }}
                        </p>
                    </div>

                    <!-- Card 2: Where you struggled -->
                    <div class="flex flex-col gap-6 p-8 rounded-4xl bg-amber-50/50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/20 shadow-sm transition-all duration-500 animate-fade-in [animation-delay:100ms] text-left">
                        <div class="flex items-center gap-3 text-[10px] tracking-widest uppercase font-bold text-amber-600 dark:text-amber-400">
                            <UIcon name="i-lucide-trending-down" class="w-4 h-4" />
                            <span>Where you struggled</span>
                        </div>
                        <p class="text-lg font-medium text-neutral-800 dark:text-neutral-200 leading-relaxed">
                            {{ recommendedLesson?.assessment?.whereYouStruggled }}
                        </p>
                    </div>

                    <!-- Card 3: Mastery Profile Updated -->
                    <div class="flex flex-col gap-6 p-8 rounded-4xl bg-primary-50/50 dark:bg-primary-900/10 border border-primary-100 dark:border-primary-900/20 shadow-sm transition-all duration-500 animate-fade-in [animation-delay:200ms] text-left">
                        <div class="flex items-center gap-3 text-[10px] tracking-widest uppercase font-bold text-primary">
                            <UIcon name="i-lucide-zap" class="w-4 h-4" />
                            <span>Mastery profile updated</span>
                        </div>
                        
                        <div class="flex flex-col gap-4">
                            <div class="text-sm font-bold text-neutral-500 dark:text-neutral-400">
                                {{ recommendedLesson?.assessment?.title }}
                            </div>
                            <div class="flex items-end gap-4">
                                <div class="flex flex-col gap-1">
                                    <span class="text-[10px] uppercase text-neutral-400">Before</span>
                                    <span class="text-2xl font-bold text-neutral-400 line-through">{{ recommendedLesson?.assessment?.passProbBefore }}</span>
                                </div>
                                <UIcon name="i-lucide-arrow-right" class="w-6 h-6 mb-1 text-primary" />
                                <div class="flex flex-col gap-1">
                                    <span class="text-[10px] uppercase text-primary">After</span>
                                    <span class="text-4xl font-bold text-primary">{{ recommendedLesson?.assessment?.passProbAfter }}</span>
                                </div>
                            </div>
                            <div class="flex items-center gap-2 text-xs font-bold text-primary mt-2">
                                <span class="bg-primary/10 px-2 py-1 rounded-full">+{{ parseInt(recommendedLesson?.assessment?.passProbAfter || '0') - parseInt(recommendedLesson?.assessment?.passProbBefore || '0') }}% pass probability</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="flex flex-col items-center gap-6 w-full max-w-2xl px-6 py-10 rounded-[3rem] bg-primary-50/30 dark:bg-primary-900/5 border border-primary-100/50 dark:border-primary-900/10 animate-fade-in [animation-delay:400ms] relative">
                    
                    <div class="flex items-center gap-2 text-[10px] tracking-[0.2em] font-bold uppercase text-primary relative z-10">
                        <UIcon name="i-lucide-sparkles" class="w-3.5 h-3.5" />
                        <span>Acumen Insight</span>
                    </div>

                    <p class="text-xl md:text-2xl leading-relaxed text-neutral-800 dark:text-neutral-200 italic relative z-10 px-4">
                        "{{ recommendedLesson?.assessment?.aiFinalComment }}"
                    </p>

                    <div class="flex items-center gap-3 relative z-10 pt-2">
                        <div class="w-8 h-px bg-primary/30"></div>
                        <span class="text-[10px] tracking-[0.2em] font-bold uppercase text-neutral-400">Acumen AI</span>
                        <div class="w-8 h-px bg-primary/30"></div>
                    </div>
                </div>

                <div>
                    <UButton 
                        label="See Your Readiness Plan" 
                        trailing-icon="i-lucide-arrow-right"
                        size="xl" 
                        color="primary" 
                        variant="solid"
                        @click="sessionState = 'idle'"
                        class="rounded-full px-12 py-5 uppercase text-sm font-bold tracking-[0.2em] hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl shadow-primary/20"
                    />
                </div>
            </div>
        </UCard>
        </Transition>
    </UContainer>

    <!-- 404 Empty State -->
    <div v-else class="flex flex-col items-center justify-center py-20 text-center">
        <UIcon name="i-lucide-file-search-corner" class="text-6xl text-dimmed mb-4" />
        <h2 class="text-2xl font-bold">Topic not found</h2>
        <p class="text-muted mt-2">The topic you're looking for doesn't exist or has been deleted.</p>
        <UButton label="Back to Dashboard" color="primary" variant="subtle" to="/app/dashboard" class="mt-6" />
    </div>
</template>

<style scoped>
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
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
