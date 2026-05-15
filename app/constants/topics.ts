export const TOPIC_TAGS = ['All', 'Math', 'History', 'Science', 'Language', 'English']
export const TOPIC_STATUSES = ['Ongoing', 'Completed', 'Archived', 'All']
export const TOPIC_SORT_OPTIONS = ['Recent', 'Progress', 'Alphabetical']

export const GOAL_COLORS = {
    'Mastery': 'amber',
    'Overview': 'lime',
    'Project Based': 'purple',
    'Exam Prep': 'rose'
} as const

export const CURRICULUM_CATEGORIES = [
    {
        name: 'Mathematics',
        icon: 'i-lucide-calculator',
        color: 'blue',
        subjects: ['Algebra', 'Calculus', 'Statistics', 'Geometry', 'Trigonometry']
    },
    {
        name: 'Sciences',
        icon: 'i-lucide-beaker',
        color: 'emerald',
        subjects: ['Physics', 'Chemistry', 'Biology', 'Earth Science', 'Astronomy']
    },
    {
        name: 'Languages',
        icon: 'i-lucide-languages',
        color: 'orange',
        subjects: ['English', 'Spanish', 'French', 'German', 'Mandarin', 'Japanese']
    },
    {
        name: 'Humanities',
        icon: 'i-lucide-landmark',
        color: 'purple',
        subjects: ['History', 'Philosophy', 'Literature', 'Art History', 'Political Science']
    },
    {
        name: 'Technology',
        icon: 'i-lucide-monitor',
        color: 'cyan',
        subjects: ['Data Structures', 'Algorithms', 'Web Dev', 'Cybersecurity', 'AI & ML']
    },
    {
        name: 'Business',
        icon: 'i-lucide-trending-up',
        color: 'amber',
        subjects: ['Microeconomics', 'Marketing', 'Finance', 'Management', 'Entrepreneurship']
    },
    {
        name: 'Creative Arts',
        icon: 'i-lucide-palette',
        color: 'pink',
        subjects: ['Graphic Design', 'Music Theory', 'Film Studies', 'Photography', 'Architecture']
    },
    {
        name: 'Health',
        icon: 'i-lucide-stethoscope',
        color: 'red',
        subjects: ['Anatomy', 'Nutrition', 'Psychology', 'Pharmacology', 'Public Health']
    },
    {
        name: 'Engineering',
        icon: 'i-lucide-wrench',
        color: 'slate',
        subjects: ['Civil Eng', 'Mechanical', 'Electrical', 'Aerospace', 'Robotics']
    },
    {
        name: 'Law',
        icon: 'i-lucide-gavel',
        color: 'indigo',
        subjects: ['Criminal Law', 'Civil Rights', 'Intl Law', 'Public Policy', 'Ethics']
    },
    {
        name: 'Social Sciences',
        icon: 'i-lucide-users',
        color: 'rose',
        subjects: ['Sociology', 'Anthropology', 'Geography', 'Communication', 'Gender Studies']
    },
    {
        name: 'Vocational',
        icon: 'i-lucide-hammer',
        color: 'lime',
        subjects: ['Woodworking', 'Cooking', 'Fashion', 'Automotive', 'Digital Literacy']
    }
] as const
