<script setup lang="ts">
import {
    footerLinkGroups
} from '~/constants/landing'

definePageMeta({
    layout: 'guest'
})

useSeoMeta({
    title: 'Privacy Policy - Acumen',
    description: 'Privacy Policy for the Acumen AI-Assisted Learning Platform.'
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
                <h1 class="text-4xl font-bold tracking-tight text-neutral-900 dark:text-white mb-4">Privacy Policy</h1>
                <p class="text-lg text-neutral-600 dark:text-neutral-400">Last updated: April 30, 2026</p>
            </div>

            <div
                class="prose prose-neutral dark:prose-invert max-w-none space-y-8 text-neutral-600 dark:text-neutral-400">
                <section>
                    <h2 class="text-2xl font-semibold text-neutral-900 dark:text-white mb-4">1. Introduction</h2>
                    <p>Welcome to the Acumen AI-Assisted Learning Platform. We are deeply committed to protecting your
                        privacy and ensuring the security of the personal information and learning materials you entrust
                        to us. This policy outlines how we collect, use, process, and safeguard your data.</p>
                </section>

                <section>
                    <h2 class="text-2xl font-semibold text-neutral-900 dark:text-white mb-4">2. Information We Collect
                    </h2>
                    <p>To provide our personalized learning services, we collect the following types of information:</p>
                    <ul class="list-disc pl-6 space-y-2 mt-4">
                        <li><strong>Account Information:</strong> Name, email address, and authentication credentials
                            when you register.</li>
                        <li><strong>Learning Materials:</strong> Documents (PDFs, text files), notes, and links that you
                            upload to be processed by our AI Engine.</li>
                        <li><strong>Learning Data:</strong> Your assessment scores, confidence levels, learning paths,
                            and topic progress logs.</li>
                        <li><strong>Usage Data:</strong> Information about how you interact with our platform, including
                            diagnostic data and performance metrics.</li>
                    </ul>
                </section>

                <section>
                    <h2 class="text-2xl font-semibold text-neutral-900 dark:text-white mb-4">3. How We Use Your Data
                    </h2>
                    <p>Your data is strictly used to enhance your educational experience:</p>
                    <ul class="list-disc pl-6 space-y-2 mt-4">
                        <li><strong>AI Processing:</strong> We analyze your uploaded materials to generate context-aware
                            assessments, dynamic lesson plans, and daily quests.</li>
                        <li><strong>Personalization:</strong> We use your assessment scores and confidence ratings to
                            adapt your learning path and focus on knowledge gaps.</li>
                        <li><strong>Analytics:</strong> To provide you with visualizations of your learning speed and
                            mastery levels via the Learner Dashboard.</li>
                        <li><strong>Service Improvement:</strong> To train and improve our platform algorithms (data is
                            anonymized before being used for aggregate training).</li>
                    </ul>
                </section>

                <section>
                    <h2 class="text-2xl font-semibold text-neutral-900 dark:text-white mb-4">4. Third-Party AI
                        Processors</h2>
                    <p>To deliver advanced AI capabilities, Acumen utilizes secure third-party Large Language Models
                        (LLMs) and Vector Databases. When your documents are processed:</p>
                    <ul class="list-disc pl-6 space-y-2 mt-4">
                        <li>Only necessary text extracts are transmitted via secure, encrypted channels.</li>
                        <li>We have strict data processing agreements ensuring that third-party AI providers do not use
                            your personal learning materials to train their public models.</li>
                    </ul>
                </section>

                <section>
                    <h2 class="text-2xl font-semibold text-neutral-900 dark:text-white mb-4">5. Data Retention &
                        Deletion</h2>
                    <p>We retain your personal data and learning history only for as long as your account is active or
                        as needed to provide you services. You have the right to request the complete deletion of your
                        account and associated data at any time via the User Settings panel.</p>
                </section>

                <section>
                    <h2 class="text-2xl font-semibold text-neutral-900 dark:text-white mb-4">6. Data Security</h2>
                    <p>We implement industry-standard security measures, including encryption at rest and in transit, to
                        protect your data from unauthorized access, alteration, or disclosure. However, no method of
                        transmission over the Internet is 100% secure.</p>
                </section>

                <section>
                    <h2 class="text-2xl font-semibold text-neutral-900 dark:text-white mb-4">7. Contact Us</h2>
                    <p>For any privacy-related concerns or to exercise your data rights, please contact our Data
                        Protection Officer at privacy@acumen-app.dev.</p>
                </section>
            </div>
        </UContainer>
    </div>

    <DocsFooter icon-name="i-lucide-brain-circuit" icon-color="primary" app-name="LearnFast"
        app-description="AI-powered learning companion designed to identify your knowledge gaps and accelerate your mastery."
        :link-groups="footerLinkGroups" copyright-name="LearnFast" copyright-suffix="Built with ❤️ by Laix" />
</template>