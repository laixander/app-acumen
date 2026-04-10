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
    // [
    //     {
    //         label: 'Identity & Access',
    //         type: 'label'
    //     },
    //     {
    //         label: 'Users',
    //         icon: 'i-lucide-users',
    //         to: '/users'
    //     },
    //     {
    //         label: 'Roles & Permissions',
    //         icon: 'i-lucide-folder-lock',
    //         to: '/roles'
    //     },
    //     {
    //         label: 'Auth Settings',
    //         icon: 'i-lucide-user-check',
    //         to: '/authentication',
    //     },
    //     {
    //         label: 'SSO Integration',
    //         icon: 'i-lucide-shield-check',
    //         to: '/sso'
    //     }
    // ],
    // [
    //     {
    //         label: 'System Administration',
    //         type: 'label'
    //     },
    //     {
    //         label: 'Configuration',
    //         icon: 'i-lucide-settings',
    //         to: '/configuration',
    //         defaultOpen: false,
    //         type: 'trigger',
    //         children: [
    //             {
    //                 label: 'Notification Settings',
    //                 to: '/configuration/notification',
    //                 exact: true
    //             },
    //             {
    //                 label: 'Branding',
    //                 to: '/configuration/branding',
    //                 exact: true
    //             },
    //         ]
    //     },
    //     {
    //         label: 'Audit Logs',
    //         icon: 'i-lucide-scroll-text',
    //         to: '/audit'
    //     },
    //     {
    //         label: 'Purge Center',
    //         icon: 'i-lucide-trash-2',
    //         to: '/admin/purge'
    //     },
    //     {
    //         label: 'System Health',
    //         icon: 'i-lucide-monitor-check',
    //         to: '/system'
    //     }
    // ],
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
            label: 'Login Page',
            icon: 'i-lucide-log-in',
            to: '/login'
        },
        {
            label: 'Sign Up Page',
            icon: 'i-lucide-user-plus',
            to: '/signup'
        },
        {
            label: 'UI Playground',
            icon: 'i-lucide-palette',
            to: '/ui'
        }
    ]
]

export const DOCS_MENU_SECTIONS = [
    {
        label: 'Quick Guide',
        icon: 'i-lucide-book-open',
        to: '/docs',
        defaultOpen: true,
        type: 'trigger' as const,
        children: [
            { to: '#overview', label: 'Platform Overview', exact: true, sectionId: 'overview' },
            { to: '#architecture', label: 'System Architecture', exact: true, sectionId: 'architecture' },
            { to: '#modules', label: 'Module Reference', exact: true, sectionId: 'modules' },
            { to: '#data-models', label: 'Data Models & Schema', exact: true, sectionId: 'data-models' },
            { to: '#workflow', label: 'Workflow', exact: true, sectionId: 'workflow' },
            { to: '#api', label: 'API Reference', exact: true, sectionId: 'api' },
            { to: '#design', label: 'Design System', exact: true, sectionId: 'design' },
            { to: '#changelog', label: 'Changelog', exact: true, sectionId: 'changelog' },
        ],
    },
]

export const MANUAL_MENU_SECTIONS = [
    {
        label: 'User Roles',
        icon: 'i-lucide-users',
        to: '/manual',
        defaultOpen: true,
        type: 'trigger' as const,
        children: [
            { to: '#learner', label: 'Learner', exact: true, sectionId: 'learner' },
            { to: '#ai-engine', label: 'AI Learning Engine', exact: true, sectionId: 'ai-engine' },
            { to: '#administrator', label: 'Administrator', exact: true, sectionId: 'administrator' },
        ],
    },
]
