<script setup lang="ts">
import { PLANS } from '~/constants/billing'

const { currentWorkspace: workspace, updateWorkspace, canManageBilling } = useWorkspaces()
const toast = useToast()

const updatePlan = (planId: string) => {
    if (planId === 'enterprise') {
        isContactModalOpen.value = true
        return
    }

    const plan = PLANS.find(p => p.id === planId.toLowerCase())
    if (!plan) return

    // If upgrading from Free to Pro, show Checkout Modal
    if (isFree.value && planId === 'pro') {
        selectedPlanData.value = plan
        isCheckoutModalOpen.value = true
        return
    }

    finalizePlanUpdate(planId)
}

const finalizePlanUpdate = (planId: string) => {
    if (workspace.value) {
        const plan = PLANS.find(p => p.id === planId.toLowerCase())
        if (plan) {
            updateWorkspace(workspace.value.id, {
                plan: plan.name,
                maxTokens: plan.tokens
            })
            const description = isFree.value ? `Successfully upgraded to ${plan.name}.` : `Successfully switched to the ${plan.name} plan.`
            toast.add({ title: 'Plan Updated', description })
        }
    }
}

const handleUpdateCard = () => {
    const currentPlan = PLANS.find(p => p.name === workspace.value?.plan)
    selectedPlanData.value = currentPlan || PLANS[1]
    checkoutMode.value = 'update'
    isCheckoutModalOpen.value = true
}

const cancelSubscription = () => {
    isCancelModalOpen.value = true
}

const handleConfirmCancel = () => {
    finalizePlanUpdate('free')
    isCancelModalOpen.value = false
    toast.add({ title: 'Subscription Cancelled', description: 'Your plan has been set to downgrade to Free.', color: 'warning' })
}

const downloadInvoice = (id: string) => {
    toast.add({ title: 'Downloading...', description: `Preparing PDF for invoice ${id}`, icon: 'i-lucide-loader' })
    setTimeout(() => {
        toast.add({ title: 'Success', description: `Invoice ${id} downloaded.`, color: 'success' })
    }, 1500)
}

const downloadAllInvoices = () => {
    toast.add({ title: 'Exporting...', description: 'Preparing all invoices for download.', icon: 'i-lucide-loader' })
    setTimeout(() => {
        toast.add({ title: 'Success', description: 'All invoices downloaded as ZIP.', color: 'success' })
    }, 2000)
}

const isFree = computed(() => workspace.value?.plan?.toLowerCase().includes('free'))

const invoices = [
    { id: 'INV-001', date: 'May 17, 2026', amount: '$19.00', status: 'Paid' },
    { id: 'INV-002', date: 'Apr 17, 2026', amount: '$19.00', status: 'Paid' },
    { id: 'INV-003', date: 'Mar 17, 2026', amount: '$19.00', status: 'Paid' },
]

const formatTokens = (val?: number) => {
    if (!val) return '0'
    if (val >= 1000000) return (val / 1000000).toFixed(1) + 'M'
    if (val >= 1000) return (val / 1000).toFixed(1) + 'k'
    return val.toString()
}

const showUpdateCardModal = ref(false)
const isContactModalOpen = ref(false)
const isSupportModalOpen = ref(false)
const isCheckoutModalOpen = ref(false)
const isCancelModalOpen = ref(false)
const checkoutMode = ref<'purchase' | 'update'>('purchase')
const selectedPlanData = ref<any>(PLANS[1])

const scrollToPlans = () => {
    const el = document.getElementById('plans-grid')
    if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
    }
}
</script>

