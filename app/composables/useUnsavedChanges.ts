/**
 * Global registry for "unsaved changes" state.
 *
 * Pages that contain in-progress forms register a getter via `registerUnsavedCheck`.
 * The WorkspaceMenu reads `hasUnsavedChanges` before switching workspaces and shows
 * a confirmation modal when it returns true.
 *
 * Each page is responsible for unregistering itself on unmount.
 */

type UnsavedCheckFn = () => boolean

const _checks = ref<UnsavedCheckFn[]>([])

export function useUnsavedChanges() {
    const hasUnsavedChanges = computed(() => _checks.value.some(fn => fn()))

    /**
     * Register a check function. Returns an unregister callback — call it in `onUnmounted`.
     */
    function registerUnsavedCheck(fn: UnsavedCheckFn): () => void {
        _checks.value.push(fn)
        return () => {
            _checks.value = _checks.value.filter(f => f !== fn)
        }
    }

    return { hasUnsavedChanges, registerUnsavedCheck }
}
