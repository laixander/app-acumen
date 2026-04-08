<script setup lang="ts">
import type { AuthFormField } from '@nuxt/ui'
const { uiAuthForm } = useUiConfig()

const state = reactive({
    email: '',
    password: ''
})

const fields = ref<AuthFormField[]>([
    {
        name: 'email',
        type: 'text',
        label: 'Email',
        variant: 'soft',
        size: 'lg'
    },
    {
        name: 'password',
        type: 'password',
        label: 'Password',
        variant: 'soft',
        size: 'lg'
    }
])

function onSubmit() {
    navigateTo('/app')
}
</script>
<template>
    <UAuthForm 
        title="Welcome" 
        description="Enter your credentials to access your account." 
        :fields="fields"
        :state="state" 
        :submit="{ size: 'lg' }"
        :ui="uiAuthForm"
        @submit="onSubmit" 
    >
        <template #leading>
            <AppLogo name="i-lucide-brain-circuit" color="primary" size="lg" />
        </template>
        <template #footer>
            <UButton label="Forgot Password?" size="lg" color="neutral" variant="link" block @click="onSubmit" />
        </template>
    </UAuthForm>
</template>