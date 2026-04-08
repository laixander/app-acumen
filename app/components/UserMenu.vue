<script setup lang="ts">
const colorMode = useColorMode()
const isDark = computed(() => colorMode.value === 'dark')

const menu = computed(() => [
    [
        {
            label: 'Profile',
            icon: 'i-lucide-user',
            to: '/profile'
        },
        {
            label: isDark.value ? 'Light mode' : 'Dark mode',
            icon: isDark.value ? 'i-lucide-sun' : 'i-lucide-moon',
            onSelect(e: Event) {
                e.preventDefault()
                colorMode.preference = isDark.value ? 'light' : 'dark'
            }
        } as any,
    ], [
        {
            label: 'Logout',
            icon: 'i-lucide-log-out',
            to: '/logout',
            color: 'error'
        }
    ]
])

const user = {
        src: '/img/avatar.png',
        alt: 'Peter Parker',
        loading: 'lazy',
} as any
</script>
<template>
    <UDropdownMenu v-slot="open" :items="menu" :modal="false" :content="{ align: 'start' }">
        <UAvatar :src="user.src" :alt="user.alt" :loading="user.loading" :class="[open]" />
    </UDropdownMenu>
</template>