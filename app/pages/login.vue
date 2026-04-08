<script setup lang="ts">
definePageMeta({
    layout: 'guest'
})
</script>
<template>
    <div class="fixed inset-0 flex justify-center items-center bg-elevated/50">
        <UPageCard class="w-full max-w-sm shadow-2xl rounded-3xl">
            <AuthForm />
        </UPageCard>
        <LoginFab />
    </div>
</template>