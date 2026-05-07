import type { NavigationMenuItem } from '@nuxt/ui'

export const APP_NAVIGATION_ITEMS: NavigationMenuItem[] = [
    {
        label: 'Dashboard',
        icon: 'i-lucide-bar-chart-3',
        to: '/app/dashboard'
    },
    // {
    //     label: 'New Topic',
    //     icon: 'i-lucide-circle-plus',
    //     to: '/app/topics/new'
    // },
    {
        label: 'Topics',
        icon: 'i-lucide-book-open',
        children: [
            {
                label: 'Collection',
                description: 'View and manage all your topics',
                icon: 'i-lucide-folder-open',
                to: '/app/topics/collection'
            },
            {
                label: 'New Topic',
                description: 'Create a new topic and modules',
                icon: 'i-lucide-circle-plus',
                to: '/app/topics/new'
            }
        ]
    },
    {
        label: 'Activity Logs',
        icon: 'i-lucide-clipboard-list',
        to: '/app/activity'
    },
    // {
    //     label: 'Settings',
    //     icon: 'i-lucide-settings',
    //     to: '/app/settings'
    // }
]

// export const IDENTITY_ACCESS_NAVIGATION_ITEMS: NavigationMenuItem[] = [
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
// ]

// export const SYSTEM_ADMIN_NAVIGATION_ITEMS: NavigationMenuItem[] = [
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
// ]

export const DEMO_NAVIGATION_ITEMS: NavigationMenuItem[] = [
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

export const ADMIN_NAVIGATION_ITEMS: NavigationMenuItem[] = [
    {
        label: 'Administration',
        type: 'label'
    },
    {
        label: 'Dashboard',
        icon: 'i-lucide-line-chart',
        to: '/admin/dashboard'
    },
    {
        label: 'Accounts',
        icon: 'i-lucide-shield-check',
        to: '/admin/accounts'
    },
    {
        label: 'AI Configuration',
        icon: 'i-lucide-settings-2',
        to: '/admin/ai-configuration'
    },
]

export const NAVIGATION_LINKS: NavigationMenuItem[][] = [
    APP_NAVIGATION_ITEMS,
    // IDENTITY_ACCESS_NAVIGATION_ITEMS,
    // SYSTEM_ADMIN_NAVIGATION_ITEMS,
    ADMIN_NAVIGATION_ITEMS,
    DEMO_NAVIGATION_ITEMS
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
