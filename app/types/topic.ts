export type LearningGoal = 'Mastery' | 'Overview' | 'Project Based' | 'Exam Prep'

export interface Topic {
    id: string
    title: string
    progress: number
    tag: string
    status: string
    lessons: string
    lastStudied: string // String for human-readable display
    lastStudiedAt: number // Timestamp for sorting
    icon: string
    isPinned: boolean
    learningGoal?: LearningGoal
}
