<script setup lang="ts">
const { activeSection, sections } = useDocsMenu();

const appConfig = useAppConfig()

definePageMeta({
    layout: 'landing',
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

const apiEndpoints = [
    {
        method: "POST",
        path: "/api/auth/login",
        description: "Securely authenticate users and retrieve access tokens.",
    },
    {
        method: "GET",
        path: "/api/topics",
        description: "List all active and completed learning topics for the user.",
    },
    {
        method: "POST",
        path: "/api/topics",
        description: "Create a new topic with title, description, and learning material URLs.",
    },
    {
        method: "GET",
        path: "/api/assessments/:id",
        description: "Fetch an AI-generated assessment for a specific topic.",
    },
    {
        method: "POST",
        path: "/api/assessments/:id/submit",
        description: "Submit assessment answers along with confidence levels for path adaptation.",
    },
    {
        method: "GET",
        path: "/api/lessons/:topicId",
        description: "Retrieve the personalized, ordered lesson plan built by the AI Engine.",
    },
];

const dataModels = [
    {
        name: "User",
        fields: "id, name, email, createdAt, updatedAt",
    },
    {
        name: "Topic",
        fields: "id, user_id, title, description, duration, availability, status",
    },
    {
        name: "Material",
        fields: "id, topic_id, file_url, type, processedAt",
    },
    {
        name: "Assessment",
        fields: "id, topic_id, type, score, adaptivePathId",
    },
    {
        name: "Question",
        fields: "id, assessment_id, question_text, context_snippet",
    },
    {
        name: "Answer",
        fields: "id, question_id, answer_text, confidence_level, is_correct",
    },
    {
        name: "Lesson",
        fields: "id, topic_id, title, order, content, status",
    },
];

const workflowSteps = [
    {
        title: "Topic Creation",
        description: "Learner defines a topic, uploads study materials, and sets expected duration.",
        status: "Setup",
    },
    {
        title: "AI Analysis",
        description: "AI Engine processes materials (PDF, Text) to extract key concepts and learning objectives.",
        status: "Processing",
    },
    {
        title: "Initial Assessment",
        description: "User takes a diagnostic test. Confidence levels for each answer determine knowledge gaps.",
        status: "Diagnostic",
    },
    {
        title: "Lesson Planning",
        description: "AI builds a non-linear, adaptive lesson path focusing on weak areas identified in assessment.",
        status: "Personalization",
    },
    {
        title: "Active Learning",
        description: "Learner follows the generated timeline, completing lessons with real-time AI assistance.",
        status: "Learning",
    },
    {
        title: "Verification",
        description: "Final assessment verifies mastery. Topic is marked complete or path is adjusted.",
        status: "Complete",
    },
];

const changelogItems = [
    {
        date: "April 08, 2026",
        version: "v1.0.0",
        title: "Official Launch - Learn Fast Platform",
        changes: [
            "Complete rewrite of the core engine for better performance and scalability",
            "Introduced new modern UI design system based on Nuxt UI Pro patterns",
            "Implemented comprehensive Documentation and User Manual modules",
            "Enhanced Authentication flow with Mock Login for rapid prototyping",
            "Added real-time synchronization for learning activities",
            "Integrated system-wide Audit Logging and Activity tracking",
            "Standardized API endpoints and Data Models for enterprise use"
        ],
    }
];

const modules = [
    {
        name: "Learner Dashboard",
        desc: "Central hub for managing active topics, tracking progress, and daily schedules.",
        icon: "i-lucide-layout-dashboard",
    },
    {
        name: "Materials Processor",
        desc: "Automated pipeline that parses documents and prepares them for AI ingestion.",
        icon: "i-lucide-file-text",
    },
    {
        name: "AI Assessment Engine",
        desc: "Generates context-aware questions and analyzes confidence-based responses.",
        icon: "i-lucide-brain-circuit",
    },
    {
        name: "Adaptive Lesson Planner",
        desc: "Dynamic scheduler that adjusts the learning path in real-time based on performance.",
        icon: "i-lucide-calendar-range",
    },
    {
        name: "Progress Analytics",
        desc: "Visualizes learning speed, mastery levels, and time-to-completion metrics.",
        icon: "i-lucide-bar-chart-high",
    },
    {
        name: "AI Tutor Chat",
        desc: "Interactive conversational layer for instant clarification during lessons.",
        icon: "i-lucide-message-square-quote",
    },
];

const techStack = [
    {
        name: "Nuxt 4",
        desc: "Full-stack framework for Vue.js",
        icon: "i-simple-icons-nuxtdotjs",
    },
    {
        name: "Tailwind CSS",
        desc: "Utility-first styling system",
        icon: "i-simple-icons-tailwindcss",
    },
    {
        name: "Nuxt UI",
        desc: "Ready-to-use premium components",
        icon: "i-lucide-component",
    },
    {
        name: "TypeScript",
        desc: "Type-safe development",
        icon: "i-simple-icons-typescript",
    },
];
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
                                    We use <span class="font-bold">Geist</span> as our primary
                                    font, with consistent 4, 8, 12, and 16 module spacing based on
                                    Tailwind's defaults.
                                </p>
                            </div>
                        </div>
                    </DocsSection>

                    <USeparator />

                    <!-- Changelog -->
                    <DocsSection id="changelog" title="Changelog" icon="i-lucide-history">
                        <DocsTimeline :items="changelogItems">
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
