<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'
import { useTheme, fontOptions } from '~/composables/useTheme'
import { useUser } from '~/composables/useUser'

const colorMode = useColorMode()
const appConfig = useAppConfig()
const { theme, setFont, setBrandFont, setBrandWeight, setPrimary, setNeutral } = useTheme()
const { user } = useUser()

const colors = ['red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose']
const neutrals = ['slate', 'gray', 'zinc', 'neutral', 'stone']

const isDark = computed(() => colorMode.value === 'dark')

const items = computed<DropdownMenuItem[][]>(() => [
    [
        {
            label: 'Settings',
            icon: 'i-lucide-settings',
            to: '/app/settings'
        },
        {
            label: 'Theme',
            icon: 'i-lucide-palette',
            children: [
                [{
                    label: colorMode.preference === 'system' ? 'System mode' : (isDark.value ? 'Light mode' : 'Dark mode'),
                    icon: colorMode.preference === 'system' ? 'i-lucide-monitor' : (isDark.value ? 'i-lucide-sun' : 'i-lucide-moon'),
                    onSelect(e: Event) {
                        e.preventDefault()
                        if (colorMode.preference === 'system') {
                            colorMode.preference = 'light'
                        } else if (colorMode.preference === 'light') {
                            colorMode.preference = 'dark'
                        } else {
                            colorMode.preference = 'system'
                        }
                    }
                },
                {
                    label: 'Primary',
                    slot: 'chip',
                    chip: theme.value.primary,
                    content: {
                        align: 'center',
                        collisionPadding: 16
                    },
                    children: colors.map(color => ({
                        label: color,
                        chip: color,
                        slot: 'chip',
                        checked: theme.value.primary === color,
                        type: 'checkbox',
                        onSelect: (e) => {
                            e.preventDefault()
                            setPrimary(color)
                        }
                    }))
                },
                {
                    label: 'Neutral',
                    slot: 'chip',
                    chip: theme.value.neutral === 'neutral' ? 'old-neutral' : theme.value.neutral,
                    content: {
                        align: 'end',
                        collisionPadding: 16
                    },
                    children: neutrals.map(color => ({
                        label: color,
                        chip: color === 'neutral' ? 'old-neutral' : color,
                        slot: 'chip',
                        type: 'checkbox',
                        checked: theme.value.neutral === color,
                        onSelect: (e) => {
                            e.preventDefault()
                            setNeutral(color)
                        }
                    }))
                }],
                [{
                    label: 'Font',
                    icon: 'i-lucide-type',
                    children: fontOptions.map(font => ({
                        label: font.label,
                        type: 'checkbox',
                        checked: theme.value.font === font.value,
                        onSelect: (e) => {
                            e.preventDefault()
                            setFont(font.value as any)
                        }
                    }))
                },
                {
                    label: 'Brand Logo',
                    icon: 'i-lucide-award',
                    children: fontOptions.map(brandFont => ({
                        label: brandFont.label,
                        type: 'checkbox',
                        checked: theme.value.brandFont === brandFont.value,
                        onSelect: (e) => {
                            e.preventDefault()
                            setBrandFont(brandFont.value as any)
                        }
                    }))
                },
                {
                    label: 'Brand Weight',
                    icon: 'i-lucide-weight',
                    children: fontWeightOptions.map(brandWeight => ({
                        label: brandWeight.label,
                        type: 'checkbox',
                        checked: theme.value.brandWeight === brandWeight.value,
                        onSelect: (e) => {
                            e.preventDefault()
                            setBrandWeight(brandWeight.value as any)
                        }
                    }))
                }]
            ]
        }
    ],
    [
        {
            label: 'Logout',
            icon: 'i-lucide-log-out',
            to: '/logout',
            color: 'error'
        }
    ]
])

const userData = computed(() => ({
    src: user.value.profile.avatar,
    alt: user.value.profile.fullName,
    loading: 'lazy' as const,
}))
</script>
<template>
    <UDropdownMenu :items="items" :modal="false" :content="{ align: 'end' }">
        <template #default="open">
            <UAvatar :src="userData.src" :alt="userData.alt" :loading="userData.loading" :class="[open]" />
        </template>
        <template #chip-leading="{ item }">
            <div class="inline-flex items-center justify-center shrink-0 size-5">
                <span class="rounded-full ring ring-bg bg-(--chip-light) dark:bg-(--chip-dark) size-2" :style="{
                    '--chip-light': `var(--color-${(item as any).chip}-500)`,
                    '--chip-dark': `var(--color-${(item as any).chip}-400)`
                }" />
            </div>
        </template>
    </UDropdownMenu>
</template>