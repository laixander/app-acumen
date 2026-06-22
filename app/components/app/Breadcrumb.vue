<script setup lang="ts">
const { items } = useBreadcrumb({
    basePath: 'app/courses',   // strips these segments
    homeLabel: 'Courses',
    homeIcon: 'i-lucide-folder-open',
    homeTo: '/app/courses/collection'
})
</script>

<template>
    <UBreadcrumb :items="items" :ui="{ separatorIcon: 'text-dimmed size-3.5' }" />
</template>