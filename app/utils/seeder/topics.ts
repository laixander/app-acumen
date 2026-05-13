import type { Topic, LessonOverview, LessonContent, Assessment } from '~/types/topic'

export const MOCK_TOPICS: Topic[] = [
    {
        id: 'introduction-to-algebra',
        title: 'Introduction to Algebra',
        progress: 80,
        tag: 'Math',
        status: 'Ongoing',
        lessons: '10/12',
        lastStudied: '2 hrs ago',
        lastStudiedAt: Date.now() - 2 * 60 * 60 * 1000,
        icon: 'i-lucide-function-square',
        isPinned: true,
        learningGoal: 'Mastery',
        createdBy: { id: '2', name: 'Alice Smith', avatar: 'https://i.pravatar.cc/100?u=2', role: 'Admin', topicsCount: 15 },
        viewersCount: 12,
        completedCount: 4,
        examInfo: { name: 'SAT Math Preparation', daysAway: 15 },
        stats: [
            { label: 'Master (Overall)', value: '80%', subtext: 'from 65% on Day 1', icon: 'i-lucide-award' },
            { label: 'Pass Probability', value: '85%', subtext: 'at current pace', icon: 'i-lucide-line-chart' },
            { label: 'Sessions This Week', value: '8', subtext: '6 hrs total', icon: 'i-lucide-calendar-days' }
        ],
        strongTopics: [
            { name: 'Linear Equations', progress: 92, color: 'text-green-500' },
            { name: 'Variables & Expressions', progress: 88, color: 'text-green-500' },
            { name: 'Order of Operations', progress: 85, color: 'text-green-500' },
            { name: 'Integers', progress: 82, color: 'text-green-500' }
        ],
        weakTopics: [
            { name: 'Quadratic Equations', progress: 45, color: 'text-orange-500' },
            { name: 'Factoring', progress: 52, color: 'text-orange-500' },
            { name: 'Inequalities', progress: 58, color: 'text-orange-500' },
            { name: 'Algebraic Word Problems', progress: 62, color: 'text-orange-500' }
        ]
    },
    {
        id: 'world-war-ii-overview',
        title: 'World War II Overview',
        progress: 55,
        tag: 'History',
        status: 'Ongoing',
        lessons: '6/11',
        lastStudied: '1 day ago',
        lastStudiedAt: Date.now() - 24 * 60 * 60 * 1000,
        icon: 'i-lucide-landmark',
        isPinned: false,
        learningGoal: 'Overview',
        createdBy: { id: '3', name: 'Bob Johnson', avatar: 'https://i.pravatar.cc/100?u=3', role: 'Admin', topicsCount: 8 },
        viewersCount: 45,
        completedCount: 12,
        examInfo: { name: 'AP World History Exam', daysAway: 42 },
        stats: [
            { label: 'Master (Overall)', value: '55%', subtext: 'from 30% on Day 1', icon: 'i-lucide-award' },
            { label: 'Pass Probability', value: '52%', subtext: 'at current pace', icon: 'i-lucide-line-chart' },
            { label: 'Sessions This Week', value: '12', subtext: '14 hrs total', icon: 'i-lucide-calendar-days' }
        ],
        strongTopics: [
            { name: 'Causes of WWII', progress: 78, color: 'text-green-500' },
            { name: 'The Blitzkrieg Strategy', progress: 75, color: 'text-green-500' },
            { name: 'Axis Powers', progress: 72, color: 'text-green-500' },
            { name: 'Major Battles', progress: 70, color: 'text-green-500' }
        ],
        weakTopics: [
            { name: 'Pacific Theater', progress: 35, color: 'text-orange-500' },
            { name: 'The Holocaust', progress: 42, color: 'text-orange-500' },
            { name: 'Post-War Reconstruction', progress: 48, color: 'text-orange-500' },
            { name: 'Nuclear Age Beginnings', progress: 50, color: 'text-orange-500' }
        ]
    },
    {
        id: 'newtons-laws-of-motion',
        title: "Newton's Laws of Motion",
        progress: 30,
        tag: 'Science',
        status: 'Ongoing',
        lessons: '3/10',
        lastStudied: '3 days ago',
        lastStudiedAt: Date.now() - 3 * 24 * 60 * 60 * 1000,
        icon: 'i-lucide-microscope',
        isPinned: true,
        learningGoal: 'Exam Prep',
        createdBy: { id: '1', name: 'Alex Johnson', avatar: 'https://i.pravatar.cc/100?u=1', role: 'Owner', topicsCount: 24 },
        viewersCount: 8,
        completedCount: 2,
        examInfo: { name: 'Physics Midterm - Unit 1', daysAway: 7 },
        stats: [
            { label: 'Master (Overall)', value: '30%', subtext: 'from 15% on Day 1', icon: 'i-lucide-award' },
            { label: 'Pass Probability', value: '35%', subtext: 'at current pace', icon: 'i-lucide-line-chart' },
            { label: 'Sessions This Week', value: '5', subtext: '4 hrs total', icon: 'i-lucide-calendar-days' }
        ],
        strongTopics: [
            { name: 'Law of Inertia', progress: 65, color: 'text-green-500' },
            { name: 'Mass vs Weight', progress: 60, color: 'text-green-500' },
            { name: 'Velocity Concepts', progress: 58, color: 'text-green-500' },
            { name: 'Friction Basics', progress: 55, color: 'text-green-500' }
        ],
        weakTopics: [
            { name: 'F=ma Calculations', progress: 25, color: 'text-orange-500' },
            { name: 'Action & Reaction', progress: 28, color: 'text-orange-500' },
            { name: 'Acceleration Curves', progress: 32, color: 'text-orange-500' },
            { name: 'Force Diagrams', progress: 35, color: 'text-orange-500' }
        ]
    },
    {
        id: 'spanish-basics',
        title: 'Spanish Basics',
        progress: 65,
        tag: 'Language',
        status: 'Ongoing',
        lessons: '8/12',
        lastStudied: 'Yesterday',
        lastStudiedAt: Date.now() - 25 * 60 * 60 * 1000,
        icon: 'i-lucide-languages',
        isPinned: false,
        learningGoal: 'Mastery',
        createdBy: { id: '4', name: 'Charlie Williams', avatar: 'https://i.pravatar.cc/100?u=4', role: 'Admin', topicsCount: 5 },
        viewersCount: 24,
        completedCount: 8,
        examInfo: { name: 'DELE A1 Certification', daysAway: 60 },
        stats: [
            { label: 'Master (Overall)', value: '65%', subtext: 'from 40% on Day 1', icon: 'i-lucide-award' },
            { label: 'Pass Probability', value: '68%', subtext: 'at current pace', icon: 'i-lucide-line-chart' },
            { label: 'Sessions This Week', value: '10', subtext: '12 hrs total', icon: 'i-lucide-calendar-days' }
        ],
        strongTopics: [
            { name: 'Essential Greetings', progress: 88, color: 'text-green-500' },
            { name: 'Numbers 1-100', progress: 85, color: 'text-green-500' },
            { name: 'Common Nouns', progress: 82, color: 'text-green-500' },
            { name: 'Family Members', progress: 78, color: 'text-green-500' }
        ],
        weakTopics: [
            { name: 'Verb Conjugation', progress: 40, color: 'text-orange-500' },
            { name: 'Gender Agreement', progress: 45, color: 'text-orange-500' },
            { name: 'Sentence Structure', progress: 52, color: 'text-orange-500' },
            { name: 'Future Tense', progress: 55, color: 'text-orange-500' }
        ]
    },
    {
        id: 'greek-mythology',
        title: 'Greek Mythology',
        progress: 100,
        tag: 'History',
        status: 'Completed',
        lessons: '8/8',
        lastStudied: '1 week ago',
        lastStudiedAt: Date.now() - 7 * 24 * 60 * 60 * 1000,
        icon: 'i-lucide-scroll',
        isPinned: false,
        learningGoal: 'Overview',
        createdBy: { id: '1', name: 'Alex Johnson', avatar: 'https://i.pravatar.cc/100?u=1', role: 'Owner', topicsCount: 24 },
        viewersCount: 156,
        completedCount: 42,
        examInfo: { name: 'Classical Studies Final', daysAway: 12 },
        stats: [
            { label: 'Master (Overall)', value: '100%', subtext: 'from 80% on Day 1', icon: 'i-lucide-award' },
            { label: 'Pass Probability', value: '98%', subtext: 'at current pace', icon: 'i-lucide-line-chart' },
            { label: 'Sessions This Week', value: '2', subtext: '1 hr total', icon: 'i-lucide-calendar-days' }
        ],
        strongTopics: [
            { name: 'The 12 Olympians', progress: 100, color: 'text-green-500' },
            { name: 'Creation Myths', progress: 100, color: 'text-green-500' },
            { name: 'Heroes & Monsters', progress: 98, color: 'text-green-500' },
            { name: 'Trojan War', progress: 95, color: 'text-green-500' }
        ],
        weakTopics: [
            { name: 'Minor Deities', progress: 85, color: 'text-orange-500' },
            { name: 'Genealogy of Gods', progress: 88, color: 'text-orange-500' },
            { name: 'Epic Poems', progress: 90, color: 'text-orange-500' },
            { name: 'Regional Variants', progress: 92, color: 'text-orange-500' }
        ]
    },
    {
        id: 'advanced-javascript',
        title: 'Advanced JavaScript',
        progress: 15,
        tag: 'Science',
        status: 'Ongoing',
        lessons: '2/12',
        lastStudied: '5 hrs ago',
        lastStudiedAt: Date.now() - 5 * 60 * 60 * 1000,
        icon: 'i-lucide-code',
        isPinned: false,
        learningGoal: 'Project Based',
        createdBy: { id: '5', name: 'David Brown', avatar: 'https://i.pravatar.cc/100?u=5', role: 'Admin', topicsCount: 12 },
        viewersCount: 3,
        completedCount: 1,
        examInfo: { name: 'Frontend Engineering Cert', daysAway: 30 },
        stats: [
            { label: 'Master (Overall)', value: '15%', subtext: 'from 5% on Day 1', icon: 'i-lucide-award' },
            { label: 'Pass Probability', value: '20%', subtext: 'at current pace', icon: 'i-lucide-line-chart' },
            { label: 'Sessions This Week', value: '15', subtext: '20 hrs total', icon: 'i-lucide-calendar-days' }
        ],
        strongTopics: [
            { name: 'Arrow Functions', progress: 45, color: 'text-green-500' },
            { name: 'Array Methods', progress: 40, color: 'text-green-500' },
            { name: 'ES6 Modules', progress: 35, color: 'text-green-500' },
            { name: 'Destructuring', progress: 30, color: 'text-green-500' }
        ],
        weakTopics: [
            { name: 'Prototypes', progress: 5, color: 'text-orange-500' },
            { name: 'Event Loop', progress: 8, color: 'text-orange-500' },
            { name: 'Closures', progress: 12, color: 'text-orange-500' },
            { name: 'Memory Management', progress: 15, color: 'text-orange-500' }
        ]
    },
]

export const TOPIC_CONTENT_MAP: Record<string, {
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
                    aiFinalComment: "Small move, but real. Two more sessions on this topic, and you'll reach Level 4 mastery — which historically corresponds to a 88% pass probability on the SAT Math Prep."
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
                    aiFinalComment: "Small move, but real. Three more sessions on this topic, and you'll reach Level 3 mastery — which historically corresponds to a 67% pass probability on the Frontend Engineering Certification."
                }
            }
        ]
    }
}
