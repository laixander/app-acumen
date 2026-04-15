<script setup lang="ts">
const props = defineProps<{
    modelValue: {
        files: Array<{ name: string; size: string; type: string }>
    }
}>()

const emit = defineEmits(['update:modelValue'])

const addMockFile = () => {
    const newFile = {
        name: `Study_Materials_${props.modelValue.files.length + 1}.pdf`,
        size: '2.4 MB',
        type: 'pdf'
    }
    emit('update:modelValue', { ...props.modelValue, files: [...props.modelValue.files, newFile] })
}

const removeFile = (index: number) => {
    const newFiles = [...props.modelValue.files]
    newFiles.splice(index, 1)
    emit('update:modelValue', { ...props.modelValue, files: newFiles })
}
</script>

<template>
    <div class="flex flex-col gap-8">
        <div class="flex items-center gap-4">
            <div class="p-3 bg-primary-100 dark:bg-primary-900/40 rounded-xl">
                <UIcon name="i-lucide-upload-cloud" class="text-2xl text-primary flex shrink-0" />
            </div>
            <div>
                <h2 class="text-xl font-bold">Upload Learning Materials</h2>
                <p class="text-sm text-muted">Upload docs, PDFs, or slides. AI will analyze them for your lessons.</p>
            </div>
        </div>

        <!-- Dropzone -->
        <div class="group border-2 border-dashed border-muted rounded-2xl py-12 flex flex-col items-center justify-center gap-4 hover:border-primary/50 transition-all duration-400 cursor-pointer bg-neutral-50/50 dark:bg-neutral-900/20"
            @click="addMockFile">
            <div
                class="p-4 bg-white dark:bg-neutral-800 rounded-xl shadow-sm group-hover:-translate-y-2 group-hover:shadow-xl transition-all duration-400">
                <UIcon name="i-lucide-file-up"
                    class="flex shrink-0 text-3xl text-dimmed group-hover:text-primary transition-colors duration-400" />
            </div>
            <div class="text-center">
                <p class="font-bold">Click or drag and drop</p>
                <p class="text-xs text-muted">PDF, DOCX, TXT up to 50MB</p>
            </div>
        </div>

        <!-- File List -->
        <div v-if="modelValue.files.length > 0" class="flex flex-col gap-3">
            <h3 class="text-xs font-bold uppercase tracking-wider text-dimmed">Selected Files</h3>

            <UCard v-for="(file, index) in modelValue.files" :key="index"
                :ui="{ body: 'sm:p-4 flex items-center gap-4' }">
                <div class="p-2 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <UIcon name="i-lucide-file-text" class="text-xl text-red flex shrink-0" />
                </div>
                <div class="flex-1 min-w-0">
                    <p class="text-sm font-bold truncate">{{ file.name }}</p>
                    <p class="text-xs text-muted">{{ file.size }}</p>
                </div>
                <UButton icon="i-lucide-x" variant="ghost" color="neutral" size="xs" @click="removeFile(index)" />
            </UCard>
        </div>
    </div>
</template>
