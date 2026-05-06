<script setup lang="ts">
import { computed } from 'vue'
import type { LessonSection } from '~/types/topic'

const props = defineProps<{
    sections: LessonSection[]
}>()

const emit = defineEmits<{
    (e: 'askAi', payload: { text: string, id: string }): void
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
</script>

<template>
    <div class="flex flex-col gap-8">
        <template v-for="(section, idx) in processedSections" :key="idx">
            <section>
                <h3 class="text-2xl font-bold mb-4 text-neutral-900 dark:text-white">{{ section.title }}</h3>

                <div class="flex flex-col gap-1 font-mono text-sm sm:font-sans sm:text-base">
                    <div v-for="(line, lIdx) in section.lines" :key="lIdx"
                        :id="`line-${idx}-${lIdx}`"
                        class="group relative flex items-start gap-3 p-2 -mx-2 rounded-lg transition-colors hover:bg-primary-50 dark:hover:bg-primary-900/20 cursor-text">
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
                            <UTooltip text="Ask AI about this line" placement="left">
                                <UButton icon="i-lucide-sparkles" size="xs" color="primary" variant="ghost"
                                    @click="handleAskAi(line, idx, lIdx)" />
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
</template>
