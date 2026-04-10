import type { NavigationMenuItem } from '@nuxt/ui'
import { MANUAL_MENU_SECTIONS } from '~/constants/navigation'

export const useManualMenu = () => {
    const activeSection = useState('manual-active-section', () => 'administrator')

    const sections = computed<NavigationMenuItem[]>(() =>
        MANUAL_MENU_SECTIONS.map((group) => ({
            ...group,
            children: group.children.map(({ sectionId, ...item }) => ({
                ...item,
                active: activeSection.value === sectionId,
            })),
        }))
    )

    return {
        activeSection,
        sections
    }
}
