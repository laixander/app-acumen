<script setup lang="ts">
import type { FooterLinkGroup } from '~/types/components'

defineProps<{
    appDescription: string;
    linkGroups: FooterLinkGroup[];
    copyrightName: string;
    copyrightSuffix: string;
}>()
</script>

<template>
    <footer class="bg-neutral-950 dark:bg-neutral-950/50 text-white pt-16 pb-8 mt-20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                <div class="md:col-span-1">
                    <div class="flex items-center gap-3 mb-4">
                        <AppLogo name="LearnFast" icon="i-lucide-brain-circuit" color="white" theme="primary" />
                    </div>
                    <p class="text-neutral-400 text-sm">
                        {{ appDescription }}
                    </p>
                </div>
                <div v-for="(group, groupIndex) in linkGroups" :key="groupIndex">
                    <h3 class="font-semibold text-lg mb-4">{{ group.title }}</h3>
                    <ul class="space-y-3 text-sm text-neutral-400">
                        <li v-for="(link, linkIndex) in group.links" :key="linkIndex">
                            <NuxtLink :to="link.to" class="hover:text-white transition-colors">{{ link.label }}
                            </NuxtLink>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="pt-8 border-t border-neutral-800 text-center text-neutral-500 text-sm">
                &copy; {{ new Date().getFullYear() }} {{ copyrightName }}. All rights reserved. {{ copyrightSuffix }}
            </div>
        </div>
    </footer>
</template>