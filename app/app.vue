<script setup lang="ts">
import { useTheme } from '~/composables/useTheme'







const { initTheme } = useTheme()
const userStore = useUserStore()
const courseStore = useCourseStore()
const lessonStore = useLessonStore()
const activityLogStore = useActivityLogStore()
const dashboardStore = useDashboardStore()
const organizationStore = useOrganizationStore()
const workspaceStore = useWorkspaceStore()
const adminAccountStore = useAdminAccountStore()
const planStore = usePlanStore()
const adminDashboardStore = useAdminDashboardStore()

useSeoMeta({
    title: 'Acumen - AI-Assisted Learning Platform',
    description: 'Accelerate Learning. Master Anything. Acumen is an intelligent AI-assisted platform designed for personalized tracking and adaptive pathfinding.',
    ogTitle: 'Acumen - AI-Assisted Learning Platform',
    ogDescription: 'Accelerate Learning. Master Anything. Acumen is an intelligent AI-assisted platform designed for personalized tracking and adaptive pathfinding.',
    twitterCard: 'summary_large_image',
})

onMounted(async () => {
    initTheme()
    
    if (!courseStore.hasInitializedSeed && courseStore.courses.length === 0) {
        const { seedCourses } = useSeeder()
        await seedCourses()
        courseStore.hasInitializedSeed = true
    }
})
</script>

<template>
    <UApp>
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
    </UApp>
</template>

<style>
@media (min-width: 768px) {
    html {
        scroll-behavior: smooth;
    }
}
</style>
