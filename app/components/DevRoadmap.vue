<script setup lang="ts">
const props = defineProps<{
    open: boolean
}>()

const emit = defineEmits(['update:open'])

const isOpen = computed({
    get: () => props.open,
    set: (value) => emit('update:open', value)
})

const roadmapItems = [
    {
        category: 'Immediate Next Steps',
        tasks: [
            { id: 1, label: 'Hierarchy-Aware Widgets', description: 'Modify UI widgets to dynamically match the user hierarchy (Superadmin vs Org Admin).', status: 'todo', priority: 'high' },
            { id: 2, label: 'Advanced Admin Analytics', description: 'Update dashboard stats and graphs to integrate with the new Organizations and Plans modules.', status: 'todo', priority: 'high' },
            { id: 3, label: 'Hierarchy-Aware Audit Logs', description: 'Modify the audit logs page to filter and display data based on the user hierarchy.', status: 'todo', priority: 'high' },
            { id: 4, label: 'Audit Log Deep-Linking', description: 'Enable direct navigation from activity logs to the affected Org/Workspace.', status: 'todo', priority: 'medium' },
            { id: 5, label: 'Automated Threshold Alerts', description: 'Notify admins when an institution reaches 80% of their monthly token limit.', status: 'todo', priority: 'medium' }
        ]
    },
    {
        category: 'Core Architecture',
        tasks: [
            { id: 6, label: 'Database Migration', description: 'Move from localStorage to Supabase/PostgreSQL for multi-user sync.', status: 'todo', priority: 'high' },
            { id: 7, label: 'Real Authentication', description: 'Implement Supabase Auth or Clerk for secure institutional identity.', status: 'todo', priority: 'high' },
            { id: 8, label: 'File Ingestion Pipeline', description: 'Build actual PDF/Docx processing with AWS S3 storage.', status: 'todo', priority: 'medium' }
        ]
    },
    {
        category: 'AI Engine',
        tasks: [
            { id: 9, label: 'Live LLM Integration', description: 'Connect to Gemini 1.5 Pro or GPT-4o APIs for real-time analysis.', status: 'todo', priority: 'high' },
            { id: 10, label: 'Vector RAG Implementation', description: 'Setup Pinecone for topic knowledge embedding and retrieval.', status: 'todo', priority: 'medium' },
            { id: 11, label: 'Adaptive Pathfinding', description: 'Refine logic for dynamic lesson adjustment based on performance.', status: 'todo', priority: 'medium' }
        ]
    },
    {
        category: 'Commercial & Admin',
        tasks: [
            { id: 12, label: 'Stripe Integration', description: 'Connect billing tab to real Stripe Checkout and Portal.', status: 'todo', priority: 'high' },
            { id: 13, label: 'Activity Analytics', description: 'Replace mock charts with real usage data aggregation.', status: 'todo', priority: 'medium' },
            { id: 14, label: 'Email Service', description: 'Integrate Resend for member invitations and billing alerts.', status: 'todo', priority: 'low' }
        ]
    },
    {
        category: 'UI & UX Experience',
        tasks: [
            { id: 15, label: 'Member CRUD Logic', description: 'Enable Invite/Remove/Role actions in the Members tab.', status: 'todo', priority: 'high' },
            { id: 16, label: 'Interactive Onboarding', description: 'Build a guided tour for first-time learners and admins.', status: 'todo', priority: 'medium' },
            { id: 17, label: 'Mobile Optimization', description: 'Responsive audit for complex billing and analytics tables.', status: 'todo', priority: 'medium' },
            { id: 18, label: 'Accessibility Audit', description: 'Ensure full WCAG 2.1 compliance for all platform users.', status: 'todo', priority: 'low' }
        ]
    }
]

const getPriorityColor = (priority: string) => {
    switch (priority) {
        case 'high': return 'error'
        case 'medium': return 'warning'
        case 'low': return 'info'
        default: return 'neutral'
    }
}
</script>

<template>
    <USlideover v-model:open="isOpen" title="Product Roadmap"
        description="Transitioning Acumen from Prototype to Production.">
        <template #content>
            <div class="flex flex-col gap-8 p-6 h-full overflow-y-auto">
                <div v-for="section in roadmapItems" :key="section.category" class="flex flex-col gap-4">
                    <h4 class="text-xs font-black uppercase tracking-widest text-neutral-400 flex items-center gap-2">
                        <UIcon name="i-lucide-folder-kanban" class="text-primary-500" />
                        {{ section.category }}
                    </h4>

                    <div class="space-y-3">
                        <div v-for="task in section.tasks" :key="task.id"
                            class="p-4 rounded-xl border border-neutral-100 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm flex flex-col gap-2 transition-all hover:border-primary-500/30">
                            <div class="flex items-center justify-between">
                                <span class="font-bold text-sm text-neutral-900 dark:text-neutral-100">{{ task.label }}</span>
                                <UBadge :color="getPriorityColor(task.priority)" variant="soft" size="sm" class="uppercase text-[9px] font-black">
                                    {{ task.priority }}
                                </UBadge>
                            </div>
                            <p class="text-xs text-neutral-500 leading-relaxed">{{ task.description }}</p>
                            <div class="flex items-center gap-2 mt-1">
                                <div class="w-1.5 h-1.5 rounded-full bg-neutral-300 dark:bg-neutral-700 animate-pulse" />
                                <span class="text-[10px] text-neutral-400 font-mono uppercase tracking-tighter">Status: Pending Deployment</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="mt-auto pt-8 border-t border-neutral-100 dark:border-neutral-800">
                    <div class="p-4 rounded-xl bg-primary-50 dark:bg-primary-950/20 border border-primary-100 dark:border-primary-900/30 flex flex-col gap-2">
                        <div class="flex items-center gap-2 text-primary-600 dark:text-primary-400">
                            <UIcon name="i-lucide-rocket" />
                            <span class="text-xs font-bold uppercase tracking-wider">Ready for Launch?</span>
                        </div>
                        <p class="text-[10px] text-primary-700 dark:text-primary-300">
                            All core MVP features are complete in mock mode. Next phase involves cloud infrastructure deployment.
                        </p>
                    </div>
                </div>
            </div>
        </template>
    </USlideover>
</template>
