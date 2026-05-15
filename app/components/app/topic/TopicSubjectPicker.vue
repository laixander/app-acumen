<script setup lang="ts">
import { CURRICULUM_CATEGORIES } from '~/constants/topics'

const emit = defineEmits(['select'])

const searchQuery = ref('')
const selectedSubject = ref('')
const displayLimit = ref(4)
const rootEl = ref<HTMLElement | null>(null)

const filteredCategories = computed(() => {
    if (!searchQuery.value) return CURRICULUM_CATEGORIES

    const query = searchQuery.value.toLowerCase()
    return CURRICULUM_CATEGORIES.map(category => {
        const matchesCategory = category.name.toLowerCase().includes(query)
        const matchingSubjects = category.subjects.filter(s => s.toLowerCase().includes(query))

        if (matchesCategory || matchingSubjects.length > 0) {
            return {
                ...category,
                subjects: matchesCategory ? category.subjects : matchingSubjects
            }
        }
        return null
    }).filter((c): c is typeof CURRICULUM_CATEGORIES[number] => c !== null)
})

const visibleCategories = computed(() => filteredCategories.value.slice(0, displayLimit.value))
const hasMore = computed(() => displayLimit.value < filteredCategories.value.length)
const canShowLess = computed(() => !hasMore.value && displayLimit.value > 4 && !searchQuery.value)

const showMore = async () => {
    const prevLimit = displayLimit.value
    displayLimit.value = Math.min(prevLimit + 4, filteredCategories.value.length)
    await nextTick()
    // Scroll to the first newly visible card
    if (rootEl.value) {
        const cards = rootEl.value.querySelectorAll<HTMLElement>('.subject-card')
        const firstNewCard = cards[prevLimit]
        if (firstNewCard) {
            const top = firstNewCard.getBoundingClientRect().top + window.scrollY - 120
            window.scrollTo({ top, behavior: 'smooth' })
        }
    }
}

const showLess = async () => {
    displayLimit.value = 4
    await nextTick()
    // Scroll to the first card with a 60px gap from the top
    if (rootEl.value) {
        const firstCard = rootEl.value.querySelector<HTMLElement>('.subject-card')
        if (firstCard) {
            const top = firstCard.getBoundingClientRect().top + window.scrollY - 90
            window.scrollTo({ top, behavior: 'smooth' })
        }
    }
}

// Reset limit when searching
watch(searchQuery, () => {
    displayLimit.value = 4
})

const handleSelect = (subject: string) => {
    selectedSubject.value = subject
    emit('select', subject)
}
</script>

