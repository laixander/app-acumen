<script setup lang="ts">
type UploadFile = { name: string; size: string; type: string; status?: 'success' | 'error' | 'uploading' }

const props = defineProps<{
    modelValue: {
        files: UploadFile[]
    }
}>()

const emit = defineEmits(['update:modelValue', 'upload-ready'])

const isUploading = ref(false)

const hasErrors = computed(() => props.modelValue.files.some(f => f.status === 'error'))
const successCount = computed(() => props.modelValue.files.filter(f => f.status === 'success').length)

const addMockFile = () => {
    isUploading.value = true
    setTimeout(() => {
        const isError = Math.random() > 0.8 // 20% chance of error for demo
        const newFile = {
            name: `Study_Materials_${props.modelValue.files.length + 1}.pdf`,
            size: '2.4 MB',
            type: 'pdf',
            status: isError ? 'error' : 'success'
        }
        const updatedValue = { ...props.modelValue, files: [...props.modelValue.files, newFile] }
        emit('update:modelValue', updatedValue)
        isUploading.value = false
    }, 1500)
}

const removeFile = (index: number) => {
    const newFiles = [...props.modelValue.files]
    newFiles.splice(index, 1)
    emit('update:modelValue', { ...props.modelValue, files: newFiles })
}

const retryFile = (index: number) => {
    // Mark as uploading, then simulate retry
    const newFiles = [...props.modelValue.files]
    newFiles[index] = { ...newFiles[index], status: 'uploading' } as UploadFile
    emit('update:modelValue', { ...props.modelValue, files: newFiles })

    setTimeout(() => {
        const retried = [...props.modelValue.files]
        retried[index] = { ...retried[index], status: 'success' } as UploadFile
        emit('update:modelValue', { ...props.modelValue, files: retried })
    }, 1500)
}
</script>

