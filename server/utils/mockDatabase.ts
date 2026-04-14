import type { Topic } from '~/types/topic'

export interface LessonOverview {
  id: string;
  topicId: string;
  title: string;
  duration: string;
  status: string;
  type: string;
  icon: string;
  color: string;
  summary: string;
}

export interface LessonContent {
  id: string;
  topicId: string;
  title: string;
  description: string;
  sections: Array<{
    title: string;
    content: string;
    aiInsight: string | null;
  }>;
}

export interface Assessment {
  id: string;
  lessonId: string;
  title: string;
  questions: Array<{
    id: string | number;
    text: string;
    options: Array<{ id: string; label: string }>;
    correct: string;
  }>;
}

const basicTopicsData = [
  { title: 'Introduction to Algebra', progress: 80, tag: 'Math', status: 'Ongoing', lastStudied: '2 hrs ago', lastStudiedAt: Date.now() - 2 * 60 * 60 * 1000, icon: 'i-lucide-function-square', isPinned: true },
  { title: 'World War II Overview', progress: 55, tag: 'History', status: 'Ongoing', lastStudied: '1 day ago', lastStudiedAt: Date.now() - 24 * 60 * 60 * 1000, icon: 'i-lucide-landmark', isPinned: false },
  { title: "Newton's Laws of Motion", progress: 30, tag: 'Science', status: 'Ongoing', lastStudied: '3 days ago', lastStudiedAt: Date.now() - 3 * 24 * 60 * 60 * 1000, icon: 'i-lucide-microscope', isPinned: true },
  { title: 'Spanish Basics', progress: 65, tag: 'Language', status: 'Ongoing', lastStudied: 'Yesterday', lastStudiedAt: Date.now() - 25 * 60 * 60 * 1000, icon: 'i-lucide-languages', isPinned: false },
  { title: 'Reading Comprehension', progress: 90, tag: 'English', status: 'Completed', lastStudied: 'Just now', lastStudiedAt: Date.now() - 5 * 60 * 1000, icon: 'i-lucide-book-open', isPinned: false },
  { title: 'Organic Chemistry', progress: 45, tag: 'Science', status: 'Ongoing', lastStudied: '4 days ago', lastStudiedAt: Date.now() - 4 * 24 * 60 * 60 * 1000, icon: 'i-lucide-beaker', isPinned: false },
  { title: 'Greek Mythology', progress: 100, tag: 'History', status: 'Completed', lastStudied: '1 week ago', lastStudiedAt: Date.now() - 7 * 24 * 60 * 60 * 1000, icon: 'i-lucide-scroll', isPinned: false },
  { title: 'Advanced JavaScript', progress: 15, tag: 'Science', status: 'Ongoing', lastStudied: '5 hrs ago', lastStudiedAt: Date.now() - 5 * 60 * 60 * 1000, icon: 'i-lucide-code', isPinned: false },
  { title: 'French Vocabulary', progress: 40, tag: 'Language', status: 'Ongoing', lastStudied: '2 days ago', lastStudiedAt: Date.now() - 2 * 24 * 60 * 60 * 1000, icon: 'i-lucide-languages', isPinned: false },
  { title: 'Business English', progress: 20, tag: 'English', status: 'Archived', lastStudied: '1 month ago', lastStudiedAt: Date.now() - 30 * 24 * 60 * 60 * 1000, icon: 'i-lucide-briefcase', isPinned: false },
  { title: 'Geometry Fundamentals', progress: 70, tag: 'Math', status: 'Ongoing', lastStudied: 'Yesterday', lastStudiedAt: Date.now() - 26 * 60 * 60 * 1000, icon: 'i-lucide-shapes', isPinned: false },
  { title: 'Human Anatomy', progress: 100, tag: 'Science', status: 'Completed', lastStudied: '2 weeks ago', lastStudiedAt: Date.now() - 14 * 24 * 60 * 60 * 1000, icon: 'i-lucide-activity', isPinned: false },
  { title: 'Renaissance Art', progress: 25, tag: 'History', status: 'Ongoing', lastStudied: '3 days ago', lastStudiedAt: Date.now() - 3 * 24 * 60 * 60 * 1000, icon: 'i-lucide-palette', isPinned: false },
  { title: 'Poetry Analysis', progress: 50, tag: 'English', status: 'Ongoing', lastStudied: '6 hrs ago', lastStudiedAt: Date.now() - 6 * 60 * 60 * 1000, icon: 'i-lucide-pen-tool', isPinned: false },
];

