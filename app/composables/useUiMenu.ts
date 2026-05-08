import type { NavigationMenuItem } from '@nuxt/ui'
import { UI_MENU_SECTIONS } from '~/constants/navigation'

export const useUiMenu = () => {
    const activeSection = useState('ui-active-section', () => 'typography')

    const sections = computed<NavigationMenuItem[]>(() =>
        UI_MENU_SECTIONS.map((group) => ({
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
