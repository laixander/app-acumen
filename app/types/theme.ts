export type ThemeFont = 'font-sans' | 'font-inter' | 'font-lexend' | 'font-outfit' | 'font-jakarta' | 'font-poppins' | 'font-bricolage' | 'font-space' | 'font-roboto-slab' | 'font-manrope' | 'font-work-sans' | 'font-nunito' | 'font-open-sans' | 'font-arvo' | 'font-rokkitt' | 'font-space-mono' | 'font-sansation' | 'font-montserrat' | 'font-suse' | 'font-saira' | 'font-exo2' | 'font-oxanium' | 'font-racing'

export interface ThemeSettings {
    font: ThemeFont
    brandFont: ThemeFont
    brandWeight: string
    primary: string
    neutral: string
}
