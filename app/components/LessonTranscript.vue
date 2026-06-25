<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted, watch } from 'vue'
import type { LessonSection } from '~/types/course'

const props = defineProps<{
    sections: LessonSection[]
}>()

const emit = defineEmits<{
    (e: 'askAi', payload: { text: string, id: string }): void
    (e: 'open-notes'): void
    (e: 'add-note', payload: { line: string, sectionIdx: number, lineIdx: number }): void
}>()

// --- MOCK CONTENT FOR LAYOUT TESTING ---
const mockContent: LessonSection[] = [
    {
        title: "Deep Dive: Memory Hierarchy",
        content: `The memory hierarchy in modern computer systems is designed to provide both large capacity and fast access times.
At the top of the hierarchy are CPU registers, which operate at the exact speed of the processor but hold very little data.
Right below the registers is the L1 cache, divided into instruction and data caches, providing extremely fast access to frequently used information.
L2 and L3 caches follow, offering more storage but slightly slower access times.
Main memory (RAM) sits below the caches. It provides gigabytes of storage but is orders of magnitude slower than the CPU cache.
Finally, secondary storage like SSDs and HDDs provide persistent, massive capacity but at the cost of being the slowest tier in the hierarchy.
Understanding this hierarchy is critical for writing high-performance code, as cache misses can severely degrade execution speed.`,
        aiInsight: "Pay special attention to spatial and temporal locality. Writing code that accesses memory in predictable, contiguous patterns (like arrays) maximizes cache hits and significantly boosts performance."
    },
    {
        title: "Spatial vs Temporal Locality",
        content: `Locality of reference is a fundamental principle that makes caches effective.
Temporal locality refers to the tendency of a program to access the same memory location repeatedly over a short period of time.
A classic example of temporal locality is a loop counter or an accumulator variable that is updated in every iteration.
Spatial locality, on the other hand, means that if a memory location is accessed, nearby memory locations are likely to be accessed soon.
Iterating through an array sequentially is the textbook example of taking advantage of spatial locality.
Caches load data in "cache lines" (often 64 bytes), meaning when one byte is requested, the surrounding bytes are also pulled into the fast cache.
If your data structures are fragmented or you jump randomly through memory (like traversing a linked list scattered across the heap), you defeat the hardware's attempt to pre-load data.`,
        aiInsight: "In performance-critical applications, choosing arrays over linked lists often yields better results simply because of spatial locality and hardware prefetching mechanisms."
    }
]

// Split content into actionable blocks
const processedSections = computed(() => {
    // Combine real sections with mock content to guarantee a long layout for testing
    const combined = [...(props.sections || []), ...mockContent]

    return combined.map(section => {
        // Split by newline or sentence. Since it's prose, let's split by sentences or simple paragraphs.
        // If content has multiple lines, split by newline. Otherwise by sentences.
        let lines = section.content.split('\n').filter(l => l.trim().length > 0)
        if (lines.length === 1) {
            // Split by sentence if it's just one big paragraph
            lines = section.content.split(/(?<=[.!?])\s+/).filter(l => l.trim().length > 0)
        }

        return {
            ...section,
            lines
        }
    })
})

const handleAskAi = (line: string, idx: number, lIdx: number) => {
    emit('askAi', { text: line, id: `line-${idx}-${lIdx}` })
}

const addNote = (line: string, sectionIdx: number, lineIdx: number) => {
    emit('add-note', { line, sectionIdx, lineIdx })
}

const transcriptContainer = ref<HTMLElement | null>(null)
const selectedText = ref('')
const popupStyle = ref({ top: '0px', left: '0px' })

const handleSelection = () => {
    setTimeout(() => {
        const selection = window.getSelection()
        if (!selection || selection.isCollapsed || !selection.toString().trim()) {
            selectedText.value = ''
            return
        }

        if (transcriptContainer.value && transcriptContainer.value.contains(selection.anchorNode)) {
            const text = selection.toString().trim()
            if (text.length > 0) {
                const range = selection.getRangeAt(0)
                const rect = range.getBoundingClientRect()

                selectedText.value = text
                popupStyle.value = {
                    top: `${rect.top - 8}px`,
                    left: `${rect.left + (rect.width / 2)}px`
                }
            }
        } else {
            selectedText.value = ''
        }
    }, 10)
}

const handleSelectionChange = () => {
    const selection = window.getSelection()
    if (!selection || selection.isCollapsed) {
        selectedText.value = ''
    }
}

onMounted(() => {
    document.addEventListener('mouseup', handleSelection)
    document.addEventListener('keyup', handleSelection)
    document.addEventListener('selectionchange', handleSelectionChange)

    // Load available voices
    populateVoices()
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = populateVoices
    }
})

