<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'

const fabRef = ref(null)
const fabOpen = ref(false)

onClickOutside(fabRef, () => {
    fabOpen.value = false
})

const demoPages = [
    {
        id: 'app',
        label: 'Learner',
        icon: 'i-lucide-user-round',
        to: '/app/dashboard',
        color: 'primary' as const
    },
    {
        id: 'admin',
        label: 'Admin',
        icon: 'i-lucide-user-round-cog',
        to: '/admin/users',
        color: 'sky' as const
    },
    {
        id: 'landing',
        label: 'Landing Page',
        icon: 'i-lucide-app-window-mac',
        to: '/',
        color: 'purple' as const
    },
    {
        id: 'docs',
        label: 'Documentation',
        icon: 'i-lucide-file-text',
        to: '/documentation',
        color: 'emerald' as const
    },
    {
        id: 'user-manual',
        label: 'User Manual',
        icon: 'i-lucide-book-open',
        to: '/user-manual',
        color: 'amber' as const
    },
    {
        id: 'ui-playground',
        label: 'UI Playground',
        icon: 'i-lucide-grid-2x2-check',
        to: '/ui',
        color: 'rose' as const
    }
]
</script>

<template>
    <div ref="fabRef" class="fixed bottom-6 right-6 flex flex-col items-end gap-2 z-50">
        <Transition name="fab-menu">
            <div v-if="fabOpen" class="flex flex-col items-end gap-2 mb-2">
                <UButton v-for="page in demoPages" :key="page.id" :icon="page.icon" :label="page.label" size="lg"
                    :color="page.color" variant="soft" class="shadow-lg" :to="page.to" @click="fabOpen = false" />
            </div>
        </Transition>
        <UButton icon="i-lucide-orbit" size="xl" variant="solid"
            class="rounded-full shadow-lg transition-transform duration-300 ease-in-out hover:scale-110 active:scale-95 ring-4 ring-primary-500/20"
            :class="{ '-rotate-180 opacity-20': fabOpen }" @click="fabOpen = !fabOpen" />
    </div>
</template>

<style scoped>
.fab-menu-enter-active,
.fab-menu-leave-active {
    transition: all 0.25s ease;
}

.fab-menu-enter-from,
.fab-menu-leave-to {
    opacity: 0;
    transform: translateY(12px) scale(0.9);
}
</style>
