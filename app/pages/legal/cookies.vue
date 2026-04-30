<script setup lang="ts">
import {
  footerLinkGroups
} from '~/constants/landing'

definePageMeta({
  layout: 'guest'
})

useSeoMeta({
  title: 'Cookie Policy - Acumen',
  description: 'Cookie Policy for the Acumen AI-Assisted Learning Platform.'
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
        <h1 class="text-4xl font-bold tracking-tight text-neutral-900 dark:text-white mb-4">Cookie Policy</h1>
        <p class="text-lg text-neutral-600 dark:text-neutral-400">Last updated: April 30, 2026</p>
      </div>

      <div class="prose prose-neutral dark:prose-invert max-w-none space-y-8 text-neutral-600 dark:text-neutral-400">
        <section>
          <h2 class="text-2xl font-semibold text-neutral-900 dark:text-white mb-4">1. What Are Cookies?</h2>
          <p>Cookies are small text files that are stored on your computer or mobile device when you visit a website.
            The Acumen Platform uses cookies to ensure the website functions properly, remember your preferences, and
            help us understand how you use the platform.</p>
        </section>

        <section>
          <h2 class="text-2xl font-semibold text-neutral-900 dark:text-white mb-4">2. How We Use Cookies</h2>
          <p>We use cookies for the following purposes:</p>
          <div class="space-y-6 mt-4">
            <div>
              <h3 class="text-lg font-medium text-neutral-900 dark:text-white">Essential Cookies</h3>
              <p class="mt-1">These cookies are strictly necessary to provide you with services available through our
                platform and to use some of its features, such as secure login authentication and session management.
                Without these, the core features of the Learner Dashboard cannot function.</p>
            </div>

            <div>
              <h3 class="text-lg font-medium text-neutral-900 dark:text-white">Preference Cookies</h3>
              <p class="mt-1">These cookies allow our platform to remember choices you make when you use our website,
                such as remembering your color mode preference (Dark/Light theme) or your preferred typography settings.
              </p>
            </div>

            <div>
              <h3 class="text-lg font-medium text-neutral-900 dark:text-white">Analytics Cookies</h3>
              <p class="mt-1">These cookies are used to collect information about traffic to our platform and how users
                use our website. The information gathered does not identify any individual visitor. We use this
                information to improve our platform, monitor activity logs, and optimize the user experience.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 class="text-2xl font-semibold text-neutral-900 dark:text-white mb-4">3. Local Storage</h2>
          <p>In addition to traditional cookies, Acumen extensively uses your browser's Local Storage to save your
            learning data, offline progress, and AI topic generations locally on your device. This ensures a fast,
            responsive experience and protects your data privacy by keeping personal study progress entirely client-side
            when possible.</p>
        </section>

        <section>
          <h2 class="text-2xl font-semibold text-neutral-900 dark:text-white mb-4">4. Managing Your Cookies</h2>
          <p>You have the right to decide whether to accept or reject cookies. You can set or amend your web browser
            controls to accept or refuse cookies. If you choose to reject cookies, you may still use our website, though
            your access to some functionality and areas of our website (like secure login) may be restricted.</p>
        </section>

        <section>
          <h2 class="text-2xl font-semibold text-neutral-900 dark:text-white mb-4">5. Updates to This Policy</h2>
          <p>We may update this Cookie Policy from time to time in order to reflect changes to the cookies we use or for
            other operational, legal, or regulatory reasons. Please revisit this Cookie Policy regularly to stay
            informed about our use of cookies and related technologies.</p>
        </section>

        <section>
          <h2 class="text-2xl font-semibold text-neutral-900 dark:text-white mb-4">6. Contact Us</h2>
          <p>If you have any questions about our use of cookies or other technologies, please email us at
            privacy@acumen-app.dev.</p>
        </section>
      </div>
    </UContainer>
  </div>

  <DocsFooter icon-name="i-lucide-brain-circuit" icon-color="primary" app-name="LearnFast"
    app-description="AI-powered learning companion designed to identify your knowledge gaps and accelerate your mastery."
    :link-groups="footerLinkGroups" copyright-name="LearnFast" copyright-suffix="Built with ❤️ by Laix" />
</template>