onUnmounted(() => {
    document.removeEventListener('mouseup', handleSelection)
    document.removeEventListener('keyup', handleSelection)
    document.removeEventListener('selectionchange', handleSelectionChange)

    window.speechSynthesis.cancel()
})

const askAiHighlighted = () => {
    if (selectedText.value) {
        emit('askAi', { text: selectedText.value, id: 'highlight' })
        window.getSelection()?.removeAllRanges()
        selectedText.value = ''
    }
}

const isAudioToolbarVisible = ref(false)
const playbackSpeed = ref(1.0)
const volume = ref(1.0)
const previousVolume = ref(1.0)

const volumeIcon = computed(() => {
    if (volume.value === 0) return 'i-lucide-volume-x'
    if (volume.value < 0.5) return 'i-lucide-volume-1'
    return 'i-lucide-volume-2'
})

const toggleMute = () => {
    if (volume.value > 0) {
        previousVolume.value = volume.value
        volume.value = 0
    } else {
        volume.value = previousVolume.value || 1.0
    }
}

interface VoiceOption {
    label: string
    value: string
    lang: string
}
const voiceOption = ref<VoiceOption | undefined>(undefined)
const voiceOptions = ref<VoiceOption[]>([])
const audioStatus = ref('Ready')

interface UtteranceItem {
    globalIndex: number
    text: string
    isTitle: boolean
    sectionIdx: number
    lineIdx?: number
}

let activeUtterances: SpeechSynthesisUtterance[] = [] // Prevent GC
let voices: SpeechSynthesisVoice[] = []
const currentUtteranceIndex = ref(0)

const utteranceItems = computed<UtteranceItem[]>(() => {
    const items: UtteranceItem[] = []
    let globalIndex = 0
    processedSections.value.forEach((section, sIdx) => {
        if (section.title) {
            items.push({
                globalIndex: globalIndex++,
                text: section.title + '.',
                isTitle: true,
                sectionIdx: sIdx
            })
        }
        if (section.lines) {
            section.lines.forEach((line, lIdx) => {
                items.push({
                    globalIndex: globalIndex++,
                    text: line,
                    isTitle: false,
                    sectionIdx: sIdx,
                    lineIdx: lIdx
                })
            })
        }
    })
    return items
})

const totalUtterances = computed(() => Math.max(0, utteranceItems.value.length - 1))

const getGlobalIndexForLine = (sectionIdx: number, lineIdx: number) => {
    const item = utteranceItems.value.find(i => i.sectionIdx === sectionIdx && i.lineIdx === lineIdx)
    return item ? item.globalIndex : 0
}

const onProgressChange = (newVal: number | undefined) => {
    if (newVal === undefined) return
    currentUtteranceIndex.value = newVal
    window.speechSynthesis.cancel()
    audioStatus.value = 'Ready' // bypass resume logic
    startOrResumeAudio()
}

const playFromGlobalIndex = (index: number) => {
    isAudioToolbarVisible.value = true
    currentUtteranceIndex.value = index
    window.speechSynthesis.cancel()
    audioStatus.value = 'Ready'
    startOrResumeAudio()
}

const populateVoices = () => {
    voices = window.speechSynthesis.getVoices()
    voiceOptions.value = voices.map(v => ({
        label: `${v.name} (${v.lang})`,
        value: v.voiceURI,
        lang: v.lang
    }))
    if (voiceOptions.value.length > 0 && !voiceOption.value) {
        const defaultVoice = voices.find(v => v.default) || voices.find(v => v.lang.startsWith('en')) || voices[0]
        if (defaultVoice) {
            voiceOption.value = voiceOptions.value.find(o => o.value === defaultVoice.voiceURI)
        }
    }
}



const startOrResumeAudio = () => {
    if (audioStatus.value === 'Paused') {
        window.speechSynthesis.resume()
        audioStatus.value = 'Playing'
        return
    }

    window.speechSynthesis.cancel()
    activeUtterances = []

    const selectedVoice = voices.find(v => v.voiceURI === voiceOption.value?.value)

    if (utteranceItems.value.length === 0) return

    const remainingItems = utteranceItems.value.slice(currentUtteranceIndex.value)
    if (remainingItems.length === 0) {
        audioStatus.value = 'Finished'
        return
    }

    remainingItems.forEach((item, i) => {
        const u = new SpeechSynthesisUtterance(item.text)
        u.rate = playbackSpeed.value
        u.volume = volume.value
        if (selectedVoice) {
            u.voice = selectedVoice
        }

        u.onstart = () => {
            audioStatus.value = 'Playing'
            currentUtteranceIndex.value = item.globalIndex

            if (item.lineIdx !== undefined) {
                const elementId = `line-${item.sectionIdx}-${item.lineIdx}`
                const el = document.getElementById(elementId)
                if (el) {
                    // Offset by 300px to account for the sticky toolbar and add a comfortable gap
                    const y = el.getBoundingClientRect().top + window.scrollY - 300
                    window.scrollTo({ top: y, behavior: 'smooth' })
                }
            }
        }

        if (item.globalIndex === utteranceItems.value.length - 1) {
            u.onend = () => { audioStatus.value = 'Finished' }
        }

        u.onerror = (e) => {
            console.error('Speech synthesis error', e)
        }

        u.onpause = () => { audioStatus.value = 'Paused' }
        u.onresume = () => { audioStatus.value = 'Playing' }

        activeUtterances.push(u)
        window.speechSynthesis.speak(u)
    })
}

