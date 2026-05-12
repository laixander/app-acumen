<script setup lang="ts">
const props = withDefaults(defineProps<{
    plan: {
        id: string
        name: string
        price: number
    }
    mode?: 'purchase' | 'update'
    canManage?: boolean
}>(), {
    canManage: true
})

const open = defineModel<boolean>('open', { default: false })
const emit = defineEmits(['success'])

const toast = useToast()
const loading = ref(false)

const form = reactive({
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvc: '',
    zip: ''
})

const handlePurchase = () => {
    if (!props.canManage) {
        toast.add({ title: 'Permission Denied', description: 'You do not have permission to manage billing.', color: 'red' })
        return
    }

    if (!form.cardName || !form.cardNumber || !form.expiry || !form.cvc) {
        toast.add({ title: 'Missing Info', description: 'Please fill in all payment details.', color: 'red' })
        return
    }

    loading.value = true
    // Simulate payment processing
    setTimeout(() => {
        loading.value = false
        open.value = false
        toast.add({
            title: 'Upgrade Successful!',
            description: `Welcome to the ${props.plan.name} plan. Your payment has been processed.`,
            color: 'primary'
        })
        emit('success', props.plan.id)

        // Reset form
        Object.assign(form, { cardName: '', cardNumber: '', expiry: '', cvc: '', zip: '' })
    }, 2000)
}
</script>

<template>
    <UModal v-model:open="open" class="sm:max-w-lg">
        <template #header>
            <div class="flex items-center gap-3">
                <div class="p-2 rounded-lg bg-primary-500 text-white shadow-lg shadow-primary-500/20">
                    <UIcon name="i-lucide-shield-check" class="text-xl flex" />
                </div>
                <div>
                    <h3 class="text-lg font-bold">{{ mode === 'update' ? 'Update Payment Method' : 'Secure Checkout' }}
                    </h3>
                    <p class="text-xs text-neutral-500">{{
                        mode === 'update' ?
                            'Your card details will be updated securely.'
                            : `Complete your upgrade to the ${plan.name} plan.` }}</p>
                </div>
            </div>
        </template>

        <template #body>
            <div class="flex flex-col gap-8">
                <!-- Plan Summary -->
                <div v-if="mode !== 'update'"
                    class="p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
                    <div class="flex flex-col gap-1">
                        <span class="text-xs font-bold uppercase tracking-widest text-neutral-400">Selected Plan</span>
                        <span class="font-bold text-neutral-900 dark:text-neutral-100">{{ plan.name }}
                            Subscription</span>
                    </div>
                    <div class="flex flex-col items-end">
                        <span class="text-2xl font-black text-primary-500">${{ plan.price }}</span>
                        <span class="text-[10px] text-neutral-400 font-medium">per month, billed monthly</span>
                    </div>
                </div>

                <!-- Payment Form -->
                <div class="flex flex-col gap-4">
                    <UFormField label="Cardholder Name" required>
                        <UInput v-model="form.cardName" placeholder="Name on card" variant="soft" icon="i-lucide-user"
                            class="w-full" />
                    </UFormField>

                    <UFormField label="Card Information" required>
                        <div class="flex flex-col gap-2">
                            <UInput v-model="form.cardNumber" placeholder="0000 0000 0000 0000" variant="soft"
                                icon="i-lucide-credit-card" />
                            <div class="grid grid-cols-3 gap-2">
                                <UInput v-model="form.expiry" placeholder="MM/YY" variant="soft" class="col-span-1" />
                                <UInput v-model="form.cvc" placeholder="CVC" variant="soft" class="col-span-1" />
                                <UInput v-model="form.zip" placeholder="ZIP" variant="soft" class="col-span-1" />
                            </div>
                        </div>
                    </UFormField>
                </div>

                <!-- Security Trust -->
                <div class="flex items-center justify-center gap-6 py-2">
                    <div class="flex items-center gap-1.5 opacity-40 grayscale">
                        <UIcon name="i-simple-icons-stripe" class="text-2xl" />
                        <span class="text-[10px] font-bold uppercase tracking-tighter">Stripe</span>
                    </div>
                    <div class="w-px h-4 bg-neutral-200 dark:bg-neutral-800" />
                    <div class="flex items-center gap-1.5 text-neutral-400">
                        <UIcon name="i-lucide-lock" class="text-xs" />
                        <span class="text-[10px] font-medium uppercase tracking-widest">SSL Encrypted</span>
                    </div>
                </div>
            </div>
        </template>

        <template #footer>
            <div class="flex flex-col gap-3 w-full">
                <UAlert v-if="!canManage"
                    title="Insufficient Permissions"
                    description="Your account does not have the authority to process payments or update billing for this organization."
                    color="error"
                    variant="soft"
                    icon="i-lucide-shield-off"
                    class="mb-2"
                />
                <UButton :label="mode === 'update' ? 'Update Card' : 'Complete Purchase'" block color="primary"
                    size="xl" class="rounded-2xl font-bold py-4 transition-all" :loading="loading"
                    :disabled="!canManage"
                    @click="handlePurchase" />
                <p class="text-[10px] text-neutral-500 text-center leading-relaxed px-4">
                    {{ mode === 'update' ? 'Your new card will be used for future billing cycles.' : `By clicking
                    "Complete Purchase", you authorize Acumen to charge your card $${plan.price} monthly until you
                    cancel.` }}
                    You can cancel anytime in your billing settings.
                </p>
            </div>
        </template>
    </UModal>
</template>
