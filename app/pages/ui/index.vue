<template>
    <ContentPanel title="UI Playground">


        <div class="space-y-12 transition-all duration-300">
            <!-- Typography Samples -->
            <section class="mb-12 max-w-4xl">
                <h2 class="text-xs font-mono text-primary mb-4 uppercase tracking-widest">Typography Sample</h2>
                <div
                    class="grid grid-cols gap-8 p-6 rounded-2xl border border-dashed border-neutral-200 dark:border-neutral-800">
                    <div class="space-y-4">
                        <h1 class="text-4xl font-bold tracking-tight">The quick brown fox jumps over the lazy dog.</h1>
                        <p class="text-lg text-toned leading-relaxed">
                            LearnFast utilizes AI to identify your knowledge gaps and accelerate your mastery.
                            Education is not the learning of facts, but the training of the mind to think.
                        </p>
                    </div>
                    <div class="space-y-4">
                        <div class="flex flex-col">
                            <span class="text-sm font-mono text-muted">Bold</span>
                            <span class="text-2xl font-bold">AaBbCc123</span>
                        </div>
                        <div class="flex flex-col">
                            <span class="text-sm font-mono text-muted">Medium</span>
                            <span class="text-2xl font-medium">AaBbCc123</span>
                        </div>
                        <div class="flex flex-col">
                            <span class="text-sm font-mono text-muted">Regular</span>
                            <span class="text-2xl font-normal">AaBbCc123</span>
                        </div>
                    </div>
                </div>
            </section>
            <!-- Buttons -->
            <section>
                <h2 class="text-xs font-mono text-primary mb-4 uppercase tracking-widest">Buttons Sample</h2>
                <div class="flex flex-wrap gap-4">
                    <UButton label="Primary" color="primary" />
                    <UButton label="Secondary" color="neutral" />
                    <UButton label="Success" color="success" />
                    <UButton label="Warning" color="warning" />
                    <UButton label="Error" color="error" />
                    <UButton label="Info" color="info" />
                </div>
            </section>

            <!-- Inputs -->
            <section>
                <h2 class="text-xs font-mono text-primary mb-4 uppercase tracking-widest">Inputs Sample</h2>
                <div class="flex flex-col gap-4 max-w-md">
                    <UInput placeholder="Default input" />
                    <UInput placeholder="With icon" icon="i-heroicons-user" />
                    <UInput placeholder="Disabled" disabled />
                </div>
            </section>

            <!-- Select -->
            <section>
                <h2 class="text-xs font-mono text-primary mb-4 uppercase tracking-widest">Select Sample</h2>
                <div class="max-w-md">
                    <USelect :items="options" placeholder="Select an option" />
                </div>
            </section>

            <!-- Checkbox -->
            <section>
                <h2 class="text-xs font-mono text-primary mb-4 uppercase tracking-widest">Checkbox Sample</h2>
                <div class="flex flex-col gap-2">
                    <UCheckbox label="Option 1" v-model="checkbox1" />
                    <UCheckbox label="Option 2" v-model="checkbox2" />
                </div>
            </section>

            <!-- Radio -->
            <section>
                <h2 class="text-xs font-mono text-primary mb-4 uppercase tracking-widest">Radio Sample</h2>
                <div class="flex flex-col gap-2">
                    <URadioGroup v-model="radioOption" :items="options" />
                </div>
            </section>

            <!-- Toggle -->
            <section>
                <h2 class="text-xs font-mono text-primary mb-4 uppercase tracking-widest">Toggle Sample</h2>
                <div class="flex flex-col gap-2">
                    <USwitch v-model="toggle1" />
                    <USwitch v-model="toggle2" />
                </div>
            </section>

            <!-- Badge -->
            <section>
                <h2 class="text-xs font-mono text-primary mb-4 uppercase tracking-widest">Badge Sample</h2>
                <div class="flex flex-wrap gap-2">
                    <UBadge label="Primary" color="primary" />
                    <UBadge label="Success" color="success" />
                    <UBadge label="Warning" color="warning" />
                    <UBadge label="Error" color="error" />
                </div>
            </section>

            <!-- Alert -->
            <section>
                <h2 class="text-xs font-mono text-primary mb-4 uppercase tracking-widest">Alert Sample</h2>
                <div class="flex flex-col gap-2 max-w-md">
                    <UAlert title="Success" description="This is a success alert" color="success" />
                    <UAlert title="Warning" description="This is a warning alert" color="warning" />
                </div>
            </section>

            <!-- Card -->
            <section>
                <h2 class="text-xs font-mono text-primary mb-4 uppercase tracking-widest">Card Sample</h2>
                <div class="max-w-sm">
                    <UCard>
                        <template #header>
                            <h3 class="text-lg font-semibold">Card Title</h3>
                        </template>
                        <p class="text-gray-600 dark:text-gray-300">
                            This is the card content. You can put any UI
                            elements here.
                        </p>
                        <template #footer>
                            <div class="flex justify-end gap-2">
                                <UButton label="Cancel" color="neutral" />
                                <UButton label="Save" color="primary" />
                            </div>
                        </template>
                    </UCard>
                </div>
            </section>

            <!-- Table -->
            <section>
                <h2 class="text-xs font-mono text-primary mb-4 uppercase tracking-widest">Table Sample</h2>
                <div class="max-w-full overflow-x-auto">
                    <UTable :data="tableData" :columns="tableColumns" />
                </div>
            </section>

            <!-- Tabs -->
            <section>
                <h2 class="text-xs font-mono text-primary mb-4 uppercase tracking-widest">Tabs Sample</h2>
                <div class="max-w-md">
                    <UTabs v-model="activeTab" :items="tabs" class="w-full">
                        <template #content="{ item }">
                            <p>This is the {{ item.label }} tab.</p>
                        </template>
                    </UTabs>
                </div>
            </section>

            <!-- Pagination -->
            <section>
                <h2 class="text-xs font-mono text-primary mb-4 uppercase tracking-widest">Pagination Sample</h2>
                <div class="max-w-md">
                    <UPagination v-model="currentPage" :total="100" :page-size="10" />
                </div>
            </section>

            <!-- Modal -->
            <section>
                <h2 class="text-xs font-mono text-primary mb-4 uppercase tracking-widest">Modal Sample</h2>
                <UButton label="Open Modal" @click="isModalOpen = true" />

                <UModal v-model:open="isModalOpen" title="Modal Title">
                    <template #body>
                        <p class="text-muted">
                            This is the modal content. It can contain any UI
                            elements.
                        </p>
                    </template>
                    <template #footer>
                        <div class="flex justify-end gap-2">
                            <UButton label="Cancel" color="neutral" @click="isModalOpen = false" />
                            <UButton label="Confirm" color="primary" @click="isModalOpen = false" />
                        </div>
                    </template>
                </UModal>
            </section>

            <!-- Toast -->
            <section>
                <h2 class="text-xs font-mono text-primary mb-4 uppercase tracking-widest">Toast Sample</h2>
                <div class="flex flex-wrap gap-2">
                    <UButton label="Show Success Toast" @click="showSuccessToast" />
                    <UButton label="Show Error Toast" @click="showErrorToast" />
                </div>
            </section>
        </div>
    </ContentPanel>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useToast } from '#ui/composables/useToast'