<template>
    <div ref="rootEl" class="space-y-12 p-8 sm:p-10">
        <div class="text-center space-y-6">
            <div class="space-y-4">
                <h2 class="text-2xl font-bold text-neutral-900 dark:text-white">Pick a subject to master</h2>
                <p class="text-neutral-500 dark:text-neutral-400">Select from our universal curriculum aligned with
                    global
                    standards.</p>
            </div>

            <div class="max-w-md mx-auto relative group">
                <div
                    class="absolute inset-0 bg-primary-500/10 blur-xl rounded-full opacity-0 group-focus-within:opacity-100 transition-opacity duration-500">
                </div>
                <UInput v-model="searchQuery" icon="i-lucide-search"
                    placeholder="Search subjects (e.g. Algebra, Physics...)" size="xl" variant="none"
                    class="w-full bg-white/50 dark:bg-neutral-900/50 backdrop-blur-xl border border-neutral-200/50 dark:border-neutral-800/50 rounded-2xl ring-1 ring-neutral-200/50 dark:ring-neutral-800/50 focus-within:ring-primary-500/50 focus-within:border-primary-500/50 transition-all duration-300">
                    <template #trailing v-if="searchQuery">
                        <UButton color="neutral" variant="link" icon="i-lucide-x" :padded="false"
                            @click="searchQuery = ''" />
                    </template>
                </UInput>
            </div>
        </div>

        <div v-if="filteredCategories.length === 0"
            class="flex flex-col items-center justify-center py-20 text-center space-y-6 animate-in fade-in slide-in-from-bottom-4">
            <div
                class="p-6 rounded-3xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200/50 dark:border-neutral-800/50 shadow-inner">
                <UIcon name="i-lucide-search-x" class="w-12 h-12 text-neutral-400" />
            </div>
            <div class="space-y-2">
                <h3 class="text-lg font-bold text-neutral-900 dark:text-white">No subjects found</h3>
                <p class="text-neutral-500 dark:text-neutral-400 max-w-xs mx-auto">
                    We couldn't find any subjects matching "<span
                        class="text-neutral-900 dark:text-white font-medium">{{
                            searchQuery }}</span>".
                </p>
            </div>
            <UButton label="Clear search" variant="soft" color="neutral" class="rounded-full"
                @click="searchQuery = ''" />
        </div>

        <TransitionGroup v-else tag="div" class="grid grid-cols-1 md:grid-cols-2 gap-8 relative"
            enter-active-class="transition-all duration-500 ease-out" enter-from-class="opacity-0 translate-y-8"
            enter-to-class="opacity-100 translate-y-0" leave-active-class="transition-all duration-500 ease-in absolute"
            leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 -translate-y-8"
            move-class="transition-all duration-500 ease-in-out">
            <div v-for="(category, index) in visibleCategories" :key="category.name"
                class="subject-card group relative flex flex-col p-8 rounded-[2.5rem] border border-neutral-200/50 dark:border-neutral-800/50 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl transition-all duration-700 hover:shadow-2xl overflow-hidden"
                :style="{ animationDelay: `${(index % 4) * 100}ms` }" :class="[
                    `hover:border-${category.color}-500/30 shadow-${category.color}-500/5`
                ]">

                <!-- Category Accent Glow -->
                <div class="absolute -top-24 -right-24 w-64 h-64 blur-[80px] opacity-0 group-hover:opacity-10 transition-opacity duration-700"
                    :class="`bg-${category.color}-500`"></div>

                <div class="relative flex items-center justify-between mb-8">
                    <div class="flex items-center gap-4">
                        <div class="p-4 rounded-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 relative overflow-hidden"
                            :class="`text-${category.color}-600 dark:text-${category.color}-400`">
                            <div class="absolute inset-0 opacity-10" :class="`bg-${category.color}-500`"></div>
                            <div
                                class="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent dark:from-white/5">
                            </div>
                            <UIcon :name="category.icon" class="w-7 h-7 relative z-10 flex shrink-0" />
                        </div>
                        <div>
                            <h3 class="text-xl font-bold text-neutral-900 dark:text-white">{{ category.name }}</h3>
                            <div class="flex items-center gap-2">
                                <div class="w-1.5 h-1.5 rounded-full animate-pulse" :class="`bg-${category.color}-500`">
                                </div>
                                <span
                                    class="text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-400 dark:text-neutral-500">Universal
                                    Core</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="relative grid grid-cols-2 gap-3">
                    <button v-for="subject in category.subjects" :key="subject" @click="handleSelect(subject)"
                        class="group/item relative px-4 py-3 rounded-2xl border transition-all duration-300 text-left overflow-hidden"
                        :class="[
                            selectedSubject === subject
                                ? `border-${category.color}-500/50 bg-${category.color}-50/50 dark:bg-${category.color}-900/20 ring-1 ring-${category.color}-500/20 shadow-lg shadow-${category.color}-500/10`
                                : 'border-neutral-100 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/30 hover:border-neutral-300 dark:hover:border-neutral-700 hover:bg-white dark:hover:bg-neutral-800'
                        ]">

                        <div class="flex items-center justify-between">
                            <span class="text-sm font-semibold transition-colors duration-300"
                                :class="selectedSubject === subject ? `text-${category.color}-600 dark:text-${category.color}-400` : 'text-neutral-600 dark:text-neutral-400 group-hover/item:text-neutral-900 dark:group-hover/item:text-white'">
                                {{ subject }}
                            </span>
                            <UIcon v-if="selectedSubject === subject" name="i-lucide-check-circle-2" class="w-4 h-4"
                                :class="`text-${category.color}-500`" />
                        </div>

                        <!-- Mini indicator line -->
                        <div class="absolute bottom-0 left-0 h-0.5 transition-all duration-500" :class="[
                            selectedSubject === subject ? `w-full bg-${category.color}-500` : 'w-0 bg-neutral-200 dark:bg-neutral-700'
                        ]"></div>
                    </button>
                </div>
            </div>
        </TransitionGroup>

        <div class="flex justify-center items-center pt-4">
            <UButton v-if="hasMore" label="Show More Categories" variant="ghost" color="neutral"
                icon="i-lucide-chevron-down"
                class="rounded-full px-8 py-3 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all duration-300"
                @click="showMore" />

            <UButton v-else-if="canShowLess" label="Show Less" variant="ghost" color="neutral"
                icon="i-lucide-chevron-up"
                class="rounded-full px-8 py-3 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all duration-300"
                @click="showLess" />
        </div>

        <div class="pt-8 flex flex-col items-center gap-4">
            <div
                class="h-px w-24 bg-gradient-to-r from-transparent via-neutral-200 dark:via-neutral-800 to-transparent">
            </div>
            <p class="text-xs text-neutral-400 dark:text-neutral-600 uppercase tracking-widest font-medium">
                Aligned with universal academic standards
            </p>
        </div>
    </div>
</template>