const lessonsTemplate = [
    { title: "Introduction & Fundamentals", duration: "15 min", status: "completed", type: "video", icon: "i-lucide-play", color: "green", summary: "A high-level overview generated from your 'Chapter 1' PDF upload." },
    { title: "Core Concepts Drill", duration: "30 min", status: "completed", type: "exercise", icon: "i-lucide-dumbbell", color: "green", summary: "Interactive practice based on the key terms extracted from the core materials." },
    { title: "Advanced Scenarios", duration: "45 min", status: "current", type: "reading", icon: "i-lucide-book-open", color: "primary", summary: "Deep dive into complex edge cases, customized for your selected goal." },
    { title: "Real-world Applications", duration: "25 min", status: "locked", type: "project", icon: "i-lucide-briefcase", color: "neutral", summary: "Apply what you've parsed from the uploaded slide deck into a mini-project." },
    { title: "Final Assessment", duration: "60 min", status: "current", type: "quiz", icon: "i-lucide-clipboard-check", color: "neutral", summary: "Comprehensive exam generated to test your mastery of all uploaded content." }
];

const TOPIC_CONTENT_MAP: Record<string, {
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
                    sections: [
                        { title: "The Inverse Operation", content: "To undo addition, you use subtraction. To undo multiplication, you use division. These are called inverse operations.", aiInsight: "Mastering this now will make multi-step equations much easier later." }
                    ]
                },
                assessment: {
                    title: "One-Step Challenge",
                    questions: [
                        { id: 1, text: "Solve for x: x + 15 = 40", options: [{id: 'a', label: 'x = 55'}, {id: 'b', label: 'x = 25'}, {id: 'c', label: 'x = 15'}, {id: 'd', label: 'x = 30'}], correct: 'b' },
                        { id: 2, text: "What is the inverse operation of multiplication?", options: [{id: 'a', label: 'Addition'}, {id: 'b', label: 'Subtraction'}, {id: 'c', label: 'Division'}, {id: 'd', label: 'Exponents'}], correct: 'c' }
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
                    sections: [
                        { title: "Naval Supremacy", content: "Aircraft carriers replaced battleships as the most important vessels in the fleet.", aiInsight: "Note: The battle of Midway is often cited as the definitive turning point." }
                    ]
                },
                assessment: {
                    title: "Pacific Mastery",
                    questions: [
                        { id: 1, text: "Which battle is considered the turning point of the Pacific War?", options: [{id: 'a', label: 'Pearl Harbor'}, {id: 'b', label: 'Iwo Jima'}, {id: 'c', label: 'Midway'}, {id: 'd', label: 'Guadalcanal'}], correct: 'c' },
                        { id: 2, text: "True or False: Island hopping was a strategy to capture every single island in the Pacific.", options: [{id: 'true', label: 'True'}, {id: 'false', label: 'False'}], correct: 'false' }
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
                    sections: [
                        { title: "The Calculation", content: "Force equals mass times acceleration. This simple formula is the foundation of classical mechanics.", aiInsight: "Ensure students understand the vector nature of Force and Acceleration." }
                    ]
                },
                assessment: {
                    title: "Physics Lab Quiz",
                    questions: [
                        { id: 1, text: "If you double the force on an object but keep the mass the same, what happens to acceleration?", options: [{id: 'a', label: 'It stays the same'}, {id: 'b', label: 'It doubles'}, {id: 'c', label: 'It is cut in half'}, {id: 'd', label: 'It quadruples'}], correct: 'b' },
                        { id: 2, text: "A 10kg object accelerates at 2m/s². What is the net force applied?", options: [{id: 'a', label: '5N'}, {id: 'b', label: '10N'}, {id: 'c', label: '20N'}, {id: 'd', label: '40N'}], correct: 'c' }
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
                    sections: [
                        { title: "The -AR Pattern", content: "Hablar (to speak) becomes Hablo, Hablas, Habla. Once you know one, you know hundreds of others.", aiInsight: null }
                    ]
                },
                assessment: {
                    title: "Verbal Drill",
                    questions: [
                        { id: 1, text: "How do you say 'Good Morning' in Spanish?", options: [{id: 'a', label: 'Buenas Noches'}, {id: 'b', label: 'Hola'}, {id: 'c', label: 'Buenos Días'}, {id: 'd', label: 'Mucho Gusto'}], correct: 'c' },
                        { id: 2, text: "What is the correct conjugation of 'Yo' for the verb 'Comer' (to eat)?", options: [{id: 'a', label: 'Comes'}, {id: 'b', label: 'Como'}, {id: 'c', label: 'Comen'}, {id: 'd', label: 'Comemos'}], correct: 'b' }
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
                    sections: [
                        { title: "Context Clues", content: "Adjectives and verbs choices tip the author's hand. 'Strolled' vs 'Scurried' changes the entire mood of a scene.", aiInsight: null }
                    ]
                },
                assessment: {
                    title: "Subtext Analysis",
                    questions: [
                        { id: 1, text: "An author describes a room as 'orderly and sterile.' What is the most likely intended tone?", options: [{id: 'a', label: 'Whimsical'}, {id: 'b', label: 'Cozy'}, {id: 'c', label: 'Cold/Clinical'}, {id: 'd', label: 'Angry'}], correct: 'c' }
                    ]
                }
            }
        ]
    }
};