const togglePlay = () => {
    if (audioStatus.value === 'Playing') {
        window.speechSynthesis.pause()
        audioStatus.value = 'Paused'
    } else {
        if (audioStatus.value === 'Finished') {
            audioStatus.value = 'Ready'
            currentUtteranceIndex.value = 0
        }
        startOrResumeAudio()
    }
}

const closeToolbar = () => {
    isAudioToolbarVisible.value = false
    window.speechSynthesis.cancel()
    audioStatus.value = 'Ready'
    currentUtteranceIndex.value = 0
}

const playAudio = () => {
    isAudioToolbarVisible.value = true
    if (audioStatus.value !== 'Playing' && audioStatus.value !== 'Paused') {
        currentUtteranceIndex.value = 0
        window.speechSynthesis.cancel()
        audioStatus.value = 'Ready'
        startOrResumeAudio()
    }
}

let debounceTimer: ReturnType<typeof setTimeout> | null = null

watch([playbackSpeed, volume, voiceOption], (newVals, oldVals) => {
    const isVoiceChange = newVals[2] !== oldVals[2]
    const delay = isVoiceChange ? 0 : 500 // Instant for voice, debounce for sliders

    if (debounceTimer) clearTimeout(debounceTimer)
    debounceTimer = setTimeout(() => {
        if (activeUtterances.length > 0 && (audioStatus.value === 'Playing' || audioStatus.value === 'Paused')) {
            const wasPaused = audioStatus.value === 'Paused'
            window.speechSynthesis.cancel()
            audioStatus.value = 'Ready' // bypass resume logic

            startOrResumeAudio()

            if (wasPaused) {
                setTimeout(() => {
                    window.speechSynthesis.pause()
                    audioStatus.value = 'Paused'
                }, 10)
            }
        }
    }, delay)
})
</script>

