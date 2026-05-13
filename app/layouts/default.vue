<script setup lang="ts">
import { ADMIN_NAVIGATION_ITEMS } from '~/constants/navigation'

const links = ref(ADMIN_NAVIGATION_ITEMS)
const { uiNavigation, uiDashboardSidebar } = useUiConfig()
const route = useRoute()
const isDevMode = computed(() => route.query.dev !== undefined)
</script>
<template>
    <UDashboardGroup>
        <UDashboardSidebar collapsible :ui="uiDashboardSidebar">
            <template #header="{ collapsed }">
                <div v-if="!collapsed" class="flex items-center gap-2">
                    <AppLogo name="Acumen" icon="i-lucide-brain-circuit" theme="primary" color="primary" />
                </div>
                <AppLogo v-else icon="i-lucide-brain-circuit" theme="primary" />
            </template>
            <template #default="{ collapsed }">
                <UNavigationMenu :items="links" :collapsed="collapsed" orientation="vertical" tooltip popover
                    :ui="uiNavigation" />
            </template>
        </UDashboardSidebar>
        <slot />
        <template v-if="isDevMode">
            <SeederFab />
            <DemoFab />
        </template>
    </UDashboardGroup>
</template>