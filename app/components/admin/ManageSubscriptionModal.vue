<script setup lang="ts">
const open = defineModel<boolean>('open', { default: false })
const props = defineProps<{
    user: any
}>()

const selectedPlan = ref(props.user?.subscription || '')

watch(() => props.user, (newUser) => {
    if (newUser) {
        selectedPlan.value = newUser.subscription
    }
})

const plans = [
    { name: 'Free', price: '$0/mo', icon: 'i-lucide-user' },
    { name: 'Pro', price: '$12/mo', icon: 'i-lucide-zap' },
    { name: 'Premium', price: '$29/mo', icon: 'i-lucide-crown' },
]

const getSubscriptionColor = (sub: string) => {
    switch (sub) {
        case 'Premium': return 'primary'
        case 'Pro': return 'info'
        case 'Free': return 'neutral'
        default: return 'neutral'
    }
}
</script>
<template>
    <UModal v-model:open="open" :ui="{ content: 'sm:max-w-xl' }">
        <template #header>
            <div class="flex items-center gap-3">
                <div class="p-2 rounded-lg bg-primary/10">
                    <UIcon name="i-lucide-credit-card" class="text-primary w-5 h-5 flex" />
                </div>
                <div>
                    <h3 class="text-lg font-semibold">Manage Subscription</h3>
                    <p class="text-sm text-muted">{{ user?.name }} &mdash;
                        {{ user?.email }}</p>
                </div>
            </div>
        </template>

        <template #body>
            <div class="space-y-6 sm:p-4">
                <!-- Current Plan -->
                <div class="flex flex-col gap-2">
                    <label class="text-xs font-bold uppercase tracking-wider text-muted">
                        Current Plan
                    </label>
                    <UCard variant="subtle" class="rounded-xl"
                        :ui="{ body: 'sm:p-4 flex justify-between items-center' }">
                        <div class="flex items-center gap-3">
                            <UIcon name="i-lucide-sparkles" class="text-primary w-5 h-5" />
                            <span class="font-semibold">{{ user?.subscription }}</span>
                        </div>
                        <UBadge :color="getSubscriptionColor(user?.subscription || '')" variant="soft">
                            Active
                        </UBadge>
                    </UCard>
                </div>

                <!-- Change Plan -->
                <div>
                    <label class="text-xs font-bold uppercase tracking-wider text-muted">
                        Change Plan
                    </label>
                    <div class="grid grid-cols-3 gap-3 mt-2">
                        <button v-for="plan in plans" :key="plan.name" @click="selectedPlan = plan.name"
                            class="relative flex flex-col items-center p-4 border rounded-xl transition-all duration-200 cursor-pointer"
                            :class="selectedPlan === plan.name
                                ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
                                : 'border-muted dark:border-muted/40 hover:border-accented'">
                            <UIcon :name="plan.icon" class="w-6 h-6 mb-2" :class="selectedPlan === plan.name
                                ? 'text-primary'
                                : 'text-dimmed'" />
                            <span class="text-sm font-semibold">{{ plan.name }}</span>
                            <span class="text-xs text-muted mt-1">{{ plan.price }}</span>
                        </button>
                    </div>
                </div>

                <!-- Billing Info -->
                <div>
                    <label class="text-xs font-bold uppercase tracking-wider text-muted">Billing
                        Summary</label>
                    <div class="mt-2 space-y-2 text-sm">
                        <div class="flex justify-between">
                            <span class="text-dimmed">Next billing date</span>
                            <span class="font-medium">May 17, 2026</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-dimmed">Payment method</span>
                            <span class="font-medium">•••• 4242</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-dimmed">Member since</span>
                            <span class="font-medium">Jan 8, 2026</span>
                        </div>
                    </div>
                </div>
            </div>
        </template>

        <template #footer>
            <div class="flex justify-end gap-3">
                <UButton color="neutral" variant="soft" @click="open = false">Cancel</UButton>
                <UButton color="neutral" @click="open = false">Update Plan</UButton>
            </div>
        </template>
    </UModal>
</template>