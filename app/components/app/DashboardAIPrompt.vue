<script setup lang="ts">
import { CURRICULUM_CATEGORIES } from '~/constants/topics'

type UploadFile = { name: string; size: string; type: string; status?: 'success' | 'error' | 'uploading', file?: File }
type InputMode = 'prompt' | 'upload' | 'subject'

withDefaults(defineProps<{ isHero?: boolean }>(), { isHero: false })

const { user } = useUser()
const router = useRouter()

const firstName = computed(() => user.value.profile.fullName.split(' ')[0])

const prompt = ref('')
const inputMode = ref<InputMode>('prompt')

// Upload state
const isUploading = ref(false)
const isDragging = ref(false)
const fileInput = ref<HTMLInputElement | null>(null)
const files = ref<UploadFile[]>([])
const hasErrors = computed(() => files.value.some(f => f.status === 'error'))
const successCount = computed(() => files.value.filter(f => f.status === 'success').length)
const canProceed = computed(() => successCount.value > 0 && !hasErrors.value && !isUploading.value)

// Subject picker state
const subjectSearch = ref('')
const selectedCategory = ref<string | null>(null)
const selectedSubject = ref<string | null>(null)
const filteredSubjects = computed(() => {
    const cats = selectedCategory.value
        ? CURRICULUM_CATEGORIES.filter(c => c.name === selectedCategory.value)
        : CURRICULUM_CATEGORIES
    const subjects = cats.flatMap(c => c.subjects)
    if (!subjectSearch.value.trim()) return subjects
    return subjects.filter(s => s.toLowerCase().includes(subjectSearch.value.toLowerCase()))
})

// Mode switching
const enterUploadMode = async () => {
    inputMode.value = 'upload'
    await nextTick()
    triggerFileInput()
}
const enterSubjectMode = () => { inputMode.value = 'subject'; subjectSearch.value = ''; selectedCategory.value = null }
const exitMode = () => { inputMode.value = 'prompt'; files.value = [] }

// Upload helpers
const triggerFileInput = () => {
    fileInput.value?.click()
}

const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 B'
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
}

const processFiles = (uploadedFiles: FileList | null) => {
    if (!uploadedFiles || uploadedFiles.length === 0) return

    isUploading.value = true

    const newUploads: UploadFile[] = Array.from(uploadedFiles).map(file => ({
        name: file.name,
        size: formatSize(file.size),
        type: file.type || file.name.split('.').pop() || 'unknown',
        status: 'success',
        file
    }))

    setTimeout(() => {
        files.value = [...files.value, ...newUploads]
        isUploading.value = false
    }, 1500)
}

const handleFileChange = (event: Event) => {
    const target = event.target as HTMLInputElement
    processFiles(target.files)
    if (fileInput.value) {
        fileInput.value.value = ''
    }
}

const handleDrop = (event: DragEvent) => {
    isDragging.value = false
    processFiles(event.dataTransfer?.files || null)
}

const removeFile = (i: number) => { files.value.splice(i, 1); if (!files.value.length && !isUploading.value) inputMode.value = 'prompt' }
const retryFile = (i: number) => {
    files.value[i] = { ...files.value[i], status: 'uploading' } as UploadFile
    setTimeout(() => { files.value[i] = { ...files.value[i], status: 'success' } as UploadFile }, 1500)
}

// Redirects → new.vue picks up the query and jumps to the right step
const generate = () => {
    if (!prompt.value.trim()) return
    router.push({ path: '/app/topics/new', query: { mode: 'prompt', prompt: prompt.value.trim() } })
}
const startIndexing = () => {
    if (!canProceed.value) return
    router.push({ path: '/app/topics/new', query: { mode: 'upload', step: 'indexing' } })
}
const handleSubjectSelect = (subject: string) => {
    selectedSubject.value = subject
}

const startExplore = () => {
    if (!selectedSubject.value) return
    router.push({ path: '/app/topics/new', query: { mode: 'explore', subject: selectedSubject.value } })
}
</script>

