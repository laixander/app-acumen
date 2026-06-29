<script setup lang="ts">
const props = defineProps<{
    courseId: string,
    targetFinishDate?: number | string,
    sessionsPerWeek?: number,
    itemsPerWeek?: number
}>()

const courseStore = useCourseStore()

const isOpen = ref(false)
const focusedScheduleField = ref<string | null>(null)

const scheduleForm = reactive({
    targetFinishDate: '',
    sessionsPerWeek: 3,
    itemsPerWeek: 5
})

const openModal = (field?: string) => {
    scheduleForm.targetFinishDate = props.targetFinishDate
        ? new Date(props.targetFinishDate).toISOString().split('T')[0]!
        : ''
    scheduleForm.sessionsPerWeek = props.sessionsPerWeek || 3
    scheduleForm.itemsPerWeek = props.itemsPerWeek || 5
    focusedScheduleField.value = field ?? null
    isOpen.value = true
}

const saveSchedule = () => {
    let targetDate: number | undefined = undefined
    if (scheduleForm.targetFinishDate) {
        const [y, m, d] = scheduleForm.targetFinishDate.split('-').map(Number) as [number, number, number]
        targetDate = new Date(y, m - 1, d).getTime()
    }

    courseStore.updateCourse(props.courseId, {
        targetFinishDate: targetDate,
        sessionsPerWeek: Number(scheduleForm.sessionsPerWeek),
        itemsPerWeek: Number(scheduleForm.itemsPerWeek)
    })
    isOpen.value = false
}
</script>

<template>
    <UCard variant="soft" :ui="{ body: 'p-5 flex flex-col gap-4' }">
        <div class="flex items-center justify-between">
            <span class="text-sm font-semibold uppercase tracking-wider text-muted">
                Schedule & Targets
            </span>
            <UButton icon="i-lucide-settings-2" variant="ghost" size="sm" @click="openModal()" />
        </div>
        <div class="flex flex-col gap-3">
            <div class="flex items-center justify-between gap-4">
                <div class="flex items-center gap-2 text-dimmed">
                    <UIcon name="i-lucide-calendar-clock" class="size-4 text-primary-500" />
                    <span class="text-xs font-medium">Target Date</span>
                </div>
                <USeparator class="flex-1" />
                <span class="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                    {{ targetFinishDate ? new Date(targetFinishDate).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric', year: 'numeric'
                    }) : 'Not set' }}
                </span>
            </div>
            <div class="flex items-center justify-between gap-4">
                <div class="flex items-center gap-2 text-dimmed">
                    <UIcon name="i-lucide-calendar-days" class="size-4 text-orange-500" />
                    <span class="text-xs font-medium">Sessions / Week</span>
                </div>
                <USeparator class="flex-1" />
                <span class="text-sm font-bold text-neutral-900 dark:text-neutral-100">{{ sessionsPerWeek || 'Not set'
                }}</span>
            </div>
            <div class="flex items-center justify-between gap-4">
                <div class="flex items-center gap-2 text-dimmed">
                    <UIcon name="i-lucide-layers" class="size-4 text-purple-500" />
                    <span class="text-xs font-medium">Items / Week</span>
                </div>
                <USeparator class="flex-1" />
                <span class="text-sm font-bold text-neutral-900 dark:text-neutral-100">{{ itemsPerWeek || 'Not set'
                }}</span>
            </div>
        </div>
    </UCard>

    <!-- Edit Schedule Modal -->
    <UModal v-model:open="isOpen">
        <template #content>
            <div class="p-6 flex flex-col gap-6">
                <div class="flex flex-col gap-1">
                    <h3 class="text-lg font-bold">Edit Schedule & Targets</h3>
                    <p class="text-sm text-neutral-500">Set your goals and timeline for this course.</p>
                </div>

                <div class="grid lg:grid-cols-2 gap-4">
                    <UFormField label="Target Finish Date" hint="Optional" class="lg:col-span-2">
                        <UInput type="date" v-model="scheduleForm.targetFinishDate" icon="i-lucide-calendar"
                            class="w-full" :autofocus="focusedScheduleField === 'targetFinishDate'" />
                    </UFormField>
                    <UFormField label="Sessions per Week">
                        <UInput type="number" min="1" max="14" v-model="scheduleForm.sessionsPerWeek"
                            icon="i-lucide-calendar-days" class="w-full"
                            :autofocus="focusedScheduleField === 'sessionsPerWeek'" />
                    </UFormField>
                    <UFormField label="Items per Week">
                        <UInput type="number" min="1" max="100" v-model="scheduleForm.itemsPerWeek"
                            icon="i-lucide-list-todo" class="w-full"
                            :autofocus="focusedScheduleField === 'itemsPerWeek'" />
                    </UFormField>
                </div>

                <div class="flex items-center justify-end gap-3 mt-2">
                    <UButton label="Cancel" variant="ghost" color="neutral" @click="isOpen = false" />
                    <UButton label="Save Changes" color="primary" @click="saveSchedule" />
                </div>
            </div>
        </template>
    </UModal>
</template>