<template>
    <div class="flex flex-col gap-8" ref="transcriptContainer">
        <!-- listen audio toolbar -->
        <div v-if="isAudioToolbarVisible"
            class="sticky top-20 z-50 flex flex-col gap-2 bg-default/50 backdrop-blur-sm border border-default rounded-lg p-3 shadow-2xl text-slate-300 w-full transition-all">
            <div class="flex items-center gap-4 text-sm w-full">
                <div class="flex items-center gap-2">
                    <span class="text-muted">Speed</span>
                    <USlider v-model="playbackSpeed" :min="0.5" :max="2.0" :step="0.1" size="xs" class="w-24" />
                    <span class="text-muted min-w-[32px]">{{ playbackSpeed.toFixed(1) }}x</span>
                </div>
                <div class="sm:flex items-center gap-2 hidden">
                    <span class="text-muted">Voice</span>
                    <USelectMenu v-model="voiceOption" :items="voiceOptions" variant="outline" size="sm"
                        class="w-48 truncate" />
                </div>
                <div class="relative sm:flex items-center group/volume hidden">
                    <UButton :icon="volumeIcon" color="neutral" variant="outline" size="sm" @click="toggleMute" />
                    <div
                        class="absolute top-full left-1/2 -translate-x-1/2 mt-2 p-3 bg-default border border-default rounded-lg shadow-xl opacity-0 invisible group-hover/volume:opacity-100 group-hover/volume:visible transition-all flex items-center justify-center z-50 h-32 w-12">
                        <USlider v-model="volume" :min="0" :max="1" :step="0.05" orientation="vertical" size="xs" />
                    </div>
                </div>
                <UButton icon="i-lucide-notebook-pen" color="neutral" variant="outline" size="sm"
                    @click="$emit('open-notes')" />
                <div class="sm:flex items-center gap-2 hidden">
                    <UChip v-if="audioStatus !== 'Finished'" inset standalone
                        :color="audioStatus === 'Playing' || audioStatus === 'Paused' ? 'success' : 'warning'"
                        :class="audioStatus === 'Playing' ? 'animate-pulse' : ''" />
                    <span class="font-medium w-16 text-center" :class="{
                        'text-success': audioStatus === 'Playing' || audioStatus === 'Paused',
                        'text-warning': audioStatus === 'Ready',
                        'text-primary': audioStatus === 'Finished'
                    }">
                        {{ audioStatus }}
                    </span>
                </div>
                <UButton icon="i-lucide-x" color="neutral" variant="ghost" class="ml-auto" @click="closeToolbar" />
            </div>

            <div class="flex items-center gap-4 w-full">
                <UButton :icon="audioStatus === 'Playing' ? 'i-lucide-pause' : 'i-lucide-play'" color="primary"
                    variant="soft" @click="togglePlay" />
                <USlider :model-value="currentUtteranceIndex" :min="0" :max="totalUtterances" class="flex-1"
                    @update:model-value="onProgressChange" size="xs" />
                <span class="text-xs text-muted font-mono w-8 text-right">{{ currentUtteranceIndex + 1 }}/{{
                    totalUtterances + 1 }}</span>
            </div>
        </div>
        <UButton v-else icon="i-lucide-audio-lines" label="Listen to Transcript" color="primary" variant="ghost"
            class="w-fit" @click="playAudio" />
        <template v-for="(section, idx) in processedSections" :key="idx">
            <section>
                <h3 class="text-2xl font-bold mb-4 text-neutral-900 dark:text-white">{{ section.title }}</h3>

                <div class="flex flex-col gap-1 font-mono text-sm sm:font-sans sm:text-base">
                    <div v-for="(line, lIdx) in section.lines" :key="lIdx" :id="`line-${idx}-${lIdx}`"
                        class="group relative flex items-start gap-3 p-2 -mx-2 rounded-lg transition-colors cursor-text"
                        :class="[(isAudioToolbarVisible && getGlobalIndexForLine(idx, lIdx) === currentUtteranceIndex) ? 'bg-primary-50 dark:bg-primary-900/20 ring-1 ring-primary-500/50' : 'hover:bg-primary-50 dark:hover:bg-primary-900/20']">
                        <!-- Line Number -->
                        <div
                            class="w-6 shrink-0 text-right text-xs text-neutral-400 select-none mt-1 group-hover:text-primary-500 transition-colors font-mono">
                            {{ lIdx + 1 }}
                        </div>

                        <!-- Content -->
                        <p class="flex-1 m-0 text-neutral-700 dark:text-neutral-300 leading-relaxed pr-10">
                            {{ line }}
                        </p>

                        <!-- Actions -->
                        <div
                            class="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-white dark:bg-neutral-800 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700 flex">
                            <UTooltip text="Ask AI about this line" placement="top">
                                <UButton icon="i-lucide-sparkles" size="xs" color="primary" variant="ghost"
                                    @click="handleAskAi(line, idx, lIdx)" />
                            </UTooltip>
                            <UTooltip text="Play from here" placement="top">
                                <UButton icon="i-lucide-play" size="xs" color="primary" variant="ghost"
                                    @click="playFromGlobalIndex(getGlobalIndexForLine(idx, lIdx))" />
                            </UTooltip>
                            <UTooltip text="Add to Notes" placement="top">
                                <UButton icon="i-lucide-notebook-pen" size="xs" color="primary" variant="ghost"
                                    @click="addNote(line, idx, lIdx)" />
                            </UTooltip>
                        </div>
                    </div>
                </div>

                <!-- AI Insight Block (if available) -->
                <div v-if="section.aiInsight"
                    class="bg-primary-500/10 border-l-4 border-primary-500 p-4 my-6 rounded-r-lg">
                    <strong class="text-primary-700 dark:text-primary-400 flex items-center gap-2 mb-2">
                        <UIcon name="i-lucide-lightbulb" class="text-lg" />
                        AI Insight
                    </strong>
                    <p class="m-0 text-primary-600 dark:text-primary-300 text-sm leading-relaxed">
                        {{ section.aiInsight }}
                    </p>
                </div>
            </section>
        </template>
    </div>

    <Teleport to="body">
        <Transition name="fade">
            <div v-if="selectedText"
                class="fixed z-50 flex items-center gap-3 p-1.5 bg-muted rounded-xl shadow-2xl border border-muted pointer-events-auto transform -translate-x-1/2 -translate-y-full"
                :style="{ top: popupStyle.top, left: popupStyle.left }">
                <UButton icon="i-lucide-sparkles" label="Ask AI" color="primary" size="xs" variant="soft"
                    @click="askAiHighlighted" class="font-medium shrink-0 rounded-md" />
                <span class="text-sm text-slate-300 truncate max-w-[200px] pr-2">"{{ selectedText }}"</span>
            </div>
        </Transition>
    </Teleport>
</template>
