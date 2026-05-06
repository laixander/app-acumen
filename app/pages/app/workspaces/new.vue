<script setup lang="ts">
const workspaceName = ref('')
const workspaceDescription = ref('')
const selectedIcon = ref('i-lucide-user')

const iconOptions = [
    'i-lucide-user', 'i-lucide-users', 'i-lucide-briefcase', 'i-lucide-graduation-cap',
    'i-lucide-code-2', 'i-lucide-globe', 'i-lucide-brain-circuit', 'i-lucide-rocket',
    'i-lucide-sparkles', 'i-lucide-layers', 'i-lucide-layout', 'i-lucide-database',
    'i-lucide-cpu', 'i-lucide-monitor', 'i-lucide-smartphone', 'i-lucide-cloud',
    'i-lucide-shield', 'i-lucide-lock', 'i-lucide-key', 'i-lucide-fingerprint',
    'i-lucide-zap', 'i-lucide-flame', 'i-lucide-heart', 'i-lucide-star'
]

const isSubmitting = ref(false)

const createWorkspace = async () => {
    if (!workspaceName.value) return

    isSubmitting.value = true

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Logic to save the new workspace would go here

    isSubmitting.value = false
    navigateTo('/app/dashboard')
}
</script>

<template>
    <UContainer class="max-w-2xl py-16">
        <div class="flex flex-col gap-10">
            <!-- Navigation/Breadcrumbs -->
            <nav class="flex items-center gap-2 text-sm text-neutral-500">
                <ULink to="/app/dashboard" class="hover:text-primary transition-colors">App</ULink>
                <UIcon name="i-lucide-chevron-right" class="w-3.5 h-3.5" />
                <span class="font-medium text-neutral-900 dark:text-neutral-100">Create New Workspace</span>
            </nav>

            <!-- Header -->
            <header class="flex flex-col gap-2">
                <h1 class="text-4xl font-extrabold tracking-tight">Set up a new workspace</h1>
                <p class="text-lg text-neutral-500">Workspaces are where you collaborate with your team and manage your
                    lessons.</p>
            </header>

            <!-- Form -->
            <UCard>
                <div class="flex flex-col gap-8 p-2">
                    <!-- Name & Description -->
                    <div class="flex flex-col gap-6">
                        <UFormField label="Workspace Name" required hint="Required">
                            <UInput v-model="workspaceName" placeholder="e.g. Design Team, Physics Class" size="xl"
                                class="w-full" />
                        </UFormField>

                        <UFormField label="Description (Optional)">
                            <UTextarea v-model="workspaceDescription" placeholder="What is this workspace for?"
                                size="xl" :rows="3" class="w-full" />
                        </UFormField>
                    </div>

                    <!-- Icon Selection -->
                    <div class="flex flex-col gap-4">
                        <label class="text-sm font-bold text-neutral-700 dark:text-neutral-200">Workspace Icon</label>
                        <div class="grid grid-cols-6 sm:grid-cols-8 gap-3">
                            <UButton v-for="icon in iconOptions" :key="icon" @click="selectedIcon = icon" :icon="icon"
                                :variant="selectedIcon === icon ? 'solid' : 'outline'"
                                :color="selectedIcon === icon ? 'primary' : 'neutral'" size="xl" square
                                class="aspect-square transition-all duration-200 flex items-center justify-center rounded-xl"
                                :class="selectedIcon === icon ? 'scale-110 shadow-lg' : 'hover:scale-105'" />
                        </div>
                    </div>

                    <UDivider />

                    <!-- Actions -->
                    <div class="flex items-center justify-end gap-4 pt-2">
                        <UButton label="Cancel" variant="ghost" color="neutral" size="lg" to="/app/dashboard" />
                        <UButton label="Create Workspace" color="primary" size="lg" :loading="isSubmitting"
                            :disabled="!workspaceName" @click="createWorkspace" />
                    </div>
                </div>
            </UCard>
        </div>
    </UContainer>
</template>
