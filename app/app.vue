<script setup lang="ts">
import { useTheme } from '~/composables/useTheme'
import { useUser } from '~/composables/useUser'
import { useTopics } from '~/composables/useTopics'
import { useLessons } from '~/composables/useLessons'
import { useActivityLogs } from '~/composables/useActivityLogs'
import { useDashboard } from '~/composables/useDashboard'
import { generateMockOrganizations, generateMockAdminAccounts, generateMockPlans } from '~/utils/seeder'

const { initTheme } = useTheme()
const { initUser, user } = useUser()
const { initTopics } = useTopics()
const { initLessons } = useLessons()
const { initActivityLogs } = useActivityLogs()
const { initDashboard } = useDashboard()
const { initOrganizations } = useOrganizations()
const { initWorkspaces } = useWorkspaces()
const { initAdminAccounts } = useAdminAccounts()
const { initPlans } = usePlans()

useSeoMeta({
  title: 'Acumen - AI-Assisted Learning Platform',
  description: 'Accelerate Learning. Master Anything. Acumen is an intelligent AI-assisted platform designed for personalized tracking and adaptive pathfinding.',
  ogTitle: 'Acumen - AI-Assisted Learning Platform',
  ogDescription: 'Accelerate Learning. Master Anything. Acumen is an intelligent AI-assisted platform designed for personalized tracking and adaptive pathfinding.',
  twitterCard: 'summary_large_image',
})

onMounted(() => {
    initTheme()
    initUser()
    initTopics()
    initLessons()
    initActivityLogs()
    initDashboard()
    
    // Admin & Org Initialization
    const mockOrgs = generateMockOrganizations(user.value.profile)
    const mockAccounts = generateMockAdminAccounts()
    const mockPlans = generateMockPlans()

    initOrganizations(mockOrgs)
    initAdminAccounts(mockAccounts)
    initPlans(mockPlans)
    initWorkspaces()
})
</script>

<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
