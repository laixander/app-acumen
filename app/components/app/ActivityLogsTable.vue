<script setup lang="ts">
import type { ActivityLog } from '~/types/topic'
import { getPaginationRowModel } from '@tanstack/vue-table'

const table = useTemplateRef('table')

const { logs } = useActivityLogs()

// Helper to fix and satisfy TypeScript inference in UTable slots
const asLog = (row: any) => row as ActivityLog

const columns = [
    { accessorKey: 'topicTitle', header: 'Topic' },
    { accessorKey: 'lessonTitle', header: 'Lesson' },
    { accessorKey: 'type', header: 'Type' },
    { accessorKey: 'durationMinutes', header: 'Duration' },
    { accessorKey: 'completedAt', header: 'Completed' }
] as any[]

const getActivityIcon = (type: string) => {
    switch (type) {
        case 'Lesson': return 'i-lucide-book-open'
        case 'Assessment': return 'i-lucide-sparkles'
        case 'Review': return 'i-lucide-clipboard-list'
        default: return 'i-lucide-history'
    }
}

const getActivityColor = (type: string) => {
    switch (type) {
        case 'Lesson': return 'text-blue-500'
        case 'Assessment': return 'text-purple-500'
        case 'Review': return 'text-orange-500'
        default: return 'text-neutral-500'
    }
}

const formatTime = (timestamp: number) => formatDate(timestamp)

const pagination = ref({
    pageIndex: 0,
    pageSize: 8
})
</script>

<template>

    <!-- <div class="flex items-center justify-between px-1">
            <h3 class="text-sm font-semibold text-muted uppercase tracking-wide">Activity Logs</h3>
            <UButton v-if="$route.path !== '/app/activity'" to="/app/activity" label="View All" variant="ghost"
                size="sm" icon="i-lucide-arrow-right" class="text-xs uppercase" />
        </div> -->


    <UTable :data="logs" :columns="columns" ref="table" v-model:pagination="pagination" :pagination-options="{
        getPaginationRowModel: getPaginationRowModel()
    }" :ui="{ th: 'text-xs uppercase tracking-wider text-muted font-bold px-4 sm:px-6', td: 'px-4 sm:px-6' }">
        <template #topicTitle-cell="{ row }">
            <div class="flex flex-col">
                <span class="font-medium">{{ row.original.topicTitle }}</span>
            </div>
        </template>

        <template #lessonTitle-cell="{ row }">
            <span class="text-dimmed">{{ row.original.lessonTitle }}</span>
        </template>

        <template #type-cell="{ row }">
            <div class="flex items-center gap-2">
                <UIcon :name="getActivityIcon(row.original.type)" :class="getActivityColor(row.original.type)"
                    class="text-lg" />
                <span class="text-sm">{{ row.original.type }}</span>
            </div>
        </template>

        <template #durationMinutes-cell="{ row }">
            <UBadge color="primary" variant="soft" size="sm">
                {{ row.original.durationMinutes }} min
            </UBadge>
        </template>

        <template #completedAt-cell="{ row }">
            <span class="text-xs text-muted">{{ formatTime(row.original.completedAt) }}</span>
        </template>

        <template #empty>
            <div v-if="logs.length === 0" class="py-10 text-center">
                <UIcon name="i-lucide-inbox" class="size-12 text-dimmed/30 shrink-0" />
                <p class="text-sm text-dimmed">No activity logs found. Start a lesson to track your progress!</p>
            </div>
        </template>
    </UTable>

    <div v-if="(table?.tableApi?.getFilteredRowModel().rows.length || 0) > pagination.pageSize"
        class="flex justify-end border-t border-default py-4 px-4 sm:px-6">
        <UPagination :page="(table?.tableApi?.getState().pagination.pageIndex || 0) + 1"
            :items-per-page="table?.tableApi?.getState().pagination.pageSize"
            :total="table?.tableApi?.getFilteredRowModel().rows.length"
            @update:page="(p) => table?.tableApi?.setPageIndex(p - 1)" :show-controls="false" show-edges size="sm"
            variant="soft" />
    </div>
</template>
