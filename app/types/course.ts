export type LearningGoal = 'Deep Mastery' | 'Quick Overview' | 'Practical Application' | 'Exam Preparation' | 'Casual / Hobby'

export interface ExamInfo {
    name: string
    daysAway: number
}

export interface CourseStat {
    label: string
    value: string
    subtext: string
    icon: string
}

export interface SubCourseAnalysis {
    name: string
    progress: number
    color: string
}

export interface Course {
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
        coursesCount?: number
    }
    workspaceId?: string
    viewersCount?: number
    completedCount?: number
    examInfo?: ExamInfo
    stats?: CourseStat[]
    strongCourses?: SubCourseAnalysis[]
    weakCourses?: SubCourseAnalysis[]
    
    // Course Settings
    description?: string
    targetFinishDate?: number // Timestamp
    sessionsPerWeek?: number
    itemsPerWeek?: number
    notificationsEnabled?: boolean
}

export interface LessonOverview {
    id: string
    courseId: string
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

export interface LessonNote {
    id: string
    content: string
    createdAt: number
    isPinned?: boolean
}

export interface LessonContent {
    id: string
    courseId: string
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
    courseId: string
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
    courseId: string
    courseTitle: string
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
