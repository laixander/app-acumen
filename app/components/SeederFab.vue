<script setup lang="ts">
import { useSeeder } from '~/composables/useSeeder'
import { onClickOutside } from '@vueuse/core'

const fabRef = ref(null)
const fabOpen = ref(false)
const { seedTopics, clearTopics } = useSeeder()

onClickOutside(fabRef, () => {
    fabOpen.value = false
})

const actions = [
    {
        id: 'seed',
        label: 'Seed Topics',
        icon: 'i-lucide-database',
        color: 'primary' as const,
        action: () => {
            seedTopics()
            fabOpen.value = false
        }
    },
    {
        id: 'clear',
        label: 'Clear All Data',
        icon: 'i-lucide-trash',
        color: 'red' as const,
        action: () => {
            clearTopics()
            fabOpen.value = false
        }
    }
]
</script>
<template>
    <div ref="fabRef" class="fixed bottom-6 left-6 flex flex-col items-start gap-2 z-50">
        <Transition name="fab-menu">
            <div v-if="fabOpen" class="flex flex-col items-start gap-2 mb-2">
                <UButton v-for="item in actions" :key="item.id" :icon="item.icon" :label="item.label" size="lg"
                    :color="item.color" variant="soft" class="shadow-lg" @click="item.action" />
            </div>
        </Transition>
        <UButton icon="i-lucide-flask-conical" size="xl" variant="solid"
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
