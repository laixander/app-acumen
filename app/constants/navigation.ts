import type { NavigationMenuItem } from '@nuxt/ui'

export const NAVIGATION_LINKS: NavigationMenuItem[][] = [
    [
        {
            label: 'App',
            type: 'label'
        },
        {
            label: 'Dashboard',
            icon: 'i-lucide-bar-chart-3',
            to: '/app/dashboard'
        },
        {
            label: 'New Topic',
            icon: 'i-lucide-circle-plus',
            to: '/app/new-topic'
        },
        {
            label: 'My Topics',
            icon: 'i-lucide-book-open',
            to: '/app/my-topics'
        },
        {
            label: 'Settings',
            icon: 'i-lucide-settings',
            to: '/app/settings'
        }
    ],
    [
        {
            label: 'Identity & Access',
            type: 'label'
        },
        {
            label: 'Users',
            icon: 'i-lucide-users',
            to: '/users'
        },
        {
            label: 'Roles & Permissions',
            icon: 'i-lucide-folder-lock',
            to: '/roles'
        },
        {
            label: 'Auth Settings',
            icon: 'i-lucide-user-check',
            to: '/authentication',
        },
        {
            label: 'SSO Integration',
            icon: 'i-lucide-shield-check',
            to: '/sso'
        }
    ],
    [
        {
            label: 'System Administration',
            type: 'label'
        },
        {
            label: 'Configuration',
            icon: 'i-lucide-settings',
            to: '/configuration',
            defaultOpen: false,
            type: 'trigger',
            children: [
                {
                    label: 'Notification Settings',
                    to: '/configuration/notification',
                    exact: true
                },
                {
                    label: 'Branding',
                    to: '/configuration/branding',
                    exact: true
                },
            ]
        },
        {
            label: 'Audit Logs',
            icon: 'i-lucide-scroll-text',
            to: '/audit'
        },
        {
            label: 'Purge Center',
            icon: 'i-lucide-trash-2',
            to: '/admin/purge'
        },
        {
            label: 'System Health',
            icon: 'i-lucide-monitor-check',
            to: '/system'
        }
    ],
    [
        {
            label: 'Demo Pages',
            type: 'label'
        },
        {
            label: 'Documentation',
            icon: 'i-lucide-book-open',
            to: '/documentation'
        },
        {
            label: 'User Manual',
            icon: 'i-lucide-book',
            to: '/user-manual'
        },
        {
            label: 'Landing Page',
            icon: 'i-lucide-globe',
            to: '/'
        },
        {
            label: 'UI Playground',
            icon: 'i-lucide-palette',
            to: '/ui'
        }
    ]
]
