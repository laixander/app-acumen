<script setup lang="ts">
import { landingMenu as defaultLandingMenu } from '~/constants/landing'
import { computed } from 'vue'

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

const observedIds = route.name === 'index' 
    ? defaultLandingMenu.filter(item => item.to.startsWith('#')).map(item => item.to.replace('#', ''))
    : []

const { activeSection } = useActiveScroll(observedIds)

const landingMenu = computed(() => {
    return defaultLandingMenu.map(item => ({
        ...item,
        active: activeSection.value === item.to.replace('#', '')
    }))
})
</script>

<template>
    <!-- <UHeader :toggle="{
        class: $route.name === 'index' ? 'hidden' : ''
    }"> -->
    <UHeader>
        <template #left>
            <NuxtLink to="/" class="flex items-center gap-3">
                <AppLogo name="Acumen" icon="i-lucide-brain-circuit" color="primary" theme="primary" />
            </NuxtLink>
        </template>

        <UNavigationMenu v-if="$route.name === 'index'" :items="landingMenu" />

        <template #right>
            <UButton to="/login" label="Login" color="primary" variant="ghost" />
            <!-- <UColorModeButton /> -->
            <!-- <UserMenu /> -->
        </template>

        <template #body>
            <UNavigationMenu v-if="$route.meta.showDocsMenu" :ui="{ linkTrailingIcon: 'hidden' }" :items="sections"
                orientation="vertical" class="-mx-2.5" />
            <UNavigationMenu v-else :items="landingMenu" orientation="vertical" class="-mx-2.5" />
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