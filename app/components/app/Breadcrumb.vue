<script setup lang="ts">
const { items } = useBreadcrumb({
    basePath: 'app/topics',   // strips these segments
    homeLabel: 'Collection',
    homeIcon: 'i-lucide-folder-open',
    homeTo: '/app/topics/collection'
})
</script>

<template>
    <UBreadcrumb :items="items" :ui="{ separatorIcon: 'text-dimmed size-3.5' }" />
</template>