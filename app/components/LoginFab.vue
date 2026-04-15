<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'
import type { MockRole } from '~/types/components'

const fabRef = ref(null)
const fabOpen = ref(false)

onClickOutside(fabRef, () => {
    fabOpen.value = false
})

const mockRoles: MockRole[] = [
    {
        role: 'admin',
        label: 'Admin',
        icon: 'i-lucide-shield',
        color: 'error',
        route: '/'
    },
    {
        role: 'learner',
        label: 'Learner',
        icon: 'i-lucide-user',
        color: 'primary',
        route: '/'
    }
]

function mockLogin(item: MockRole) {
    fabOpen.value = false
    navigateTo(item.route)
}
</script>
<template>
    <div ref="fabRef" class="fixed bottom-6 right-6 flex flex-col items-end gap-2 z-50">
        <Transition name="fab-menu">
            <div v-if="fabOpen" class="flex flex-col items-end gap-2 mb-2">
                <UButton v-for="item in mockRoles" :key="item.role" :icon="item.icon" :label="item.label" size="lg"
                    :color="item.color" variant="soft" class="shadow-lg" @click="mockLogin(item)" />
            </div>
        </Transition>
        <UButton icon="i-lucide-flask-conical" size="xl" color="primary"
            class="rounded-full shadow-lg transition-transform duration-300 ease-in-out hover:scale-110 active:scale-95 ring-4 ring-primary-500/20"
            :class="{ 'rotate-45': fabOpen }" @click="fabOpen = !fabOpen" />
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