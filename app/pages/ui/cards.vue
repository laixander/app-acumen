<template>
    <ContentPanel title="Cards">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <UCard>
                <template #header>
                    <h3 class="text-lg font-semibold">Card Title</h3>
                </template>
                <p class="text-gray-600 dark:text-gray-300">
                    This is the card content. You can put any UI
                    elements here.
                </p>
                <template #footer>
                    <div class="flex justify-end gap-2">
                        <UButton label="Cancel" color="neutral" />
                        <UButton label="Save" color="primary" />
                    </div>
                </template>
            </UCard>
        </div>
    </ContentPanel>
</template>