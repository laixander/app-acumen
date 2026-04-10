export interface DocsStep {
    icon: string
    title: string
    description: string
    variant?: 'solid' | 'outline'
}

export interface DocsTestimonial {
    name: string
    description: string
    avatar: string
    rating: number
    content: string
}

export interface TimelineItem {
    title: string
    description?: string
    status?: string
    [key: string]: any
}

export interface DocsSectionProps {
    title: string
    icon: string
    id?: string
}
