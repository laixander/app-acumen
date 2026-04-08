import type { NavigationMenuItem } from '@nuxt/ui'

export const useManualMenu = () => {
    const activeSection = useState('manual-active-section', () => 'administrator')

    const sections = computed<NavigationMenuItem[]>(() => [
        {
            label: 'User Roles',
            icon: 'i-lucide-users',
            to: '/manual',
            defaultOpen: true,
            type: 'trigger',
            children: [
                { to: '#learner', label: 'Learner', exact: true, active: activeSection.value === 'learner' },
                { to: '#ai-engine', label: 'AI Learning Engine', exact: true, active: activeSection.value === 'ai-engine' },
                { to: '#administrator', label: 'Administrator', exact: true, active: activeSection.value === 'administrator' },
            ]
        },
    ])

    return {
        activeSection,
        sections
    }
}
