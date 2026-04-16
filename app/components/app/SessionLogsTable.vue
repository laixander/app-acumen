<script setup lang="ts">
import type { SessionLog } from '~/types/topic'
import { getPaginationRowModel } from '@tanstack/vue-table'

const table = useTemplateRef('table')

const { sessions } = useActivityLogs()

const columns = [
    { accessorKey: 'action', header: 'Activity' },
    { accessorKey: 'device', header: 'Device / Platform' },
    { accessorKey: 'status', header: 'Status' },
    { accessorKey: 'timestamp', header: 'Date' }
] as any[]

const formatTime = (timestamp: number) => formatDate(timestamp)

const getActionIcon = (action: string) => {
    const a = action.toLowerCase()
    if (a.includes('login') || a.includes('logged in')) return 'i-lucide-log-in'
    if (a.includes('updated') || a.includes('changed')) return 'i-lucide-refresh-cw'
    if (a.includes('security')) return 'i-lucide-shield-check'
    if (a.includes('attempt')) return 'i-lucide-shield-alert'
    return 'i-lucide-activity'
}

const getStatusColor = (status: SessionLog['status']) => {
    switch (status) {
        case 'Success': return 'success'
        case 'Failed': return 'error'
        case 'Warning': return 'warning'
        default: return 'neutral'
    }
}

const pagination = ref({
    pageIndex: 0,
    pageSize: 8
})
</script>

<template>
    <UTable :data="sessions" :columns="columns" ref="table" v-model:pagination="pagination" :pagination-options="{
        getPaginationRowModel: getPaginationRowModel()
    }" :ui="{ th: 'text-xs uppercase tracking-wider text-muted font-bold px-4 sm:px-6', td: 'px-4 sm:px-6' }">

        <template #action-cell="{ row }">
            <div class="flex items-center gap-3">
                <div class="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800">
                    <UIcon :name="getActionIcon(row.original.action)"
                        :class="row.original.status === 'Failed' ? 'text-red-500' : 'text-primary'"
                        class="text-lg flex shrink-0" />
                </div>
                <div class="flex flex-col">
                    <span class="font-bold text-sm text-toned">{{ row.original.action }}</span>
                    <span v-if="row.original.location" class="text-[10px] text-muted uppercase tracking-widest">{{
                        row.original.location }}</span>
                </div>
            </div>
        </template>

        <template #device-cell="{ row }">
            <span class="text-sm text-dimmed">{{ row.original.device }}</span>
        </template>

        <template #status-cell="{ row }">
            <UBadge :color="getStatusColor(row.original.status)" variant="soft" size="sm"
                class="font-bold uppercase tracking-wider text-[10px]">
                {{ row.original.status }}
            </UBadge>
        </template>

        <template #timestamp-cell="{ row }">
            <span class="text-xs text-neutral-500 dark:text-neutral-400 font-medium">
                {{ formatTime(row.original.timestamp) }}
            </span>
        </template>

        <template #empty>
            <div v-if="sessions.length === 0" class="py-10 text-center">
                <UIcon name="i-lucide-shield-check" class="size-12 text-dimmed/30 shrink-0" />
                <p class="text-sm text-dimmed mt-2">No security logs found. Your account activity will appear here.</p>
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
