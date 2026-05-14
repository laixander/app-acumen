<script setup lang="ts">
import type { SessionProcessingLine } from '~/types/session'

const props = defineProps<{
    lines: SessionProcessingLine[]
}>()

const emit = defineEmits(['complete'])

const activeLines = ref<string[]>([])

onMounted(async () => {
    activeLines.value = []
    for (const line of props.lines) {
        await new Promise(r => setTimeout(r, line.delay))
        activeLines.value.push(line.text)
    }
    await new Promise(r => setTimeout(r, 800))
    emit('complete')
})
</script>


<template>
    <div class="p-8 md:p-16 flex flex-col gap-6 font-mono text-sm text-neutral-500 dark:text-neutral-400 min-h-[400px] justify-center items-start w-full max-w-4xl mx-auto animate-fade-in">
        <div class="flex items-center gap-3 text-primary mb-4 border border-primary/30 px-4 py-2 rounded-full bg-primary/10">
            <UIcon name="i-lucide-cpu" class="w-4 h-4 animate-pulse" />
            <span class="tracking-widest uppercase font-bold text-[10px]">Acumen AI Engine</span>
        </div>
        <div class="flex flex-col gap-5 text-base text-neutral-700 dark:text-neutral-300 w-full">
            <TransitionGroup name="line">
                <div v-for="(line, idx) in activeLines" :key="idx" class="line-item" v-html="line">
                </div>
            </TransitionGroup>
        </div>

        <div v-if="activeLines.length < lines.length" class="flex gap-2 mt-4 items-center">
            <span class="w-2 h-2 bg-primary rounded-full animate-bounce" style="animation-delay: 0ms"></span>
            <span class="w-2 h-2 bg-primary rounded-full animate-bounce" style="animation-delay: 150ms"></span>
            <span class="w-2 h-2 bg-primary rounded-full animate-bounce" style="animation-delay: 300ms"></span>
        </div>
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

.line-enter-active {
    transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.line-enter-from {
    opacity: 0;
    transform: translateY(8px) scale(0.98);
    filter: blur(4px);
}

.line-item {
    transition: all 0.5s ease;
}
</style>