const slugify = (text: string) => text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')

function generateMockData() {
    let topics: Topic[] = [];
    let lessons: LessonOverview[] = [];
    let lessonContents: LessonContent[] = [];
    let assessments: Assessment[] = [];

    basicTopicsData.forEach((t, tIndex) => {
        const topicId = slugify(t.title || 'topic')
        
        // Use custom content if available, otherwise fallback to template
        const customContent = TOPIC_CONTENT_MAP[topicId];
        const lessonsToSeed = customContent ? customContent.lessons : lessonsTemplate;
        
        const totalLessons = lessonsToSeed.length;
        const completedLessons = Math.max(1, Math.floor((t.progress / 100) * totalLessons));

        topics.push({
            ...t,
            id: topicId,
            lessons: `${completedLessons}/${totalLessons}`
        });

        lessonsToSeed.forEach((l, lIndex) => {
            const lessonId = `${topicId}-${slugify(l.title || 'lesson')}`
            
            // 1. Generate Lesson Overview
            lessons.push({
                title: l.title || "Untitled Lesson",
                duration: l.duration || "15 min",
                status: (lIndex < completedLessons) ? "completed" : (lIndex === completedLessons ? "current" : "locked"),
                type: l.type || "reading",
                icon: l.icon || "i-lucide-book-open",
                color: l.color || "primary",
                summary: l.summary || "Default lesson summary generated by AI.",
                id: lessonId,
                topicId: topicId,
            });

            // 2. Generate Lesson Content
            const content = (l as any).content || {};
            lessonContents.push({
                id: lessonId,
                topicId: topicId,
                title: l.title || "Untitled Lesson",
                description: content.description || `Based on the materials you uploaded for ${t.title}. This structured lesson will quickly bring you up to speed without the fluff.`,
                sections: content.sections || [
                    {
                        title: "1. Key Fundamentals",
                        content: `In this section, we cover the core concepts of ${t.title} derived from your study material. Focus on the relationships between the primary entities described in your chapter review.`,
                        aiInsight: "Focus on the bolded terms in your PDF for maximum exam retention."
                    }
                ]
            });

            // 3. Generate Assessment
            if (l.type === 'quiz' || l.type === 'exercise' || (l as any).assessment) {
              const customAssess = (l as any).assessment;
              assessments.push({
                  id: `assess-${lessonId}`,
                  lessonId: lessonId,
                  title: customAssess?.title || l.title || "Assessment",
                  questions: customAssess?.questions || [
                      {
                          id: 1,
                          text: `According to the provided materials for ${t.title}, what is the most important concept to remember?`,
                          options: [
                              { id: 'a', label: 'The primary definition found in the summary' },
                              { id: 'b', label: 'The relationship between variables' },
                              { id: 'c', label: 'The historical context provided in the intro' },
                              { id: 'd', label: 'All of the above' }
                          ],
                          correct: 'd'
                      }
                  ]
              });
            }
        });
    });

    return { topics, lessons, lessonContents, assessments };
}

export const db = generateMockData();
