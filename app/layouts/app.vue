<script setup lang="ts">
import { APP_NAVIGATION_ITEMS } from '~/constants/navigation'

const route = useRoute()

const isDevMode = computed(() => {
    if (import.meta.server) return false
    // ?nodev explicitly disables dev mode
    if (route.query.nodev !== undefined) {
        sessionStorage.removeItem('devMode')
        return false
    }
    // ?dev explicitly enables dev mode
    if (route.query.dev !== undefined) {
        sessionStorage.setItem('devMode', '1')
        return true
    }
    // Fall back to persisted session value
    return sessionStorage.getItem('devMode') === '1'
})

const links = computed(() =>
    APP_NAVIGATION_ITEMS.map(item => ({
        ...item,
        active: item.children?.some(child => child.to && route.path.startsWith(child.to as string))
            ?? (item.to ? route.path.startsWith(item.to as string) : false),
    }))
)

</script>

<template>
    <div class="min-h-screen flex flex-col">
        <UHeader :toggle="{
            class: $route.name === 'index' ? 'hidden' : ''
        }">
            <template #title>
                <AppLogo naked name="Acumen" icon="i-lucide-brain-circuit" color="primary" theme="primary" />
            </template>

            <UNavigationMenu :items="links" content-orientation="vertical" :ui="{ list: 'gap-4' }" />

            <template #right>
                <WorkspaceMenu />
                <UserMenu />
            </template>

            <template #body>
                <UNavigationMenu :items="links" orientation="vertical" />
            </template>

        </UHeader>

        <UMain :ui="{ base: 'flex flex-col min-h-auto grow' }">
            <slot />
        </UMain>

        <UFooter :ui="{ root: 'border-t border-default' }">
            <template #left>
                <p class="text-sm text-muted">
                    Built by Laix • <ClientOnly fallback="© 2026">© {{ new Date().getFullYear() }}</ClientOnly>
                </p>
            </template>

            <template #right>
                <UButton to="https://github.com/laixander/app-sanitarium" target="_blank" icon="i-simple-icons-github"
                    aria-label="GitHub" color="neutral" variant="ghost" />
            </template>
        </UFooter>
        <template v-if="isDevMode">
            <SeederFab />
            <DemoFab />
        </template>
    </div>
</template>