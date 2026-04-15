<script setup lang="ts">
const { user, updateProfile, updatePreferences } = useUser()

const sections = computed(() => [
    {
        title: 'Profile Information',
        items: [
            {
                label: 'Full Name',
                value: user.value.profile.fullName,
                icon: 'i-lucide-user',
                color: 'blue'
            },
            {
                label: 'Email',
                value: user.value.profile.email,
                icon: 'i-lucide-bell',
                color: 'blue'
            }
        ]
    },
    {
        title: 'Preferences',
        items: [
            {
                label: 'Learning Pace',
                value: user.value.preferences.learningPace,
                icon: 'i-lucide-trending-up',
                color: 'blue'
            },
            {
                label: 'Privacy Mode',
                value: user.value.preferences.privacyMode ? 'Enabled' : 'Disabled',
                icon: 'i-lucide-shield',
                color: 'blue'
            }
        ]
    },
    {
        title: 'Billing & Plan',
        items: [
            {
                label: 'Current Plan',
                value: `${user.value.billing.plan} - ${user.value.billing.price}`,
                icon: 'i-lucide-credit-card',
                color: 'blue'
            }
        ]
    }
])
</script>

<template>
    <UContainer class="max-w-4xl py-12">
        <div class="flex flex-col gap-10">
            <!-- Header -->
            <div class="flex items-center gap-3 px-2">
                <div class="p-2 bg-primary/10 rounded-lg">
                    <UIcon name="i-lucide-settings" class="text-2xl text-primary flex shrink-0" />
                </div>
                <h1 class="text-3xl font-bold tracking-tight">User Settings</h1>
            </div>

            <!-- Sections -->
            <div v-for="section in sections" :key="section.title" class="flex flex-col gap-4">
                <h2 class="text-xs font-bold text-muted uppercase tracking-[0.2em] px-2">
                    {{ section.title }}
                </h2>

                <UCard
                    :ui="{ body: 'p-0 sm:p-0 overflow-hidden', root: 'shadow-sm border-neutral-200 dark:border-neutral-800' }">
                    <div class="divide-y divide-neutral-100 dark:divide-neutral-800">
                        <ULink v-for="item in section.items" :key="item.label"
                            class="flex items-center justify-between p-5 hover:bg-neutral-50 dark:hover:bg-neutral-900/50 transition-colors group w-full">

                            <div class="flex items-center gap-4">
                                <div
                                    class="w-10 h-10 flex items-center justify-center rounded-xl bg-neutral-100 dark:bg-neutral-800 group-hover:bg-white dark:group-hover:bg-neutral-700 transition-colors border border-neutral-200/50 dark:border-neutral-700/50">
                                    <UIcon :name="item.icon" class="text-lg text-neutral-500 dark:text-neutral-400" />
                                </div>
                                <span class="font-bold text-neutral-700 dark:text-neutral-200">{{ item.label }}</span>
                            </div>

                            <div class="flex items-center gap-3">
                                <span class="text-neutral-500 dark:text-neutral-400">{{ item.value }}</span>
                                <UIcon name="i-lucide-arrow-right"
                                    class="text-neutral-300 dark:text-neutral-600 group-hover:text-primary transition-colors" />
                            </div>
                        </ULink>
                    </div>
                </UCard>
            </div>
        </div>
    </UContainer>
</template>