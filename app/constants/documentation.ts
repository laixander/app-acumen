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
        fields: "id, user_id, title, description, duration, availability, status, icon",
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
    {
        name: "Workspace",
        fields: "id, name, icon, description, plan, members, pendingInvites, lastActive",
    },
    {
        name: "WorkspaceMember",
        fields: "id, name, email, avatar, role, joinedAt",
    },
    {
        name: "WorkspaceInvite",
        fields: "id, email, role, sentAt, expiresAt",
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
        date: "May 15, 2026",
        version: "v2.2.0",
        title: "Personalized Learning Pathways & UI Accessibility Sync",
        changes: [
            "Optimized 'Topic Door Selection' UI and 'Begin Session' workflow with robust data fallback logic",
            "Integrated Assessments directly into Lesson timelines for a more seamless adaptive learning experience",
            "Implemented dynamic AI Chat Panel height with sticky behavior to optimize sidebar real estate",
            "Enhanced source material accessibility with new downloadable card actions and status indicators",
            "Refactored component type definitions across the core topic module for 100% TypeScript stability",
            "Improved session lifecycle state transitions (Ready, Processing, Active) with synchronized UI feedback",
        ],
    },
    {
        date: "May 14, 2026",
        version: "v2.1.0",
        title: "Immersive Session Architecture & Advanced Topic Onboarding",
        changes: [
            "Launched the 'Probing Your Reasoning' AI layer with real-time justification prompts and evaluative feedback",
            "Implemented the 'Session Readiness' and 'Readiness Plan' modules to streamline the transition into active learning",
            "Redesigned the Topic Creation Wizard with a dedicated 'Subject Picker' and 'Door Selection' interactive UI",
            "Enhanced the 'Session Processing' state with high-fidelity animations and improved AI-path visualization",
            "Refactored Topic Detail pages to support the new modular session architecture",
            "Implemented granular diagnostic scoring and feedback loops within the pre-assessment flow",
            "Standardized session types and interfaces for better maintainability and 100% type safety",
            "Optimized the 'New Topic' wizard with improved state persistence and breadcrumb navigation",
        ],
    },
    {
        date: "May 13, 2026",
        version: "v2.0.0",
        title: "Diagnostic Mastery & AI-Probing Session Architecture",
        changes: [
            "Launched 'Begin Session' diagnostic flow with immersive AI processing and transition states",
            "Implemented the 'Probing Your Reasoning' AI layer with serif-styled lexical prompts and distractor-aware inquiries",
            "Developed the 3-Card Assessment system featuring: ↑ What you did well, ↓ Where you struggled, and ↑ Mastery Profile Update",
            "Integrated dynamic 'Pass Probability' tracking with before/after comparison and trend badges",
            "Engineered the 'Acumen AI Insight' module with historical exam correlation (LET, SAT, AP, GRE benchmarks)",
            "Implemented multi-choice validation with answer locking, visual success/error states, and focus fading",
            "Overhauled the Topic Seeder to include complete 3-question assessments for all 10+ core modules",
            "Optimized reasoning evaluation flow with simulated AI analysis and context-aware feedback transitions",
            "Enhanced light/dark mode support for all session interfaces ensuring a premium glassmorphic aesthetic",
        ],
    },
    {
        date: "May 12, 2026",
        version: "v1.9.0",
        title: "Enterprise Sales, Billing Ecosystem & Advanced Topic Analytics",
        changes: [
            "Launched the Lead-First Enterprise Sales model with dedicated ContactSalesModal integration",
            "Implemented the CheckoutModal for seamless Pro plan upgrades and payment method management",
            "Integrated Organizational Hierarchy logic into user management and billing services",
            "Refined Topic Detail pages with new 'Strong/Weak' analysis sections and standardized content layouts",
            "Updated sidebar navigation logic to support precise redirection for Card System variants",
            "Enhanced the Billing Dashboard with functional upgrade/cancel actions and invoice download capabilities",
            "Standardized UI/UX across the Enterprise suite with consistent modal patterns and success notifications",
        ],
    },
    {
        date: "May 08, 2026",
        version: "v1.8.0",
        title: "Admin Organization Management & Dynamic Plans Ecosystem",
        changes: [
            "Implemented full Organization lifecycle management with Suspend/Activate toggles and custom ConfirmModals",
            "Launched the Billing & Usage tracker with aggregate token monitoring and workspace-level breakdown",
            "Developed the Platform Plans management module (CRUD) with dynamic status toggling and feature lists",
            "Centralized data initialization in app.vue to ensure state persistence and reliability across refreshes",
            "Synchronized administrative UI patterns (Tables, Modals, Toasts) for a unified premium design system",
            "Integrated 'Manage in Stripe' secure portal simulation and PCI-DSS compliance trust indicators",
            "Optimized table performance with loading skeletons and skeleton-aware navigation transitions",
        ],
    },
    {
        date: "May 07, 2026",
        version: "v1.7.0",
        title: "Workspace Infrastructure Expansion & Modular Seeder System",
        changes: [
            "Implemented dedicated Workspace Billing and Subscription management interfaces",
            "Launched Workspace-specific Topics management for granular content organization",
            "Overhauled the Seeder System into a modular architecture (Generators, Logs, Topics, Workspaces)",
            "Enhanced Workspace Menu and Topic Cards with refined UI/UX and better state handling",
            "Improved workspace member invitation flows and role-based access logic",
            "Refactored useWorkspaces and useSeeder composables for better performance and maintainability",
        ],
    },
    {
        date: "May 06, 2026",
        version: "v1.6.0",
        title: "Role-Based Workspace Management & UX Ecosystem",
        changes: [
            "Implemented a comprehensive role-based Workspace Management system with Owner, Admin, and Member support",
            "Designed a centralized 'Manage Workspaces' hub with categorized sections for manageable and joined teams",
            "Enhanced workspace cards with real member avatar stacks, live counts, and accurate activity statistics",
            "Developed a dynamic Workspace Menu with role-aware links and context-sensitive redirections",
            "Implemented role-specific Danger Zone actions: 'Delete Workspace' for Owners and 'Leave Workspace' for Members",
            "Built a context-aware breadcrumb system that adapts paths based on the user's navigation origin",
            "Optimized workspace settings with robust empty states and defensive error handling for missing data",
            "Resolved multiple complex TypeScript type errors across the workspace ecosystem ensuring 100% type safety",
            "Synchronized global workspace state and persistence across all management interfaces",
        ],
    },
    {
        date: "April 30, 2026",
        version: "v1.5.0",
        title: "AIPrompt Integration, Legal Pages, Coming Soon Launchpad & SEO",
        changes: [
            "Developed a highly engaging, glassmorphic 'Coming Soon' page featuring premium animations and a mock subscription flow",
            "Implemented core Legal Pages including Terms of Service, Privacy Policy, and Cookie Policy tailored for the Acumen platform",
            "Updated application footer and navigation links to route users correctly to the new legal resources and coming soon endpoints",
            "Refined legal page layouts by integrating the DocsFooter component and ambient background glow effects",
            "Finalized DashboardAIPrompt component with integrated AI topic generation flow and mock file attachment UX",
            "Renamed the application from 'Learn Fast' to 'Acumen Platform' across documentation and meta tags",
            "Added global SEO meta tags in app.vue to improve search indexing and social sharing previews",
            "Overhauled the README.md documentation to accurately reflect Acumen's key features and setup instructions",
            "Synchronized project version tracking to v1.5.0",
        ],
    },
    {
        date: "April 22, 2026",
        version: "v1.4.1",
        title: "AI Interface Refinement & UX Polish",
        changes: [
            "Optimized AI Configuration layout with aligned form fields and improved visual hierarchy",
            "Refined Dashboard AI Prompt with enhanced glassmorphism effects and interactive hover states",
            "Enhanced layout for dashboard hero section with centered content and better spacing",
            "Standardized alignment for switches and select inputs across administrative interfaces",
        ],
    },
    {
        date: "April 20, 2026",
        version: "v1.4.0",
        title: "Platform Restructuring & Admin Core",
        changes: [
            "Restructured Learner Dashboard with a multi-section layout and side-by-side activity analytics",
            "Reorganized application navigation by grouping topic-related actions under a 'My Topics' dropdown",
            "Implemented core Administration modules including AI Configuration, Analytics Review, and User Management",
            "Added configurable container size support to the ContentPanel component",
            "Fixed Admin Manage Subscription and Technical Support modal prop binding and emit handling",
            "Streamlined topic creation flow by removing the redundant slug field and associated artifacts",
            "Simplified ContentHeading component by removing unnecessary size, tag, and vibrant variant props",
            "Added 'View All' quick access to topic collections from the dashboard overview",
        ],
    },
    {
        date: "April 17, 2026",
        version: "v1.3.0",
        title: "Admin Panel, Learner Management & Analytics",
        changes: [
            "Developed a dedicated Admin Panel navigation with structured administrative layout",
            "Restructured Learner Dashboard layout for enhanced hierarchy and improved widget grouping",
            "Implemented Learner Management page with subscription tiers and technical support actions",
            "Expanded AI Configuration with model pipeline, system prompt, safety filters, and vector database settings",
            "Built Analytics Review dashboard with Chart.js-powered learner trend and topic category visualizations",
            "Added Manage Subscription modal with plan selector, billing summary, and current plan display",
            "Added Technical Support modal with ticket stats, category selector, priority toggles, and admin notes",
        ],
    },
    {
        date: "April 16, 2026",
        version: "v1.2.0",
        title: "Assessment Mastery & Architecture Consolidation",
        changes: [
            "Implemented the Assessment Mastery System with automatic checkpoint quizzes and final assessments",
            "Injected AI-generated diagnostic tests and milestones into the learning timeline",
            "Completed migration to a pure client-side LocalStorage architecture for all learning data",
            "Developed a premium brand presentation layer with horizontal scrolling and cinematic effects",
            "Enhanced the 'Topic' data model with dedicated 'slug' and 'icon' support",
            "Centralized all mock data seeding logic into the persistent useSeeder utility",
            "Refactored API reference to reflect the transition to a simulated backend environment",
        ],
    },
    {
        date: "April 15, 2026",
        version: "v1.1.1",
        title: "Topic Customization & Validation Engine",
        changes: [
            "Implemented custom URL slug support for the topic creation process",
            "Added real-time slug auto-generation with support for manual overrides",
            "Developed a title validation system to prevent the use of reserved keywords like 'New'",
            "Enhanced Topic data model and type definitions with a dedicated 'slug' property",
            "Fixed TypeScript type mismatches in form validation properties and mock data seeding",
            "Updated centralized seeder utility to support the expanded topic schema and routing",
            "Synchronized project versioning across package.json and documentation modules",
        ],
    },
    {
        date: "April 14, 2026",
        version: "v1.1.0",
        title: "Learning Wizard Optimization & AI Transition States",
        changes: [
            "Implemented a high-fidelity, multi-step 'New Topic' creation wizard",
            "Developed an immersive 'AI Analyzing' transition phase with real-time progress tracking",
            "Integrated a sequential 'AI Path Crafting' checklist for the final generation step",
            "Refactored wizard state management for robust property synchronization across steps",
            "Created custom premium animations featuring scaling and radiant glows for AI states",
            "Standardized all wizard form components to work with the latest Nuxt UI v4 patterns",
            "Improved TypeScript safety for array iterations and UI component events",
        ],
    },
    {
        date: "April 13, 2026",
        version: "v1.0.9",
        title: "Architecture Refactoring & Dashboard Enhancements",
        changes: [
            "Refactored project file structure to fully align with Nuxt 4 best practices",
            "Centralized types, constants, and composables for improved code maintainability",
            "Optimized dashboard user experience with a new 'Continue Learning' hero section",
            "Implemented a 'Pin/Favorite' system for quick access to prioritized topics",
            "Developed a persistent data seeding system with UI controls for local development",
            "Optimized main CSS stylesheet by reducing verbosity and redundant style overrides",
        ],
    },
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
        title: "Official Launch - Acumen Platform",
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
    {
        name: "Workspace Management",
        desc: "Role-based team coordination with granular access control and member management.",
        icon: "i-lucide-users",
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
