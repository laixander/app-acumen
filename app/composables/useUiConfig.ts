export default function useUiConfig() {
    const uiAuthForm = {
        leading: 'w-full flex justify-center -mt-16 mb-10',
        title: 'text-2xl font-semibold',
        description: 'text-sm',
    }

    const uiNavigation = {
        root: 'gap-2',
        label: 'text-default uppercase tracking-widest py-2',
        link: 'p-2 gap-2 rounded-lg transition-colors'
    }

    const uiDashboardSidebar = {
        root: 'w-auto divide-y divide-neutral-200 dark:divide-neutral-800 bg-white dark:bg-neutral-900/50'
    }

    return {
        uiAuthForm,
        uiNavigation,
        uiDashboardSidebar
    }
}
