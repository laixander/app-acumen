<script setup lang="ts">
import {
    apiEndpoints,
    dataModels,
    workflowSteps,
    changelogItems,
    modules,
    techStack,
} from "~/constants/documentation";

const displayedCount = ref(5);
const visibleChangelogs = computed(() =>
    changelogItems.slice(0, displayedCount.value),
);

const showMore = () => {
    displayedCount.value += 5;
};

const { activeSection, sections } = useDocsMenu();

const appConfig = useAppConfig()

definePageMeta({
    layout: 'guest',
    showDocsMenu: true
})

onMounted(() => {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    activeSection.value = entry.target.id;
                }
            });
        },
        {
            rootMargin: "-20% 0% -70% 0%",
        },
    );

    document.querySelectorAll("section[id]").forEach((section) => {
        observer.observe(section);
    });
});
</script>
<template>
    <UPage>
        <UContainer>
            <div class="flex flex-col lg:flex-row lg:items-start gap-8 px-4 lg:px-8 py-8">
                <!-- Sidebar TOC -->
                <aside class="hidden lg:block w-64 sticky top-24 shrink-0">
                    <div class="flex flex-col gap-4">
                        <div class="px-2 mb-2">
                            <UBadge variant="soft" size="md" class="rounded-full px-3 font-mono">
                                v{{ appConfig.version }}
                            </UBadge>
                        </div>
                        <UNavigationMenu :ui="{ linkTrailingIcon: 'hidden' }" orientation="vertical"
                            :items="sections" />
                    </div>
                </aside>

                <!-- Main Content -->
                <div class="flex-1 max-w-4xl space-y-16">
                    <!-- Platform Overview -->
                    <DocsSection id="overview" title="Platform Overview" icon="i-lucide-info">
                        <p class="text-lg text-dimmed leading-relaxed italic">
                            "Accelerate Learning. Master Anything."
                        </p>
                        <p class="mt-4 leading-relaxed">
                            The Learn Fast AI-Assisted Learning Platform (app-learnfast) is an
                            intelligent platform designed specifically for learners and
                            educators. It eliminates traditional learning barriers through
                            personalized tracking, adaptive pathfinding, and actionable analytics.
                        </p>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                            <UCard shadow="sm">
                                <h3 class="font-semibold text-primary mb-2">Learner Centric</h3>
                                <p class="text-sm">
                                    Personalized assessment flows and adaptive paths ensure focused
                                    and efficient knowledge mastery for every user.
                                </p>
                            </UCard>
                            <UCard shadow="sm">
                                <h3 class="font-semibold text-primary mb-2">
                                    Operational Excellence
                                </h3>
                                <p class="text-sm">
                                    Empower learners with data-driven insights and interactive
                                    AI tutoring for consistent academic growth.
                                </p>
                            </UCard>
                        </div>
                    </DocsSection>

                    <USeparator />

                    <!-- System Architecture -->
                    <DocsSection id="architecture" title="System Architecture" icon="i-lucide-layers">
                        <div class="space-y-4">
                            <p>
                                The application is built on a modern, high-performance tech
                                stack:
                            </p>
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <UCard v-for="tech in techStack" :key="tech.name" :ui="{ body: 'sm:p-4 flex gap-3' }"
                                    variant="subtle">
                                    <UIcon :name="tech.icon" class="w-5 h-5 mt-0.5 text-primary" />
                                    <div>
                                        <span class="font-semibold">{{ tech.name }}</span>
                                        <p class="text-xs text-muted">{{ tech.desc }}</p>
                                    </div>
                                </UCard>
                            </div>
                        </div>
                    </DocsSection>

                    <USeparator />

                    <!-- Module Reference -->
                    <DocsSection id="modules" title="Module Reference" icon="i-lucide-box">
                        <div class="grid grid-cols-1 gap-4">
                            <UCard v-for="mod in modules" :key="mod.name" :ui="{ body: 'sm:p-4 flex gap-4' }">
                                <UBadge :icon="mod.icon" color="primary" variant="soft" :ui="{ leadingIcon: 'size-6' }"
                                    class="size-12 flex items-center justify-center rounded-none squircle" />
                                <div>
                                    <h4 class="font-bold text-lg">{{ mod.name }}</h4>
                                    <p class="text-sm text-muted">{{ mod.desc }}</p>
                                </div>
                            </UCard>
                        </div>
                    </DocsSection>

                    <USeparator />

                    <!-- Data Models & Schema -->
                    <DocsSection id="data-models" title="Data Models & Schema" icon="i-lucide-database">
                        <div class="space-y-6">
                            <div v-for="model in dataModels" :key="model.name">
                                <label class="font-mono text-xs uppercase tracking-widest text-dimmed">{{ model.name }}
                                    Model</label>
                                <div class="mt-2 p-4 rounded-lg bg-neutral-800 overflow-x-auto">
                                    <code class="text-xs text-primary-400 break-all">{{
                                        model.fields
                                    }}</code>
                                </div>
                            </div>
                        </div>
                    </DocsSection>

                    <USeparator />

                    <!-- Workflow -->
                    <DocsSection id="workflow" title="Workflow" icon="i-lucide-git-branch">
                        <DocsTimeline :items="workflowSteps" />
                    </DocsSection>

                    <USeparator />

                    <!-- API Reference -->
                    <DocsSection id="api" title="API Reference" icon="i-lucide-webhook">
                        <div class="space-y-4">
                            <UCard v-for="api in apiEndpoints" :key="api.path" variant="subtle"
                                :ui="{ body: 'sm:p-4' }">
                                <div class="flex items-center gap-3 mb-1">
                                    <UBadge color="primary" variant="subtle" size="sm" class="font-mono">{{ api.method
                                    }}
                                    </UBadge>
                                    <span class="font-mono font-bold">{{ api.path }}</span>
                                </div>
                                <p class="text-sm text-muted">{{ api.description }}</p>
                            </UCard>
                        </div>
                    </DocsSection>

                    <USeparator />

                    <!-- Design System -->
                    <DocsSection id="design" title="Design System" icon="i-lucide-palette">
                        <div class="space-y-8">
                            <div>
                                <h4 class="font-semibold mb-4 text-sm uppercase tracking-widest text-dimmed">
                                    Color Palette
                                </h4>
                                <div class="flex flex-wrap gap-4">
                                    <div class="space-y-2">
                                        <div class="w-20 h-20 rounded-2xl bg-primary shadow-lg" />
                                        <p class="text-xs text-center font-mono">Primary</p>
                                    </div>
                                    <div class="space-y-2">
                                        <div
                                            class="w-20 h-20 rounded-2xl bg-neutral-800 dark:bg-neutral-200 shadow-lg" />
                                        <p class="text-xs text-center font-mono">Neutral</p>
                                    </div>
                                    <div class="space-y-2">
                                        <div
                                            class="w-20 h-20 rounded-2xl bg-white border border-default shadow-lg dark:bg-neutral-900" />
                                        <p class="text-xs text-center font-mono">Background</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h4 class="font-semibold mb-4 text-sm uppercase tracking-widest text-dimmed">
                                    Typography & Spacing
                                </h4>
                                <p class="text-sm">
                                    Our platform supports a dynamic typography system with a curated library of fonts
                                    including <span class="font-bold">Inter, Outfit, Roboto Slab, and Space
                                        Grotesk</span>. We maintain consistent 4, 8, 12, and 16 module spacing based on
                                    Tailwind's defaults for a perfectly balanced layout.
                                </p>
                            </div>
                        </div>
                    </DocsSection>

                    <USeparator />

                    <!-- Changelog -->
                    <DocsSection id="changelog" title="Changelog" icon="i-lucide-history">
                        <div class="space-y-8">
                            <DocsTimeline :items="visibleChangelogs">
                                <template #item="{ item, index }">
                                    <div :class="index > 0 ? 'opacity-60' : ''">
                                        <span class="text-xs font-mono text-neutral-500">{{
                                            item.date
                                        }}</span>
                                        <h5 class="font-bold mt-1">
                                            {{ item.version }} - {{ item.title }}
                                        </h5>
                                        <ul class="mt-2 space-y-1 list-disc list-inside text-sm text-neutral-500">
                                            <li v-for="change in item.changes" :key="change">
                                                {{ change }}
                                            </li>
                                        </ul>
                                    </div>
                                </template>
                            </DocsTimeline>

                            <div v-if="displayedCount < changelogItems.length" class="flex justify-start pt-4">
                                <UButton variant="soft" color="neutral" size="sm" icon="i-lucide-plus" @click="showMore"
                                    class="rounded-lg p-2">
                                    Show More
                                    <UBadge :label="'+' + (
                                        Math.min(5, changelogItems.length - displayedCount)
                                    )" variant="soft" size="sm" class="bg-primary/20" />
                                </UButton>
                            </div>
                            <div v-else-if="changelogItems.length > 5" class="flex justify-start pt-4">
                                <UButton label="Show Less" variant="soft" color="neutral" size="sm"
                                    icon="i-lucide-chevron-up" @click="displayedCount = 5" class="rounded-lg p-2" />
                            </div>
                        </div>
                    </DocsSection>
                </div>
            </div>
        </UContainer>
    </UPage>
</template>

<style scoped>
:global(html) {
    scroll-behavior: smooth;
}

.scroll-mt-24 {
    scroll-margin-top: 6rem;
}
</style>
