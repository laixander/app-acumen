export type LearningGoal = 'Mastery' | 'Overview' | 'Project Based' | 'Exam Prep'

export interface ExamInfo {
    name: string
    daysAway: number
}

export interface TopicStat {
    label: string
    value: string
    subtext: string
    icon: string
}

export interface SubTopicAnalysis {
    name: string
    progress: number
    color: string
}

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
    createdBy?: {
        id: string
        name: string
        avatar?: string
        role: string
        topicsCount?: number
    }
    workspaceId?: string
    viewersCount?: number
    completedCount?: number
    examInfo?: ExamInfo
    stats?: TopicStat[]
    strongTopics?: SubTopicAnalysis[]
    weakTopics?: SubTopicAnalysis[]
}

export interface LessonOverview {
    id: string
    topicId: string
    title: string
    duration: string
    status: 'completed' | 'current' | 'locked'
    type: string
    icon: string
    color: string
    summary: string
    assessmentId?: string
}

export interface LessonSection {
    title: string
    content: string
    aiInsight: string | null
}

export interface LessonContent {
    id: string
    topicId: string
    title: string
    description: string
    sections: LessonSection[]
    assessmentId?: string
    lessonTypes: string[]
}

export interface AssessmentOption {
    id: string
    label: string
}

export interface AssessmentQuestion {
    id: string | number
    text: string
    type?: 'multiple_choice' | 'true_false'
    options: AssessmentOption[]
    correct: string
}

export interface Assessment {
    id: string
    lessonId: string
    topicId: string
    title: string
    questions: AssessmentQuestion[]
    completionSummary?: string
    whatYouDidWell?: string
    whereYouStruggled?: string
    passProbBefore?: string
    passProbAfter?: string
    aiFinalComment?: string
}

export interface ActivityLog {
    id: string
    topicId: string
    topicTitle: string
    lessonId: string
    lessonTitle: string
    type: 'Lesson' | 'Assessment' | 'Review'
    durationMinutes: number
    completedAt: number
}

export interface SessionLog {
    id: string
    action: string
    device: string
    location?: string
    status: 'Success' | 'Failed' | 'Warning'
    timestamp: number
}
