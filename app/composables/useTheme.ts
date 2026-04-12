import { useToast } from '#ui/composables/useToast'
import type { ThemeSettings, ThemeFont } from '~/types/theme'

// Font options
export const fontOptions = [
    { label: 'Geist (Default)', value: 'font-sans' },
    { label: 'Inter', value: 'font-inter' },
    { label: 'Lexend', value: 'font-lexend' },
    { label: 'Outfit', value: 'font-outfit' },
    { label: 'Jakarta', value: 'font-jakarta' },
    { label: 'Poppins', value: 'font-poppins' },
    { label: 'Bricolage', value: 'font-bricolage' },
    { label: 'Space Grotesk', value: 'font-space' },
    { label: 'Roboto Slab', value: 'font-roboto-slab' },
    { label: 'Manrope', value: 'font-manrope' },
    { label: 'Work Sans', value: 'font-work-sans' },
    { label: 'Nunito', value: 'font-nunito' },
    { label: 'Open Sans', value: 'font-open-sans' },
    { label: 'Arvo', value: 'font-arvo' },
    { label: 'Rokkitt', value: 'font-rokkitt' },
    { label: 'Space Mono', value: 'font-space-mono' },
    { label: 'Sansation', value: 'font-sansation' },
    { label: 'Montserrat', value: 'font-montserrat' },
    { label: 'SUSE', value: 'font-suse' },
    { label: 'Saira', value: 'font-saira' },
    { label: 'Exo 2', value: 'font-exo2' },
    { label: 'Oxanium', value: 'font-oxanium' },
]

// Theme Options
export const primaryColors = [
    'blue', 'green', 'indigo', 'orange', 'pink', 'purple', 'red', 'teal', 'yellow',
    'cyan', 'emerald', 'fuchsia', 'lime', 'rose', 'sky', 'violet', 'amber'
].map(c => ({ label: c.charAt(0).toUpperCase() + c.slice(1), value: c }))

export const neutralColors = [
    'slate', 'zinc', 'stone', 'gray', 'neutral'
].map(c => ({ label: c.charAt(0).toUpperCase() + c.slice(1), value: c }))

export const useTheme = () => {
    const appConfig = useAppConfig()
    const toast = useToast()
    const colorMode = useColorMode()

    const theme = useState<ThemeSettings>('theme', () => ({
        font: 'font-sans',
        primary: appConfig.ui.colors?.primary || 'blue',
        neutral: appConfig.ui.colors?.neutral || 'slate'
    }))


    const applyFont = (font: ThemeFont) => {
        if (!import.meta.client) return
        const root = document.documentElement

        // Remove all possible font classes
        const fontClasses = fontOptions.map(opt => opt.value)
        root.classList.remove(...fontClasses)

        // Add the selected font class
        root.classList.add(font)
    }

    const applyColors = (primary: string, neutral: string) => {
        if (appConfig.ui.colors) {
            appConfig.ui.colors.primary = primary
            appConfig.ui.colors.neutral = neutral
        }
    }

    const save = () => {
        if (import.meta.client) {
            localStorage.setItem('theme-settings', JSON.stringify(theme.value))
        }
    }


    const setFont = (font: ThemeFont) => {
        theme.value.font = font
        applyFont(font)
        save()
    }

    const setPrimary = (color: string) => {
        theme.value.primary = color
        if (appConfig.ui.colors) appConfig.ui.colors.primary = color
        save()
    }

    const setNeutral = (color: string) => {
        theme.value.neutral = color
        if (appConfig.ui.colors) appConfig.ui.colors.neutral = color
        save()
    }

    const initTheme = () => {
        if (!import.meta.client) return

        const saved = localStorage.getItem('theme-settings')
        if (saved) {
            try {
                const parsed = JSON.parse(saved)
                Object.assign(theme.value, parsed)
            } catch (e) {
                console.error('Failed to parse theme settings', e)
            }
        }

        // Apply everything
        applyFont(theme.value.font)
        applyColors(theme.value.primary, theme.value.neutral)
    }

    const resetTheme = () => {
        setFont('font-sans')
        setPrimary('lime')
        setNeutral('stone')
        colorMode.preference = 'system'
        toast.add({ title: 'Branding Reset', color: 'info' })
    }

    return {
        theme,
        setFont,
        setPrimary,
        setNeutral,
        initTheme,
        resetTheme,
        colorMode
    }
}
