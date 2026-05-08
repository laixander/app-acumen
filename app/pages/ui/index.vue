<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useToast } from '#ui/composables/useToast'
import { useTheme, fontOptions, brandFontOptions, fontWeightOptions, primaryColors, neutralColors } from '~/composables/useTheme'

const toast = useToast()
const { theme, setFont, setBrandFont, setBrandWeight, setPrimary, setNeutral, initTheme, resetTheme, colorMode } = useTheme()

const appConfig = useAppConfig()

definePageMeta({
    layout: 'guest',
    showDocsMenu: true
})

const { activeSection, sections } = useUiMenu()

onMounted(() => {
    initTheme()
    
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    activeSection.value = entry.target.id;
                }
            });
        },
        {
            rootMargin: "-20% 0% -70% 0%",
        },
    );

    document.querySelectorAll("section[id]").forEach((section) => {
        observer.observe(section);
    });
})

// Component States
const options = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
]

const checkbox1 = ref(false)
const checkbox2 = ref(true)
const radioOption = ref('option1')
const toggle1 = ref(false)
const toggle2 = ref(true)

const tableColumns = [
    { accessorKey: 'id', header: 'ID' },
    { accessorKey: 'name', header: 'Name' },
    { accessorKey: 'email', header: 'Email' },
    { accessorKey: 'role', header: 'Role' },
]

const tableData = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Manager' },
]

const activeTab = ref('0')
const tabs = [
    { label: 'Tab 1', icon: 'i-heroicons-home' },
    { label: 'Tab 2', icon: 'i-heroicons-user' },
    { label: 'Tab 3', icon: 'i-heroicons-cog' },
]

const currentPage = ref(1)
const isModalOpen = ref(false)

const showSuccessToast = () => {
    toast.add({ title: 'Success!', description: 'Your action was successful.', color: 'success' })
}

const showErrorToast = () => {
    toast.add({ title: 'Error!', description: 'Something went wrong.', color: 'error' })
}
</script>

