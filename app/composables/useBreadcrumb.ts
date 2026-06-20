import type { BreadcrumbItem } from '@nuxt/ui'

export function useBreadcrumb(options?: {
    basePath?: string      // segments to strip, e.g. 'app/dashboard'
    homeLabel?: string     // custom label for the root crumb
    homeIcon?: string
    homeTo?: string        // where the root crumb links to
}) {
    const route = useRoute()
    const pageMeta = computed(() => (route.meta.breadcrumb as Record<string, string>) ?? {})

    const {
        basePath = '',
        homeLabel = 'Home',
        homeIcon = 'i-lucide-house',
        homeTo = '/'
    } = options ?? {}

    // Normalize basePath into an array of segments to skip
    const baseSegments = basePath.split('/').filter(Boolean)

    const segmentToLabel = (segment: string): string => {
        if (pageMeta.value[segment]) return pageMeta.value[segment]
        return segment
            .replace(/[\[\]]/g, '')
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')
    }

    const items = computed<BreadcrumbItem[]>(() => {
        const allSegments = route.path.split('/').filter(Boolean)

        // Strip the base segments from the front
        const segments = allSegments.slice(baseSegments.length)

        const crumbs: BreadcrumbItem[] = [
            { label: homeLabel, icon: homeIcon, to: homeTo }
        ]

        segments.forEach((segment, index) => {
            // Build the full path including the base
            const to = '/' + [...baseSegments, ...segments.slice(0, index + 1)].join('/')
            const isLast = index === segments.length - 1
            const isDynamic = /^\d+$/.test(segment)
            const label = isDynamic
                ? (pageMeta.value.title ?? segment)
                : segmentToLabel(segment)

            crumbs.push({ label, to: isLast ? undefined : to })
        })

        return crumbs
    })

    return { items }
}