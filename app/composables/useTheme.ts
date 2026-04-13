import { useToast } from '#ui/composables/useToast'
import type { ThemeSettings, ThemeFont } from '~/types/theme'

// Font options
export const fontOptions = [
    // { label: 'Geist (Default)', value: 'font-sans' },
    // { label: 'Inter', value: 'font-inter' },
    // { label: 'Lexend', value: 'font-lexend' },
    // { label: 'Outfit', value: 'font-outfit' },
    // { label: 'Jakarta', value: 'font-jakarta' },
    // { label: 'Poppins', value: 'font-poppins' },
    // { label: 'Bricolage', value: 'font-bricolage' },
    // { label: 'Space Grotesk', value: 'font-space' },
    // { label: 'Roboto Slab', value: 'font-roboto-slab' },
    // { label: 'Manrope', value: 'font-manrope' },
    // { label: 'Work Sans', value: 'font-work-sans' },
    // { label: 'Nunito', value: 'font-nunito' },
    // { label: 'Open Sans', value: 'font-open-sans' },
    // { label: 'Arvo', value: 'font-arvo' },
    // { label: 'Rokkitt', value: 'font-rokkitt' },
    // { label: 'Space Mono', value: 'font-space-mono' },
    // { label: 'Sansation', value: 'font-sansation' },
    // { label: 'Montserrat', value: 'font-montserrat' },
    // { label: 'SUSE', value: 'font-suse' },
    { label: 'Saira', value: 'font-saira' },
    // { label: 'Exo 2', value: 'font-exo2' },
    // { label: 'Oxanium', value: 'font-oxanium' },
    { label: 'Racing Sans', value: 'font-racing' },
]

export const brandFontOptions = fontOptions

export const fontWeightOptions = [
    { label: 'Thin (100)', value: 'font-thin' },
    { label: 'Light (300)', value: 'font-light' },
    { label: 'Normal (400)', value: 'font-normal' },
    { label: 'Medium (500)', value: 'font-medium' },
    { label: 'Semibold (600)', value: 'font-semibold' },
    { label: 'Bold (700)', value: 'font-bold' },
    { label: 'Extra Bold (800)', value: 'font-extrabold' },
    { label: 'Black (900)', value: 'font-black' },
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
        brandFont: 'font-racing',
        brandWeight: 'font-normal',
        primary: appConfig.ui.colors?.primary || 'blue',
        neutral: appConfig.ui.colors?.neutral || 'slate'
    }))


    const applyFont = (font: ThemeFont, type: 'body' | 'brand' = 'body') => {
        if (!import.meta.client) return
        const root = document.documentElement

        if (type === 'body') {
            // Remove all possible body font classes
            const fontClasses = fontOptions.map(opt => opt.value)
            root.classList.remove(...fontClasses)
            // Add the selected font class
            root.classList.add(font)
        } else {
            // Remove all possible brand font classes
            const brandClasses = fontOptions.map(opt => `brand-${opt.value}`)
            root.classList.remove(...brandClasses)
            // Add the selected brand font class
            root.classList.add(`brand-${font}`)
        }
    }

    const applyColors = (primary: string, neutral: string) => {
        if (appConfig.ui.colors) {
            appConfig.ui.colors.primary = primary
            appConfig.ui.colors.neutral = neutral
        }
    }

    const applyWeight = (weight: string) => {
        if (!import.meta.client) return
        const root = document.documentElement
        const weightClasses = fontWeightOptions.map(opt => `brand-${opt.value}`)
        root.classList.remove(...weightClasses)
        root.classList.add(`brand-${weight}`)
    }

    const save = () => {
        if (import.meta.client) {
            localStorage.setItem('theme-settings', JSON.stringify(theme.value))
        }
    }


    const setFont = (font: ThemeFont) => {
        theme.value.font = font
        applyFont(font, 'body')
        save()
    }

    const setBrandFont = (font: ThemeFont) => {
        theme.value.brandFont = font
        applyFont(font, 'brand')
        save()
    }

    const setBrandWeight = (weight: string) => {
        theme.value.brandWeight = weight
        applyWeight(weight)
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
        applyFont(theme.value.font, 'body')
        applyFont(theme.value.brandFont, 'brand')
        applyWeight(theme.value.brandWeight)
        applyColors(theme.value.primary, theme.value.neutral)
    }

    const resetTheme = () => {
        setFont('font-sans')
        setBrandFont('font-racing')
        setBrandWeight('font-normal')
        setPrimary('lime')
        setNeutral('stone')
        colorMode.preference = 'system'
        toast.add({ title: 'Branding Reset', color: 'info' })
    }

    return {
        theme,
        setFont,
        setBrandFont,
        setBrandWeight,
        setPrimary,
        setNeutral,
        initTheme,
        resetTheme,
        colorMode
    }
}