<template>
    <UPage>
        <UContainer>
            <div class="flex flex-col lg:flex-row lg:items-start gap-8 px-4 lg:px-8 py-8">
                <!-- Sidebar TOC -->
                <aside class="hidden lg:block w-64 sticky top-24 shrink-0">
                    <div class="flex flex-col gap-4">
                        <div class="px-2 mb-2">
                            <UBadge variant="soft" size="md" class="rounded-full px-3 font-mono">
                                v{{ appConfig.version }}
                            </UBadge>
                        </div>
                        <UNavigationMenu :ui="{ linkTrailingIcon: 'hidden' }" orientation="vertical"
                            :items="sections" />
                    </div>
                </aside>

                <!-- Main Content -->
                <div class="flex-1 max-w-4xl space-y-16">
                    <div class="space-y-4">
                        <h1 class="text-4xl font-extrabold tracking-tight">UI Playground</h1>
                        <p class="text-lg text-muted max-w-2xl">
                            A live design system sandbox for testing components, themes, and interactive patterns across the Acumen platform.
                        </p>
                    </div>

                    <!-- Typography -->
                    <section id="typography" class="scroll-mt-24 space-y-6">
                        <div class="flex items-center gap-3 mb-6">
                            <UIcon name="i-lucide-type" class="text-2xl text-primary" />
                            <h2 class="text-2xl font-bold">Typography</h2>
                        </div>
                        <div class="p-8 rounded-2xl border border-dashed border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50">
                            <div class="space-y-6">
                                <h1 class="text-5xl font-bold tracking-tight">Level 1 Heading</h1>
                                <h2 class="text-3xl font-bold tracking-tight">Level 2 Heading</h2>
                                <p class="text-lg text-toned leading-relaxed">
                                    Acumen utilizes adaptive learning engines to bridge knowledge gaps. 
                                    This is a sample of our primary body text style.
                                </p>
                                <div class="grid grid-cols-2 gap-4 pt-4 border-t border-neutral-200 dark:border-neutral-800">
                                    <div class="flex flex-col">
                                        <span class="text-[10px] font-black uppercase tracking-widest text-neutral-400">Bold Stack</span>
                                        <span class="text-2xl font-bold font-brand">AaBbCc123</span>
                                    </div>
                                    <div class="flex flex-col">
                                        <span class="text-[10px] font-black uppercase tracking-widest text-neutral-400">Mono Stack</span>
                                        <span class="text-2xl font-mono">AaBbCc123</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <USeparator />

                    <!-- Buttons -->
                    <section id="buttons" class="scroll-mt-24 space-y-6">
                        <div class="flex items-center gap-3 mb-6">
                            <UIcon name="i-lucide-mouse-pointer-2" class="text-2xl text-primary" />
                            <h2 class="text-2xl font-bold">Buttons</h2>
                        </div>
                        <div class="flex flex-wrap gap-4">
                            <UButton label="Primary Action" color="primary" icon="i-lucide-sparkles" />
                            <UButton label="Secondary" color="neutral" variant="soft" />
                            <UButton label="Success" color="success" variant="subtle" icon="i-lucide-check" />
                            <UButton label="Ghost" color="neutral" variant="ghost" />
                            <UButton label="Danger" color="error" variant="solid" icon="i-lucide-trash-2" />
                        </div>
                    </section>

                    <USeparator />

                    <!-- Inputs -->
                    <section id="inputs" class="scroll-mt-24 space-y-6">
                        <div class="flex items-center gap-3 mb-6">
                            <UIcon name="i-lucide-text-cursor-input" class="text-2xl text-primary" />
                            <h2 class="text-2xl font-bold">Inputs & Forms</h2>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <UInput placeholder="Text input..." class="w-full" />
                            <UInput placeholder="Search..." icon="i-lucide-search" class="w-full" />
                            <UInput type="password" placeholder="Password" icon="i-lucide-lock" class="w-full" />
                            <UInput placeholder="Disabled state" disabled class="w-full" />
                        </div>
                    </section>

                    <USeparator />

                    <!-- Selectors -->
                    <section id="selectors" class="scroll-mt-24 space-y-6">
                        <div class="flex items-center gap-3 mb-6">
                            <UIcon name="i-lucide-check-square" class="text-2xl text-primary" />
                            <h2 class="text-2xl font-bold">Selectors</h2>
                        </div>
                        <div class="space-y-8">
                            <div class="max-w-md">
                                <USelect :items="options" placeholder="Multi-select dropdown" />
                            </div>
                            <div class="flex items-center gap-8">
                                <div class="flex flex-col gap-2">
                                    <UCheckbox label="Remember me" v-model="checkbox1" />
                                    <UCheckbox label="Subscribe to AI alerts" v-model="checkbox2" />
                                </div>
                                <div class="flex items-center gap-4">
                                    <USwitch v-model="toggle1" />
                                    <USwitch v-model="toggle2" />
                                </div>
                            </div>
                        </div>
                    </section>

                    <USeparator />

                    <!-- Feedback -->
                    <section id="feedback" class="scroll-mt-24 space-y-6">
                        <div class="flex items-center gap-3 mb-6">
                            <UIcon name="i-lucide-info" class="text-2xl text-primary" />
                            <h2 class="text-2xl font-bold">Feedback & Badges</h2>
                        </div>
                        <div class="space-y-6">
                            <div class="flex flex-wrap gap-3">
                                <UBadge label="Active" color="success" variant="soft" />
                                <UBadge label="Pending" color="warning" variant="subtle" />
                                <UBadge label="Error" color="error" variant="soft" />
                                <UBadge label="v1.8.0" color="primary" variant="solid" />
                            </div>
                            <div class="max-w-xl space-y-4">
                                <UAlert title="Update Success" description="The organization status has been updated." color="success" icon="i-lucide-check-circle" />
                                <UAlert title="System Warning" description="Token usage is approaching the monthly limit." color="warning" icon="i-lucide-alert-triangle" />
                            </div>
                        </div>
                    </section>

                    <USeparator />

                    <!-- Containers -->
                    <section id="containers" class="scroll-mt-24 space-y-6">
                        <div class="flex items-center gap-3 mb-6">
                            <UIcon name="i-lucide-layout" class="text-2xl text-primary" />
                            <h2 class="text-2xl font-bold">Cards & Containers</h2>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <UCard>
                                <template #header>
                                    <div class="flex items-center justify-between">
                                        <h3 class="font-bold">Standard Card</h3>
                                        <UButton color="neutral" variant="ghost" icon="i-lucide-more-vertical" />
                                    </div>
                                </template>
                                <p class="text-sm text-neutral-500">
                                    This card demonstrates the standard elevation and spacing used in the dashboard panels.
                                </p>
                            </UCard>
                            <UCard variant="subtle" :ui="{ body: 'p-8' }">
                                <div class="flex flex-col items-center text-center gap-4">
                                    <div class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                        <UIcon name="i-lucide-rocket" class="text-xl" />
                                    </div>
                                    <h4 class="font-bold">Action Container</h4>
                                    <p class="text-xs text-neutral-500">Perfect for call-to-action blocks and empty states.</p>
                                </div>
                            </UCard>
                        </div>
                    </section>

                    <USeparator />

                    <!-- Data -->
                    <section id="data" class="scroll-mt-24 space-y-6">
                        <div class="flex items-center gap-3 mb-6">
                            <UIcon name="i-lucide-database" class="text-2xl text-primary" />
                            <h2 class="text-2xl font-bold">Data & Tables</h2>
                        </div>
                        <UCard :ui="{ body: 'p-0 sm:p-0' }">
                            <UTable :data="tableData" :columns="tableColumns" />
                        </UCard>
                    </section>

                    <USeparator />

                    <!-- Navigation -->
                    <section id="navigation" class="scroll-mt-24 space-y-6">
                        <div class="flex items-center gap-3 mb-6">
                            <UIcon name="i-lucide-navigation" class="text-2xl text-primary" />
                            <h2 class="text-2xl font-bold">Navigation & Tabs</h2>
                        </div>
                        <div class="space-y-8">
                            <UTabs v-model="activeTab" :items="tabs" class="w-full" />
                            <div class="flex justify-center">
                                <UPagination v-model="currentPage" :total="100" :page-size="10" />
                            </div>
                        </div>
                    </section>

                    <USeparator />

                    <!-- Overlays -->
                    <section id="overlays" class="scroll-mt-24 space-y-6 pb-24">
                        <div class="flex items-center gap-3 mb-6">
                            <UIcon name="i-lucide-layers" class="text-2xl text-primary" />
                            <h2 class="text-2xl font-bold">Modals & Overlays</h2>
                        </div>
                        <div class="flex gap-4">
                            <UButton label="Trigger Modal" variant="solid" @click="isModalOpen = true" />
                            <UButton label="Show Success Toast" color="success" variant="soft" @click="showSuccessToast" />
                            <UButton label="Show Error Toast" color="error" variant="soft" @click="showErrorToast" />
                        </div>

                        <UModal v-model:open="isModalOpen" title="Preview Modal" description="Sample overlay for design testing.">
                            <template #content>
                                <div class="p-6">
                                    <p class="text-sm text-neutral-500 mb-6 italic border-l-4 border-primary-500/20 pl-4">
                                        "The only way to do great work is to love what you do." - Steve Jobs
                                    </p>
                                    <div class="flex justify-end gap-2">
                                        <UButton label="Dismiss" color="neutral" variant="ghost" @click="isModalOpen = false" />
                                        <UButton label="Proceed" color="primary" @click="isModalOpen = false" />
                                    </div>
                                </div>
                            </template>
                        </UModal>
                    </section>
                </div>
            </div>
        </UContainer>
    </UPage>
</template>

<style scoped>
:global(html) {
    scroll-behavior: smooth;
}

.scroll-mt-24 {
    scroll-margin-top: 6rem;
}
</style>