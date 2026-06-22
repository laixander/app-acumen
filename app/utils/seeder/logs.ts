import type { ActivityLog, SessionLog } from '~/types/course'

export const MOCK_ACTIVITY_LOGS: ActivityLog[] = [
    {
        id: 'log-1',
        courseId: 'introduction-to-algebra',
        courseTitle: 'Introduction to Algebra',
        lessonId: 'introduction-to-algebra-lesson-1',
        lessonTitle: 'Understanding Variables',
        type: 'Lesson',
        durationMinutes: 10,
        completedAt: Date.now() - (2 * 24 * 60 * 60 * 1000) // 2 days ago
    },
    {
        id: 'log-2',
        courseId: 'world-war-ii-overview',
        courseTitle: 'World War II Overview',
        lessonId: 'world-war-ii-overview-lesson-1',
        lessonTitle: 'The Road to War',
        type: 'Lesson',
        durationMinutes: 15,
        completedAt: Date.now() - (1 * 24 * 60 * 60 * 1000) // 1 day ago
    },
    {
        id: 'log-3',
        courseId: 'introduction-to-algebra',
        courseTitle: 'Introduction to Algebra',
        lessonId: 'introduction-to-algebra-lesson-2',
        lessonTitle: 'Solving One-Step Equations',
        type: 'Lesson',
        durationMinutes: 20,
        completedAt: Date.now() - (6 * 60 * 60 * 1000) // 6 hours ago
    },
    {
        id: 'log-4',
        courseId: 'advanced-javascript',
        courseTitle: 'Advanced JavaScript',
        lessonId: 'advanced-javascript-lesson-1',
        lessonTitle: 'Closures & Scope',
        type: 'Assessment',
        durationMinutes: 25,
        completedAt: Date.now() - (2 * 60 * 60 * 1000) // 2 hours ago
    },
    {
        id: 'log-5',
        courseId: 'spanish-basics',
        courseTitle: 'Spanish Basics',
        lessonId: 'spanish-basics-lesson-1',
        lessonTitle: 'Essential Greetings',
        type: 'Lesson',
        durationMinutes: 12,
        completedAt: Date.now() - (1 * 60 * 60 * 1000) // 1 hour ago
    }
]

export const MOCK_SESSION_LOGS: SessionLog[] = [
    {
        id: 'session-1',
        action: 'Account Logged In',
        device: 'Chrome on MacOS',
        location: 'California, USA',
        status: 'Success',
        timestamp: Date.now() - (10 * 60 * 1000)
    },
    {
        id: 'session-2',
        action: 'Profile Updated',
        device: 'LearnFast Windows App',
        location: 'New York, USA',
        status: 'Success',
        timestamp: Date.now() - (45 * 60 * 1000)
    },
    {
        id: 'session-3',
        action: 'Failed Login Attempt',
        device: 'Safari on iPhone',
        location: 'London, UK',
        status: 'Failed',
        timestamp: Date.now() - (2 * 60 * 60 * 1000)
    },
    {
        id: 'session-4',
        action: 'Security Settings Changed',
        device: 'Chrome on MacOS',
        location: 'California, USA',
        status: 'Warning',
        timestamp: Date.now() - (3 * 24 * 60 * 60 * 1000)
    },
    {
        id: 'session-5',
        action: 'Account Logged In',
        device: 'LearnFast Android',
        location: 'Tokyo, Japan',
        status: 'Success',
        timestamp: Date.now() - (4 * 24 * 60 * 60 * 1000)
    }
]
