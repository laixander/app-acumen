import type { Topic, LessonOverview, LessonContent, Assessment, ActivityLog, SessionLog } from '~/types/topic'

export const MOCK_TOPICS: Topic[] = [
    { id: 'introduction-to-algebra', title: 'Introduction to Algebra', progress: 80, tag: 'Math', status: 'Ongoing', lessons: '10/12', lastStudied: '2 hrs ago', lastStudiedAt: Date.now() - 2 * 60 * 60 * 1000, icon: 'i-lucide-function-square', isPinned: true, learningGoal: 'Mastery' },
    { id: 'world-war-ii-overview', title: 'World War II Overview', progress: 55, tag: 'History', status: 'Ongoing', lessons: '6/11', lastStudied: '1 day ago', lastStudiedAt: Date.now() - 24 * 60 * 60 * 1000, icon: 'i-lucide-landmark', isPinned: false, learningGoal: 'Overview' },
    { id: 'newtons-laws-of-motion', title: "Newton's Laws of Motion", progress: 30, tag: 'Science', status: 'Ongoing', lessons: '3/10', lastStudied: '3 days ago', lastStudiedAt: Date.now() - 3 * 24 * 60 * 60 * 1000, icon: 'i-lucide-microscope', isPinned: true, learningGoal: 'Exam Prep' },
    { id: 'spanish-basics', title: 'Spanish Basics', progress: 65, tag: 'Language', status: 'Ongoing', lessons: '8/12', lastStudied: 'Yesterday', lastStudiedAt: Date.now() - 25 * 60 * 60 * 1000, icon: 'i-lucide-languages', isPinned: false, learningGoal: 'Mastery' },
    { id: 'greek-mythology', title: 'Greek Mythology', progress: 100, tag: 'History', status: 'Completed', lessons: '8/8', lastStudied: '1 week ago', lastStudiedAt: Date.now() - 7 * 24 * 60 * 60 * 1000, icon: 'i-lucide-scroll', isPinned: false, learningGoal: 'Overview' },
    { id: 'advanced-javascript', title: 'Advanced JavaScript', progress: 15, tag: 'Science', status: 'Ongoing', lessons: '2/12', lastStudied: '5 hrs ago', lastStudiedAt: Date.now() - 5 * 60 * 60 * 1000, icon: 'i-lucide-code', isPinned: false, learningGoal: 'Project Based' },
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
                        { id: 2, text: "What is the inverse operation of multiplication?", options: [{ id: 'a', label: 'Addition' }, { id: 'b', label: 'Subtraction' }, { id: 'c', label: 'Division' }, { id: 'd', label: 'Exponents' }], correct: 'c' }
                    ]
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
                        { id: 2, text: "True or False: Island hopping was a strategy to capture every single island in the Pacific.", options: [{ id: 'true', label: 'True' }, { id: 'false', label: 'False' }], correct: 'false' }
                    ]
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
                        { id: 2, text: "A 10kg object accelerates at 2m/s². What is the net force applied?", options: [{ id: 'a', label: '5N' }, { id: 'b', label: '10N' }, { id: 'c', label: '20N' }, { id: 'd', label: '40N' }], correct: 'c' }
                    ]
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
                        { id: 2, text: "What is the correct conjugation of 'Yo' for the verb 'Comer' (to eat)?", options: [{ id: 'a', label: 'Comes' }, { id: 'b', label: 'Como' }, { id: 'c', label: 'Comen' }, { id: 'd', label: 'Comemos' }], correct: 'b' }
                    ]
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
                        { id: 1, text: "An author describes a room as 'orderly and sterile.' What is the most likely intended tone?", options: [{ id: 'a', label: 'Whimsical' }, { id: 'b', label: 'Cozy' }, { id: 'c', label: 'Cold/Clinical' }, { id: 'd', label: 'Angry' }], correct: 'c' }
                    ]
                }
            }
        ]
    }
}

export const calculateInterval = (totalLessons: number) => {
    if (totalLessons <= 5) return 2
    if (totalLessons <= 8) return 3
    return 5
}