import { useTheme, fontOptions, brandFontOptions, fontWeightOptions, primaryColors, neutralColors } from '~/composables/useTheme'

const toast = useToast()
const { theme, setFont, setBrandFont, setBrandWeight, setPrimary, setNeutral, initTheme, resetTheme, colorMode } = useTheme()
// Persistence & Initialization
onMounted(() => {
    initTheme()
})

// Select state
const options = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
]

// Checkbox state
const checkbox1 = ref(false)
const checkbox2 = ref(true)

// Radio state
const radioOption = ref('option1')

// Toggle state
const toggle1 = ref(false)
const toggle2 = ref(true)

// Table state
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
    { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'User' },
]

// Tabs state
const activeTab = ref('0')
const tabs = [
    { label: 'Tab 1', icon: 'i-heroicons-home' },
    { label: 'Tab 2', icon: 'i-heroicons-user' },
    { label: 'Tab 3', icon: 'i-heroicons-cog' },
]

// Pagination state
const currentPage = ref(1)

// Modal state
const isModalOpen = ref(false)

// Toast methods
const showSuccessToast = () => {
    toast.add({
        title: 'Success!',
        description: 'Your action was successful.',
        color: 'success',
    })
}

const showErrorToast = () => {
    toast.add({
        title: 'Error!',
        description: 'Something went wrong.',
        color: 'error',
    })
}
</script>