<template>
    <UCard class="relative max-w-lg mx-auto w-full rounded-2xl shadow-2xl shadow-primary-950/20">
        <div class="flex items-center gap-2 mb-6">
            <div class="w-2.5 h-2.5 rounded-full bg-red-400"></div>
            <div class="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
            <div class="w-2.5 h-2.5 rounded-full bg-green-400"></div>
            <span class="ml-2 text-xs font-medium text-dimmed">Acumen Dashboard</span>
        </div>
        <h3 class="text-sm font-semibold mb-3 uppercase tracking-wider">Course Progress</h3>
        <UAlert :ui="{ root: 'p-4 sm:p-6' }">
            <template #description>
                <div class="text-5xl font-bold mb-4 tracking-tight">78%</div>
                <UProgress :model-value="78"
                    :ui="{ base: 'bg-white/30 dark:bg-neutral-50', indicator: 'bg-white dark:bg-neutral-800' }" />
            </template>
        </UAlert>
        <div class="grid grid-cols-3 divide-x divide-default/50 mt-8">
            <div class="text-center">
                <div class="text-xl font-bold">12</div>
                <div class="text-xs font-medium text-dimmed uppercase tracking-wider mt-1">Topics</div>
            </div>
            <div class="text-center">
                <div class="text-xl font-bold">48</div>
                <div class="text-xs font-medium text-dimmed uppercase tracking-wider mt-1">Lessons</div>
            </div>
            <div class="text-center">
                <div class="text-xl font-bold">15</div>
                <div class="text-xs font-medium text-dimmed uppercase tracking-wider mt-1">Quizzes</div>
            </div>
        </div>
        <div class="space-y-2 mt-8">
            <UCard variant="soft">
                <div class="flex justify-between items-center text-sm">
                    <span class="font-medium">Algorithmic Complexity</span>
                    <div class="w-24 flex items-center gap-2">
                        <UProgress :model-value="92" color="primary" size="sm" class="flex-1" /><span
                            class="text-xs font-semibold text-primary">92%</span>
                    </div>
                </div>
            </UCard>
            <UCard variant="soft">
                <div class="flex justify-between items-center text-sm">
                    <span class="font-medium">Data Structures</span>
                    <div class="w-24 flex items-center gap-2">
                        <UProgress :model-value="64" color="primary" size="sm" class="flex-1" /><span
                            class="text-xs font-semibold text-primary">64%</span>
                    </div>
                </div>
            </UCard>
            <UCard variant="soft">
                <div class="flex justify-between items-center text-sm">
                    <span class="font-medium">Neural Networks</span>
                    <div class="w-24 flex items-center gap-2">
                        <UProgress :model-value="78" color="primary" size="sm" class="flex-1" /><span
                            class="text-xs font-semibold text-primary">78%</span>
                    </div>
                </div>
            </UCard>
        </div>
    </UCard>
</template>