export const generateBaseLessonsForTopic = (topicId: string, topicTitle: string): {
    baseLessons: LessonOverview[],
    baseContents: LessonContent[],
    baseAssessments: Assessment[]
} => {
    const custom = TOPIC_CONTENT_MAP[topicId]
    const baseLessons: LessonOverview[] = []
    const baseContents: LessonContent[] = []
    const baseAssessments: Assessment[] = []

    if (custom) {
        custom.lessons.forEach((l, idx) => {
            const lessonId = l.id || `${topicId}-lesson-${idx + 1}`
            const status = idx === 0 ? 'current' : 'locked'

            baseLessons.push({
                id: lessonId,
                topicId,
                title: l.title || `Lesson ${idx + 1}`,
                duration: l.duration || '15 min',
                status: status as any,
                type: l.type || 'reading',
                icon: l.icon || 'i-lucide-book-open',
                color: l.color || 'primary',
                summary: l.summary || 'Custom lesson content.'
            } as LessonOverview)

            baseContents.push({
                id: lessonId,
                topicId,
                title: l.title || `Lesson ${idx + 1}`,
                description: l.content?.description || `Detailed study materials for ${l.title}.`,
                lessonTypes: l.content?.lessonTypes || ['Reading', 'Video'],
                sections: l.content?.sections || [
                    { title: 'Overview', content: 'Study materials for this lesson.', aiInsight: null }
                ]
            } as LessonContent)

            if (l.assessment) {
                baseAssessments.push({
                    id: `assess-${lessonId}`,
                    lessonId,
                    topicId,
                    title: l.assessment.title || `Assessment: ${l.title}`,
                    questions: l.assessment.questions || []
                } as Assessment)
            }
        })
    } else {
        const count = 8 + Math.floor(Math.random() * 5)
        for (let i = 1; i <= count; i++) {
            const lessonId = `${topicId}-lesson-${i}`
            const status = i === 1 ? 'current' : 'locked'

            baseLessons.push({
                id: lessonId,
                topicId,
                title: `Lesson ${i}: Understanding ${topicTitle}`,
                duration: '20 min',
                status: status as any,
                type: 'reading',
                icon: 'i-lucide-book-open',
                color: i === 1 ? 'primary' : 'neutral',
                summary: `Essential concepts for ${topicTitle} - part ${i}.`
            })

            baseContents.push({
                id: lessonId,
                topicId,
                title: `Lesson ${i}: ${topicTitle}`,
                description: `Deep dive into the core principles of ${topicTitle}.`,
                lessonTypes: ['Reading', 'Video'],
                sections: [
                    { title: 'Core Objectives', content: 'AI-generated content for this section.', aiInsight: 'Focus on foundations.' }
                ]
            } as LessonContent)
        }
    }

    return { baseLessons, baseContents, baseAssessments }
}

export const generateReviewContent = (id: string, topicId: string, topicTitle: string, isFinal: boolean): LessonContent => {
    return {
        id,
        topicId,
        title: isFinal ? 'Final Topic Review' : 'Checkpoint Review',
        description: isFinal
            ? `You've reached the end of ${topicTitle}! This final review session will help you synthesize everything you've learned before the final assessment.`
            : `Great job reaching this milestone in ${topicTitle}. Take a moment to review core concepts.`,
        lessonTypes: ['Reading'],
        sections: [
            {
                title: "Key Takeaways",
                content: "Review the core principles discussed in the preceding lessons. Focus on how these concepts integrate with your overall learning objectives.",
                aiInsight: "This assessment will specifically test your ability to apply these concepts in combined scenarios."
            },
            {
                title: "Quick Recap",
                content: "Ensure you are comfortable with the terminology and logic flow before proceeding.",
                aiInsight: null
            }
        ],
        assessmentId: id
    }
}

