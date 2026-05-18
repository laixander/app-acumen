<script setup lang="ts">
const { sections } = useDocsMenu()
const route = useRoute()
const isDevMode = computed(() => {
    if (import.meta.server) return false
    if (route.query.nodev !== undefined) {
        sessionStorage.removeItem('devMode')
        return false
    }
    if (route.query.dev !== undefined) {
        sessionStorage.setItem('devMode', '1')
        return true
    }
    return sessionStorage.getItem('devMode') === '1'
})
</script>

<template>
    <UHeader :toggle="{
        class: $route.name === 'index' ? 'hidden' : ''
    }">
        <template #left>
            <NuxtLink to="/" class="flex items-center gap-3">
                <AppLogo name="Acumen" icon="i-lucide-brain-circuit" color="primary" theme="primary" />
            </NuxtLink>
        </template>

        <template #right>
            <UButton to="/login" label="Login" color="primary" variant="ghost" />
            <UColorModeButton />
            <!-- <UserMenu /> -->
        </template>

        <template #body v-if="$route.meta.showDocsMenu">
            <UNavigationMenu :ui="{ linkTrailingIcon: 'hidden' }" :items="sections" orientation="vertical"
                class="-mx-2.5" />
        </template>
    </UHeader>

    <UMain>
        <slot />
    </UMain>

    <USeparator v-if="$route.meta.showDocsMenu" />

    <UFooter v-if="$route.meta.showDocsMenu">
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
    <DemoFab v-if="isDevMode" />
</template>