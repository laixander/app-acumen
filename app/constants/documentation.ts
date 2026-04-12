export const apiEndpoints = [
    {
        method: "POST",
        path: "/api/auth/login",
        description: "Securely authenticate users and retrieve access tokens.",
    },
    {
        method: "GET",
        path: "/api/topics",
        description: "List all active and completed learning topics for the user.",
    },
    {
        method: "POST",
        path: "/api/topics",
        description: "Create a new topic with title, description, and learning material URLs.",
    },
    {
        method: "GET",
        path: "/api/assessments/:id",
        description: "Fetch an AI-generated assessment for a specific topic.",
    },
    {
        method: "POST",
        path: "/api/assessments/:id/submit",
        description: "Submit assessment answers along with confidence levels for path adaptation.",
    },
    {
        method: "GET",
        path: "/api/lessons/:topicId",
        description: "Retrieve the personalized, ordered lesson plan built by the AI Engine.",
    },
];

export const dataModels = [
    {
        name: "User",
        fields: "id, name, email, createdAt, updatedAt",
    },
    {
        name: "Topic",
        fields: "id, user_id, title, description, duration, availability, status",
    },
    {
        name: "Material",
        fields: "id, topic_id, file_url, type, processedAt",
    },
    {
        name: "Assessment",
        fields: "id, topic_id, type, score, adaptivePathId",
    },
    {
        name: "Question",
        fields: "id, assessment_id, question_text, context_snippet",
    },
    {
        name: "Answer",
        fields: "id, question_id, answer_text, confidence_level, is_correct",
    },
    {
        name: "Lesson",
        fields: "id, topic_id, title, order, content, status",
    },
];

export const workflowSteps = [
    {
        title: "Topic Creation",
        description: "Learner defines a topic, uploads study materials, and sets expected duration.",
        status: "Setup",
    },
    {
        title: "AI Analysis",
        description: "AI Engine processes materials (PDF, Text) to extract key concepts and learning objectives.",
        status: "Processing",
    },
    {
        title: "Initial Assessment",
        description: "User takes a diagnostic test. Confidence levels for each answer determine knowledge gaps.",
        status: "Diagnostic",
    },
    {
        title: "Lesson Planning",
        description: "AI builds a non-linear, adaptive lesson path focusing on weak areas identified in assessment.",
        status: "Personalization",
    },
    {
        title: "Active Learning",
        description: "Learner follows the generated timeline, completing lessons with real-time AI assistance.",
        status: "Learning",
    },
    {
        title: "Verification",
        description: "Final assessment verifies mastery. Topic is marked complete or path is adjusted.",
        status: "Complete",
    },
];

