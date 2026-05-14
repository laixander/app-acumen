<script setup lang="ts">
import { ref, watch, nextTick, onMounted } from 'vue'
import type { SessionProbingReasoningProps } from '~/types/session'

const props = withDefaults(defineProps<SessionProbingReasoningProps>(), {
    isEvaluating: false,
    isReasoningSubmitted: false,
    evaluationText: "Your reasoning aligns with core legal principles. You've correctly identified the burden of proof and its application in this scenario. We'll advance the difficulty in the next set.",
    nextButtonLabel: 'Next Question'
})


const emit = defineEmits(['submit', 'next'])

const reasoningText = ref('')
const reasoningSection = ref<HTMLElement | null>(null)
const evaluationSection = ref<HTMLElement | null>(null)

watch(() => props.isReasoningSubmitted, (newVal) => {
    if (newVal) {
        nextTick(() => {
            evaluationSection.value?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        })
    }
})

// Auto-scroll to reasoning section when it appears
onMounted(() => {
    nextTick(() => {
        reasoningSection.value?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
})

const handleSubmit = () => {
    if (!reasoningText.value) return
    emit('submit', reasoningText.value)
}
</script>

<template>
    <div ref="reasoningSection"
        class="flex flex-col gap-8 p-8 md:p-10 rounded-4xl bg-[#0a0a0a] text-white border border-neutral-800 shadow-2xl animate-fade-in relative overflow-hidden scroll-mt-24">
        <div class="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent opacity-50"></div>

        <div class="flex items-center gap-2 text-[10px] tracking-[0.2em] font-bold uppercase text-primary relative z-10">
            <div class="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
            <span>Acumen AI</span>
            <span class="text-neutral-600">·</span>
            <span class="text-neutral-400">Probing Your Reasoning</span>
        </div>

        <div class="text-xl md:text-2xl leading-relaxed text-neutral-200 relative z-10 italic">
            Good choice. But explain it to me — why <span class="text-primary not-italic font-bold">{{ selectedOptionLabel
                }}</span>?
        </div>

        <div class="relative z-10">
            <UTextarea v-model="reasoningText" placeholder="Type your reasoning here..." :rows="4"
                :disabled="isReasoningSubmitted || isEvaluating" class="w-full relative z-10" :ui="{
                    base: 'bg-neutral-900/50 dark:bg-neutral-950 border-neutral-800 focus:border-primary/50 transition-all duration-300 text-lg py-4 px-6 rounded-2xl placeholder:text-neutral-700 ring-accented/20 dark:ring-accented focus:ring-primary/20 text-white'
                }" />

            <div v-if="!isReasoningSubmitted" class="flex justify-end mt-6">
                <UButton label="Submit Reasoning" color="primary" size="xl"
                    class="rounded-full px-12 py-4 uppercase text-xs font-bold tracking-widest hover:scale-105 active:scale-95 transition-all"
                    :loading="isEvaluating" @click="handleSubmit" />
            </div>
        </div>

        <!-- Acumen Evaluates Section -->
        <Transition name="fade">
            <div v-if="isReasoningSubmitted" ref="evaluationSection"
                class="flex flex-col gap-6 animate-fade-in pt-8 border-t border-neutral-800 scroll-mt-24">
                <div class="flex items-center gap-2 text-[10px] tracking-[0.2em] font-bold uppercase text-emerald-500">
                    <UIcon name="i-lucide-check-circle-2" class="w-3.5 h-3.5" />
                    <span>Acumen Evaluates</span>
                </div>

                <p class="text-lg leading-relaxed text-neutral-300">
                    {{ evaluationText }}
                </p>


                <div class="flex justify-end pt-4">
                    <UButton :label="nextButtonLabel" trailing-icon="i-lucide-arrow-right" size="xl" color="primary"
                        class="rounded-full px-10 py-4 uppercase text-xs font-bold tracking-widest hover:scale-105 active:scale-95 transition-all"
                        @click="$emit('next')" />
                </div>
            </div>
        </Transition>
    </div>
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

