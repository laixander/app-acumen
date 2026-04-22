<script setup lang="ts">
import { ref } from 'vue'

const aiModel = ref('gpt-4o')
const fallbackModel = ref('claude-3-5-sonnet')
const temperature = ref(0.7)
const maxTokens = ref(2048)
const reasoning = ref(true)
const safetyLevel = ref('moderate')
const vectorDb = ref('pinecone')
const storeConversations = ref(true)
const systemPrompt = ref('You are an expert tutor for LearnFast. Break down complex topics into easy-to-understand concepts and provide actionable examples. Always maintain an encouraging and supportive tone.')

const modelOptions = [
    { label: 'GPT-4 Omni', value: 'gpt-4o' },
    { label: 'GPT-4', value: 'gpt-4' },
    { label: 'GPT-3.5 Turbo', value: 'gpt-3.5-turbo' },
    { label: 'Claude 3.5 Sonnet', value: 'claude-3-5-sonnet' },
    { label: 'Claude 3 Opus', value: 'claude-3-opus' },
    { label: 'Gemini 1.5 Pro', value: 'gemini-1.5-pro' },
    { label: 'Llama 3 70B', value: 'llama-3' }
]

const safetyOptions = [
    { label: 'Strict (No mature content)', value: 'strict' },
    { label: 'Moderate (Standard filtering)', value: 'moderate' },
    { label: 'Lenient (Allow sensitive topics)', value: 'lenient' }
]
</script>
<template>
    <ContentPanel title="AI Configuration" container="4xl">
        <ContentHeading title="AI Configuration"
            description="Fine-tune the AI Engine models and response parameters to ensure high-quality learning outcomes." />

        <USeparator class="my-8" />

        <div class="flex flex-col space-y-8">
            <!-- Model Pipeline Settings -->
            <UPageCard title="Model Pipeline" description="Select and configure the core language
                        models and storage layers for the AI engine." variant="naked">
                <UPageCard variant="subtle">
                    <div
                        class="divide-y divide-default *:flex *:items-center *:not-last:pb-4 *:not-first:pt-4 *:gap-2 *:*:flex-1 *:*:not-first:flex">
                        <UFormField label="Primary AI Model"
                            description="Select the default model for generating lesson plans.">
                            <USelect v-model="aiModel" :items="modelOptions" class="max-w-md ml-auto" />
                        </UFormField>

                        <UFormField label="Fallback AI Model" description="Used if the primary model is unavailable.">
                            <USelect v-model="fallbackModel" :items="modelOptions" class="max-w-md ml-auto" />
                        </UFormField>

                        <UFormField label="Content Moderation" description="Set the strictness of the safety filters.">
                            <USelect v-model="safetyLevel" :items="safetyOptions" class="max-w-md ml-auto" />
                        </UFormField>

                        <UFormField label="Vector Database" description="Configure where embeddings are stored.">
                            <USelect v-model="vectorDb"
                                :items="[{ label: 'Pinecone', value: 'pinecone' }, { label: 'ChromaDB', value: 'chroma' }, { label: 'PgVector', value: 'pgvector' }]"
                                class="max-w-md ml-auto" />
                        </UFormField>
                    </div>
                </UPageCard>
            </UPageCard>

            <!-- Parameters and Behavior Settings -->
            <UPageCard title="Parameters & Behavior" description="Fine-tune the reasoning behavior, limits,
                        and the AI's core persona." variant="naked">
                <UPageCard variant="subtle">
                    <div
                        class="divide-y divide-default *:flex *:items-center *:not-last:pb-4 *:not-first:pt-4 *:gap-2 *:*:flex-1 *:*:not-first:flex">
                        <UFormField label="System Prompt / Persona"
                            description="Core instructions dictating the AI's teaching style.">
                            <UTextarea v-model="systemPrompt" :rows="4" class="w-full" />
                        </UFormField>

                        <UFormField label="Creativity/Temperature" description="Higher values make output more varied.">
                            <div class="flex items-center gap-4 w-full ml-auto">
                                <USlider v-model="temperature" :min="0" :max="1" :step="0.1" size="sm" />
                                <span class="text-sm font-medium w-8 text-right">{{ temperature }}</span>
                            </div>
                        </UFormField>

                        <UFormField label="Max Tokens Per Response"
                            description="Limit the length of generated lessons.">
                            <UInput v-model="maxTokens" type="number" class="max-w-md ml-auto" />
                        </UFormField>

                        <UFormField label="Enable Reasoning Engine"
                            description="Allow AI to provide step-by-step logic for complex problems.">
                            <USwitch v-model="reasoning" class="ml-auto justify-self-end" />
                        </UFormField>

                        <UFormField label="Store Conversations"
                            description="Archive chat logs for quality assurance and model fine-tuning.">
                            <USwitch v-model="storeConversations" class="ml-auto justify-self-end" />
                        </UFormField>
                    </div>
                </UPageCard>
            </UPageCard>
        </div>

        <div class="mt-8 flex justify-end gap-3">
            <UButton color="neutral" variant="soft">Discard Changes</UButton>
            <UButton color="neutral">Save Configuration</UButton>
        </div>
    </ContentPanel>
</template>