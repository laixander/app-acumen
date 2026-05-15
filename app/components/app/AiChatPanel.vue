<script setup lang="ts">
import { ref, nextTick, watch, computed } from 'vue'
import { useWindowScroll, useWindowSize } from '@vueuse/core'
import type { ChatMessage, ChatQuote } from '~/types/chat'

const props = defineProps<{
    pendingQuote?: ChatQuote | null
}>()

const emit = defineEmits<{
    (e: 'update:pendingQuote', val: ChatQuote | null): void
}>()

const chatInput = ref('')
const chatMessages = ref<ChatMessage[]>([
    {
        id: 'init-1',
        role: 'assistant',
        content: 'Hello! I\'m your AI tutor. I have the context of this lesson. What would you like to ask?'
    },
    {
        id: 'init-2',
        role: 'user',
        content: 'Can you explain the difference between L1 and L2 cache?'
    },
    {
        id: 'init-3',
        role: 'assistant',
        content: 'Certainly! L1 cache is the smallest and fastest cache, built directly into each CPU core. It holds the data you are using at this exact moment. L2 cache is slightly larger and slower; it acts as a backup that feeds data to the L1 cache.'
    }
])
const isChatLoading = ref(false)
const chatContainer = ref<HTMLElement | null>(null)

const scrollToBottom = async () => {
    await nextTick()
    if (chatContainer.value) {
        chatContainer.value.scrollTop = chatContainer.value.scrollHeight
    }
}

// Watch for a new quote to auto-focus the input
watch(() => props.pendingQuote, (newVal) => {
    if (newVal) {
        nextTick(() => {
            const textarea = document.querySelector('textarea')
            if (textarea) textarea.focus()
        })
    }
})

const fileInput = ref<HTMLInputElement | null>(null)
const attachedFile = ref<File | null>(null)

const triggerFileInput = () => {
    fileInput.value?.click()
}

const handleFileChange = (e: Event) => {
    const target = e.target as HTMLInputElement
    if (target.files && target.files[0]) {
        attachedFile.value = target.files[0]
    }
}

const removeAttachment = () => {
    attachedFile.value = null
    if (fileInput.value) {
        fileInput.value.value = ''
    }
}

const handleSendMessage = () => {
    if ((!chatInput.value.trim() && !props.pendingQuote && !attachedFile.value) || isChatLoading.value) return

    const messageId = Date.now().toString()
    chatMessages.value.push({
        id: messageId,
        role: 'user',
        content: chatInput.value,
        quote: props.pendingQuote ? { ...props.pendingQuote } : undefined,
        attachment: attachedFile.value ? {
            name: attachedFile.value.name,
            size: attachedFile.value.size
        } : undefined
    })
    const query = chatInput.value
    chatInput.value = ''
    attachedFile.value = null
    emit('update:pendingQuote', null)
    scrollToBottom()

    isChatLoading.value = true

    // Simulate AI response
    setTimeout(() => {
        chatMessages.value.push({
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            content: `That's a great question. Based on the lesson material, here is a detailed explanation...`
        })
        isChatLoading.value = false
        scrollToBottom()
    }, 1500)
}

const togglePin = (idx: number) => {
    const msg = chatMessages.value[idx]
    if (msg) {
        msg.isPinned = !msg.isPinned
    }
}

const pinnedMessages = computed(() => chatMessages.value.filter(m => m.isPinned))
const showPinned = ref(false)

const scrollToMessage = (id: string) => {
    const el = document.getElementById(`msg-${id}`)
    if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' })
        el.classList.add('ring-2', 'ring-primary-500', 'ring-offset-2', 'dark:ring-offset-neutral-900')
        setTimeout(() => {
            el.classList.remove('ring-2', 'ring-primary-500', 'ring-offset-2', 'dark:ring-offset-neutral-900')
        }, 2000)
    }
}

const scrollToLine = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' })
        el.classList.add('bg-primary-100', 'dark:bg-primary-900/50')
        setTimeout(() => {
            el.classList.remove('bg-primary-100', 'dark:bg-primary-900/50')
        }, 2000)
    }
}

// Scroll-responsive height logic
const { y } = useWindowScroll()
const { height: vh } = useWindowSize()