<template>
    <div class="relative w-full">
        <div class="absolute -top-20 inset-x-0 h-64 bg-primary-500/10 blur-[120px] rounded-full pointer-events-none" />

        <div class="flex flex-col gap-8">
            <!-- Header -->
            <Transition appear enter-active-class="transition-all duration-700 delay-100"
                enter-from-class="opacity-0 translate-y-4" enter-to-class="opacity-100 translate-y-0">
                <div v-if="isHero" class="flex flex-col items-center text-center">
                    <div
                        class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-500 text-xs font-semibold uppercase tracking-wider mb-4">
                        <UIcon name="i-lucide-sparkles" class="animate-pulse" /><span>AI Learning Engine</span>
                    </div>
                    <h1 class="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-balance">
                        What do you want to <span class="text-primary-500 italic">learn</span> today?
                    </h1>
                    <p class="text-lg text-muted font-light max-w-xl text-pretty">
                        Describe your goals, upload a syllabus, or pick a subject. We'll build a personalized learning
                        path in seconds.
                    </p>
                </div>
                <div v-else class="flex flex-col items-center gap-2">
                    <div
                        class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-500 text-xs font-semibold uppercase tracking-wider">
                        <UIcon name="i-lucide-sparkles" class="animate-pulse" /><span>Create New Topic</span>
                    </div>
                    <ContentHeading description="You're making great progress! Ready to learn something new today?"
                        centered>
                        <template #title>
                            <span class="text-primary">Welcome back,</span> {{ firstName }}!
                        </template>
                    </ContentHeading>
                </div>
            </Transition>

            <!-- Input card -->
            <UCard
                :ui="{ root: 'relative group border-0 rounded-2xl shadow-2xl hover:shadow-primary/50 hover:ring-4 hover:ring-primary-500/40 transition-all duration-300', body: 'p-0 sm:p-0 flex flex-col' }">
                <Transition mode="out-in" enter-active-class="transition-all duration-300 ease-out"
                    enter-from-class="opacity-0 translate-y-2" enter-to-class="opacity-100 translate-y-0"
                    leave-active-class="transition-all duration-200 ease-in"
                    leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 -translate-y-2">

                    <!-- PROMPT -->
                    <UTextarea v-if="inputMode === 'prompt'" v-model="prompt"
                        placeholder="e.g., I want to learn advanced Quantum Computing with a focus on Cryptography..."
                        :ui="{ root: 'w-full', base: 'ring-0 rounded-t-2xl rounded-b-none p-6' }" autoresize
                        :rows="isHero ? 8 : 1" @keydown.meta.enter="generate" @keydown.ctrl.enter="generate" />

                    <!-- UPLOAD -->
                    <div v-else-if="inputMode === 'upload'" class="flex flex-col">
                        <input type="file" class="hidden" ref="fileInput" multiple @change="handleFileChange"
                            accept=".pdf,.doc,.docx,.txt" />

                        <div class="flex items-center justify-between px-5 pt-4 pb-2">
                            <span class="text-xs font-bold uppercase tracking-widest text-neutral-400">Upload
                                Materials</span>
                            <UButton icon="i-lucide-x" variant="ghost" color="neutral" size="xs" class="rounded-full"
                                @click="exitMode"><span class="text-xs">Close</span></UButton>
                        </div>
                        <div class="mx-4 mb-3 border-2 border-dashed rounded-2xl py-8 flex flex-col items-center gap-3 cursor-pointer hover:border-primary-500/50 hover:bg-primary-50/10 dark:hover:bg-primary-950/10 transition-all duration-500"
                            :class="[
                                isDragging ? 'border-primary-500 bg-primary-50/10 dark:bg-primary-950/10' : 'border-neutral-200 dark:border-neutral-800'
                            ]" @click="triggerFileInput" @dragover.prevent="isDragging = true"
                            @dragleave.prevent="isDragging = false" @drop.prevent="handleDrop">
                            <div class="p-3 bg-white dark:bg-neutral-800 rounded-xl shadow-md transition-all duration-500"
                                :class="{ 'scale-110 -rotate-3': isDragging }">
                                <UIcon :name="isUploading ? 'i-lucide-loader-2' : 'i-lucide-file-up'"
                                    class="text-2xl text-neutral-400 flex shrink-0 transition-colors duration-500"
                                    :class="{ 'animate-spin': isUploading, 'text-primary': isDragging }" />
                            </div>
                            <div class="text-center pointer-events-none">
                                <p class="text-sm font-semibold text-neutral-900 dark:text-white">{{ isUploading ?
                                    'Uploading...' : isDragging ? 'Drop files here' : 'Click or drag to upload' }}</p>
                                <p class="text-xs text-neutral-400 mt-0.5">PDF, DOCX, TXT up to 50MB</p>
                            </div>
                        </div>
                        <div v-if="files.length > 0 || isUploading" class="px-4 pb-3 flex flex-col gap-2">
                            <div class="flex items-center justify-between mb-1">
                                <span class="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Selected
                                    Files</span>
                                <span v-if="hasErrors"
                                    class="text-[10px] font-semibold text-red-500 flex items-center gap-1">
                                    <UIcon name="i-lucide-alert-circle" class="w-3 h-3" />{{files.filter(f => f.status
                                        === 'error').length}} failed
                                </span>
                            </div>
                            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                                <div v-for="(file, i) in files" :key="i"
                                    class="group/f flex items-center gap-3 p-2.5 rounded-xl border transition-all duration-300"
                                    :class="file.status === 'error' ? 'border-red-300 dark:border-red-800/60 bg-red-50/50 dark:bg-red-950/10 ring-1 ring-red-200 dark:ring-red-900/40' : 'border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:border-primary-500/30'">
                                    <div class="relative shrink-0">
                                        <div class="p-1.5 rounded-lg"
                                            :class="file.status === 'error' ? 'bg-red-100 dark:bg-red-950/40' : 'bg-red-50 dark:bg-red-950/30'">
                                            <UIcon name="i-lucide-file-text" class="text-sm flex shrink-0"
                                                :class="file.status === 'error' ? 'text-red-600' : 'text-red-500'" />
                                        </div>
                                        <div v-if="file.status === 'success'"
                                            class="absolute -top-1 -right-1 bg-white dark:bg-neutral-900 rounded-full p-px">
                                            <UIcon name="i-lucide-check-circle-2"
                                                class="w-3 h-3 text-emerald-500 flex" />
                                        </div>
                                        <div v-else-if="file.status === 'error'"
                                            class="absolute -top-1 -right-1 bg-white dark:bg-neutral-900 rounded-full p-px">
                                            <UIcon name="i-lucide-x-circle" class="w-3 h-3 text-red-500 flex" />
                                        </div>
                                        <div v-else-if="file.status === 'uploading'"
                                            class="absolute -top-1 -right-1 bg-white dark:bg-neutral-900 rounded-full p-px">
                                            <UIcon name="i-lucide-loader-2"
                                                class="w-3 h-3 text-primary animate-spin flex" />
                                        </div>
                                    </div>
                                    <div class="flex-1 min-w-0">
                                        <p class="text-xs font-semibold text-neutral-900 dark:text-white truncate">{{
                                            file.name }}</p>
                                        <p class="text-[10px] text-neutral-400">{{ file.size }}<span
                                                v-if="file.status === 'error'" class="text-red-500 font-medium"> •
                                                Failed</span></p>
                                    </div>
                                    <div class="flex items-center gap-0.5 shrink-0">
                                        <UButton v-if="file.status === 'error'" icon="i-lucide-refresh-cw"
                                            variant="ghost" color="error" size="xs" @click.stop="retryFile(i)" />
                                        <UButton icon="i-lucide-x" variant="ghost" color="neutral" size="xs"
                                            class="opacity-0 group-hover/f:opacity-100 transition-opacity"
                                            @click.stop="removeFile(i)" />
                                    </div>
                                </div>
                                <div v-if="isUploading"
                                    class="flex items-center gap-3 p-2.5 rounded-xl border border-primary-200/50 dark:border-primary-800/30 bg-primary-50/30 dark:bg-primary-950/10 animate-pulse">
                                    <div class="p-1.5 bg-primary-100 dark:bg-primary-900/40 rounded-lg">
                                        <UIcon name="i-lucide-loader-2"
                                            class="text-sm text-primary animate-spin flex shrink-0" />
                                    </div>
                                    <div class="flex-1 space-y-1.5">
                                        <div class="h-2.5 bg-neutral-200 dark:bg-neutral-800 rounded w-24"></div>
                                        <div class="h-2 bg-neutral-100 dark:bg-neutral-800 rounded w-14"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- SUBJECT -->
                    <div v-else-if="inputMode === 'subject'" class="flex flex-col overflow-hidden">
                        <div class="flex items-center justify-between px-5 pt-4 pb-3">
                            <span class="text-xs font-bold uppercase tracking-widest text-neutral-400">Select a
                                Subject</span>
                            <UButton icon="i-lucide-x" variant="ghost" color="neutral" size="xs" class="rounded-full"
                                @click="exitMode"><span class="text-xs">Close</span></UButton>
                        </div>
                        <div class="px-5 pb-3">
                            <UInput v-model="subjectSearch" icon="i-lucide-search" placeholder="Search subjects..."
                                size="sm" variant="outline" class="w-full" />
                        </div>
                        <div class="relative border-b border-neutral-100 dark:border-neutral-800">
                            <div class="flex overflow-x-auto scrollbar-none px-5">
                                <button
                                    class="shrink-0 text-[11px] font-semibold px-3 py-2 border-b-2 transition-all duration-200"
                                    :class="selectedCategory === null ? 'border-primary-500 text-primary-600 dark:text-primary-400' : 'border-transparent text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200'"
                                    @click="selectedCategory = null">All</button>
                                <button v-for="cat in CURRICULUM_CATEGORIES" :key="cat.name"
                                    class="shrink-0 text-[11px] font-semibold px-3 py-2 border-b-2 transition-all duration-200"
                                    :class="selectedCategory === cat.name ? 'border-primary-500 text-primary-600 dark:text-primary-400' : 'border-transparent text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200'"
                                    @click="selectedCategory = cat.name">{{ cat.name }}</button>
                            </div>
                        </div>
                        <div class="px-5 py-3 overflow-y-auto max-h-44 custom-scrollbar">
                            <div v-if="!filteredSubjects.length" class="text-center py-4 text-xs text-neutral-400">No
                                subjects found</div>
                            <div v-else class="flex flex-wrap gap-2">
                                <button v-for="subject in filteredSubjects" :key="subject"
                                    class="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border transition-all duration-200"
                                    :class="[
                                        selectedSubject === subject
                                            ? 'border-emerald-400 text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/20'
                                            : 'border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 hover:border-primary-500 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-950/20'
                                    ]" @click="handleSubjectSelect(subject)">
                                    <UIcon v-if="selectedSubject === subject" name="i-lucide-check"
                                        class="w-3 h-3 shrink-0 text-emerald-500" />
                                    {{ subject }}
                                </button>
                            </div>
                        </div>
                    </div>
                </Transition>

                <!-- Action bar -->
                <div
                    class="flex items-center justify-between p-4 bg-neutral-50/50 dark:bg-neutral-900/50 border-t border-neutral-100 dark:border-neutral-800 gap-3 flex-wrap">
                    <div class="flex items-center gap-2">
                        <UButton icon="i-lucide-upload-cloud" variant="ghost" class="rounded-full"
                            @click="inputMode === 'upload' ? triggerFileInput() : enterUploadMode()">
                            <span class="hidden sm:inline">Upload Materials</span>
                        </UButton>
                        <div class="w-px h-4 bg-neutral-200 dark:bg-neutral-700 mx-1" />
                        <UButton icon="i-lucide-compass" variant="ghost" class="rounded-full" @click="enterSubjectMode">
                            <span class="hidden sm:inline">Explore Subject</span>
                        </UButton>
                    </div>
                    <div class="flex items-center gap-3">
                        <Transition enter-active-class="transition-all duration-300 ease-out"
                            enter-from-class="opacity-0 -translate-x-2" enter-to-class="opacity-100 translate-x-0"
                            leave-active-class="transition-all duration-200 ease-in"
                            leave-from-class="opacity-100 translate-x-0" leave-to-class="opacity-0 -translate-x-2">
                            <span v-if="inputMode === 'upload' && hasErrors"
                                class="text-xs text-red-500 flex items-center gap-1 font-medium">
                                <UIcon name="i-lucide-alert-triangle" class="w-3.5 h-3.5 shrink-0" />Fix failed uploads
                                first
                            </span>
                        </Transition>
                        <UButton v-if="inputMode === 'prompt' || inputMode === 'subject'" label="Begin Assessment"
                            size="lg" class="rounded-full px-4 shadow-lg shadow-primary-500/20"
                            :disabled="inputMode === 'prompt' ? !prompt.trim() : !selectedSubject"
                            @click="inputMode === 'prompt' ? generate() : startExplore()">
                            <template #leading>
                                <UIcon name="i-lucide-sparkles" class="animate-pulse" />
                            </template>
                        </UButton>
                        <UButton v-else-if="inputMode === 'upload'" label="Start Indexing" color="primary" size="lg"
                            class="rounded-full px-4 shadow-lg shadow-primary-500/20" :disabled="!canProceed"
                            @click="startIndexing">
                            <template #leading>
                                <UIcon name="i-lucide-arrow-right" />
                            </template>
                        </UButton>
                    </div>
                </div>

                <div
                    class="absolute -inset-8 bg-gradient-to-tr from-transparent via-transparent to-primary-300/40 dark:to-primary-500/20 blur opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </UCard>

            <!-- Hero stats -->
            <Transition appear enter-active-class="transition-all duration-700 delay-500"
                enter-from-class="opacity-0 translate-y-4" enter-to-class="opacity-100 translate-y-0">
                <div v-if="isHero" class="flex flex-wrap justify-center gap-6">
                    <div v-for="(stat, i) in [{ label: 'Learning Paths Generated', value: '12.4k+', icon: 'i-lucide-git-branch' }, { label: 'Active Learners', value: '5k+', icon: 'i-lucide-users' }, { label: 'Topics Covered', value: '800+', icon: 'i-lucide-book-open' }]"
                        :key="i" class="flex items-center gap-3 text-muted">
                        <div class="p-2 rounded-lg bg-accented/40">
                            <UIcon :name="stat.icon" class="text-lg flex" />
                        </div>
                        <div class="text-left">
                            <div class="text-sm font-bold">{{ stat.value }}</div>
                            <div class="text-xs text-dimmed uppercase tracking-tighter">{{ stat.label }}</div>
                        </div>
                    </div>
                </div>
            </Transition>
        </div>
    </div>
</template>

<style scoped>
textarea::-webkit-scrollbar {
    width: 6px;
}

textarea::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 10px;
}

.dark textarea::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.1);
}
</style>
