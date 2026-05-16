// Composable for persisting onboarding draft to localStorage
// Used by: /start page (write), signup.vue (read), /app/topics/new (consume)

export interface OnboardingDraft {
    mode: 'upload' | 'explore' | 'prompt' | null
    topic: string            // subject name / prompt text / first filename
    files: string[]          // filenames only (actual upload deferred to post-signup)
    assessmentAnswers: string[]
    score: number
    quizComplete: boolean
    createdAt: number
}

const DRAFT_KEY = 'acumen_onboarding_draft'

export const useOnboardingDraft = () => {
    const read = (): OnboardingDraft | null => {
        if (!import.meta.client) return null
        try {
            const raw = localStorage.getItem(DRAFT_KEY)
            return raw ? JSON.parse(raw) : null
        } catch {
            return null
        }
    }

    const write = (draft: Partial<OnboardingDraft>) => {
        if (!import.meta.client) return
        const existing = read() ?? {
            mode: null, topic: '', files: [],
            assessmentAnswers: [], score: 0,
            quizComplete: false, createdAt: Date.now()
        }
        localStorage.setItem(DRAFT_KEY, JSON.stringify({ ...existing, ...draft }))
    }

    const clear = () => {
        if (!import.meta.client) return
        localStorage.removeItem(DRAFT_KEY)
    }

    const exists = () => !!read()

    return { read, write, clear, exists }
}
