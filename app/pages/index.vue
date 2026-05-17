<script setup lang="ts">
import { onMounted } from 'vue'
import {
    features,
    howItWorksSteps,
    pricings,
    testimonials,
    faqs,
    footerLinkGroups
} from '~/constants/landing'

definePageMeta({
    layout: 'guest'
})

const isContactModalOpen = ref(false)

const displayPricings = computed(() => pricings.map((plan: any) => {
    if (plan.title === 'Enterprise') {
        return {
            ...plan,
            button: {
                ...plan.button,
                to: undefined,
                onClick: () => { isContactModalOpen.value = true }
            }
        }
    }
    return plan
}))

onMounted(() => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.remove('opacity-0', 'translate-y-8')
                entry.target.classList.add('opacity-100', 'translate-y-0')
                observer.unobserve(entry.target)
            }
        })
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' })

    document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el))
})
</script>

<template>
    <div class="relative overflow-x-hidden">
        <div class="absolute -top-20 inset-x-0 h-64 bg-primary-500/10 blur-[120px] rounded-full pointer-events-none" />
        <div
            class="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]">
        </div>
        <!-- Hero Section -->
        <UPageHero class="reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700 ease-out"
            description="Upload your study materials, let AI identify your knowledge gaps, and get a personalized lesson plan that adapts to your confidence level."
            orientation="horizontal">
            <template #links>
                <div class="flex flex-wrap items-center gap-3 mt-2">
                    <!-- Primary CTA -->
                    <div class="relative group">
                        <span
                            class="absolute inset-0 rounded-full bg-primary-500/40 blur-sm scale-110 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                        <UButton to="/start" size="xl" color="primary" icon="i-lucide-zap"
                            class="px-6 py-4 relative font-semibold tracking-wide rounded-xl shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50 transition-all duration-300 hover:scale-[1.03]">
                            Start Learning Free
                        </UButton>
                    </div>
                    <!-- Secondary CTA -->
                    <UButton to="#how-it-works" size="xl" color="neutral" variant="ghost"
                        trailingIcon="i-lucide-chevron-down"
                        class="px-6 py-4 rounded-xl font-medium text-muted hover:text-default transition-colors duration-200">
                        See how it works
                    </UButton>
                </div>
            </template>
            <template #headline>
                <div class="mb-4">
                    <UBadge label="AI-Powered Learning" icon="i-lucide-sparkles" color="primary" variant="subtle"
                        class="rounded-full px-2.5 py-1.5 font-medium" />
                </div>
            </template>

            <template #title>
                Learn Smarter,<br /> <span class="text-primary">Not Harder</span>
            </template>

            <template #description>
                <p class="text-lg mb-8 max-w-xl">
                    Upload your study materials, let AI identify your knowledge gaps, and get a personalized lesson plan
                    that adapts to your confidence level.
                </p>
                <!-- <div class="flex items-center gap-x-6">
                    <UAvatarGroup>
                        <UAvatar v-for="i in 4" :key="i" :src="`https://i.pravatar.cc/128?u=${i}`"
                            icon="i-lucide-user" />
                    </UAvatarGroup>
                    <p class="text-sm text-toned font-medium">
                        Join 50,000+ learners studying smarter
                    </p>
                </div> -->
            </template>

            <template #default>
                <MockComponent />
            </template>
        </UPageHero>

        <!-- Features Section -->
        <UPageSection id="features" title="Everything You Need to Learn Faster"
            class="reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700 ease-out delay-100"
            description="Powered by AI, designed for students. Here's what makes our platform the ultimate study companion."
            :features="features" />

        <!-- How It Works -->
        <UPageSection id="how-it-works" title="How It Works"
            class="reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700 ease-out"
            description="Four simple steps to transform your learning experience.">
            <div class="relative mt-12 grid grid-cols-1 md:grid-cols-4 gap-8">
                <DocsSteps :items="howItWorksSteps" />
            </div>
        </UPageSection>

        <!-- Pricing Section -->
        <UPageSection id="pricing" title="Simple, Transparent Pricing"
            class="reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700 ease-out"
            description="No hidden fees, cancel anytime. Choose the plan that suits you best.">
            <UPricingPlans scale :plans="displayPricings" />
        </UPageSection>

        <!-- Testimonials Section -->
        <UPageSection id="testimonials" title="Loved by Learners"
            class="reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700 ease-out"
            description="Join thousands mastering their subjects faster with our AI-powered approach.">
            <div class="grid grid-cols-1 md:grid-cols-3 mt-8 gap-8">
                <DocsTestimonials v-for="(testimonial, index) in testimonials" :key="index" :name="testimonial.name"
                    :description="testimonial.description" :avatar="testimonial.avatar" :rating="testimonial.rating"
                    :content="testimonial.content" />
            </div>
        </UPageSection>

        <!-- FAQ Section -->
        <UPageSection id="faq" title="Frequently Asked Questions"
            class="reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700 ease-out"
            description="Everything you need to know about the product and billing.">
            <UAccordion :items="faqs"
                :ui="{ root: 'space-y-4 sm:max-w-3xl mx-auto', item: 'border last:border-b rounded-lg', trigger: 'px-6 py-4', body: 'px-6 pb-4', content: 'text-muted', label: 'text-base font-semibold' }" />
        </UPageSection>

        <!-- CTA Section -->
        <UPageSection class="reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700 ease-out">
            <UPageCTA variant="solid" class="dark:bg-neutral-950/50" :links="[{
                label: 'Start Learning for Free',
                to: '/signup',
                size: 'xl',
                trailingIcon: 'i-lucide-arrow-right'
            }]" :ui="{
                title: 'text-white'
            }">
                <template #title>
                    Ready to Transform Your Learning?
                </template>
                <template #description>
                    Join thousands of students who are learning faster, retaining more, and spending less time stressing
                    over exams.
                </template>
                <template #links>
                    <!-- Primary CTA -->
                    <div class="relative group">
                        <span
                            class="absolute inset-0 rounded-full bg-primary-500/40 blur-sm scale-110 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                        <UButton to="/start" size="xl" color="primary" icon="i-lucide-zap"
                            class="px-6 py-4 relative font-semibold tracking-wide rounded-xl shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50 transition-all duration-300 hover:scale-[1.03]">
                            Start Learning Free
                        </UButton>
                    </div>
                </template>
            </UPageCTA>
        </UPageSection>

        <DocsFooter icon-name="i-lucide-brain-circuit" icon-color="primary" app-name="LearnFast"
            app-description="AI-powered learning companion designed to identify your knowledge gaps and accelerate your mastery."
            :link-groups="footerLinkGroups" copyright-name="LearnFast" copyright-suffix="Built with ❤️ by Laix" />

        <ContactSalesModal v-model:open="isContactModalOpen" />
    </div>
</template>
