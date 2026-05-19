import { ref, onMounted, onUnmounted } from 'vue'

export function useActiveScroll(elementsToObserve: string[], options = { rootMargin: '-10% 0px -70% 0px' }) {
    const activeSection = ref('')
    let observer: IntersectionObserver | null = null

    onMounted(() => {
        if (!elementsToObserve || elementsToObserve.length === 0) return
        
        setTimeout(() => {
            observer = new IntersectionObserver((entries) => {
                const intersecting = entries.filter(e => e.isIntersecting)
                const first = intersecting[0]
                if (first) {
                    activeSection.value = first.target.id
                } else if (window.scrollY < 100) {
                    activeSection.value = ''
                }
            }, options)
            
            elementsToObserve.forEach(id => {
                const el = document.getElementById(id)
                if (el) observer?.observe(el)
            })
        }, 200)
    })

    onUnmounted(() => {
        if (observer) observer.disconnect()
    })

    return {
        activeSection
    }
}
