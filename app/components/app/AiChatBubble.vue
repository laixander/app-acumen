<script setup lang="ts">
import type { ChatMessage } from '~/types/chat'

defineProps<{
    msg: ChatMessage
}>()

const emit = defineEmits<{
    (e: 'scrollToLine', id: string): void
    (e: 'togglePin'): void
}>()
</script>

<template>
    <div :id="`msg-${msg.id}`" class="flex flex-col gap-1 group/bubble"
        :class="msg.role === 'user' ? 'items-end' : 'items-start'">
        <div v-if="msg.isPinned" class="flex items-center gap-1 text-[10px] text-primary-500 font-medium px-10 mb-0.5">
            <UIcon name="i-lucide-pin" class="w-3 h-3 rotate-45" />
            Pinned
        </div>
        <div class="flex items-end gap-2 relative" :class="msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'">
            <!-- Avatar -->
            <UAvatar :icon="msg.role === 'user' ? 'i-lucide-user' : 'i-lucide-bot'"
                :color="msg.role === 'user' ? 'neutral' : 'primary'" size="sm" class="shrink-0 mb-1" />

            <!-- Bubble -->
            <div class="flex flex-col gap-2 max-w-[85%]">
                <!-- Quote Box -->
                <div v-if="msg.quote" @click="emit('scrollToLine', msg.quote.id)"
                    class="text-xs bg-white/80 dark:bg-black/20 p-2.5 rounded-lg border border-primary-200/50 dark:border-primary-800/30 cursor-pointer hover:bg-white dark:hover:bg-black/40 transition-colors shadow-sm"
                    :class="msg.role === 'user' ? 'text-primary-900 dark:text-primary-100' : 'text-neutral-700 dark:text-neutral-300'">
                    <div class="flex items-center gap-1.5 mb-1.5 font-semibold opacity-90">
                        <UIcon name="i-lucide-quote" class="w-3.5 h-3.5" />
                        Referred Line
                    </div>
                    <p class="m-0 line-clamp-2 italic opacity-90">{{ msg.quote.text }}</p>
                </div>
                <!-- Attachment Box -->
                <div v-if="msg.attachment"
                    class="flex items-center gap-2 p-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50/50 dark:bg-neutral-800/50"
                    :class="msg.role === 'user' ? 'bg-white/10 border-white/20' : ''">
                    <div class="bg-white dark:bg-neutral-700 p-1.5 rounded flex items-center justify-center">
                        <UIcon name="i-lucide-file-text" class="text-neutral-500" />
                    </div>
                    <div class="flex-1 min-w-0">
                        <p class="text-[11px] font-medium truncate"
                            :class="msg.role === 'user' ? 'text-white' : 'text-neutral-700 dark:text-neutral-200'">{{
                            msg.attachment.name }}</p>
                        <p class="text-[9px]" :class="msg.role === 'user' ? 'text-white/60' : 'text-neutral-500'">{{
                            (msg.attachment.size / 1024).toFixed(1) }} KB</p>
                    </div>
                </div>

                <!-- Content -->
                <div v-if="msg.content" class="px-4 py-2.5 rounded-2xl text-sm relative group/content"
                    :class="msg.role === 'user'
                        ? 'bg-primary-600 dark:bg-primary-500 text-white rounded-br-sm shadow-sm'
                        : 'bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-bl-sm shadow-sm'">
                    {{ msg.content }}

                    <!-- Pin Action Button -->
                    <div class="absolute top-0 opacity-0 group-hover/bubble:opacity-100 transition-opacity"
                        :class="msg.role === 'user' ? '-left-8' : '-right-8'">
                        <UButton :icon="msg.isPinned ? 'i-lucide-pin-off' : 'i-lucide-pin'" variant="ghost"
                            color="neutral" size="xs"
                            class="rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800"
                            :class="msg.isPinned ? 'text-primary-500' : 'text-neutral-400'"
                            @click="emit('togglePin')" />
                    </div>
                </div>
            </div>
        </div>
        <span class="text-[10px] text-neutral-400 px-10">{{ msg.role === 'user' ? 'You' : 'Acumen' }}</span>
    </div>
</template>
