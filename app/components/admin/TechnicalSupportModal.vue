<script setup lang="ts">
const open = defineModel<boolean>('open', { default: false })

const props = defineProps<{
    user: any
}>()

const ticketCategory = ref('account')
const ticketPriority = ref('medium')
const ticketSubject = ref('')
const ticketMessage = ref('')

const ticketCategories = [
    { label: 'Account & Login', value: 'account' },
    { label: 'Lesson Content', value: 'content' },
    { label: 'AI Engine Issues', value: 'ai' },
    { label: 'Payment & Billing', value: 'billing' },
    { label: 'Performance & Bugs', value: 'bugs' },
]

const priorities = [
    { label: 'Low', value: 'low', color: 'neutral' },
    { label: 'Medium', value: 'medium', color: 'warning' },
    { label: 'High', value: 'high', color: 'error' },
    { label: 'Urgent', value: 'urgent', color: 'error' },
]

watch(() => open.value, (isOpen) => {
    if (isOpen) {
        ticketCategory.value = 'account'
        ticketPriority.value = 'medium'
        ticketSubject.value = ''
        ticketMessage.value = ''
    }
})
</script>
<template>
    <UModal v-model:open="open" :ui="{ content: 'sm:max-w-xl' }">
        <template #header>
            <div class="flex items-center gap-3">
                <div class="p-2 rounded-lg bg-orange-500/10">
                    <UIcon name="i-lucide-life-buoy" class="text-orange-500 w-5 h-5 flex" />
                </div>
                <div>
                    <h3 class="text-lg font-semibold">Technical Support</h3>
                    <p class="text-sm text-muted">Create a support ticket for
                        {{ user?.name }}</p>
                </div>
            </div>
        </template>

        <template #body>
            <div class="space-y-6 sm:p-4">
                <!-- Existing Tickets Summary -->
                <UCard variant="subtle" class="rounded-xl" :ui="{ body: 'flex items-center gap-4 sm:p-4' }">
                    <div class="flex-1 text-center">
                        <div class="text-2xl font-bold">3</div>
                        <div class="text-xs text-muted">Open</div>
                    </div>
                    <div class="w-px h-8 bg-accented"></div>
                    <div class="flex-1 text-center">
                        <div class="text-2xl font-bold">12</div>
                        <div class="text-xs text-muted">Resolved</div>
                    </div>
                    <div class="w-px h-8 bg-accented"></div>
                    <div class="flex-1 text-center">
                        <div class="text-2xl font-bold text-green-500">94%</div>
                        <div class="text-xs text-muted">Satisfaction</div>
                    </div>
                </UCard>

                <!-- Category -->
                <UFormField label="Category" description="Select the type of issue.">
                    <USelect v-model="ticketCategory" :items="ticketCategories" class="w-full" />
                </UFormField>

                <!-- Priority -->
                <UFormField label="Priority">
                    <div class="flex gap-2">
                        <UButton v-for="p in priorities" :key="p.value"
                            :color="ticketPriority === p.value ? p.color as any : 'neutral'"
                            :variant="ticketPriority === p.value ? 'soft' : 'outline'" size="sm"
                            @click="ticketPriority = p.value">
                            {{ p.label }}
                        </UButton>
                    </div>
                </UFormField>

                <!-- Subject -->
                <UFormField label="Subject">
                    <UInput v-model="ticketSubject" placeholder="Brief description of the issue..." class="w-full" />
                </UFormField>

                <!-- Message -->
                <UFormField label="Admin Notes" description="Internal notes or instructions for the support team.">
                    <UTextarea v-model="ticketMessage" :rows="3" placeholder="Describe the issue or steps to resolve..."
                        class="w-full" />
                </UFormField>
            </div>
        </template>

        <template #footer>
            <div class="flex justify-end gap-3">
                <UButton color="neutral" variant="soft" @click="open = false">Cancel</UButton>
                <UButton color="neutral" @click="open = false">Create Ticket</UButton>
            </div>
        </template>
    </UModal>
</template>