export const changelogItems = [
    {
        date: "April 12, 2026",
        version: "v1.0.8",
        title: "Experimental Asset Support & Custom Font Library",
        changes: [
            "Expanded the theme system with a comprehensive library of custom Google Fonts",
            "Implemented dynamic font switching in the theme configuration, including Inter, Outfit, Roboto Slab, and Space Grotesk",
            "Updated the Documentation module with extensive API and Data Model references",
            "Refined typography and spacing consistency across all core pages",
            "Synchronized global versioning and changelog tracking systems",
        ],
    },
    {
        date: "April 11, 2026",
        version: "v1.0.7",
        title: "Theme Management & State Persistence",
        changes: [
            "Integrated UColorModeSelect with the centralized useTheme composable for global synchronization",
            "Finalized the UI Playground theme editor with real-time style application",
            "Implemented persistent storage for user theme preferences and branding configurations",
            "Improved state management for dark/light mode across multiple layouts",
            "Optimized component rendering during theme transitions",
        ],
    },
    {
        date: "April 10, 2026",
        version: "v1.0.6",
        title: "Dashboard Implementation & Type Optimization",
        changes: [
            "Implemented a responsive two-column grid layout for the Learner Dashboard",
            "Integrated a custom, animated Bar Chart component for topic analytics",
            "Centralized component type definitions and interfaces for improved code maintainability",
            "Added dynamic data binding for dashboard statistics and interactive topic lists",
            "Optimized UI responsiveness and hover effects across the dashboard",
            "Improved dashboard information density and visual hierarchy",
        ],
    },
    {
        date: "April 10, 2026",
        version: "v1.0.5",
        title: "Documentation & Landing Page Polish",
        changes: [
            "Added subtle animated mesh background to the landing page for enhanced visual depth",
            "Refactored Footer component into a fully configurable, prop-driven reusable component",
            "Extracted hardcoded data arrays (features, pricing, testimonials, FAQs) into a dedicated constants file",
            "Improved code maintainability by separating UI logic from static data definitions",
            "Updated landing page layout with refined section spacing and typography",
        ],
    },
    {
        date: "April 09, 2026",
        version: "v1.0.4",
        title: "Component Refactoring & Reusability",
        changes: [
            "Refactored Steps component to accept data as props, replacing hardcoded implementation",
            "Extracted Testimonials section from index.vue into a standalone reusable component",
            "Moved testimonial cards to components/docs/ directory for better module organization",
            "Standardized component patterns across the application for consistency",
        ],
    },
    {
        date: "April 09, 2026",
        version: "v1.0.3",
        title: "Signup Wizard & Auth Enhancements",
        changes: [
            "Implemented multi-step signup form wizard with smooth step transitions",
            "Added 6-digit verification code input using UPinInput component",
            "Integrated real-time password strength indicator with live validation feedback",
            "Resolved UProgress component v-model and value binding conflict",
        ],
    },
    {
        date: "April 09, 2026",
        version: "v1.0.2",
        title: "Dashboard & Sidebar Improvements",
        changes: [
            "Redesigned Login page into a two-column layout with branded left panel",
            "Redesigned Landing page layout using NuxtUI components for a more structured flow",
            "Configured UDashboardSidebar with dynamic collapsed/expanded width toggling",
            "Fixed TypeScript errors in sidebar UI configuration composable",
            "Adjusted sidebar to maintain 68px fixed width when collapsed",
        ],
    },
    {
        date: "April 08, 2026",
        version: "v1.0.1",
        title: "UI Component Fixes & Icon Refactoring",
        changes: [
            "Refactored Icon component props to use TypeScript shorthand syntax",
            "Fixed Tailwind safelist shadow utility classes not being applied correctly",
            "Resolved shadow-* utilities not generating in the production build",
        ],
    },
    {
        date: "April 08, 2026",
        version: "v1.0.0",
        title: "Official Launch - Learn Fast Platform",
        changes: [
            "Complete rewrite of the core engine for better performance and scalability",
            "Introduced new modern UI design system based on Nuxt UI Pro patterns",
            "Implemented comprehensive Documentation and User Manual modules",
            "Enhanced Authentication flow with Mock Login for rapid prototyping",
            "Added real-time synchronization for learning activities",
            "Integrated system-wide Audit Logging and Activity tracking",
            "Standardized API endpoints and Data Models for enterprise use",
        ],
    },
];

export const modules = [
    {
        name: "Learner Dashboard",
        desc: "Central hub for managing active topics, tracking progress, and daily schedules.",
        icon: "i-lucide-layout-dashboard",
    },
    {
        name: "Materials Processor",
        desc: "Automated pipeline that parses documents and prepares them for AI ingestion.",
        icon: "i-lucide-file-text",
    },
    {
        name: "AI Assessment Engine",
        desc: "Generates context-aware questions and analyzes confidence-based responses.",
        icon: "i-lucide-brain-circuit",
    },
    {
        name: "Adaptive Lesson Planner",
        desc: "Dynamic scheduler that adjusts the learning path in real-time based on performance.",
        icon: "i-lucide-calendar-range",
    },
    {
        name: "Progress Analytics",
        desc: "Visualizes learning speed, mastery levels, and time-to-completion metrics.",
        icon: "i-lucide-bar-chart-3",
    },
    {
        name: "AI Tutor Chat",
        desc: "Interactive conversational layer for instant clarification during lessons.",
        icon: "i-lucide-message-square-quote",
    },
];

export const techStack = [
    {
        name: "Nuxt 4",
        desc: "Full-stack framework for Vue.js",
        icon: "i-simple-icons-nuxtdotjs",
    },
    {
        name: "Tailwind CSS",
        desc: "Utility-first styling system",
        icon: "i-simple-icons-tailwindcss",
    },
    {
        name: "Nuxt UI",
        desc: "Ready-to-use premium components",
        icon: "i-lucide-component",
    },
    {
        name: "TypeScript",
        desc: "Type-safe development",
        icon: "i-simple-icons-typescript",
    },
];
