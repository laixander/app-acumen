import type { Course, LessonOverview, LessonContent, Assessment } from '~/types/course'

export const MOCK_COURSES: Course[] = [
    {
        id: 'introduction-to-algebra',
        workspaceId: '3',
        title: 'Introduction to Algebra',
        description: 'Master the fundamentals of variables, equations, and algebraic thinking to build a strong foundation for advanced mathematics.',
        progress: 80,
        tag: 'Math',
        status: 'Ongoing',
        lessons: '10/12',
        lastStudied: '2 hrs ago',
        lastStudiedAt: Date.now() - 2 * 60 * 60 * 1000,
        icon: 'i-lucide-function-square',
        isPinned: true,
        learningGoal: 'Deep Mastery',
        targetFinishDate: Date.now() + 30 * 24 * 60 * 60 * 1000,
        sessionsPerWeek: 3,
        itemsPerWeek: 5,
        createdBy: { id: '2', name: 'Alice Smith', avatar: 'https://i.pravatar.cc/100?u=2', role: 'Admin', coursesCount: 15 },
        viewersCount: 12,
        completedCount: 4,
        examInfo: { name: 'SAT Math Preparation', daysAway: 15 },
        stats: [
            { label: 'Master (Overall)', value: '80%', subtext: 'from 65% on Day 1', icon: 'i-lucide-award' },
            { label: 'Pass Probability', value: '85%', subtext: 'at current pace', icon: 'i-lucide-line-chart' },
            { label: 'Sessions This Week', value: '8', subtext: '6 hrs total', icon: 'i-lucide-calendar-days' }
        ],
        strongCourses: [
            { name: 'Linear Equations', progress: 92, color: 'text-green-500' },
            { name: 'Variables & Expressions', progress: 88, color: 'text-green-500' },
            { name: 'Order of Operations', progress: 85, color: 'text-green-500' },
            { name: 'Integers', progress: 82, color: 'text-green-500' }
        ],
        weakCourses: [
            { name: 'Quadratic Equations', progress: 45, color: 'text-orange-500' },
            { name: 'Factoring', progress: 52, color: 'text-orange-500' },
            { name: 'Inequalities', progress: 58, color: 'text-orange-500' },
            { name: 'Algebraic Word Problems', progress: 62, color: 'text-orange-500' }
        ]
    },
    {
        id: 'world-war-ii-overview',
        workspaceId: '1',
        title: 'World War II Overview',
        description: 'Explore the causes, major battles, and global impact of the most devastating conflict in human history.',
        progress: 55,
        tag: 'History',
        status: 'Ongoing',
        lessons: '6/11',
        lastStudied: '1 day ago',
        lastStudiedAt: Date.now() - 24 * 60 * 60 * 1000,
        icon: 'i-lucide-landmark',
        isPinned: false,
        learningGoal: 'Quick Overview',
        targetFinishDate: Date.now() + 14 * 24 * 60 * 60 * 1000,
        sessionsPerWeek: 2,
        itemsPerWeek: 4,
        createdBy: { id: '1', name: 'Alex Johnson', avatar: 'https://i.pravatar.cc/100?u=1', role: 'Owner', coursesCount: 24 },
        viewersCount: 45,
        completedCount: 12,
        examInfo: { name: 'AP World History Exam', daysAway: 42 },
        stats: [
            { label: 'Master (Overall)', value: '55%', subtext: 'from 30% on Day 1', icon: 'i-lucide-award' },
            { label: 'Pass Probability', value: '52%', subtext: 'at current pace', icon: 'i-lucide-line-chart' },
            { label: 'Sessions This Week', value: '12', subtext: '14 hrs total', icon: 'i-lucide-calendar-days' }
        ],
        strongCourses: [
            { name: 'Causes of WWII', progress: 78, color: 'text-green-500' },
            { name: 'The Blitzkrieg Strategy', progress: 75, color: 'text-green-500' },
            { name: 'Axis Powers', progress: 72, color: 'text-green-500' },
            { name: 'Major Battles', progress: 70, color: 'text-green-500' }
        ],
        weakCourses: [
            { name: 'Pacific Theater', progress: 35, color: 'text-orange-500' },
            { name: 'The Holocaust', progress: 42, color: 'text-orange-500' },
            { name: 'Post-War Reconstruction', progress: 48, color: 'text-orange-500' },
            { name: 'Nuclear Age Beginnings', progress: 50, color: 'text-orange-500' }
        ]
    },
    {
        id: 'newtons-laws-of-motion',
        workspaceId: '3',
        title: "Newton's Laws of Motion",
        description: 'Discover the foundational principles of classical mechanics and learn how forces dictate the motion of objects.',
        progress: 30,
        tag: 'Science',
        status: 'Ongoing',
        lessons: '3/10',
        lastStudied: '3 days ago',
        lastStudiedAt: Date.now() - 3 * 24 * 60 * 60 * 1000,
        icon: 'i-lucide-microscope',
        isPinned: true,
        learningGoal: 'Exam Preparation',
        targetFinishDate: Date.now() + 60 * 24 * 60 * 60 * 1000,
        sessionsPerWeek: 4,
        itemsPerWeek: 8,
        createdBy: { id: '1', name: 'Alex Johnson', avatar: 'https://i.pravatar.cc/100?u=1', role: 'Owner', coursesCount: 24 },
        viewersCount: 8,
        completedCount: 2,
        examInfo: { name: 'Physics Midterm - Unit 1', daysAway: 7 },
        stats: [
            { label: 'Master (Overall)', value: '30%', subtext: 'from 15% on Day 1', icon: 'i-lucide-award' },
            { label: 'Pass Probability', value: '35%', subtext: 'at current pace', icon: 'i-lucide-line-chart' },
            { label: 'Sessions This Week', value: '5', subtext: '4 hrs total', icon: 'i-lucide-calendar-days' }
        ],
        strongCourses: [
            { name: 'Law of Inertia', progress: 65, color: 'text-green-500' },
            { name: 'Mass vs Weight', progress: 60, color: 'text-green-500' },
            { name: 'Velocity Concepts', progress: 58, color: 'text-green-500' },
            { name: 'Friction Basics', progress: 55, color: 'text-green-500' }
        ],
        weakCourses: [
            { name: 'F=ma Calculations', progress: 25, color: 'text-orange-500' },
            { name: 'Action & Reaction', progress: 28, color: 'text-orange-500' },
            { name: 'Acceleration Curves', progress: 32, color: 'text-orange-500' },
            { name: 'Force Diagrams', progress: 35, color: 'text-orange-500' }
        ]
    },
    {
        id: 'spanish-basics',
        workspaceId: '1',
        title: 'Spanish Basics',
        description: 'Learn essential vocabulary, grammar structures, and conversational phrases to confidently communicate in Spanish.',
        progress: 65,
        tag: 'Language',
        status: 'Ongoing',
        lessons: '8/12',
        lastStudied: 'Yesterday',
        lastStudiedAt: Date.now() - 25 * 60 * 60 * 1000,
        icon: 'i-lucide-languages',
        isPinned: false,
        learningGoal: 'Deep Mastery',
        targetFinishDate: Date.now() + 90 * 24 * 60 * 60 * 1000,
        sessionsPerWeek: 5,
        itemsPerWeek: 10,
        createdBy: { id: '4', name: 'Charlie Williams', avatar: 'https://i.pravatar.cc/100?u=4', role: 'Admin', coursesCount: 5 },
        viewersCount: 24,
        completedCount: 8,
        examInfo: { name: 'DELE A1 Certification', daysAway: 60 },
        stats: [
            { label: 'Master (Overall)', value: '65%', subtext: 'from 40% on Day 1', icon: 'i-lucide-award' },
            { label: 'Pass Probability', value: '68%', subtext: 'at current pace', icon: 'i-lucide-line-chart' },
            { label: 'Sessions This Week', value: '10', subtext: '12 hrs total', icon: 'i-lucide-calendar-days' }
        ],
        strongCourses: [
            { name: 'Essential Greetings', progress: 88, color: 'text-green-500' },
            { name: 'Numbers 1-100', progress: 85, color: 'text-green-500' },
            { name: 'Common Nouns', progress: 82, color: 'text-green-500' },
            { name: 'Family Members', progress: 78, color: 'text-green-500' }
        ],
        weakCourses: [
            { name: 'Verb Conjugation', progress: 40, color: 'text-orange-500' },
            { name: 'Gender Agreement', progress: 45, color: 'text-orange-500' },
            { name: 'Sentence Structure', progress: 52, color: 'text-orange-500' },
            { name: 'Future Tense', progress: 55, color: 'text-orange-500' }
        ]
    },
    {
        id: 'greek-mythology',
        workspaceId: '1',
        title: 'Greek Mythology',
        description: 'Explore the gods, heroes, and epic tales of ancient Greece.',
        progress: 100,
        tag: 'History',
        status: 'Completed',
        lessons: '8/8',
        lastStudied: '1 week ago',
        lastStudiedAt: Date.now() - 7 * 24 * 60 * 60 * 1000,
        icon: 'i-lucide-scroll',
        isPinned: false,
        learningGoal: 'Quick Overview',
        targetFinishDate: Date.now() + 21 * 24 * 60 * 60 * 1000,
        sessionsPerWeek: 1,
        itemsPerWeek: 2,
        createdBy: { id: '1', name: 'Alex Johnson', avatar: 'https://i.pravatar.cc/100?u=1', role: 'Owner', coursesCount: 24 },
        viewersCount: 156,
        completedCount: 42,
        examInfo: { name: 'Classical Studies Final', daysAway: 12 },
        stats: [
            { label: 'Master (Overall)', value: '100%', subtext: 'from 80% on Day 1', icon: 'i-lucide-award' },
            { label: 'Pass Probability', value: '98%', subtext: 'at current pace', icon: 'i-lucide-line-chart' },
            { label: 'Sessions This Week', value: '2', subtext: '1 hr total', icon: 'i-lucide-calendar-days' }
        ],
        strongCourses: [
            { name: 'The 12 Olympians', progress: 100, color: 'text-green-500' },
            { name: 'Creation Myths', progress: 100, color: 'text-green-500' },
            { name: 'Heroes & Monsters', progress: 98, color: 'text-green-500' },
            { name: 'Trojan War', progress: 95, color: 'text-green-500' }
        ],
        weakCourses: [
            { name: 'Minor Deities', progress: 85, color: 'text-orange-500' },
            { name: 'Genealogy of Gods', progress: 88, color: 'text-orange-500' },
            { name: 'Epic Poems', progress: 90, color: 'text-orange-500' },
            { name: 'Regional Variants', progress: 92, color: 'text-orange-500' }
        ]
    },
    {
        id: 'advanced-javascript',
        workspaceId: '1',
        title: 'Advanced JavaScript',
        description: 'Deep dive into modern ES6+ features, asynchronous programming, closures, and performance optimization techniques.',
        progress: 15,
        tag: 'Science',
        status: 'Ongoing',
        lessons: '2/12',
        lastStudied: '5 hrs ago',
        lastStudiedAt: Date.now() - 5 * 60 * 60 * 1000,
        icon: 'i-lucide-code',
        isPinned: false,
        learningGoal: 'Practical Application',
        targetFinishDate: Date.now() + 45 * 24 * 60 * 60 * 1000,
        sessionsPerWeek: 3,
        itemsPerWeek: 6,
        createdBy: { id: '5', name: 'David Brown', avatar: 'https://i.pravatar.cc/100?u=5', role: 'Admin', coursesCount: 12 },
        viewersCount: 3,
        completedCount: 1,
        examInfo: { name: 'Frontend Engineering Cert', daysAway: 30 },
        stats: [
            { label: 'Master (Overall)', value: '15%', subtext: 'from 5% on Day 1', icon: 'i-lucide-award' },
            { label: 'Pass Probability', value: '20%', subtext: 'at current pace', icon: 'i-lucide-line-chart' },
            { label: 'Sessions This Week', value: '15', subtext: '20 hrs total', icon: 'i-lucide-calendar-days' }
        ],
        strongCourses: [
            { name: 'Arrow Functions', progress: 45, color: 'text-green-500' },
            { name: 'Array Methods', progress: 40, color: 'text-green-500' },
            { name: 'ES6 Modules', progress: 35, color: 'text-green-500' },
            { name: 'Destructuring', progress: 30, color: 'text-green-500' }
        ],
        weakCourses: [
            { name: 'Prototypes', progress: 5, color: 'text-orange-500' },
            { name: 'Event Loop', progress: 8, color: 'text-orange-500' },
            { name: 'Closures', progress: 12, color: 'text-orange-500' },
            { name: 'Memory Management', progress: 15, color: 'text-orange-500' }
        ]
    },
    {
        id: "financial-literacy-101",
        title: "Financial Literacy 101",
        workspaceId: "1",
        description: "Understand personal finance, budgeting, and investment strategies for long-term wealth.",
        progress: 10,
        tag: "Finance",
        status: "Ongoing",
        lessons: "1/10",
        lastStudied: "Yesterday",
        lastStudiedAt: Date.now() - 1 * 24 * 60 * 60 * 1000,
        icon: "i-lucide-pie-chart",
        isPinned: false,
        learningGoal: "Practical Application",
        targetFinishDate: Date.now() + 40 * 24 * 60 * 60 * 1000,
        sessionsPerWeek: 2,
        itemsPerWeek: 4,
        createdBy: {
            id: "1",
            name: "Alex Johnson",
            avatar: "https://i.pravatar.cc/100?u=1",
            role: "Owner",
            coursesCount: 24
        },
        viewersCount: 15,
        completedCount: 2,
        examInfo: {
            name: "Finance Basics",
            daysAway: 20
        },
        stats: [
            {
                label: "Master (Overall)",
                value: "10%",
                subtext: "from 0% on Day 1",
                icon: "i-lucide-award"
            }
        ]
    },
    {
        id: "nuxt-server-routes",
        title: "Nuxt Server Routes",
        workspaceId: "2",
        description: "Master API creation and server-side logic within the Nuxt 3 framework.",
        progress: 100,
        tag: "Development",
        status: "Completed",
        lessons: "8/8",
        lastStudied: "2 weeks ago",
        lastStudiedAt: Date.now() - 14 * 24 * 60 * 60 * 1000,
        icon: "i-simple-icons-nuxtdotjs",
        isPinned: true,
        learningGoal: "Deep Mastery",
        targetFinishDate: Date.now() + 0 * 24 * 60 * 60 * 1000,
        sessionsPerWeek: 3,
        itemsPerWeek: 5,
        createdBy: {
            id: "3",
            name: "Jane Smith",
            avatar: "https://i.pravatar.cc/100?u=3",
            role: "Instructor",
            coursesCount: 10
        },
        viewersCount: 300,
        completedCount: 250,
        stats: [
            {
                label: "Master (Overall)",
                value: "100%",
                subtext: "from 50% on Day 1",
                icon: "i-lucide-award"
            }
        ]
    },
    {
        id: "docker-containers",
        title: "Docker & Containers",
        workspaceId: "2",
        description: "Learn containerization principles and how to deploy scalable applications using Docker.",
        progress: 40,
        tag: "DevOps",
        status: "Ongoing",
        lessons: "4/10",
        lastStudied: "3 days ago",
        lastStudiedAt: Date.now() - 3 * 24 * 60 * 60 * 1000,
        icon: "i-simple-icons-docker",
        isPinned: false,
        learningGoal: "Practical Application",
        targetFinishDate: Date.now() + 20 * 24 * 60 * 60 * 1000,
        sessionsPerWeek: 4,
        itemsPerWeek: 6,
        createdBy: {
            id: "1",
            name: "Alex Johnson",
            avatar: "https://i.pravatar.cc/100?u=1",
            role: "Owner",
            coursesCount: 24
        },
        viewersCount: 45,
        completedCount: 12,
        stats: [
            {
                label: "Master (Overall)",
                value: "40%",
                subtext: "from 10% on Day 1",
                icon: "i-lucide-award"
            }
        ]
    },
    {
        id: "aws-essentials",
        title: "AWS Essentials",
        workspaceId: "2",
        description: "Get hands-on experience with core AWS services like EC2, S3, and RDS.",
        progress: 5,
        tag: "Cloud",
        status: "Ongoing",
        lessons: "1/20",
        lastStudied: "Just now",
        lastStudiedAt: Date.now() - 0 * 24 * 60 * 60 * 1000,
        icon: "i-simple-icons-amazonaws",
        isPinned: true,
        learningGoal: "Exam Preparation",
        targetFinishDate: Date.now() + 60 * 24 * 60 * 60 * 1000,
        sessionsPerWeek: 5,
        itemsPerWeek: 10,
        createdBy: {
            id: "3",
            name: "Jane Smith",
            avatar: "https://i.pravatar.cc/100?u=3",
            role: "Instructor",
            coursesCount: 10
        },
        viewersCount: 120,
        completedCount: 5,
        examInfo: {
            name: "AWS Cloud Practitioner",
            daysAway: 45
        },
        stats: [
            {
                label: "Master (Overall)",
                value: "5%",
                subtext: "from 0% on Day 1",
                icon: "i-lucide-award"
            }
        ]
    },
    {
        id: "serverless-architecture-with-aws",
        title: "Serverless Architecture with AWS",
        workspaceId: "2",
        description: "Build scalable applications without managing servers using AWS Lambda and API Gateway.",
        progress: 0,
        tag: "Cloud",
        status: "Not Started",
        lessons: "0/8",
        lastStudied: "Never",
        lastStudiedAt: 0,
        icon: "i-simple-icons-awslambda",
        isPinned: false,
        learningGoal: "Practical Application",
        targetFinishDate: Date.now() + 30 * 24 * 60 * 60 * 1000,
        sessionsPerWeek: 2,
        itemsPerWeek: 4,
        createdBy: {
            id: "3",
            name: "Jane Smith",
            avatar: "https://i.pravatar.cc/100?u=3",
            role: "Instructor",
            coursesCount: 10
        },
        viewersCount: 22,
        completedCount: 0,
        stats: [
            {
                label: "Master (Overall)",
                value: "0%",
                subtext: "from 0% on Day 1",
                icon: "i-lucide-award"
            }
        ]
    },
    {
        id: "geometry-and-trigonometry",
        title: "Geometry & Trigonometry",
        workspaceId: "3",
        description: "Explore shapes, angles, and the fundamental properties of space and triangles.",
        progress: 25,
        tag: "Math",
        status: "Ongoing",
        lessons: "3/12",
        lastStudied: "1 day ago",
        lastStudiedAt: Date.now() - 1 * 24 * 60 * 60 * 1000,
        icon: "i-lucide-triangle",
        isPinned: false,
        learningGoal: "Deep Mastery",
        targetFinishDate: Date.now() + 30 * 24 * 60 * 60 * 1000,
        sessionsPerWeek: 3,
        itemsPerWeek: 6,
        createdBy: {
            id: "2",
            name: "Alice Smith",
            avatar: "https://i.pravatar.cc/100?u=2",
            role: "Admin",
            coursesCount: 15
        },
        viewersCount: 30,
        completedCount: 8,
        stats: [
            {
                label: "Master (Overall)",
                value: "25%",
                subtext: "from 10% on Day 1",
                icon: "i-lucide-award"
            }
        ]
    },
    {
        id: "calculus-1-limits-and-derivatives",
        title: "Calculus 1: Limits & Derivatives",
        workspaceId: "3",
        description: "Master the foundations of calculus to understand continuous change.",
        progress: 15,
        tag: "Math",
        status: "Ongoing",
        lessons: "2/15",
        lastStudied: "1 week ago",
        lastStudiedAt: Date.now() - 7 * 24 * 60 * 60 * 1000,
        icon: "i-lucide-infinity",
        isPinned: true,
        learningGoal: "Exam Preparation",
        targetFinishDate: Date.now() + 60 * 24 * 60 * 60 * 1000,
        sessionsPerWeek: 4,
        itemsPerWeek: 5,
        createdBy: {
            id: "2",
            name: "Alice Smith",
            avatar: "https://i.pravatar.cc/100?u=2",
            role: "Admin",
            coursesCount: 15
        },
        viewersCount: 45,
        completedCount: 5,
        stats: [
            {
                label: "Master (Overall)",
                value: "15%",
                subtext: "from 0% on Day 1",
                icon: "i-lucide-award"
            }
        ]
    },
    {
        id: "statistics-and-probability",
        title: "Statistics & Probability",
        workspaceId: "3",
        description: "Learn how to collect, analyze, and interpret data using probability theory.",
        progress: 80,
        tag: "Math",
        status: "Ongoing",
        lessons: "8/10",
        lastStudied: "Yesterday",
        lastStudiedAt: Date.now() - 1 * 24 * 60 * 60 * 1000,
        icon: "i-lucide-bar-chart-2",
        isPinned: false,
        learningGoal: "Deep Mastery",
        targetFinishDate: Date.now() + 14 * 24 * 60 * 60 * 1000,
        sessionsPerWeek: 3,
        itemsPerWeek: 6,
        createdBy: {
            id: "2",
            name: "Alice Smith",
            avatar: "https://i.pravatar.cc/100?u=2",
            role: "Admin",
            coursesCount: 15
        },
        viewersCount: 60,
        completedCount: 20,
        stats: [
            {
                label: "Master (Overall)",
                value: "80%",
                subtext: "from 30% on Day 1",
                icon: "i-lucide-award"
            }
        ]
    },
    {
        id: "ui-ux-fundamentals",
        title: "UI/UX Fundamentals",
        workspaceId: "4",
        description: "Learn the core principles of user interface design and user experience research.",
        progress: 60,
        tag: "Design",
        status: "Ongoing",
        lessons: "6/10",
        lastStudied: "4 hrs ago",
        lastStudiedAt: Date.now() - 0.1 * 24 * 60 * 60 * 1000,
        icon: "i-simple-icons-figma",
        isPinned: true,
        learningGoal: "Practical Application",
        targetFinishDate: Date.now() + 15 * 24 * 60 * 60 * 1000,
        sessionsPerWeek: 2,
        itemsPerWeek: 4,
        createdBy: {
            id: "4",
            name: "Charlie Williams",
            avatar: "https://i.pravatar.cc/100?u=4",
            role: "Admin",
            coursesCount: 5
        },
        viewersCount: 85,
        completedCount: 20,
        stats: [
            {
                label: "Master (Overall)",
                value: "60%",
                subtext: "from 20% on Day 1",
                icon: "i-lucide-award"
            }
        ]
    },
    {
        id: "tailwind-css-mastery",
        title: "Tailwind CSS Mastery",
        workspaceId: "4",
        description: "Build modern, responsive layouts rapidly using utility-first CSS.",
        progress: 10,
        tag: "Design",
        status: "Ongoing",
        lessons: "2/20",
        lastStudied: "Just now",
        lastStudiedAt: Date.now() - 0 * 24 * 60 * 60 * 1000,
        icon: "i-simple-icons-tailwindcss",
        isPinned: false,
        learningGoal: "Quick Overview",
        targetFinishDate: Date.now() + 10 * 24 * 60 * 60 * 1000,
        sessionsPerWeek: 4,
        itemsPerWeek: 8,
        createdBy: {
            id: "1",
            name: "Alex Johnson",
            avatar: "https://i.pravatar.cc/100?u=1",
            role: "Owner",
            coursesCount: 24
        },
        viewersCount: 50,
        completedCount: 5,
        stats: [
            {
                label: "Master (Overall)",
                value: "10%",
                subtext: "from 0% on Day 1",
                icon: "i-lucide-award"
            }
        ]
    },
    {
        id: "figma-prototyping",
        title: "Figma Prototyping",
        workspaceId: "4",
        description: "Create interactive and animated prototypes directly within Figma.",
        progress: 80,
        tag: "Design",
        status: "Ongoing",
        lessons: "8/10",
        lastStudied: "2 days ago",
        lastStudiedAt: Date.now() - 2 * 24 * 60 * 60 * 1000,
        icon: "i-simple-icons-figma",
        isPinned: true,
        learningGoal: "Deep Mastery",
        targetFinishDate: Date.now() + 5 * 24 * 60 * 60 * 1000,
        sessionsPerWeek: 3,
        itemsPerWeek: 6,
        createdBy: {
            id: "4",
            name: "Charlie Williams",
            avatar: "https://i.pravatar.cc/100?u=4",
            role: "Admin",
            coursesCount: 5
        },
        viewersCount: 110,
        completedCount: 40,
        stats: [
            {
                label: "Master (Overall)",
                value: "80%",
                subtext: "from 40% on Day 1",
                icon: "i-lucide-award"
            }
        ]
    },
    {
        id: "contributing-to-open-source",
        title: "Contributing to Open Source",
        workspaceId: "5",
        description: "A comprehensive guide on how to find projects, make pull requests, and collaborate globally.",
        progress: 0,
        tag: "Community",
        status: "Not Started",
        lessons: "0/5",
        lastStudied: "Never",
        lastStudiedAt: 0,
        icon: "i-simple-icons-github",
        isPinned: true,
        learningGoal: "Practical Application",
        targetFinishDate: Date.now() + 14 * 24 * 60 * 60 * 1000,
        sessionsPerWeek: 1,
        itemsPerWeek: 2,
        createdBy: {
            id: "5",
            name: "David Brown",
            avatar: "https://i.pravatar.cc/100?u=5",
            role: "Admin",
            coursesCount: 12
        },
        viewersCount: 200,
        completedCount: 10,
        stats: [
            {
                label: "Master (Overall)",
                value: "0%",
                subtext: "from 0% on Day 1",
                icon: "i-lucide-award"
            }
        ]
    },
    {
        id: "git-version-control-mastery",
        title: "Git Version Control Mastery",
        workspaceId: "5",
        description: "Advanced Git workflows, rebase vs merge, and managing complex branch structures.",
        progress: 100,
        tag: "Tools",
        status: "Completed",
        lessons: "12/12",
        lastStudied: "2 months ago",
        lastStudiedAt: Date.now() - 60 * 24 * 60 * 60 * 1000,
        icon: "i-simple-icons-git",
        isPinned: false,
        learningGoal: "Practical Application",
        targetFinishDate: Date.now() + 0 * 24 * 60 * 60 * 1000,
        sessionsPerWeek: 2,
        itemsPerWeek: 4,
        createdBy: {
            id: "5",
            name: "David Brown",
            avatar: "https://i.pravatar.cc/100?u=5",
            role: "Admin",
            coursesCount: 12
        },
        viewersCount: 150,
        completedCount: 110,
        stats: [
            {
                label: "Master (Overall)",
                value: "100%",
                subtext: "from 80% on Day 1",
                icon: "i-lucide-award"
            }
        ]
    },
    {
        id: "writing-documentation-for-open-source",
        title: "Writing Documentation for Open Source",
        workspaceId: "5",
        description: "How to write impactful READMEs, contribution guidelines, and maintain wikis.",
        progress: 30,
        tag: "Community",
        status: "Ongoing",
        lessons: "3/10",
        lastStudied: "3 days ago",
        lastStudiedAt: Date.now() - 3 * 24 * 60 * 60 * 1000,
        icon: "i-lucide-file-text",
        isPinned: true,
        learningGoal: "Quick Overview",
        targetFinishDate: Date.now() + 20 * 24 * 60 * 60 * 1000,
        sessionsPerWeek: 1,
        itemsPerWeek: 3,
        createdBy: {
            id: "5",
            name: "David Brown",
            avatar: "https://i.pravatar.cc/100?u=5",
            role: "Admin",
            coursesCount: 12
        },
        viewersCount: 75,
        completedCount: 15,
        stats: [
            {
                label: "Master (Overall)",
                value: "30%",
                subtext: "from 10% on Day 1",
                icon: "i-lucide-award"
            }
        ]
    },
    {
        id: "open-source-licensing",
        title: "Open Source Licensing",
        workspaceId: "5",
        description: "Navigating MIT, GPL, Apache, and other licenses to protect and share your work.",
        progress: 50,
        tag: "Legal",
        status: "Ongoing",
        lessons: "2/4",
        lastStudied: "Just now",
        lastStudiedAt: Date.now() - 0 * 24 * 60 * 60 * 1000,
        icon: "i-lucide-scale",
        isPinned: false,
        learningGoal: "Practical Application",
        targetFinishDate: Date.now() + 10 * 24 * 60 * 60 * 1000,
        sessionsPerWeek: 2,
        itemsPerWeek: 2,
        createdBy: {
            id: "5",
            name: "David Brown",
            avatar: "https://i.pravatar.cc/100?u=5",
            role: "Admin",
            coursesCount: 12
        },
        viewersCount: 40,
        completedCount: 5,
        stats: [
            {
                label: "Master (Overall)",
                value: "50%",
                subtext: "from 0% on Day 1",
                icon: "i-lucide-award"
            }
        ]
    }
]

