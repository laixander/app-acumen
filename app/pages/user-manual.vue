<script setup lang="ts">
const appConfig = useAppConfig()

definePageMeta({
    layout: "landing",
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
                            A comprehensive, step-by-step reference describing what each role does within the Learn Fast AI-Assisted Learning Platform.
                        </p>
                    </div>

                    <!-- Learner -->
                    <DocsSection id="learner" title="Learner" icon="i-lucide-user">
                        <p class="text-lg text-dimmed leading-relaxed mb-6">
                            As a Learner, you are the primary user of the platform. Your goal is to master new topics efficiently through AI-guided adaptive paths.
                        </p>
                        
                        <div class="space-y-6">
                            <DocsTimeline 
                                :items="[
                                    { title: 'Topic Definition', description: 'Create a new topic by providing a title, description, and uploading study materials (PDFs, text files). Set your expected learning duration and availability.', status: 'Step 1' },
                                    { title: 'Initial Assessment', description: 'Complete the AI-generated diagnostic test. Use the confidence slider for each answer to help the AI understand where you feel uncertain.', status: 'Step 2' },
                                    { title: 'Follow Lesson Plan', description: 'Navigate through your personalized, timeline-style lesson plan. Focus on the core concepts identified for improvement.', status: 'Step 3' },
                                    { title: 'Interactive Learning', description: 'Utilize the AI Tutor for real-time clarifications. Complete exercises and lessons at your own pace.', status: 'Step 4' },
                                    { title: 'Mastery Verification', description: 'Take the final assessment to verify your mastery of the topic. The AI will either mark the topic complete or suggest additional review steps.', status: 'Step 5' }
                                ]" 
                            />
                        </div>
                    </DocsSection>

                    <USeparator />

                    <!-- AI Learning Engine -->
                    <DocsSection id="ai-engine" title="AI Learning Engine" icon="i-lucide-sparkles">
                        <p class="text-lg text-dimmed leading-relaxed mb-6">
                            The AI Learning Engine acts as your personal tutor, processing data and adapting the learning environment to your needs in the background.
                        </p>

                        <div class="space-y-6">
                            <DocsTimeline 
                                :items="[
                                    { title: 'Material Processing', description: 'The engine parses uploaded documents using NLP to identify key learning objectives and extract relevant context snippets.', status: 'Phase 1' },
                                    { title: 'Assessment Generation', description: 'Based on the extracted material, the AI generates a balanced set of questions covering all core objectives of the topic.', status: 'Phase 2' },
                                    { title: 'Path Adaptation', description: 'After you complete the diagnostic, the AI analyzes your score and confidence levels to build a non-linear, adaptive lesson path.', status: 'Phase 3' },
                                    { title: 'Real-time Tutoring', description: 'The AI monitors your progress within lessons, providing hints and simplified explanations when it detects struggles.', status: 'Phase 4' }
                                ]" 
                            />
                        </div>
                    </DocsSection>

                    <USeparator />

                    <!-- Administrator (Optional) -->
                    <DocsSection id="administrator" title="Administrator" icon="i-lucide-shield-check">
                        <p class="text-lg text-dimmed leading-relaxed mb-6">
                            The Administrator role focuses on system-wide configurations and overall platform health metrics.
                        </p>

                        <div class="space-y-6">
                            <DocsTimeline 
                                :items="[
                                    { title: 'User Management', description: 'Oversee user accounts, manage subscriptions, and provide technical support to learners.', status: 'Task 1' },
                                    { title: 'AI Configuration', description: 'Fine-tune the AI Engine models and response parameters to ensure high-quality learning outcomes.', status: 'Task 2' },
                                    { title: 'Analytics Review', description: 'Analyze aggregated learning data to identify platform-wide trends and improve material ingestion benchmarks.', status: 'Task 3' }
                                ]" 
                            />
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
