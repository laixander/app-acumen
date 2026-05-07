<script setup lang="ts">
import { PLANS } from '~/constants/billing'

const { currentWorkspace: workspace, updateWorkspace } = useWorkspaces()

const updatePlan = (planId: string) => {
    if (workspace.value) {
        const plan = PLANS.find(p => p.id === planId.toLowerCase())
        if (plan) {
            updateWorkspace(workspace.value.id, { 
                plan: plan.name,
                maxTokens: plan.tokens
            })
        }
    }
}

const formatTokens = (val?: number) => {
    if (!val) return '0'
    if (val >= 1000000) return (val / 1000000).toFixed(1) + 'M'
    if (val >= 1000) return (val / 1000).toFixed(1) + 'k'
    return val.toString()
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
                <ULink :to="`/app/workspaces/settings`" class="hover:text-primary transition-colors">Workspace Settings</ULink>
                <UIcon name="i-lucide-chevron-right" class="w-3.5 h-3.5" />
                <span class="font-medium text-neutral-900 dark:text-neutral-100">Billing & Plans</span>
            </nav>

            <!-- Header -->
            <header class="flex flex-col gap-2">
                <h1 class="text-3xl font-bold tracking-tight">Billing & Plans</h1>
                <p class="text-neutral-500">Scale your team with advanced AI capabilities and collaboration tools.</p>
            </header>

            <!-- Current Plan Banner -->
            <UCard class="bg-primary-500/5 border-primary-500/20 overflow-hidden relative">
                <div class="flex items-center justify-between gap-6 relative z-10">
                    <div class="flex items-center gap-5">
                        <div class="w-14 h-14 rounded-2xl bg-primary-500 text-white flex items-center justify-center shadow-lg shadow-primary-500/20">
                            <UIcon name="i-lucide-credit-card" class="text-2xl" />
                        </div>
                        <div class="flex flex-col">
                            <span class="text-xs font-bold uppercase tracking-widest text-primary-600 dark:text-primary-400">Active Subscription</span>
                            <h2 class="text-2xl font-bold">{{ workspace.plan }} Plan</h2>
                        </div>
                    </div>
                    <div class="flex flex-col items-end gap-1">
                        <span class="text-sm font-medium text-neutral-600 dark:text-neutral-400">Tokens Remaining</span>
                        <div class="flex items-baseline gap-1">
                            <span class="text-2xl font-bold text-neutral-900 dark:text-neutral-100">{{ formatTokens(workspace.tokens) }}</span>
                            <span class="text-sm text-neutral-500">/ {{ formatTokens(workspace.maxTokens) }}</span>
                        </div>
                    </div>
                </div>
                <!-- Decorative pattern -->
                <div class="absolute top-0 right-0 w-64 h-full bg-gradient-to-l from-primary-500/10 to-transparent pointer-events-none" />
            </UCard>

            <!-- Plans Grid -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div v-for="plan in PLANS" :key="plan.id" 
                    class="flex flex-col gap-8 p-8 rounded-[2rem] border-2 transition-all duration-500 relative group bg-white dark:bg-neutral-900"
                    :class="[
                        workspace.plan.toLowerCase() === plan.id 
                        ? 'border-primary-500 ring-8 ring-primary-500/5 shadow-2xl shadow-primary-500/10' 
                        : 'border-neutral-100 dark:border-neutral-800 hover:border-neutral-200 dark:hover:border-neutral-700 hover:shadow-2xl'
                    ]">
                    
                    <div v-if="workspace.plan.toLowerCase() === plan.id" class="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-primary-500 text-white text-[11px] font-bold uppercase tracking-[0.2em] rounded-full shadow-xl z-20">
                        Current
                    </div>

                    <div class="flex flex-col gap-3">
                        <div class="flex items-center gap-2.5">
                            <div class="w-2.5 h-2.5 rounded-full" :class="`bg-${plan.color}-500`" />
                            <span class="text-sm font-bold uppercase tracking-[0.2em] text-neutral-400">{{ plan.name }}</span>
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
                                <div class="w-5 h-5 rounded-full bg-amber-500/10 flex items-center justify-center mt-0.5">
                                    <UIcon name="i-lucide-zap" class="w-3 h-3 text-amber-500" />
                                </div>
                                <span class="text-sm font-bold text-neutral-800 dark:text-neutral-200">{{ formatTokens(plan.tokens) }} Monthly Tokens</span>
                            </li>
                            <li v-for="feature in plan.features" :key="feature" class="flex items-start gap-3">
                                <div class="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center mt-0.5">
                                    <UIcon name="i-lucide-check" class="w-3 h-3 text-emerald-500" />
                                </div>
                                <span class="text-sm text-neutral-600 dark:text-neutral-400">{{ feature }}</span>
                            </li>
                        </ul>
                    </div>

                    <UButton 
                        :label="workspace.plan.toLowerCase() === plan.id ? 'Current Plan' : 'Select Plan'"
                        :color="workspace.plan.toLowerCase() === plan.id ? 'primary' : 'neutral'"
                        :variant="workspace.plan.toLowerCase() === plan.id ? 'solid' : 'soft'"
                        :disabled="workspace.plan.toLowerCase() === plan.id"
                        size="xl"
                        block
                        class="rounded-[1.25rem] font-bold py-5 text-base transition-transform group-hover:scale-[1.02] active:scale-[0.98]"
                        @click="updatePlan(plan.id)"
                    />
                </div>
            </div>

            <!-- FAQ or Support Section -->
            <div class="mt-10 p-10 rounded-[2.5rem] bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-100 dark:border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-10">
                <div class="flex items-center gap-6">
                    <div class="w-20 h-20 rounded-3xl bg-primary-500/10 flex items-center justify-center flex-shrink-0">
                        <UIcon name="i-lucide-help-circle" class="text-4xl text-primary-500" />
                    </div>
                    <div class="flex flex-col gap-2 text-center md:text-left">
                        <h3 class="text-xl font-bold">Have questions about our plans?</h3>
                        <p class="text-neutral-500 max-w-md">Our team is here to help you find the right setup for your workspace. Contact us for custom enterprise solutions or volume discounts.</p>
                    </div>
                </div>
                <div class="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                    <UButton label="Contact Support" variant="soft" color="neutral" size="xl" class="rounded-2xl px-8" />
                    <UButton label="Contact Sales" color="primary" size="xl" icon-right="i-lucide-arrow-right" class="rounded-2xl px-8" />
                </div>
            </div>
        </div>

        <div v-else class="flex flex-col items-center justify-center py-24 gap-6">
            <div class="w-20 h-20 rounded-3xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center border border-neutral-200 dark:border-neutral-700">
                <UIcon name="i-lucide-search-x" class="text-4xl text-neutral-400" />
            </div>
            <div class="flex flex-col items-center gap-2 text-center">
                <h2 class="text-2xl font-bold">Workspace Not Found</h2>
                <p class="text-neutral-500 max-w-sm">The workspace you are looking for doesn't exist or you don't have access to it.</p>
            </div>
            <UButton label="Go to Workspaces" color="primary" to="/app/workspaces" icon="i-lucide-arrow-left" />
        </div>
    </UContainer>
</template>
