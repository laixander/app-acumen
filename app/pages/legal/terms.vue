<script setup lang="ts">
import {
    footerLinkGroups
} from '~/constants/landing'

definePageMeta({
    layout: 'guest'
})

useSeoMeta({
    title: 'Terms of Service - Acumen',
    description: 'Terms of Service for the Acumen AI-Assisted Learning Platform.'
})
</script>

<template>
    <div class="relative py-16">
        <!-- Background Glow for Hero -->
        <div class="absolute -top-20 inset-x-0 h-64 bg-primary-500/10 blur-[120px] rounded-full pointer-events-none" />
        <div
            class="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]">
        </div>
        <UContainer class="max-w-4xl">
            <div class="mb-12">
                <h1 class="text-4xl font-bold tracking-tight text-neutral-900 dark:text-white mb-4">Terms of Service
                </h1>
                <p class="text-lg text-neutral-600 dark:text-neutral-400">Last updated: April 30, 2026</p>
            </div>

            <div
                class="prose prose-neutral dark:prose-invert max-w-none space-y-8 text-neutral-600 dark:text-neutral-400">
                <section>
                    <h2 class="text-2xl font-semibold text-neutral-900 dark:text-white mb-4">1. Acceptance of Terms</h2>
                    <p>By accessing and using the Acumen Platform ("Acumen", "we", "us", or "our"), you agree to be
                        bound by these Terms of Service. If you do not agree to these terms, please do not use our
                        services. The Acumen Platform provides AI-assisted learning tools, adaptive pathfinding, and
                        progress analytics.</p>
                </section>

                <section>
                    <h2 class="text-2xl font-semibold text-neutral-900 dark:text-white mb-4">2. AI-Generated Content
                    </h2>
                    <p>Acumen utilizes advanced Artificial Intelligence (AI) algorithms to analyze your uploaded study
                        materials, generate assessments, and dynamically craft personalized learning paths. You
                        acknowledge that:</p>
                    <ul class="list-disc pl-6 space-y-2 mt-4">
                        <li>AI-generated content, including summaries, lesson plans, and quiz questions, may
                            occasionally contain inaccuracies or incomplete information.</li>
                        <li>You should independently verify critical information, especially in academic or professional
                            contexts.</li>
                        <li>We do not guarantee that the AI will perfectly interpret every document format or subject
                            matter.</li>
                    </ul>
                </section>

                <section>
                    <h2 class="text-2xl font-semibold text-neutral-900 dark:text-white mb-4">3. User Responsibilities
                    </h2>
                    <p>When using Acumen, you agree to the following responsibilities:</p>
                    <ul class="list-disc pl-6 space-y-2 mt-4">
                        <li>You will only upload learning materials (such as PDFs, text, or links) for which you have
                            the legal right to use and process.</li>
                        <li>You will not use the platform to process explicit, unlawful, or highly sensitive
                            confidential information.</li>
                        <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
                    </ul>
                </section>

                <section>
                    <h2 class="text-2xl font-semibold text-neutral-900 dark:text-white mb-4">4. Intellectual Property
                    </h2>
                    <p>The platform, its original content, features, and functionality are owned by Acumen and are
                        protected by international copyright, trademark, patent, trade secret, and other intellectual
                        property or proprietary rights laws. Your uploaded materials remain your property, but you grant
                        Acumen a temporary license to process them solely for the purpose of generating your
                        personalized learning experience.</p>
                </section>

                <section>
                    <h2 class="text-2xl font-semibold text-neutral-900 dark:text-white mb-4">5. Limitation of Liability
                    </h2>
                    <p>In no event shall Acumen, nor its directors, employees, partners, agents, suppliers, or
                        affiliates, be liable for any indirect, incidental, special, consequential or punitive damages,
                        including without limitation, loss of profits, data, use, goodwill, or other intangible losses,
                        resulting from your access to or use of or inability to access or use the Service.</p>
                </section>

                <section>
                    <h2 class="text-2xl font-semibold text-neutral-900 dark:text-white mb-4">6. Changes to Terms</h2>
                    <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We
                        will provide reasonable notice of any significant changes. By continuing to access or use our
                        Service after those revisions become effective, you agree to be bound by the revised terms.</p>
                </section>

                <section>
                    <h2 class="text-2xl font-semibold text-neutral-900 dark:text-white mb-4">7. Contact Us</h2>
                    <p>If you have any questions about these Terms, please contact us at support@acumen-app.dev.</p>
                </section>
            </div>
        </UContainer>
    </div>
    <DocsFooter icon-name="i-lucide-brain-circuit" icon-color="primary" app-name="LearnFast"
        app-description="AI-powered learning companion designed to identify your knowledge gaps and accelerate your mastery."
        :link-groups="footerLinkGroups" copyright-name="LearnFast" copyright-suffix="Built with ❤️ by Laix" />
</template>