const dynamicHeight = computed(() => {
    // 1. Initial Height Expansion (Top-down)
    // Starts at calc(100vh - 240px) and expands to calc(100vh - 100px)
    const startOffset = 240
    const endOffset = 100
    const scrollThreshold = 200 // Complete transition over 200px scroll

    const progress = Math.min(y.value / scrollThreshold, 1)
    const currentTopOffset = startOffset - (progress * (startOffset - endOffset))

    // Calculate base height in pixels
    let heightPx = vh.value - currentTopOffset

    // 2. Footer Avoidance (Bottom-up)
    // Prevents the chatbox from being pushed upward by the footer
    if (typeof document !== 'undefined') {
        const docHeight = document.documentElement.scrollHeight
        const footerThreshold = 70 // Distance from bottom where we start shrinking
        const distanceFromBottom = docHeight - (y.value + vh.value)

        if (distanceFromBottom < footerThreshold) {
            // Reduce height as we get closer to the footer
            heightPx -= (footerThreshold - distanceFromBottom)
        }
    }

    // Return as pixels with a minimum height to ensure usability
    return `${Math.max(heightPx, 500)}px`
})
</script>

<template>
    <div class="relative">
        <div class="sticky top-20 flex flex-col min-h-[500px] border border-neutral-200 dark:border-neutral-800 rounded-lg overflow-hidden bg-white dark:bg-neutral-900 shadow-sm transition-[height] duration-300 ease-out"
            :style="{ height: dynamicHeight }">
            <!-- Chat Header -->
            <div
                class="p-4 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/50 flex items-center justify-between shrink-0">
                <div class="flex items-center gap-3">
                    <div class="bg-primary-500/10 text-primary-600 dark:text-primary-400 p-2 rounded-xl">
                        <UIcon name="i-lucide-sparkles" class="text-xl flex shrink-0" />
                    </div>
                    <div>
                        <h3 class="font-bold leading-none mb-1">Ask Acumen</h3>
                        <p class="text-xs text-dimmed">Always here to help with context</p>
                    </div>
                </div>
                <UBadge variant="subtle" color="primary">Online</UBadge>
            </div>

            <!-- Pinned Messages Bar -->
            <div v-if="pinnedMessages.length > 0"
                class="border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shrink-0">
                <button @click="showPinned = !showPinned"
                    class="w-full p-2.5 flex items-center justify-between hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                    <div class="flex items-center gap-2">
                        <UIcon name="i-lucide-pin" class="w-3.5 h-3.5 text-primary-500 rotate-45" />
                        <span class="text-xs font-semibold text-neutral-600 dark:text-neutral-400">
                            Pinned Messages ({{ pinnedMessages.length }})
                        </span>
                    </div>
                    <UIcon :name="showPinned ? 'i-lucide-chevron-up' : 'i-lucide-chevron-down'"
                        class="w-4 h-4 text-neutral-400 transition-transform" />
                </button>

                <div v-if="showPinned"
                    class="max-h-40 overflow-y-auto p-2 flex flex-col gap-2 bg-neutral-50/30 dark:bg-black/10 custom-scrollbar border-t border-neutral-200 dark:border-neutral-800 animate-in slide-in-from-top-1 duration-200">
                    <div v-for="(msg, idx) in pinnedMessages" :key="idx" @click="scrollToMessage(msg.id)"
                        class="p-2 rounded-lg bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow-sm relative group/pinned cursor-pointer hover:border-primary-500/50 hover:bg-primary-50/10 transition-all">
                        <p class="text-[11px] text-neutral-700 dark:text-neutral-300 line-clamp-1 pr-6 italic">{{
                            msg.content }}</p>
                        <UButton icon="i-lucide-pin-off" variant="ghost" color="neutral" size="xs"
                            class="absolute top-1 right-1 opacity-0 group-hover/pinned:opacity-100 transition-opacity"
                            @click.stop="msg.isPinned = false" />
                    </div>
                </div>
            </div>

            <!-- Chat Messages Area -->
            <div ref="chatContainer"
                class="flex-1 overflow-y-auto p-4 flex flex-col gap-6 bg-neutral-50/50 dark:bg-neutral-900/50 custom-scrollbar">

                <AppAiChatBubble v-for="(msg, idx) in chatMessages" :key="idx" :msg="msg" @scroll-to-line="scrollToLine"
                    @toggle-pin="togglePin(idx)" />

                <!-- Typing Indicator -->
                <div v-if="isChatLoading" class="flex flex-col gap-1 items-start">
                    <div class="flex items-end gap-2 flex-row">
                        <UAvatar icon="i-lucide-bot" color="primary" size="sm" class="shrink-0 mb-1" />
                        <div
                            class="px-4 py-3 rounded-2xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-bl-sm shadow-sm flex items-center gap-1.5">
                            <span class="w-1.5 h-1.5 rounded-full bg-primary-500/60 animate-bounce"></span>
                            <span class="w-1.5 h-1.5 rounded-full bg-primary-500/60 animate-bounce"
                                style="animation-delay: 0.15s"></span>
                            <span class="w-1.5 h-1.5 rounded-full bg-primary-500/60 animate-bounce"
                                style="animation-delay: 0.3s"></span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Chat Input Area -->
            <div class="p-4 border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shrink-0">
                <!-- Pending Quote -->
                <div v-if="pendingQuote"
                    class="mb-3 p-2 bg-primary-50 dark:bg-primary-900/10 border border-primary-100 dark:border-primary-800/30 rounded-lg flex items-start gap-2 relative group">
                    <UIcon name="i-lucide-quote" class="text-primary-500 mt-0.5 shrink-0" />
                    <p class="text-xs text-primary-700 dark:text-primary-300 line-clamp-2 m-0 flex-1">{{
                        pendingQuote.text
                    }}</p>
                    <UButton icon="i-lucide-x" color="neutral" variant="ghost" size="xs"
                        @click="emit('update:pendingQuote', null)" class="absolute top-1 right-1" />
                </div>

                <!-- Attached File Preview -->
                <div v-if="attachedFile"
                    class="mb-3 p-2 bg-neutral-100 dark:bg-neutral-800 rounded-lg flex items-center gap-2 border border-neutral-200 dark:border-neutral-700 relative group animate-in fade-in slide-in-from-bottom-1">
                    <div class="bg-white dark:bg-neutral-700 p-1.5 rounded flex items-center justify-center">
                        <UIcon name="i-lucide-file-text" class="text-neutral-500" />
                    </div>
                    <div class="flex-1 min-w-0">
                        <p class="text-xs font-medium text-neutral-700 dark:text-neutral-200 truncate">{{
                            attachedFile.name }}</p>
                        <p class="text-[10px] text-neutral-500">{{ (attachedFile.size / 1024).toFixed(1) }} KB</p>
                    </div>
                    <UButton icon="i-lucide-x" color="neutral" variant="ghost" size="xs" @click="removeAttachment"
                        class="hover:bg-neutral-200 dark:hover:bg-neutral-600" />
                </div>

                <form @submit.prevent="handleSendMessage"
                    class="relative bg-neutral-50 dark:bg-neutral-800/50 rounded-xl border border-neutral-200 dark:border-neutral-700 focus-within:border-primary-500/50 focus-within:ring-1 focus-within:ring-primary-500/20 transition-all p-1">

                    <input type="file" ref="fileInput" class="hidden" @change="handleFileChange" />

                    <div class="absolute bottom-1.5 left-1.5 flex items-center z-10">
                        <UButton icon="i-lucide-paperclip" color="neutral" variant="ghost" size="xs"
                            class="rounded-lg w-8 h-8 flex items-center justify-center text-neutral-400 hover:text-primary-500 transition-colors"
                            @click="triggerFileInput" />
                    </div>
                    <UTextarea v-model="chatInput" placeholder="Ask a question about this lesson..." :rows="1"
                        autoresize :maxrows="5" variant="none" class="w-full"
                        :ui="{ base: 'w-full pl-10 pr-12 py-2 resize-none custom-scrollbar bg-transparent border-none focus:ring-0 text-sm' }"
                        @keydown.enter.prevent="handleSendMessage" />
                    <div class="absolute bottom-1.5 right-1.5 flex items-center z-10">
                        <UButton type="submit" icon="i-lucide-arrow-up" color="primary" variant="soft" :class="[
                            'rounded-lg w-8 h-8 flex items-center justify-center transition-all duration-200',
                            !isChatLoading && (!chatInput.trim() && !pendingQuote && !attachedFile) ? 'opacity-0 scale-75 pointer-events-none' : 'opacity-100 scale-100'
                        ]" :disabled="(!chatInput.trim() && !pendingQuote && !attachedFile) || isChatLoading"
                            :loading="isChatLoading" />
                    </div>
                </form>
                <p class="text-[10px] text-center text-neutral-400 mt-3">AI can make mistakes. Verify important
                    information.
                </p>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* Optional styling to make scrollbars sleeker */
.custom-scrollbar::-webkit-scrollbar {
    width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: rgba(156, 163, 175, 0.5);
    border-radius: 20px;
}

.dark .custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: rgba(75, 85, 99, 0.5);
}
</style>