<template>
    <UContainer class="max-w-6xl py-12">
        <div v-if="workspace" class="flex flex-col gap-10">
            <!-- Breadcrumbs -->
            <nav class="flex items-center gap-2 text-sm text-neutral-500 mb-2">
                <ULink to="/app/dashboard" class="hover:text-primary transition-colors">App</ULink>
                <UIcon name="i-lucide-chevron-right" class="w-3.5 h-3.5" />
                <ULink to="/app/workspaces" class="hover:text-primary transition-colors">Manage Workspaces</ULink>
                <UIcon name="i-lucide-chevron-right" class="w-3.5 h-3.5" />
                <ULink :to="`/app/workspaces/settings`" class="hover:text-primary transition-colors">Workspace Settings
                </ULink>
                <UIcon name="i-lucide-chevron-right" class="w-3.5 h-3.5" />
                <span class="font-medium text-neutral-900 dark:text-neutral-100">Billing & Plans</span>
            </nav>

            <header class="flex flex-col gap-2">
                <h1 class="text-3xl font-bold tracking-tight">Billing & Plans</h1>
                <p class="text-neutral-500">Scale your team with advanced AI capabilities and collaboration tools.</p>
            </header>

            <!-- Permission Notice -->
            <UAlert v-if="!canManageBilling" title="Admin Permission Required"
                description="You are currently viewing this workspace as a Member. Only Workspace Admins or Organization Owners can manage subscriptions and billing details."
                color="warning" variant="soft" icon="i-lucide-shield-alert" :ui="{ root: 'rounded-2xl p-6' }" />

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <!-- Left: Current Plan & Payment Method -->
                <div class="lg:col-span-2 flex flex-col gap-6">
                    <!-- Current Plan Banner -->
                    <UCard class="border-neutral-100 dark:border-neutral-800 overflow-hidden relative"
                        :class="isFree ? 'bg-neutral-50 dark:bg-neutral-900/50' : 'bg-primary-500/5 border-primary-500/20'"
                        :ui="{ body: 'p-0' }">
                        <div class="p-8 flex items-center justify-between gap-6 relative z-10">
                            <div class="flex items-center gap-5">
                                <div class="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg"
                                    :class="isFree ? 'bg-neutral-200 dark:bg-neutral-800 text-neutral-500' : 'bg-primary-500 text-white shadow-primary-500/20'">
                                    <UIcon :name="isFree ? 'i-lucide-leaf' : 'i-lucide-zap'" class="text-2xl" />
                                </div>
                                <div class="flex flex-col">
                                    <span class="text-xs font-bold uppercase tracking-widest text-neutral-400"
                                        :class="{ 'text-primary-600 dark:text-primary-400': !isFree }">
                                        {{ isFree ? 'Basic Access' : 'Active Subscription' }}
                                    </span>
                                    <h2 class="text-2xl font-bold">{{ workspace.plan }} Plan</h2>
                                </div>
                            </div>
                            <div class="flex flex-col items-end gap-1">
                                <span class="text-sm font-medium text-neutral-600 dark:text-neutral-400">Tokens
                                    Remaining</span>
                                <div class="flex items-baseline gap-1">
                                    <span class="text-2xl font-bold text-neutral-900 dark:text-neutral-100">{{
                                        formatTokens(workspace.tokens) }}</span>
                                    <span class="text-sm text-neutral-500">/ {{ formatTokens(workspace.maxTokens)
                                    }}</span>
                                </div>
                            </div>
                        </div>
                        <!-- Decorative pattern -->
                        <div v-if="!isFree"
                            class="absolute top-0 right-0 w-64 h-full bg-gradient-to-l from-primary-500/10 to-transparent pointer-events-none" />
                    </UCard>

                    <!-- Billing History (Only for Paid) -->
                    <div v-if="!isFree" class="flex flex-col gap-4 mt-4">
                        <div class="flex items-center justify-between">
                            <h3 class="text-lg font-bold">Billing History</h3>
                            <UButton label="Download All" variant="link" icon="i-lucide-download" color="neutral"
                                @click="downloadAllInvoices" />
                        </div>
                        <div
                            class="border border-neutral-100 dark:border-neutral-800 rounded-2xl overflow-hidden bg-white dark:bg-neutral-900">
                            <table class="w-full text-left border-collapse">
                                <thead
                                    class="bg-neutral-50 dark:bg-neutral-800/50 text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                                    <tr>
                                        <th class="px-6 py-4">Invoice</th>
                                        <th class="px-6 py-4">Date</th>
                                        <th class="px-6 py-4">Amount</th>
                                        <th class="px-6 py-4">Status</th>
                                        <th class="px-6 py-4 text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody class="text-sm divide-y divide-neutral-100 dark:divide-neutral-800">
                                    <tr v-for="invoice in invoices" :key="invoice.id"
                                        class="hover:bg-neutral-50 dark:hover:bg-neutral-800/20 transition-colors">
                                        <td class="px-6 py-4 font-medium">{{ invoice.id }}</td>
                                        <td class="px-6 py-4 text-neutral-500">{{ invoice.date }}</td>
                                        <td class="px-6 py-4 font-bold">{{ invoice.amount }}</td>
                                        <td class="px-6 py-4">
                                            <UBadge color="success" variant="soft" size="sm" class="rounded-full">{{
                                                invoice.status }}</UBadge>
                                        </td>
                                        <td class="px-6 py-4 text-right">
                                            <UButton icon="i-lucide-download" variant="ghost" color="neutral" size="sm"
                                                @click="downloadInvoice(invoice.id)" />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <!-- Free State Message -->
                    <div v-else
                        class="p-10 rounded-3xl border-2 border-dashed border-neutral-100 dark:border-neutral-800 flex flex-col items-center text-center gap-4">
                        <div
                            class="w-16 h-16 rounded-2xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
                            <UIcon name="i-lucide-receipt-text" class="text-2xl text-neutral-400" />
                        </div>
                        <div class="flex flex-col gap-1">
                            <h3 class="text-lg font-bold">No Billing History</h3>
                            <p class="text-sm text-neutral-500 max-w-xs">You are currently on the free plan and haven't
                                made any purchases yet.</p>
                        </div>
                    </div>
                </div>

                <!-- Right: Payment Method & Actions -->
                <div class="flex flex-col gap-6">
                    <!-- Payment Method (Only for Paid) -->
                    <UCard v-if="!isFree" class="border-neutral-100 dark:border-neutral-800 shadow-sm">
                        <template #header>
                            <div class="flex items-center justify-between">
                                <span class="text-sm font-bold uppercase tracking-widest text-neutral-400">Payment
                                    Method</span>
                                <UIcon name="i-lucide-credit-card" class="text-neutral-400" />
                            </div>
                        </template>
                        <div class="flex flex-col gap-6">
                            <div class="flex items-center gap-4">
                                <div
                                    class="w-12 h-8 rounded bg-neutral-900 flex items-center justify-center text-white text-[10px] font-bold">
                                    VISA
                                </div>
                                <div class="flex flex-col">
                                    <span class="text-sm font-bold text-neutral-900 dark:text-neutral-100">••••
                                        4242</span>
                                    <span class="text-xs text-neutral-500">Expires 12/28</span>
                                </div>
                            </div>
                            <UButton label="Update Card" block color="neutral" variant="soft" icon="i-lucide-edit"
                                :disabled="!canManageBilling" class="rounded-xl" @click="handleUpdateCard" />
                        </div>
                        <template #footer>
                            <p class="text-[10px] text-neutral-400 leading-relaxed text-center">
                                Your payment information is encrypted and securely processed by Stripe.
                            </p>
                        </template>
                    </UCard>

                    <!-- Upgrade Prompt (For Free) -->
                    <UCard v-else class="border-primary-500/30 bg-primary-500/5 relative overflow-hidden group">
                        <div class="flex flex-col gap-4 relative z-10">
                            <div class="flex items-center gap-3 text-primary-600 dark:text-primary-400">
                                <UIcon name="i-lucide-sparkles" class="text-xl" />
                                <span class="text-xs font-bold uppercase tracking-widest">Upgrade Today</span>
                            </div>
                            <h4 class="text-lg font-bold leading-tight">Unlock the full power of Acumen AI</h4>
                            <p class="text-xs text-neutral-500 leading-relaxed">Get unlimited workspaces, priority
                                support, and 10x more
                                tokens for your learning journey.</p>
                            <UButton label="View Pro Features" block color="primary" class="rounded-xl font-bold mt-2"
                                @click="scrollToPlans" />
                        </div>
                        <UIcon name="i-lucide-rocket"
                            class="absolute bottom-16 -right-4 text-8xl text-primary-500/10 group-hover:scale-110 transition-transform duration-500" />
                    </UCard>

                    <!-- Danger Zone (Only for Paid) -->
                    <div v-if="!isFree"
                        class="p-6 rounded-2xl border border-red-500/10 bg-red-500/5 flex flex-col gap-4">
                        <div class="flex flex-col gap-1">
                            <h4 class="text-sm font-bold text-red-600 dark:text-red-400">Cancel Subscription</h4>
                            <p class="text-xs text-neutral-500">Your plan features will remain active until the end of
                                the billing period.
                            </p>
                        </div>
                        <UButton label="Cancel Plan" color="error" variant="soft" block :disabled="!canManageBilling"
                            class="rounded-xl font-bold" @click="cancelSubscription" />
                    </div>
                </div>
            </div>

            <div class="h-px bg-neutral-100 dark:bg-neutral-800 w-full" />

            <!-- Plans Grid Header -->
            <div class="flex flex-col items-center text-center gap-4 py-4">
                <h2 class="text-2xl font-bold">Available Plans</h2>
                <p class="text-neutral-500 max-w-xl">Looking to upgrade? Choose a plan that matches your study goals and
                    team size.
                </p>
            </div>

            <!-- Plans Grid -->
            <div id="plans-grid" class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div v-for="plan in PLANS" :key="plan.id"
                    class="flex flex-col gap-8 p-8 rounded-[2rem] border-2 transition-all duration-500 relative group bg-white dark:bg-neutral-900"
                    :class="[
                        workspace.plan.toLowerCase() === plan.id
                            ? 'border-primary-500 ring-8 ring-primary-500/5 shadow-2xl shadow-primary-500/10'
                            : 'border-neutral-100 dark:border-neutral-800 hover:border-neutral-200 dark:hover:border-neutral-700 hover:shadow-2xl'
                    ]">

                    <div v-if="workspace.plan.toLowerCase() === plan.id"
                        class="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-primary-500 text-white text-[11px] font-bold uppercase tracking-[0.2em] rounded-full shadow-xl z-20">
                        Current
                    </div>

                    <div class="flex flex-col gap-3">
                        <div class="flex items-center gap-2.5">
                            <div class="w-2.5 h-2.5 rounded-full" :class="`bg-${plan.color}-500`" />
                            <span class="text-sm font-bold uppercase tracking-[0.2em] text-neutral-400">{{ plan.name
                                }}</span>
                        </div>
                        <div class="flex items-baseline gap-1">
                            <span class="text-5xl font-black tracking-tight">${{ plan.price }}</span>
                            <span class="text-xl text-neutral-500 font-medium">/mo</span>
                        </div>
                    </div>

                    <div class="flex flex-col gap-6 grow">
                        <div class="h-px bg-neutral-100 dark:bg-neutral-800 w-full" />
                        <p class="text-[11px] font-bold text-neutral-400 uppercase tracking-[0.2em]">Key Benefits</p>
                        <ul class="flex flex-col gap-4">
                            <li class="flex items-start gap-3">
                                <div
                                    class="w-5 h-5 rounded-full bg-amber-500/10 flex items-center justify-center mt-0.5">
                                    <UIcon name="i-lucide-zap" class="w-3 h-3 text-amber-500" />
                                </div>
                                <span class="text-sm font-bold text-neutral-800 dark:text-neutral-200">{{
                                    formatTokens(plan.tokens)
                                    }} Monthly Tokens</span>
                            </li>
                            <li v-for="feature in plan.features" :key="feature" class="flex items-start gap-3">
                                <div
                                    class="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center mt-0.5">
                                    <UIcon name="i-lucide-check" class="w-3 h-3 text-emerald-500" />
                                </div>
                                <span class="text-sm text-neutral-600 dark:text-neutral-400">{{ feature }}</span>
                            </li>
                        </ul>
                    </div>

                    <UButton :label="workspace.plan.toLowerCase() === plan.id ? 'Current Plan' : 'Select Plan'"
                        :color="workspace.plan.toLowerCase() === plan.id ? 'primary' : 'neutral'"
                        :variant="workspace.plan.toLowerCase() === plan.id ? 'solid' : 'soft'"
                        :disabled="workspace.plan.toLowerCase() === plan.id || !canManageBilling" size="xl" block
                        class="rounded-[1.25rem] font-bold py-5 text-base transition-transform group-hover:scale-[1.02] active:scale-[0.98]"
                        @click="updatePlan(plan.id)" />
                </div>
            </div>

            <!-- FAQ or Support Section -->
            <div
                class="mt-10 p-10 rounded-[2.5rem] bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-100 dark:border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-10">
                <div class="flex items-center gap-6">
                    <div class="w-20 h-20 rounded-3xl bg-primary-500/10 flex items-center justify-center flex-shrink-0">
                        <UIcon name="i-lucide-help-circle" class="text-4xl text-primary-500" />
                    </div>
                    <div class="flex flex-col gap-2 text-center md:text-left">
                        <h3 class="text-xl font-bold">Have questions about our plans?</h3>
                        <p class="text-neutral-500 max-w-md">Our team is here to help you find the right setup for your
                            workspace.
                            Contact us for custom enterprise solutions or volume discounts.</p>
                    </div>
                </div>
                <div class="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                    <UButton label="Contact Support" variant="soft" color="neutral" size="xl" class="rounded-2xl px-8"
                        @click="isSupportModalOpen = true" />
                    <UButton label="Contact Sales" color="primary" size="xl" icon-right="i-lucide-arrow-right"
                        class="rounded-2xl px-8" @click="isContactModalOpen = true" />
                </div>
            </div>
        </div>

        <div v-else class="flex flex-col items-center justify-center py-24 gap-6">
            <div
                class="w-20 h-20 rounded-3xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center border border-neutral-200 dark:border-neutral-700">
                <UIcon name="i-lucide-search-x" class="text-4xl text-neutral-400" />
            </div>
            <div class="flex flex-col items-center gap-2 text-center">
                <h2 class="text-2xl font-bold">Workspace Not Found</h2>
                <p class="text-neutral-500 max-w-sm">The workspace you are looking for doesn't exist or you don't have
                    access to
                    it.</p>
            </div>
            <UButton label="Go to Workspaces" color="primary" to="/app/workspaces" icon="i-lucide-arrow-left" />
        </div>
        <ContactSalesModal v-model:open="isContactModalOpen" />
        <AppSupportModal v-model:open="isSupportModalOpen" />
        <AppCheckoutModal v-if="selectedPlanData" v-model:open="isCheckoutModalOpen" :plan="selectedPlanData"
            :mode="checkoutMode" :can-manage="canManageBilling" @success="finalizePlanUpdate" />

        <AdminConfirmModal v-model:open="isCancelModalOpen" title="Cancel Subscription"
            description="Are you sure you want to cancel your subscription? You will lose access to premium features at the end of your current billing cycle."
            confirm-label="Cancel Subscription" confirm-color="error" @confirm="handleConfirmCancel" />
    </UContainer>
</template>
