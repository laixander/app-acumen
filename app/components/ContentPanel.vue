<script setup lang="ts">
import type { ContentPanelProps } from '~/types/components'

const slots = useSlots()
const props = defineProps<ContentPanelProps>()
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
            <UContainer v-if="container" :class="container ? `max-w-${container} mx-auto` : ''">
                <slot />
            </UContainer>
            <slot v-else />
        </template>
    </UDashboardPanel>
</template>