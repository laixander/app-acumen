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
        root: 'group/sidebar w-auto divide-y divide-neutral-200 dark:divide-neutral-800 bg-elevated/25',

        // this force the navigation to be 200px wide when not collapsed
        // and 64px when collapsed
        body: 'after:content-[""] after:block after:w-[200px] group-data-[collapsed=true]/sidebar:after:hidden'
    }

    return {
        uiAuthForm,
        uiNavigation,
        uiDashboardSidebar
    }
}
