<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const insights = [
    {
        title: 'Daily Insight',
        text: 'You typically focus better in the mornings. Consider a quick 10-minute session now to boost retention.',
        icon: 'i-lucide-sun'
    },
    {
        title: 'Study Tip',
        text: 'Reviewing "Algebra Core" will help you master this week\'s Algebra tasks 20% faster.',
        icon: 'i-lucide-lightbulb'
    },
    {
        title: 'Goal Tracker',
        text: 'You are 85% of the way to your weekly goal. Just one more lesson to hit your milestone!',
        icon: 'i-lucide-target'
    },
    {
        title: 'Knowledge Gap',
        text: 'It looks like Checkpoint 2 was a bit tough. We recommend a quick review of Module 8.',
        icon: 'i-lucide-brain-circuit'
    }
]

const currentIndex = ref(0)
let intervalId: any = null

const currentInsight = computed(() => {
    return insights[currentIndex.value % insights.length]
})

onMounted(() => {
    intervalId = setInterval(() => {
        currentIndex.value++
    }, 10000)
})

onUnmounted(() => {
    if (intervalId) clearInterval(intervalId)
})
</script>
<template>
    <div v-if="currentInsight"
        class="bg-primary-500/10 border-l-4 border-primary-500 p-4 pl-6 rounded-r-lg transition-all hover:bg-primary-500/15 cursor-default relative overflow-hidden flex flex-col justify-center max-w-100 text-left">

        <Transition name="fade-header" mode="out-in">
            <div :key="currentIndex" class="flex items-center gap-2 mb-1">
                <UIcon :name="currentInsight.icon" class="text-primary-500" />
                <strong class="text-primary-700 dark:text-primary-400 block pb-0.5">
                    {{ currentInsight.title }}
                </strong>
            </div>
        </Transition>

        <Transition name="fade-content" mode="out-in">
            <p :key="currentIndex" class="m-0 text-primary-600 dark:text-primary-300/50 text-sm leading-relaxed">
                {{ currentInsight.text }}
            </p>
        </Transition>
    </div>
</template>