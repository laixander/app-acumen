import type { Topic } from '~/types/topic'

export const MOCK_TOPICS: Topic[] = [
    { id: 'introduction-to-algebra', title: 'Introduction to Algebra', progress: 80, tag: 'Math', status: 'Ongoing', lessons: '10/12', lastStudied: '2 hrs ago', lastStudiedAt: Date.now() - 2 * 60 * 60 * 1000, icon: 'i-lucide-function-square', isPinned: true, learningGoal: 'Mastery' },
    { id: 'world-war-ii-overview', title: 'World War II Overview', progress: 55, tag: 'History', status: 'Ongoing', lessons: '6/11', lastStudied: '1 day ago', lastStudiedAt: Date.now() - 24 * 60 * 60 * 1000, icon: 'i-lucide-landmark', isPinned: false, learningGoal: 'Overview' },
    { id: 'newtons-laws-of-motion', title: "Newton's Laws of Motion", progress: 30, tag: 'Science', status: 'Ongoing', lessons: '3/10', lastStudied: '3 days ago', lastStudiedAt: Date.now() - 3 * 24 * 60 * 60 * 1000, icon: 'i-lucide-microscope', isPinned: true, learningGoal: 'Exam Prep' },
    { id: 'spanish-basics', title: 'Spanish Basics', progress: 65, tag: 'Language', status: 'Ongoing', lessons: '8/12', lastStudied: 'Yesterday', lastStudiedAt: Date.now() - 25 * 60 * 60 * 1000, icon: 'i-lucide-languages', isPinned: false, learningGoal: 'Mastery' },
    { id: 'reading-comprehension', title: 'Reading Comprehension', progress: 90, tag: 'English', status: 'Completed', lessons: '9/10', lastStudied: 'Just now', lastStudiedAt: Date.now() - 5 * 60 * 1000, icon: 'i-lucide-book-open', isPinned: false, learningGoal: 'Overview' },
    { id: 'organic-chemistry', title: 'Organic Chemistry', progress: 45, tag: 'Science', status: 'Ongoing', lessons: '5/11', lastStudied: '4 days ago', lastStudiedAt: Date.now() - 4 * 24 * 60 * 60 * 1000, icon: 'i-lucide-beaker', isPinned: false, learningGoal: 'Exam Prep' },
    { id: 'greek-mythology', title: 'Greek Mythology', progress: 100, tag: 'History', status: 'Completed', lessons: '8/8', lastStudied: '1 week ago', lastStudiedAt: Date.now() - 7 * 24 * 60 * 60 * 1000, icon: 'i-lucide-scroll', isPinned: false, learningGoal: 'Overview' },
    { id: 'advanced-javascript', title: 'Advanced JavaScript', progress: 15, tag: 'Science', status: 'Ongoing', lessons: '2/12', lastStudied: '5 hrs ago', lastStudiedAt: Date.now() - 5 * 60 * 60 * 1000, icon: 'i-lucide-code', isPinned: false, learningGoal: 'Project Based' },
    { id: 'french-vocabulary', title: 'French Vocabulary', progress: 40, tag: 'Language', status: 'Ongoing', lessons: '4/10', lastStudied: '2 days ago', lastStudiedAt: Date.now() - 2 * 24 * 60 * 60 * 1000, icon: 'i-lucide-languages', isPinned: false, learningGoal: 'Exam Prep' },
    { id: 'business-english', title: 'Business English', progress: 20, tag: 'English', status: 'Archived', lessons: '2/10', lastStudied: '1 month ago', lastStudiedAt: Date.now() - 30 * 24 * 60 * 60 * 1000, icon: 'i-lucide-briefcase', isPinned: false, learningGoal: 'Project Based' },
    { id: 'geometry-fundamentals', title: 'Geometry Fundamentals', progress: 70, tag: 'Math', status: 'Ongoing', lessons: '7/10', lastStudied: 'Yesterday', lastStudiedAt: Date.now() - 26 * 60 * 60 * 1000, icon: 'i-lucide-shapes', isPinned: false, learningGoal: 'Mastery' },
    { id: 'human-anatomy', title: 'Human Anatomy', progress: 100, tag: 'Science', status: 'Completed', lessons: '15/15', lastStudied: '2 weeks ago', lastStudiedAt: Date.now() - 14 * 24 * 60 * 60 * 1000, icon: 'i-lucide-activity', isPinned: false, learningGoal: 'Exam Prep' },
    { id: 'renaissance-art', title: 'Renaissance Art', progress: 25, tag: 'History', status: 'Ongoing', lessons: '3/12', lastStudied: '3 days ago', lastStudiedAt: Date.now() - 3 * 24 * 60 * 60 * 1000, icon: 'i-lucide-palette', isPinned: false, learningGoal: 'Overview' },
    { id: 'poetry-analysis', title: 'Poetry Analysis', progress: 50, tag: 'English', status: 'Ongoing', lessons: '5/10', lastStudied: '6 hrs ago', lastStudiedAt: Date.now() - 6 * 60 * 60 * 1000, icon: 'i-lucide-pen-tool', isPinned: false, learningGoal: 'Mastery' },
]

export const TOPIC_TAGS = ['All', 'Math', 'History', 'Science', 'Language', 'English']
export const TOPIC_STATUSES = ['All', 'Ongoing', 'Completed', 'Archived']
export const TOPIC_SORT_OPTIONS = ['Recent', 'Progress', 'Alphabetical']
