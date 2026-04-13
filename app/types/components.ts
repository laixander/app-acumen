export interface FooterLink {
    label: string
    to: string
}

export interface FooterLinkGroup {
    title: string
    links: FooterLink[]
}

export interface MockRole {
    role: string
    label: string
    icon: string
    color: 'primary' | 'success' | 'warning' | 'error' | 'info' | 'secondary' | 'neutral'
    route: string
}

export interface AppLogoProps {
    name?: string
    icon: string
    theme: string
    color?: string
    size?: 'lg' | 'base'
    naked?: boolean
}

export interface ContentPanelProps {
    title: string
    noPadding?: boolean
}