export const COURSE_CONTENT_MAP: Record<string, {
    lessons: Array<Partial<LessonOverview> & { content: Partial<LessonContent>, assessment?: Partial<Assessment> }>
}> = {
    'introduction-to-algebra': {
        lessons: [
            {
                title: "Understanding Variables",
                duration: "10 min",
                type: "video",
                icon: "i-lucide-play",
                color: "green",
                summary: "Learn why letters are used in math and how they represent unknown values.",
                content: {
                    description: "Variables are the 'placeholders' of algebra. In this lesson, we break down how to interpret x, y, and z in the context of real-world problems.",
                    lessonTypes: ['Reading', 'Video'],
                    sections: [
                        { title: "What is a Variable?", content: "In math, a variable is a symbol used to represent an unknown value. Think of it like a box where you can put different numbers.", aiInsight: "Commonly confused with constants (fixed numbers). Focus on the 'changing' nature of variables." },
                        { title: "Translating Words to Math", content: "Phrases like 'three more than a number' can be written as x + 3. Learning this language is the key to solving word problems.", aiInsight: null }
                    ]
                }
            },
            {
                title: "Solving One-Step Equations",
                duration: "20 min",
                type: "exercise",
                icon: "i-lucide-dumbbell",
                color: "green",
                summary: "Master the art of balancing scales to isolate x.",
                content: {
                    description: "Equations are like balanced scales. Whatever you do to one side, you must do to the other. Here, we tackle addition and subtraction equations.",
                    lessonTypes: ['Reading', 'Video'],
                    sections: [
                        { title: "The Inverse Operation", content: "To undo addition, you use subtraction. To undo multiplication, you use division. These are called inverse operations.", aiInsight: "Mastering this now will make multi-step equations much easier later." }
                    ]
                },
                assessment: {
                    title: "One-Step Challenge",
                    questions: [
                        { id: 1, text: "Solve for x: x + 15 = 40", options: [{ id: 'a', label: 'x = 55' }, { id: 'b', label: 'x = 25' }, { id: 'c', label: 'x = 15' }, { id: 'd', label: 'x = 30' }], correct: 'b' },
                        { id: 2, text: "What is the inverse operation of multiplication?", options: [{ id: 'a', label: 'Addition' }, { id: 'b', label: 'Subtraction' }, { id: 'c', label: 'Division' }, { id: 'd', label: 'Exponents' }], correct: 'c' },
                        { id: 3, text: "Solve for x: x / 4 = 5", options: [{ id: 'a', label: 'x = 20' }, { id: 'b', label: 'x = 1' }, { id: 'c', label: 'x = 9' }, { id: 'd', label: 'x = 16' }], correct: 'a' }
                    ],
                    completionSummary: "Algebraic foundations solid. You are now isolating variables with high precision. Your reasoning shows you've mastered inverse operations. Ready to tackle multi-step equations!",
                    whatYouDidWell: "Isolating variables in one-step addition/subtraction equations.",
                    whereYouStruggled: "Inverse operations involving division and negative coefficients.",
                    passProbBefore: "65%",
                    passProbAfter: "82%",
                    aiFinalComment: "Small move, but real. Two more sessions on this course, and you'll reach Level 4 mastery — which historically corresponds to a 88% pass probability on the SAT Math Prep."
                }
            },
            {
                title: "Algebraic Word Problems",
                duration: "25 min",
                type: "project",
                icon: "i-lucide-briefcase",
                color: "primary",
                summary: "Apply your skills to real-world scenarios like budgeting and physics.",
                content: {
                    description: "Algebra isn't just for tests; it's used in every industry from engineering to finance. We explore how to build expressions from scratch.",
                    lessonTypes: ['Reading', 'Video'],
                    sections: [
                        { title: "Setting up the Equation", content: "The hardest part of a word problem is starting. Identify the variable first, then the operations.", aiInsight: "Students often forget to define what 'x' represents before starting." }
                    ]
                }
            }
        ]
    },
    'world-war-ii-overview': {
        lessons: [
            {
                title: "The Road to War",
                duration: "15 min",
                type: "reading",
                icon: "i-lucide-book-open",
                color: "green",
                summary: "An analysis of the Treaty of Versailles and the rise of totalitarianism.",
                content: {
                    description: "The seeds of WWII were sown in the fallout of WWI. We examine the geopolitical tensions of the 1930s.",
                    lessonTypes: ['Reading', 'Video'],
                    sections: [
                        { title: "Economic Collapse", content: "The Great Depression wasn't just in America. Hyperinflation in Germany created the perfect environment for political upheaval.", aiInsight: "Focus on how economic despair leads to radicalism." }
                    ]
                }
            },
            {
                title: "The Blitzkrieg Strategy",
                duration: "20 min",
                type: "video",
                icon: "i-lucide-play",
                color: "primary",
                summary: "Visualization of lightning war tactics that reshaped European borders.",
                content: {
                    description: "Blitzkrieg combined tanks, infantry, and air power in a way never seen before. Watch the tactical breakdowns of the invasion of Poland.",
                    lessonTypes: ['Reading', 'Video'],
                    sections: [
                        { title: "Coordinated Assault", content: "By focusing force instead of spreading it thin, armies could punch through lines and encircle enemies.", aiInsight: null }
                    ]
                }
            },
            {
                title: "War in the Pacific",
                duration: "30 min",
                type: "quiz",
                icon: "i-lucide-clipboard-check",
                color: "neutral",
                summary: "Test your knowledge on island hopping and the turning points of Midway.",
                content: {
                    description: "The Pacific theater was vastly different from Europe, defined by naval battles and island-to-island skirmishes.",
                    lessonTypes: ['Reading', 'Video'],
                    sections: [
                        { title: "Naval Supremacy", content: "Aircraft carriers replaced battleships as the most important vessels in the fleet.", aiInsight: "Note: The battle of Midway is often cited as the definitive turning point." }
                    ]
                },
                assessment: {
                    title: "Pacific Mastery",
                    questions: [
                        { id: 1, text: "Which battle is considered the turning point of the Pacific War?", options: [{ id: 'a', label: 'Pearl Harbor' }, { id: 'b', label: 'Iwo Jima' }, { id: 'c', label: 'Midway' }, { id: 'd', label: 'Guadalcanal' }], correct: 'c' },
                        { id: 2, text: "True or False: Island hopping was a strategy to capture every single island in the Pacific.", type: 'true_false', options: [{ id: 'true', label: 'True' }, { id: 'false', label: 'False' }], correct: 'false' },
                        { id: 3, text: "What was the primary purpose of the 'Island Hopping' strategy?", options: [{ id: 'a', label: 'Capture every island' }, { id: 'b', label: 'Bypass strongholds to reach Japan' }, { id: 'c', label: 'Establish trade routes' }, { id: 'd', label: 'Avoid naval combat' }], correct: 'b' }
                    ],
                    completionSummary: "Strategic mastery achieved. You correctly identified the tactical nuances of the Pacific theater. Your understanding of Midway as a turning point is excellent. Next up: The Atomic Age.",
                    whatYouDidWell: "Identifying key naval turning points in the Pacific theater.",
                    whereYouStruggled: "Strategic distinction between offensive and defensive island hopping.",
                    passProbBefore: "52%",
                    passProbAfter: "75%",
                    aiFinalComment: "Significant progress. Four more sessions focused on European theaters, and you'll reach Level 3 mastery — correlating to a 75% pass probability on the AP World History Exam."
                }
            }
        ]
    },
    'newtons-laws-of-motion': {
        lessons: [
            {
                title: "Law of Inertia",
                duration: "10 min",
                type: "reading",
                icon: "i-lucide-book-open",
                color: "green",
                summary: "Why objects in motion stay in motion unless acted upon.",
                content: {
                    description: "Sir Isaac Newton's first law changed how we view the physical world. We explore the concept of 'inertia' and how it applies to everything from pucks on ice to spaceships.",
                    lessonTypes: ['Reading', 'Video'],
                    sections: [
                        { title: "Resistance to Change", content: "Inertia is the tendency of an object to resist changes in its state of motion. The more mass an object has, the more inertia it possesses.", aiInsight: "Common misconception: Inertia is not a force, it's a property." }
                    ]
                }
            },
            {
                title: "Force, Mass, and Acceleration",
                duration: "20 min",
                type: "video",
                icon: "i-lucide-play",
                color: "primary",
                summary: "A breakdown of the famous F=ma equation.",
                content: {
                    description: "This lesson dives into the math behind motion. See how doubling the force affects acceleration, and why mass acts as a dampener.",
                    lessonTypes: ['Reading', 'Video'],
                    sections: [
                        { title: "The Calculation", content: "Force equals mass times acceleration. This simple formula is the foundation of classical mechanics.", aiInsight: "Ensure students understand the vector nature of Force and Acceleration." }
                    ]
                },
                assessment: {
                    title: "Physics Lab Quiz",
                    questions: [
                        { id: 1, text: "If you double the force on an object but keep the mass the same, what happens to acceleration?", options: [{ id: 'a', label: 'It stays the same' }, { id: 'b', label: 'It doubles' }, { id: 'c', label: 'It is cut in half' }, { id: 'd', label: 'It quadruples' }], correct: 'b' },
                        { id: 2, text: "A 10kg object accelerates at 2m/s². What is the net force applied?", options: [{ id: 'a', label: '5N' }, { id: 'b', label: '10N' }, { id: 'c', label: '20N' }, { id: 'd', label: '40N' }], correct: 'c' },
                        { id: 3, text: "Newton's Third Law states that for every action, there is an equal and opposite ____.", options: [{ id: 'a', label: 'Acceleration' }, { id: 'b', label: 'Mass' }, { id: 'c', label: 'Reaction' }, { id: 'd', label: 'Inertia' }], correct: 'c' }
                    ],
                    completionSummary: "Classical mechanics intuition is high. You have a strong grasp of Newton's laws and force calculations. Let's shift our focus to Kinematic equations in the next module.",
                    whatYouDidWell: "Calculations involving F=ma and identifying action/reaction pairs.",
                    whereYouStruggled: "Distinguishing between mass (inertia) and weight in friction scenarios.",
                    passProbBefore: "35%",
                    passProbAfter: "58%",
                    aiFinalComment: "Small move, but real. Three more lab-style sessions, and you'll hit Level 2 mastery — historically a 65% benchmark for the Physics Midterm."
                }
            }
        ]
    },
    'spanish-basics': {
        lessons: [
            {
                title: "Essential Greetings",
                duration: "12 min",
                type: "video",
                icon: "i-lucide-play",
                color: "green",
                summary: "Master 'Hola', 'Buenos Días', and how to introduce yourself.",
                content: {
                    description: "First impressions are vital in any language. Learn the tonal differences between formal and informal greetings in Spanish-speaking cultures.",
                    lessonTypes: ['Reading', 'Video'],
                    sections: [
                        { title: "Formal vs Informal", content: "Using 'Usted' vs 'Tú' is a critical distinction in Spanish. We guide you through when to use each to remain respectful.", aiInsight: "Cultural context: In many regions, 'Usted' is the default for anyone you don't know well." }
                    ]
                }
            },
            {
                title: "Common Regular Verbs",
                duration: "18 min",
                type: "reading",
                icon: "i-lucide-book-open",
                color: "primary",
                summary: "Conjugation patterns for -AR, -ER, and -IR verbs.",
                content: {
                    description: "Verbs are the engine of a sentence. We break down the standard patterns so you can start building your own basic statements.",
                    lessonTypes: ['Reading', 'Video'],
                    sections: [
                        { title: "The -AR Pattern", content: "Hablar (to speak) becomes Hablo, Hablas, Habla. Once you know one, you know hundreds of others.", aiInsight: null }
                    ]
                },
                assessment: {
                    title: "Verbal Drill",
                    questions: [
                        { id: 1, text: "How do you say 'Good Morning' in Spanish?", options: [{ id: 'a', label: 'Buenas Noches' }, { id: 'b', label: 'Hola' }, { id: 'c', label: 'Buenos Días' }, { id: 'd', label: 'Mucho Gusto' }], correct: 'c' },
                        { id: 2, text: "What is the correct conjugation of 'Yo' for the verb 'Comer' (to eat)?", options: [{ id: 'a', label: 'Comes' }, { id: 'b', label: 'Como' }, { id: 'c', label: 'Comen' }, { id: 'd', label: 'Comemos' }], correct: 'b' },
                        { id: 3, text: "Which of the following is the -AR verb ending for 'We' (Nosotros)?", options: [{ id: 'a', label: 'o' }, { id: 'b', label: 'as' }, { id: 'c', label: 'amos' }, { id: 'd', label: 'an' }], correct: 'c' }
                    ],
                    completionSummary: "Basic communication established! You've mastered regular -AR/-ER/-IR conjugation patterns. Your next step is mastering irregular 'Yo' forms and stem-changers.",
                    whatYouDidWell: "Conjugating regular -AR and -ER verbs for 'Nosotros' and 'Yo'.",
                    whereYouStruggled: "Choosing between formal (Usted) and informal (Tú) contexts.",
                    passProbBefore: "68%",
                    passProbAfter: "85%",
                    aiFinalComment: "Solid consistency. Five more immersive sessions, and you'll reach A1-Level mastery — which maps to a 90% success rate on the DELE Certification."
                }
            }
        ]
    },
    'reading-comprehension': {
        lessons: [
            {
                title: "Finding the Main Idea",
                duration: "15 min",
                type: "reading",
                icon: "i-lucide-book-open",
                color: "green",
                summary: "Techniques for skimming and scanning to find core themes.",
                content: {
                    description: "Most readers get bogged down in details. This lesson teaches you how to step back and identify the author's primary thesis.",
                    lessonTypes: ['Reading', 'Video'],
                    sections: [
                        { title: "The Summary Test", content: "If you can't summarize a paragraph in 10 words or less, you haven't found the main idea yet.", aiInsight: "Focus on first and last sentences of paragraphs." }
                    ]
                }
            },
            {
                title: "Tone and Subtext",
                duration: "20 min",
                type: "video",
                icon: "i-lucide-play",
                color: "primary",
                summary: "Reading between the lines to find hidden meanings and emotional cues.",
                content: {
                    description: "What an author *doesn't* say is often as important as what they do. We analyze sarcastic, earnest, and cautionary tones.",
                    lessonTypes: ['Reading', 'Video'],
                    sections: [
                        { title: "Context Clues", content: "Adjectives and verbs choices tip the author's hand. 'Strolled' vs 'Scurried' changes the entire mood of a scene.", aiInsight: null }
                    ]
                },
                assessment: {
                    title: "Subtext Analysis",
                    questions: [
                        { id: 1, text: "An author describes a room as 'orderly and sterile.' What is the most likely intended tone?", options: [{ id: 'a', label: 'Whimsical' }, { id: 'b', label: 'Cozy' }, { id: 'c', label: 'Cold/Clinical' }, { id: 'd', label: 'Angry' }], correct: 'c' },
                        { id: 2, text: "What does it mean to 'read between the lines'?", options: [{ id: 'a', label: 'Reading every other sentence' }, { id: 'b', label: 'Identifying hidden meanings' }, { id: 'c', label: 'Correcting spelling errors' }, { id: 'd', label: 'Memorizing the text' }], correct: 'b' },
                        { id: 3, text: "In a scene where a character 'scurries' instead of 'walks', what is the author likely implying?", options: [{ id: 'a', label: 'Confidence' }, { id: 'b', label: 'Relaxation' }, { id: 'c', label: 'Urgency or fear' }, { id: 'd', label: 'Joy' }], correct: 'c' }
                    ],
                    completionSummary: "Critical reading skills are sharpening! You've mastered the art of identifying authorial tone and subtext. Your ability to distinguish between 'sterile' and 'cozy' contexts is spot on.",
                    whatYouDidWell: "Identifying authorial tone from specific adjectives.",
                    whereYouStruggled: "Distinguishing between primary thesis and supporting evidence.",
                    passProbBefore: "70%",
                    passProbAfter: "88%",
                    aiFinalComment: "Sharp analysis. Three more subtext sessions, and you'll reach Level 3 mastery — which historically corresponds to a 85% pass probability on the GRE Verbal Exam."
                }
            }
        ]
    },
    'greek-mythology': {
        lessons: [
            {
                title: "The 12 Olympians",
                duration: "20 min",
                type: "video",
                icon: "i-lucide-play",
                color: "primary",
                summary: "Meet the primary deities of the Greek pantheon and their domains.",
                content: {
                    description: "From Zeus's lightning to Poseidon's trident, we explore the personalities and symbols of the most powerful gods on Mount Olympus.",
                    lessonTypes: ['Video', 'Reading'],
                    sections: [
                        { title: "The Big Three", content: "Zeus, Poseidon, and Hades divided the world after defeating the Titans. Each rules a distinct realm: Sky, Sea, and Underworld.", aiInsight: null }
                    ]
                },
                assessment: {
                    title: "Olympian Registry",
                    questions: [
                        { id: 1, text: "Who is the Greek goddess of wisdom and strategic warfare?", options: [{ id: 'a', label: 'Hera' }, { id: 'b', label: 'Athena' }, { id: 'c', label: 'Aphrodite' }, { id: 'd', label: 'Artemis' }], correct: 'b' },
                        { id: 2, text: "Which god rules the Underworld?", options: [{ id: 'a', label: 'Zeus' }, { id: 'b', label: 'Hades' }, { id: 'c', label: 'Hermes' }, { id: 'd', label: 'Ares' }], correct: 'b' },
                        { id: 3, text: "What is Poseidon's primary symbol of power?", options: [{ id: 'a', label: 'Thunderbolt' }, { id: 'b', label: 'Trident' }, { id: 'c', label: 'Aegis' }, { id: 'd', label: 'Bow' }], correct: 'b' }
                    ],
                    completionSummary: "Lore mastery confirmed. You have a solid grasp of the Olympian hierarchy and their respective domains. You're ready to explore the Heroic Age and the Trojan War.",
                    whatYouDidWell: "Identifying the Big Three and their domains.",
                    whereYouStruggled: "Genealogy and relations between minor deities.",
                    passProbBefore: "85%",
                    passProbAfter: "95%",
                    aiFinalComment: "Expertise nearing. One more deep dive into minor deities, and you'll reach Level 5 mastery — historically a 98% pass probability on the Classical Studies Final."
                }
            }
        ]
    },
    'advanced-javascript': {
        lessons: [
            {
                title: "Arrow Functions & ES6+",
                duration: "25 min",
                type: "exercise",
                icon: "i-lucide-code",
                color: "green",
                summary: "Master modern JS syntax and lexical scoping.",
                content: {
                    description: "JavaScript has evolved significantly since ES6. This module dives into the 'why' behind arrow functions and how they handle scope differently than traditional functions.",
                    lessonTypes: ['Exercise', 'Video'],
                    sections: [
                        { title: "Lexical 'this'", content: "Unlike regular functions, arrow functions do not have their own 'this' context. They inherit it from the surrounding scope.", aiInsight: "This is the most common source of bugs in modern JS frameworks." }
                    ]
                },
                assessment: {
                    title: "Modern JS Drill",
                    questions: [
                        { id: 1, text: "Which of the following is true about arrow functions?", options: [{ id: 'a', label: 'They have their own this binding' }, { id: 'b', label: 'They inherit this from the parent scope' }, { id: 'c', label: 'They cannot be used as callbacks' }, { id: 'd', label: 'They require the function keyword' }], correct: 'b' },
                        { id: 2, text: "What is the result of [1, 2, 3].map(x => x * 2)?", options: [{ id: 'a', label: '[1, 2, 3]' }, { id: 'b', label: '[2, 4, 6]' }, { id: 'c', label: '6' }, { id: 'd', label: 'undefined' }], correct: 'b' },
                        { id: 3, text: "True or False: Arrow functions can be used as constructors with the 'new' keyword.", type: 'true_false', options: [{ id: 'true', label: 'True' }, { id: 'false', label: 'False' }], correct: 'false' }
                    ],
                    completionSummary: "Engineering proficiency rising. Your understanding of ES6 syntax and lexical scoping is strong. You're well-equipped to handle complex React or Vue architectures.",
                    whatYouDidWell: "Arrow function syntax and simple array mapping.",
                    whereYouStruggled: "Lexical 'this' binding in complex scope chains.",
                    passProbBefore: "15%",
                    passProbAfter: "32%",
                    aiFinalComment: "Small move, but real. Three more sessions on this course, and you'll reach Level 3 mastery — which historically corresponds to a 67% pass probability on the Frontend Engineering Certification."
                }
            }
        ]
    }
    ,
    'financial-literacy-101': {
        lessons: [
            {
                title: "Introduction to Financial Literacy 101",
                duration: "15 min",
                type: "reading",
                icon: "i-lucide-book-open",
                color: "green",
                summary: "An overview of Financial Literacy 101.",
                content: {
                    description: "Learn the basics and fundamentals of Financial Literacy 101.",
                    lessonTypes: ['Reading'],
                    sections: [
                        { title: "Getting Started", content: "This is the first step in your journey.", aiInsight: null }
                    ]
                }
            }
        ]
    },
    'nuxt-server-routes': {
        lessons: [
            {
                title: "Introduction to Nuxt Server Routes",
                duration: "15 min",
                type: "reading",
                icon: "i-lucide-book-open",
                color: "green",
                summary: "An overview of Nuxt Server Routes.",
                content: {
                    description: "Learn the basics and fundamentals of Nuxt Server Routes.",
                    lessonTypes: ['Reading'],
                    sections: [
                        { title: "Getting Started", content: "This is the first step in your journey.", aiInsight: null }
                    ]
                }
            }
        ]
    },
    'docker-containers': {
        lessons: [
            {
                title: "Introduction to Docker & Containers",
                duration: "15 min",
                type: "reading",
                icon: "i-lucide-book-open",
                color: "green",
                summary: "An overview of Docker & Containers.",
                content: {
                    description: "Learn the basics and fundamentals of Docker & Containers.",
                    lessonTypes: ['Reading'],
                    sections: [
                        { title: "Getting Started", content: "This is the first step in your journey.", aiInsight: null }
                    ]
                }
            }
        ]
    },
    'aws-essentials': {
        lessons: [
            {
                title: "Introduction to AWS Essentials",
                duration: "15 min",
                type: "reading",
                icon: "i-lucide-book-open",
                color: "green",
                summary: "An overview of AWS Essentials.",
                content: {
                    description: "Learn the basics and fundamentals of AWS Essentials.",
                    lessonTypes: ['Reading'],
                    sections: [
                        { title: "Getting Started", content: "This is the first step in your journey.", aiInsight: null }
                    ]
                }
            }
        ]
    },
    'serverless-architecture-with-aws': {
        lessons: [
            {
                title: "Introduction to Serverless Architecture with AWS",
                duration: "15 min",
                type: "reading",
                icon: "i-lucide-book-open",
                color: "green",
                summary: "An overview of Serverless Architecture with AWS.",
                content: {
                    description: "Learn the basics and fundamentals of Serverless Architecture with AWS.",
                    lessonTypes: ['Reading'],
                    sections: [
                        { title: "Getting Started", content: "This is the first step in your journey.", aiInsight: null }
                    ]
                }
            }
        ]
    },
    'geometry-and-trigonometry': {
        lessons: [
            {
                title: "Introduction to Geometry & Trigonometry",
                duration: "15 min",
                type: "reading",
                icon: "i-lucide-book-open",
                color: "green",
                summary: "An overview of Geometry & Trigonometry.",
                content: {
                    description: "Learn the basics and fundamentals of Geometry & Trigonometry.",
                    lessonTypes: ['Reading'],
                    sections: [
                        { title: "Getting Started", content: "This is the first step in your journey.", aiInsight: null }
                    ]
                }
            }
        ]
    },
    'calculus-1-limits-and-derivatives': {
        lessons: [
            {
                title: "Introduction to Calculus 1: Limits & Derivatives",
                duration: "15 min",
                type: "reading",
                icon: "i-lucide-book-open",
                color: "green",
                summary: "An overview of Calculus 1: Limits & Derivatives.",
                content: {
                    description: "Learn the basics and fundamentals of Calculus 1: Limits & Derivatives.",
                    lessonTypes: ['Reading'],
                    sections: [
                        { title: "Getting Started", content: "This is the first step in your journey.", aiInsight: null }
                    ]
                }
            }
        ]
    },
    'statistics-and-probability': {
        lessons: [
            {
                title: "Introduction to Statistics & Probability",
                duration: "15 min",
                type: "reading",
                icon: "i-lucide-book-open",
                color: "green",
                summary: "An overview of Statistics & Probability.",
                content: {
                    description: "Learn the basics and fundamentals of Statistics & Probability.",
                    lessonTypes: ['Reading'],
                    sections: [
                        { title: "Getting Started", content: "This is the first step in your journey.", aiInsight: null }
                    ]
                }
            }
        ]
    },
    'ui-ux-fundamentals': {
        lessons: [
            {
                title: "Introduction to UI/UX Fundamentals",
                duration: "15 min",
                type: "reading",
                icon: "i-lucide-book-open",
                color: "green",
                summary: "An overview of UI/UX Fundamentals.",
                content: {
                    description: "Learn the basics and fundamentals of UI/UX Fundamentals.",
                    lessonTypes: ['Reading'],
                    sections: [
                        { title: "Getting Started", content: "This is the first step in your journey.", aiInsight: null }
                    ]
                }
            }
        ]
    },
    'tailwind-css-mastery': {
        lessons: [
            {
                title: "Introduction to Tailwind CSS Mastery",
                duration: "15 min",
                type: "reading",
                icon: "i-lucide-book-open",
                color: "green",
                summary: "An overview of Tailwind CSS Mastery.",
                content: {
                    description: "Learn the basics and fundamentals of Tailwind CSS Mastery.",
                    lessonTypes: ['Reading'],
                    sections: [
                        { title: "Getting Started", content: "This is the first step in your journey.", aiInsight: null }
                    ]
                }
            }
        ]
    },
    'figma-prototyping': {
        lessons: [
            {
                title: "Introduction to Figma Prototyping",
                duration: "15 min",
                type: "reading",
                icon: "i-lucide-book-open",
                color: "green",
                summary: "An overview of Figma Prototyping.",
                content: {
                    description: "Learn the basics and fundamentals of Figma Prototyping.",
                    lessonTypes: ['Reading'],
                    sections: [
                        { title: "Getting Started", content: "This is the first step in your journey.", aiInsight: null }
                    ]
                }
            }
        ]
    },
    'contributing-to-open-source': {
        lessons: [
            {
                title: "Introduction to Contributing to Open Source",
                duration: "15 min",
                type: "reading",
                icon: "i-lucide-book-open",
                color: "green",
                summary: "An overview of Contributing to Open Source.",
                content: {
                    description: "Learn the basics and fundamentals of Contributing to Open Source.",
                    lessonTypes: ['Reading'],
                    sections: [
                        { title: "Getting Started", content: "This is the first step in your journey.", aiInsight: null }
                    ]
                }
            }
        ]
    },
    'git-version-control-mastery': {
        lessons: [
            {
                title: "Introduction to Git Version Control Mastery",
                duration: "15 min",
                type: "reading",
                icon: "i-lucide-book-open",
                color: "green",
                summary: "An overview of Git Version Control Mastery.",
                content: {
                    description: "Learn the basics and fundamentals of Git Version Control Mastery.",
                    lessonTypes: ['Reading'],
                    sections: [
                        { title: "Getting Started", content: "This is the first step in your journey.", aiInsight: null }
                    ]
                }
            }
        ]
    },
    'writing-documentation-for-open-source': {
        lessons: [
            {
                title: "Introduction to Writing Documentation for Open Source",
                duration: "15 min",
                type: "reading",
                icon: "i-lucide-book-open",
                color: "green",
                summary: "An overview of Writing Documentation for Open Source.",
                content: {
                    description: "Learn the basics and fundamentals of Writing Documentation for Open Source.",
                    lessonTypes: ['Reading'],
                    sections: [
                        { title: "Getting Started", content: "This is the first step in your journey.", aiInsight: null }
                    ]
                }
            }
        ]
    },
    'open-source-licensing': {
        lessons: [
            {
                title: "Introduction to Open Source Licensing",
                duration: "15 min",
                type: "reading",
                icon: "i-lucide-book-open",
                color: "green",
                summary: "An overview of Open Source Licensing.",
                content: {
                    description: "Learn the basics and fundamentals of Open Source Licensing.",
                    lessonTypes: ['Reading'],
                    sections: [
                        { title: "Getting Started", content: "This is the first step in your journey.", aiInsight: null }
                    ]
                }
            }
        ]
    }
}
