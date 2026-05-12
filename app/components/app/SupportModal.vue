<script setup lang="ts">
const open = defineModel<boolean>('open', { default: false })

const form = reactive({
    category: 'billing',
    subject: '',
    message: ''
})

const categories = [
    { label: 'Billing & Payments', value: 'billing' },
    { label: 'Technical Issue', value: 'technical' },
    { label: 'Feature Request', value: 'feature' },
    { label: 'Account Access', value: 'account' },
    { label: 'Other', value: 'other' }
]

const toast = useToast()
const loading = ref(false)

const handleSubmit = () => {
    if (!form.subject || !form.message) {
        toast.add({ title: 'Missing Information', description: 'Please provide a subject and message.', color: 'red' })
        return
    }

    loading.value = true
    setTimeout(() => {
        loading.value = false
        open.value = false
        toast.add({ 
            title: 'Ticket Created', 
            description: "We've received your request. Our support team will get back to you within 24 hours.",
            color: 'success'
        })
        // Reset form
        form.subject = ''
        form.message = ''
    }, 1500)
}
</script>

<template>
    <UModal v-model:open="open">
        <template #header>
            <div class="flex items-center gap-3">
                <div class="p-2 rounded-lg bg-primary-500/10 text-primary-500">
                    <UIcon name="i-lucide-help-circle" class="text-xl flex" />
                </div>
                <div>
                    <h3 class="text-lg font-bold">Contact Support</h3>
                    <p class="text-xs text-neutral-500">How can we help you today?</p>
                </div>
            </div>
        </template>

        <template #body>
            <div class="flex flex-col gap-5">
                <UFormField label="What do you need help with?">
                    <USelect v-model="form.category" :items="categories" class="w-full" variant="soft" />
                </UFormField>

                <UFormField label="Subject">
                    <UInput v-model="form.subject" placeholder="Brief summary of your issue" variant="soft" class="w-full" />
                </UFormField>

                <UFormField label="Message">
                    <UTextarea v-model="form.message" placeholder="Please describe your issue in detail..." :rows="4" variant="soft" class="w-full" />
                </UFormField>

                <div class="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-100 dark:border-neutral-800 flex items-start gap-3">
                    <UIcon name="i-lucide-info" class="text-neutral-400 mt-0.5" />
                    <p class="text-[11px] text-neutral-500 leading-relaxed">
                        Our average response time is currently <strong>less than 4 hours</strong> for Pro users. Standard support requests are handled within 24 hours.
                    </p>
                </div>
            </div>
        </template>

        <template #footer>
            <div class="flex items-center justify-end gap-3">
                <UButton label="Cancel" variant="ghost" color="neutral" @click="open = false" />
                <UButton label="Send Message" color="primary" :loading="loading" @click="handleSubmit" />
            </div>
        </template>
    </UModal>
</template>
