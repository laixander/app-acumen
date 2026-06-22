import type { AssessmentQuestion, SubCourseAnalysis } from './course'

export type SessionState = 'idle' | 'processing' | 'ready' | 'active' | 'complete' | 'plan'

export interface SessionProcessingLine {
    text: string
    delay: number
}

export interface SessionProcessingProps {
    lines: SessionProcessingLine[]
}

export interface SessionCompleteData {
    moduleTitle: string
    whatYouDidWell: string
    whereYouStruggled: string
    passProbBefore: string
    passProbAfter: string
    aiFinalComment: string
}

export interface SessionReadyProps {
    courseName: string
    moduleTitle: string
    difficulty: string
    duration: string
}

export interface SessionActiveProps {
    questions: AssessmentQuestion[]
    moduleTitle: string
}

export interface ReadyCardProps {
    label: string
    value: string
    icon?: string
}

export interface SessionReadinessPlanProps {
    weakestCourse?: SubCourseAnalysis
}

export interface SessionProbingReasoningProps {
    selectedOptionLabel: string
    isEvaluating?: boolean
    isReasoningSubmitted?: boolean
    evaluationText?: string
    nextButtonLabel?: string
}