export const injectAssessmentsIntoTimeline = (
    topicId: string,
    topicTitle: string,
    baseLessons: LessonOverview[],
    completedCount: number = 0,
    totalCount: number = 0,
    isTopicComplete: boolean = false,
    predefinedAssessments: Assessment[] = []
) => {
    const totalBaseLessons = baseLessons.filter(l => l.type !== 'quiz').length
    const interval = calculateInterval(totalBaseLessons)

    const newTimeline: LessonOverview[] = []
    const newAssessments: Assessment[] = [...predefinedAssessments]
    const newContents: LessonContent[] = []
    let baseCount = 0

    baseLessons.forEach((lesson, index) => {
        newTimeline.push(lesson)
        baseCount++

        // Logic for specialized lessons that might already have assessments
        const existingAssess = predefinedAssessments.find(a => a.lessonId === lesson.id)
        if (existingAssess) {
            lesson.assessmentId = existingAssess.id
        }

        if (baseCount % interval === 0 && index !== baseLessons.length - 1) {
            const quizId = `${topicId}-quiz-${baseCount}`
            
            // Calculate precise status
            let status: 'completed' | 'current' | 'locked' = 'locked'
            let color: string = 'neutral'
            
            if (baseCount < completedCount) {
                status = 'completed'
                color = 'green'
            } else if (baseCount === completedCount) {
                status = 'current'
                color = 'orange'
            }

            newTimeline.push({
                id: quizId,
                topicId,
                title: `Checkpoint Quiz ${Math.ceil(baseCount / interval)}`,
                duration: '10 min',
                status,
                type: 'Assessment',
                icon: 'i-lucide-award',
                color,
                summary: `Review milestone for the last ${interval} lessons.`
            })

            const review = generateReviewContent(quizId, topicId, topicTitle, false)
            newContents.push(review)

            newAssessments.push({
                id: quizId,
                lessonId: quizId,
                topicId,
                title: `Checkpoint Quiz: ${topicTitle}`,
                questions: [
                    {
                        id: 1,
                        text: `What is the primary theme of the last ${interval} lessons?`,
                        options: [{ id: '1', label: 'Correct Answer' }, { id: '2', label: 'Wrong' }, { id: '3', label: 'Wrong' }],
                        correct: '1'
                    },
                    {
                        id: 2,
                        text: `How does this relate to ${topicTitle}?`,
                        options: [{ id: '1', label: 'Related' }, { id: '2', label: 'Unrelated' }],
                        correct: '1'
                    }
                ]
            })
        }
    })

    // Add Final Assessment
    const finalId = `${topicId}-final`
    let finalStatus: 'completed' | 'current' | 'locked' = 'locked'
    let finalColor: string = 'neutral'

    if (isTopicComplete) {
        finalStatus = 'completed'
        finalColor = 'green'
    } else if (completedCount === totalCount) {
        finalStatus = 'current'
        finalColor = 'purple'
    }

    newTimeline.push({
        id: finalId,
        topicId,
        title: 'Final Assessment',
        duration: '25 min',
        status: finalStatus,
        type: 'Assessment',
        icon: 'i-lucide-graduation-cap',
        color: finalColor,
        summary: 'Comprehensive evaluation of the entire topic.'
    })

    newContents.push(generateReviewContent(finalId, topicId, topicTitle, true))

    newAssessments.push({
        id: finalId,
        lessonId: finalId,
        topicId,
        title: `Final Assessment: ${topicTitle}`,
        questions: Array.from({ length: 5 }, (_, idx) => ({
            id: idx + 1,
            text: `Advanced evaluation question ${idx + 1} for ${topicTitle}.`,
            options: [
                { id: '1', label: 'Mastery Answer' },
                { id: '2', label: 'Distractor A' },
                { id: '3', label: 'Distractor B' },
                { id: '4', label: 'Distractor C' }
            ],
            correct: '1'
        }))
    })

    return { newTimeline, newAssessments, newContents }
}

export const MOCK_ACTIVITY_LOGS: ActivityLog[] = [
    {
        id: 'log-1',
        topicId: 'introduction-to-algebra',
        topicTitle: 'Introduction to Algebra',
        lessonId: 'introduction-to-algebra-lesson-1',
        lessonTitle: 'Understanding Variables',
        type: 'Lesson',
        durationMinutes: 10,
        completedAt: Date.now() - (2 * 24 * 60 * 60 * 1000) // 2 days ago
    },
    {
        id: 'log-2',
        topicId: 'world-war-ii-overview',
        topicTitle: 'World War II Overview',
        lessonId: 'world-war-ii-overview-lesson-1',
        lessonTitle: 'The Road to War',
        type: 'Lesson',
        durationMinutes: 15,
        completedAt: Date.now() - (1 * 24 * 60 * 60 * 1000) // 1 day ago
    },
    {
        id: 'log-3',
        topicId: 'introduction-to-algebra',
        topicTitle: 'Introduction to Algebra',
        lessonId: 'introduction-to-algebra-lesson-2',
        lessonTitle: 'Solving One-Step Equations',
        type: 'Lesson',
        durationMinutes: 20,
        completedAt: Date.now() - (6 * 60 * 60 * 1000) // 6 hours ago
    },
    {
        id: 'log-4',
        topicId: 'advanced-javascript',
        topicTitle: 'Advanced JavaScript',
        lessonId: 'advanced-javascript-lesson-1',
        lessonTitle: 'Closures & Scope',
        type: 'Assessment',
        durationMinutes: 25,
        completedAt: Date.now() - (2 * 60 * 60 * 1000) // 2 hours ago
    },
    {
        id: 'log-5',
        topicId: 'spanish-basics',
        topicTitle: 'Spanish Basics',
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
