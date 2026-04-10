import type { NavigationMenuItem } from '@nuxt/ui'
import { DOCS_MENU_SECTIONS } from '~/constants/navigation'

export const useDocsMenu = () => {
    const activeSection = useState('docs-active-section', () => 'overview')

    const sections = computed<NavigationMenuItem[]>(() =>
        DOCS_MENU_SECTIONS.map((group) => ({
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
