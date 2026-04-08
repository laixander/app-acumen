<script setup lang="ts">
import { NAVIGATION_LINKS } from '~/constants/navigation'

const links = ref(NAVIGATION_LINKS)
const { uiNavigation, uiDashboardSidebar } = useUiConfig()
</script>
<template>
    <UDashboardGroup>
        <UDashboardSidebar resizable collapsible :ui="uiDashboardSidebar">
            <template #header="{ collapsed }">
                <div v-if="!collapsed" class="flex items-center gap-2">
                    <AppLogo name="i-lucide-brain-circuit" color="primary" />
                    <span class="text-xs font-bold uppercase tracking-wider text-primary-600">Learn Fast</span>
                </div>
                <AppLogo v-else name="i-lucide-brain-circuit" color="primary" />
            </template>
            <template #default="{ collapsed }">
                <UNavigationMenu :items="links" :collapsed="collapsed" orientation="vertical" tooltip popover
                    :ui="uiNavigation" />
            </template>
        </UDashboardSidebar>
        <slot />
    </UDashboardGroup>
</template>