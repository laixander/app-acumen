<script setup lang="ts">
const slots = useSlots()

interface Props {
    title: string
    noPadding?: boolean
}

const props = defineProps<Props>()
</script>
<template>
    <UDashboardPanel :ui="{ body: noPadding ? 'p-0 sm:p-0' : '' }">
        <template #header>
            <UDashboardNavbar :title="title">
                <template #leading>
                    <UDashboardSidebarCollapse />
                </template>

                <template #right>
                    <UserMenu />
                </template>
            </UDashboardNavbar>
            <UDashboardToolbar v-if="slots.toolbar">
                <slot name="toolbar" />
            </UDashboardToolbar>
        </template>

        <template #body>
            <slot />
        </template>
    </UDashboardPanel>
</template>