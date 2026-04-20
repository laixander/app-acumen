<script setup lang="ts">
import { useTheme } from '~/composables/useTheme'
import { useUser } from '~/composables/useUser'
import { useTopics } from '~/composables/useTopics'
import { useLessons } from '~/composables/useLessons'
import { useActivityLogs } from '~/composables/useActivityLogs'
import { useDashboard } from '~/composables/useDashboard'

const { initTheme } = useTheme()
const { initUser } = useUser()
const { initTopics } = useTopics()
const { initLessons } = useLessons()
const { initActivityLogs } = useActivityLogs()
const { initDashboard } = useDashboard()

onMounted(() => {
    initTheme()
    initUser()
    initTopics()
    initLessons()
    initActivityLogs()
    initDashboard()
})
</script>

<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
