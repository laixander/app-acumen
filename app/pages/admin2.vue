<template>
    <ContentPanel title="Admin Panels">
        <div class="px-4 py-4 md:px-6 md:py-6">
            <UTabs :items="adminTabs" class="w-full">
                <!-- User Management -->
                <template #user-management="{ item }">
                    <UCard class="mt-4">
                        <template #header>
                            <div>
                                <h2 class="text-xl font-semibold text-gray-900 dark:text-white">{{ item.label }}</h2>
                                <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Oversee user accounts, manage
                                    subscriptions, and provide technical support to learners.</p>
                            </div>
                        </template>

                        <div class="space-y-4">
                            <div class="flex items-center justify-between">
                                <UInput icon="i-lucide-search" placeholder="Search users..." class="w-64" />
                                <UButton color="neutral" icon="i-lucide-user-plus">Add User</UButton>
                            </div>

                            <UTable :rows="staticUsers" :columns="userColumns" />
                        </div>
                    </UCard>
                </template>

                <!-- AI Configuration -->
                <template #ai-configuration="{ item }">
                    <UCard class="mt-4">
                        <template #header>
                            <div>
                                <h2 class="text-xl font-semibold text-gray-900 dark:text-white">{{ item.label }}</h2>
                                <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Fine-tune the AI Engine models
                                    and response parameters to ensure high-quality learning outcomes.</p>
                            </div>
                        </template>

                        <div class="space-y-6">
                            <UFormGroup label="Primary AI Model"
                                description="Select the default model for generating lesson plans.">
                                <USelect v-model="aiModel"
                                    :options="['GPT-4', 'GPT-3.5-Turbo', 'Claude 3 Opus', 'Llama 3']" />
                            </UFormGroup>
                            <UFormGroup label="Creativity/Temperature"
                                description="Higher values make output more varied.">
                                <URange v-model="temperature" :min="0" :max="1" :step="0.1" />
                            </UFormGroup>
                            <UFormGroup label="Enable Reasoning Engine"
                                description="Allow AI to provide step-by-step logic for complex problems.">
                                <UToggle v-model="reasoning" />
                            </UFormGroup>
                            <div class="pt-4 flex justify-end">
                                <UButton color="neutral">Save Configuration</UButton>
                            </div>
                        </div>
                    </UCard>
                </template>

                <!-- Analytics Review -->
                <template #analytics-review="{ item }">
                    <UCard class="mt-4">
                        <template #header>
                            <div>
                                <h2 class="text-xl font-semibold text-gray-900 dark:text-white">{{ item.label }}</h2>
                                <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Analyze aggregated learning
                                    data to identify platform-wide trends and improve material ingestion benchmarks.</p>
                            </div>
                        </template>

                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            <UCard>
                                <div class="text-sm text-gray-500 dark:text-gray-400">Total Learners</div>
                                <div class="text-3xl font-bold mt-2">1,248</div>
                            </UCard>
                            <UCard>
                                <div class="text-sm text-gray-500 dark:text-gray-400">Topics Mastered (This Week)</div>
                                <div class="text-3xl font-bold mt-2">84</div>
                            </UCard>
                            <UCard>
                                <div class="text-sm text-gray-500 dark:text-gray-400">Average Lesson Completion Wait
                                </div>
                                <div class="text-3xl font-bold mt-2">2.4s</div>
                            </UCard>
                        </div>
                        <div
                            class="h-64 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center text-gray-500 border border-gray-200 dark:border-gray-700">
                            [Platform Activity Chart Placeholder]
                        </div>
                    </UCard>
                </template>
            </UTabs>
        </div>
    </ContentPanel>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const adminTabs = [
    {
        label: 'User Management',
        icon: 'i-lucide-users',
        slot: 'user-management'
    },
    {
        label: 'AI Configuration',
        icon: 'i-lucide-settings-2',
        slot: 'ai-configuration'
    },
    {
        label: 'Analytics Review',
        icon: 'i-lucide-line-chart',
        slot: 'analytics-review'
    }
]

// User Management Static Data
const userColumns = [{
    accessorKey: 'id',
    label: 'ID'
}, {
    accessorKey: 'name',
    label: 'Name'
}, {
    accessorKey: 'email',
    label: 'Email'
}, {
    accessorKey: 'status',
    label: 'Status'
}, {
    accessorKey: 'role',
    label: 'Role'
}]

const staticUsers = [
    { id: 1, name: 'Alice Smith', email: 'alice@example.com', status: 'Active', role: 'Learner' },
    { id: 2, name: 'Bob Johnson', email: 'bob@example.com', status: 'Inactive', role: 'Learner' },
    { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', status: 'Active', role: 'Learner' },
    { id: 4, name: 'Diana Prince', email: 'diana@example.com', status: 'Active', role: 'Administrator' },
]

// AI Config State
const aiModel = ref('GPT-4')
const temperature = ref(0.7)
const reasoning = ref(true)
</script>