<template>
    <div class="flex flex-col gap-8 p-8 sm:p-10">
        <div class="flex items-center gap-4">
            <div class="p-3 bg-primary-100 dark:bg-primary-900/40 rounded-2xl">
                <UIcon name="i-lucide-upload-cloud" class="text-2xl text-primary flex shrink-0" />
            </div>
            <div>
                <h2 class="text-xl font-bold text-neutral-900 dark:text-white">Upload Your Materials</h2>
                <p class="text-sm text-neutral-500 dark:text-neutral-400">Upload your reviewer, your notes, your textbook.</p>
            </div>
        </div>

        <!-- Dropzone -->
        <div class="group relative border-2 border-dashed border-neutral-200 dark:border-neutral-800 rounded-3xl py-16 flex flex-col items-center justify-center gap-6 hover:border-primary-500/50 hover:bg-primary-50/10 dark:hover:bg-primary-950/10 transition-all duration-500 cursor-pointer overflow-hidden"
            @click="addMockFile">

            <div class="absolute inset-0 bg-gradient-to-b from-transparent to-neutral-50/50 dark:to-neutral-900/20 pointer-events-none"></div>

            <div class="relative p-5 bg-white dark:bg-neutral-800 rounded-2xl shadow-xl group-hover:-translate-y-2 group-hover:rotate-3 transition-all duration-500">
                <UIcon :name="isUploading ? 'i-lucide-loader-2' : 'i-lucide-file-up'"
                    class="flex shrink-0 text-4xl text-neutral-400 group-hover:text-primary transition-colors duration-500"
                    :class="{ 'animate-spin': isUploading }" />
            </div>

            <div class="relative text-center space-y-2">
                <p class="text-lg font-bold text-neutral-900 dark:text-white">
                    {{ isUploading ? 'Uploading material...' : 'Click or drag and drop' }}
                </p>
                <p class="text-sm text-neutral-500">PDF, DOCX, TXT up to 50MB</p>
            </div>
        </div>

        <!-- File List -->
        <div v-if="modelValue.files.length > 0 || isUploading"
            class="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div class="flex items-center justify-between px-2">
                <h3 class="text-xs font-bold uppercase tracking-widest text-neutral-400">Selected Materials</h3>
                <span v-if="hasErrors" class="text-xs font-semibold text-red-500 flex items-center gap-1">
                    <UIcon name="i-lucide-alert-circle" class="w-3.5 h-3.5" />
                    {{ modelValue.files.filter(f => f.status === 'error').length }} failed
                </span>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div v-for="(file, index) in modelValue.files" :key="index"
                    class="group p-4 bg-white dark:bg-neutral-900 border rounded-2xl flex items-center gap-4 hover:shadow-lg transition-all duration-300"
                    :class="file.status === 'error'
                        ? 'border-red-300 dark:border-red-800/60 ring-1 ring-red-200 dark:ring-red-900/40'
                        : 'border-neutral-200 dark:border-neutral-800 hover:border-primary-500/30'">

                    <div class="relative">
                        <div class="p-2.5 rounded-xl"
                            :class="file.status === 'error' ? 'bg-red-100 dark:bg-red-950/40' : 'bg-red-50 dark:bg-red-950/30'">
                            <UIcon name="i-lucide-file-text" class="text-xl flex shrink-0"
                                :class="file.status === 'error' ? 'text-red-600 dark:text-red-400' : 'text-red-500'" />
                        </div>
                        <!-- Status Badge -->
                        <div v-if="file.status === 'success'"
                            class="absolute -top-1 -right-1 bg-white dark:bg-neutral-900 rounded-full p-0.5">
                            <UIcon name="i-lucide-check-circle-2" class="w-4 h-4 text-emerald-500 flex" />
                        </div>
                        <div v-else-if="file.status === 'error'"
                            class="absolute -top-1 -right-1 bg-white dark:bg-neutral-900 rounded-full p-0.5">
                            <UIcon name="i-lucide-x-circle" class="w-4 h-4 text-red-500 flex" />
                        </div>
                        <div v-else-if="file.status === 'uploading'"
                            class="absolute -top-1 -right-1 bg-white dark:bg-neutral-900 rounded-full p-0.5">
                            <UIcon name="i-lucide-loader-2" class="w-4 h-4 text-primary animate-spin flex" />
                        </div>
                    </div>

                    <div class="flex-1 min-w-0">
                        <p class="text-sm font-bold text-neutral-900 dark:text-white truncate">{{ file.name }}</p>
                        <p class="text-xs text-neutral-500 flex items-center gap-2">
                            {{ file.size }}
                            <span v-if="file.status === 'error'" class="text-red-500 font-medium">• Upload failed</span>
                            <span v-else-if="file.status === 'uploading'" class="text-primary font-medium">• Retrying...</span>
                        </p>
                    </div>

                    <div class="flex items-center gap-1 shrink-0">
                        <!-- Retry button for failed files -->
                        <UButton v-if="file.status === 'error'"
                            icon="i-lucide-refresh-cw"
                            variant="ghost"
                            color="error"
                            size="xs"
                            @click.stop="retryFile(index)" />
                        <UButton
                            icon="i-lucide-x"
                            variant="ghost"
                            color="neutral"
                            size="xs"
                            class="opacity-0 group-hover:opacity-100 transition-opacity"
                            @click.stop="removeFile(index)" />
                    </div>
                </div>

                <!-- Ghost/Loading State -->
                <div v-if="isUploading"
                    class="p-4 bg-primary-50/50 dark:bg-primary-950/10 border border-primary-500/20 rounded-2xl flex items-center gap-4 animate-pulse">
                    <div class="p-2.5 bg-primary-100 dark:bg-primary-900/40 rounded-xl">
                        <UIcon name="i-lucide-loader-2" class="flex text-xl text-primary animate-spin" />
                    </div>
                    <div class="flex-1 min-w-0">
                        <div class="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-24 mb-2"></div>
                        <div class="h-3 bg-neutral-100 dark:bg-neutral-800 rounded w-16"></div>
                    </div>
                </div>
            </div>

            <!-- Start Indexing Action -->
            <div v-if="modelValue.files.length > 0 && !isUploading"
                class="flex flex-col items-center gap-3 mt-6 animate-fade-in [animation-delay:200ms]">
                <!-- Error guard warning -->
                <Transition enter-active-class="transition-all duration-300 ease-out"
                    enter-from-class="opacity-0 -translate-y-2" enter-to-class="opacity-100 translate-y-0"
                    leave-active-class="transition-all duration-200 ease-in"
                    leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 -translate-y-2">
                    <div v-if="hasErrors"
                        class="flex items-center gap-2 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800/50 px-4 py-2.5 rounded-xl w-full">
                        <UIcon name="i-lucide-alert-triangle" class="w-4 h-4 shrink-0" />
                        <span>Fix failed uploads before continuing — retry or remove them.</span>
                    </div>
                </Transition>
                <UButton
                    label="Start Indexing"
                    trailing-icon="i-lucide-arrow-right"
                    variant="solid"
                    size="xl"
                    color="primary"
                    :disabled="hasErrors || successCount === 0"
                    class="rounded-full px-12 py-5 uppercase text-sm font-bold tracking-[0.2em] hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    @click="$emit('upload-ready')" />
            </div>
        </div>
    </div>
</template>
