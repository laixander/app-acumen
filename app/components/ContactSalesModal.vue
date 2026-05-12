<script setup lang="ts">
const open = defineModel<boolean>('open', { default: false })
const toast = useToast()
const loading = ref(false)

const form = reactive({
    name: '',
    email: '',
    company: '',
    teamSize: '10-50',
    message: ''
})

const submitRequest = () => {
    if (!form.name || !form.email || !form.company) {
        toast.add({ title: 'Error', description: 'Please fill in all required fields.', color: 'red' })
        return
    }

    loading.value = true
    // Simulate API call
    setTimeout(() => {
        loading.value = false
        toast.add({
            title: 'Request Sent!',
            description: "Thanks for reaching out! Our sales team will contact you at " + form.email + " within 24 hours.",
            color: 'primary'
        })
        open.value = false
        // Reset form
        Object.assign(form, {
            name: '',
            email: '',
            company: '',
            teamSize: '10-50',
            message: ''
        })
    }, 1500)
}
</script>

<template>
    <UModal v-model:open="open" class="sm:max-w-md">
        <template #header>
            <div class="flex items-center gap-3">
                <div class="p-2 rounded-lg bg-primary/10">
                    <UIcon name="i-lucide-building-2" class="text-primary w-5 h-5 flex" />
                </div>
                <div>
                    <h3 class="text-lg font-semibold">Contact Sales</h3>
                    <p class="text-sm text-muted">Tell us about your team's needs.</p>
                </div>
            </div>
        </template>

        <template #body>
            <div class="space-y-4">
                <UFormField label="Full Name" required>
                    <UInput v-model="form.name" placeholder="John Doe" variant="soft" class="w-full" />
                </UFormField>

                <UFormField label="Work Email" required>
                    <UInput v-model="form.email" type="email" placeholder="john@company.com" variant="soft"
                        class="w-full" />
                </UFormField>

                <UFormField label="Company Name" required>
                    <UInput v-model="form.company" placeholder="Acme Inc." variant="soft" class="w-full" />
                </UFormField>

                <UFormField label="Team Size">
                    <USelect v-model="form.teamSize" :items="['1-10', '10-50', '50-200', '200+']" variant="soft"
                        class="w-full" />
                </UFormField>

                <UFormField label="How can we help?">
                    <UTextarea v-model="form.message" placeholder="Tell us more about your requirements..."
                        variant="soft" :rows="3" class="w-full" />
                </UFormField>
            </div>
        </template>

        <template #footer>
            <div class="flex justify-end gap-3">
                <UButton color="neutral" variant="soft" @click="open = false">Cancel</UButton>
                <UButton color="primary" :loading="loading" @click="submitRequest">Send Request</UButton>
            </div>
        </template>
    </UModal>
</template>
