export const learnerSteps = [
    {
        title: "Personalized Onboarding",
        description: "Access your dashboard to see your active learning topics. If you belong to an organization, your topics are safely organized within your institution's specific workspaces.",
        status: "Step 1",
    },
    {
        title: "Topic Analysis & Assessment",
        description: "Upload materials or provide a title. The AI Engine extracts key objectives and generates a diagnostic quiz to measure your existing knowledge base.",
        status: "Step 2",
    },
    {
        title: "AI-Crafted Learning Path",
        description: "Follow a non-linear lesson timeline generated specifically for you. The path adapts in real-time as you complete lessons and demonstrate mastery.",
        status: "Step 3",
    },
    {
        title: "Interactive AI Tutoring",
        description: "Use the integrated AI Tutor for instant clarifications. The tutor has access to your specific topic context, providing highly relevant hints and explanations.",
        status: "Step 4",
    },
    {
        title: "Certification & Completion",
        description: "Verify your mastery through a final assessment. Upon completion, your progress is logged in the activity audit, and you can move on to your next objective.",
        status: "Step 5",
    },
];

export const aiEnginePhases = [
    {
        title: "Knowledge Extraction",
        description: "The engine uses advanced NLP to parse your documents, identifying core concepts, relationships, and learning hierarchies.",
        status: "Phase 1",
    },
    {
        title: "Diagnostic Profiling",
        description: "By analyzing your quiz scores and self-reported confidence levels, the AI builds a unique 'Knowledge Map' of your current expertise.",
        status: "Phase 2",
    },
    {
        title: "Path Personalization",
        description: "The AI crafts a custom learning sequence, prioritizing your knowledge gaps to ensure you master the topic in the shortest time possible.",
        status: "Phase 3",
    },
    {
        title: "Global Resource Balancing",
        description: "The engine monitors token usage across the platform, ensuring optimal performance for all users while respecting organization-level limits.",
        status: "Phase 4",
    },
];

export const administratorTasks = [
    {
        title: "Organization Lifecycle",
        description: "Onboard institutions, manage their active status, and use Suspend/Activate toggles to control platform access at scale.",
        status: "Task 1",
    },
    {
        title: "Subscription Management",
        description: "Define platform-wide Plans (Free, Pro, Enterprise) with custom pricing, token limits, and feature inclusions in the dedicated Plans dashboard.",
        status: "Task 2",
    },
    {
        title: "Billing & Usage Auditing",
        description: "Monitor real-time token consumption across all workspaces. Use the Stripe integration to manage institutional payment methods and invoice history.",
        status: "Task 3",
    },
    {
        title: "Workspace Orchestration",
        description: "Coordinate institutional departments by creating Workspaces, inviting members, and assigning role-based access controls.",
        status: "Task 4",
    },
];

export const appWalkthrough = [
    {
        title: "Institutional Setup",
        description: "Superadmins create the Organization and set the initial subscription tier. This establishes the foundation for all subsequent activities.",
        icon: "i-lucide-building-2",
        status: "Step 1"
    },
    {
        title: "Collaborative Workspaces",
        description: "Admins build out specialized workspaces for teams or departments, ensuring learners have a structured environment for their topics.",
        icon: "i-lucide-users",
        status: "Step 2"
    },
    {
        title: "AI Knowledge Intake",
        description: "Learners feed the AI with study materials. The engine processes these inputs to build a comprehensive learning model of the topic.",
        icon: "i-lucide-brain-circuit",
        status: "Step 3"
    },
    {
        title: "Diagnostic Gap Analysis",
        description: "A tailored assessment identifies exactly where the learner stands, pinpointing both strengths and critical knowledge gaps.",
        icon: "i-lucide-clipboard-check",
        status: "Step 4"
    },
    {
        title: "The Mastery Loop",
        description: "Learners move through personalized lessons with AI-tutor support, continuously refining their path based on real-time performance.",
        icon: "i-lucide-refresh-cw",
        status: "Step 5"
    },
    {
        title: "Administrative Oversight",
        description: "Platform owners monitor the entire ecosystem, adjusting plans, managing billing, and ensuring the platform's commercial health.",
        icon: "i-lucide-shield-check",
        status: "Step 6"
    }
];
