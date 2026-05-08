<script setup lang="ts">
import {
    learnerSteps,
    aiEnginePhases,
    administratorTasks,
    appWalkthrough,
} from "~/constants/user-manual";

const appConfig = useAppConfig()

definePageMeta({
    layout: "guest",
    showDocsMenu: true,
});

const { activeSection, sections } = useManualMenu();

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
                    <div class="space-y-4">
                        <h1 class="text-4xl font-extrabold tracking-tight">User Manual</h1>
                        <p class="text-lg text-muted max-w-2xl">
                            A comprehensive, step-by-step reference describing the end-to-end experience within the Acumen
                            AI-Assisted Learning Platform.
                        </p>
                    </div>

                    <!-- Full Walkthrough -->
                    <DocsSection id="walkthrough" title="Full App Walkthrough" icon="i-lucide-map">
                        <p class="text-lg text-dimmed leading-relaxed mb-6">
                            From initial organization setup to personalized knowledge mastery, here is the complete journey through the platform.
                        </p>

                        <div class="space-y-6">
                            <DocsTimeline :items="appWalkthrough">
                                <template #item="{ item }">
                                    <div class="flex flex-col gap-1">
                                        <div class="flex items-center gap-2 mb-1">
                                            <UIcon v-if="item.icon" :name="item.icon" class="text-primary-500 text-lg" />
                                            <h5 class="font-bold">{{ item.title }}</h5>
                                        </div>
                                        <p class="text-sm text-neutral-500 leading-relaxed">{{ item.description }}</p>
                                    </div>
                                </template>
                            </DocsTimeline>
                        </div>
                    </DocsSection>

                    <USeparator />

                    <!-- Learner -->
                    <DocsSection id="learner" title="Learner" icon="i-lucide-user">
                        <p class="text-lg text-dimmed leading-relaxed mb-6">
                            As a Learner, you are the primary user of the platform. Your goal is to master new topics
                            efficiently through AI-guided adaptive paths.
                        </p>

                        <div class="space-y-6">
                            <DocsTimeline :items="learnerSteps" />
                        </div>
                    </DocsSection>

                    <USeparator />

                    <!-- AI Learning Engine -->
                    <DocsSection id="ai-engine" title="AI Learning Engine" icon="i-lucide-sparkles">
                        <p class="text-lg text-dimmed leading-relaxed mb-6">
                            The AI Learning Engine acts as your personal tutor, processing data and adapting the
                            learning environment to your needs in the background.
                        </p>

                        <div class="space-y-6">
                            <DocsTimeline :items="aiEnginePhases" />
                        </div>
                    </DocsSection>

                    <USeparator />

                    <!-- Administrator (Optional) -->
                    <DocsSection id="administrator" title="Administrator" icon="i-lucide-shield-check">
                        <p class="text-lg text-dimmed leading-relaxed mb-6">
                            The Administrator role focuses on system-wide configurations and overall platform health
                            metrics.
                        </p>

                        <div class="space-y-6">
                            <DocsTimeline :items="administratorTasks" />
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
