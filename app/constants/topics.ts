import type { Topic } from '~/types/topic'

export const MOCK_TOPICS: Topic[] = [
    { title: 'Introduction to Algebra', progress: 80, tag: 'Math', status: 'Ongoing', lessons: '10/12', lastStudied: '2 hrs ago', lastStudiedAt: Date.now() - 2 * 60 * 60 * 1000, icon: 'i-lucide-function-square', isPinned: true },
    { title: 'World War II Overview', progress: 55, tag: 'History', status: 'Ongoing', lessons: '6/11', lastStudied: '1 day ago', lastStudiedAt: Date.now() - 24 * 60 * 60 * 1000, icon: 'i-lucide-landmark', isPinned: false },
    { title: "Newton's Laws of Motion", progress: 30, tag: 'Science', status: 'Ongoing', lessons: '3/10', lastStudied: '3 days ago', lastStudiedAt: Date.now() - 3 * 24 * 60 * 60 * 1000, icon: 'i-lucide-microscope', isPinned: true },
    { title: 'Spanish Basics', progress: 65, tag: 'Language', status: 'Ongoing', lessons: '8/12', lastStudied: 'Yesterday', lastStudiedAt: Date.now() - 25 * 60 * 60 * 1000, icon: 'i-lucide-languages', isPinned: false },
    { title: 'Reading Comprehension', progress: 90, tag: 'English', status: 'Completed', lessons: '9/10', lastStudied: 'Just now', lastStudiedAt: Date.now() - 5 * 60 * 1000, icon: 'i-lucide-book-open', isPinned: false },
    { title: 'Organic Chemistry', progress: 45, tag: 'Science', status: 'Ongoing', lessons: '5/11', lastStudied: '4 days ago', lastStudiedAt: Date.now() - 4 * 24 * 60 * 60 * 1000, icon: 'i-lucide-beaker', isPinned: false },
    { title: 'Greek Mythology', progress: 100, tag: 'History', status: 'Completed', lessons: '8/8', lastStudied: '1 week ago', lastStudiedAt: Date.now() - 7 * 24 * 60 * 60 * 1000, icon: 'i-lucide-scroll', isPinned: false },
    { title: 'Advanced JavaScript', progress: 15, tag: 'Science', status: 'Ongoing', lessons: '2/12', lastStudied: '5 hrs ago', lastStudiedAt: Date.now() - 5 * 60 * 60 * 1000, icon: 'i-lucide-code', isPinned: false },
    { title: 'French Vocabulary', progress: 40, tag: 'Language', status: 'Ongoing', lessons: '4/10', lastStudied: '2 days ago', lastStudiedAt: Date.now() - 2 * 24 * 60 * 60 * 1000, icon: 'i-lucide-languages', isPinned: false },
    { title: 'Business English', progress: 20, tag: 'English', status: 'Archived', lessons: '2/10', lastStudied: '1 month ago', lastStudiedAt: Date.now() - 30 * 24 * 60 * 60 * 1000, icon: 'i-lucide-briefcase', isPinned: false },
    { title: 'Geometry Fundamentals', progress: 70, tag: 'Math', status: 'Ongoing', lessons: '7/10', lastStudied: 'Yesterday', lastStudiedAt: Date.now() - 26 * 60 * 60 * 1000, icon: 'i-lucide-shapes', isPinned: false },
    { title: 'Human Anatomy', progress: 100, tag: 'Science', status: 'Completed', lessons: '15/15', lastStudied: '2 weeks ago', lastStudiedAt: Date.now() - 14 * 24 * 60 * 60 * 1000, icon: 'i-lucide-activity', isPinned: false },
    { title: 'Renaissance Art', progress: 25, tag: 'History', status: 'Ongoing', lessons: '3/12', lastStudied: '3 days ago', lastStudiedAt: Date.now() - 3 * 24 * 60 * 60 * 1000, icon: 'i-lucide-palette', isPinned: false },
    { title: 'Poetry Analysis', progress: 50, tag: 'English', status: 'Ongoing', lessons: '5/10', lastStudied: '6 hrs ago', lastStudiedAt: Date.now() - 6 * 60 * 60 * 1000, icon: 'i-lucide-pen-tool', isPinned: false },
]

export const TOPIC_TAGS = ['All', 'Math', 'History', 'Science', 'Language', 'English']
export const TOPIC_STATUSES = ['All', 'Ongoing', 'Completed', 'Archived']
export const TOPIC_SORT_OPTIONS = ['Recent', 'Progress', 'Alphabetical']
