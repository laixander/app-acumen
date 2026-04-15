<script setup lang="ts">
import { APP_NAVIGATION_ITEMS } from '~/constants/navigation'

const route = useRoute()

const links = computed(() =>
    APP_NAVIGATION_ITEMS.map(item => ({
        ...item,
        active: item.children?.some(child => child.to && route.path.startsWith(child.to as string))
            ?? (item.to ? route.path.startsWith(item.to as string) : false),
    }))
)
</script>

<template>
    <UHeader :toggle="{
        class: $route.name === 'index' ? 'hidden' : ''
    }">
        <template #title>
            <NuxtLink to="/" class="flex items-center gap-3">
                <AppLogo name="LearnFast" icon="i-lucide-brain-circuit" color="primary" theme="primary" />
            </NuxtLink>
        </template>

        <UNavigationMenu :items="links" content-orientation="vertical" />

        <template #right>
            <!-- <UButton to="/login" label="Login" color="primary" variant="ghost" />
            <UColorModeButton /> -->
            <UserMenu />
        </template>

        <template #body>
            <UNavigationMenu :items="links" orientation="vertical" />
        </template>

    </UHeader>

    <UMain>
        <slot />
    </UMain>

    <USeparator />

    <UFooter>
        <template #left>
            <p class="text-sm text-muted">
                Built by Laix • © {{ new Date().getFullYear() }}
            </p>
        </template>

        <template #right>
            <UButton to="https://github.com/laixander/app-sanitarium" target="_blank" icon="i-simple-icons-github"
                aria-label="GitHub" color="neutral" variant="ghost" />
        </template>
    </UFooter>
    <SeederFab />
    <DemoFab />
</template>