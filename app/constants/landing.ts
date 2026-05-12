export const features = [
    {
        icon: 'i-heroicons-cpu-chip',
        title: 'AI-Powered Analysis',
        description: 'Upload course outlines, lecture notes, or textbooks and we\'ll break them down into bite-sized concepts.',
        orientation: 'vertical',
        ui: { leadingIcon: 'size-8' }
    },
    {
        icon: 'i-heroicons-check-badge',
        title: 'Confidence-Based Assessment',
        description: 'Rate how well you understand each concept. Our AI uses this to gauge what you need to focus on next.',
        orientation: 'vertical',
        ui: { leadingIcon: 'size-8' }
    },
    {
        icon: 'i-heroicons-presentation-chart-line',
        title: 'Tailor-Made Dashboard',
        description: 'Your dashboard adapts instantly, prioritizing the chapters or modules you\'re least confident in.',
        orientation: 'vertical',
        ui: { leadingIcon: 'size-8' }
    },
    {
        icon: 'i-heroicons-document-text',
        title: 'Personalized Lesson Plans',
        description: 'Get custom lesson plans, practice questions, and study materials based on your knowledge gaps.',
        orientation: 'vertical',
        ui: { leadingIcon: 'size-8' }
    },
    {
        icon: 'i-heroicons-chat-bubble-left-right',
        title: 'Interactive Study Options',
        description: 'Chat with our learning AI, take quizzes, or review flashcards – all generated from your content.',
        orientation: 'vertical',
        ui: { leadingIcon: 'size-8' }
    },
    {
        icon: 'i-heroicons-bell',
        title: 'Smart Alerts & Notifications',
        description: 'Get regular check-ins on your progress with reminders, insights, and suggestions based on study patterns.',
        orientation: 'vertical',
        ui: { leadingIcon: 'size-8' }
    }
] as any

export const howItWorksSteps = [
    {
        icon: 'i-lucide-upload',
        title: 'Upload Materials',
        description: 'Upload PDFs, notes, or syllabi—throw whatever you study into our secure system.',
        variant: 'outline'
    },
    {
        icon: 'i-lucide-sparkles',
        title: 'AI Analyzes Content',
        description: 'Our AI maps out every key concept, so you never have to piece things together.',
        variant: 'solid'
    },
    {
        icon: 'i-lucide-clipboard-check',
        title: 'Assess Knowledge',
        description: 'Take a quick initial test. Rate what you already know, and we will pinpoint your gaps.',
        variant: 'solid'
    },
    {
        icon: 'i-lucide-chart-column-increasing',
        title: 'Learn & Master',
        description: 'Follow your personalized learning path with highly focused content and quizzes.',
        variant: 'solid'
    }
] as any

export const pricings = [
    {
        title: 'Free',
        price: '$0',
        billingCycle: '/month',
        description: 'Perfect for getting started',
        features: [
            '1 Upload per month',
            'Basic AI analysis',
            'Standard study modes',
            'Community access'
        ],
        button: {
            label: 'Start for Free',
            to: '/signup',
            variant: 'outline',
            color: 'neutral'
        },
        ui: {
            title: 'text-lg sm:text-xl font-extrabold text-default uppercase tracking-wider',
            price: 'text-3xl sm:text-5xl font-extrabold',
            billingCycle: 'text-lg text-muted'
        }
    },
    {
        title: 'Pro',
        price: '$19',
        billingCycle: '/month',
        description: 'For serious learners',
        badge: 'Most Popular',
        features: [
            'Unlimited uploads',
            'Deep AI content analysis',
            'Advanced study tools',
            'Priority support',
            'Custom study plans'
        ],
        button: {
            label: 'Subscribe',
            to: '/signup?plan=pro'
        },
        scale: true,
        class: 'ring-2 ring-primary',
        ui: {
            title: 'text-lg sm:text-xl font-extrabold text-primary uppercase tracking-wider',
            price: 'text-3xl sm:text-5xl font-extrabold',
            billingCycle: 'text-lg text-muted'
        }
    },
    {
        title: 'Enterprise',
        price: '$49',
        billingCycle: '/month',
        description: 'For teams and organizations',
        features: [
            'Everything in Pro',
            'Up to 5 members',
            'Shared workspaces',
            'Group progress tracking'
        ],
        button: {
            label: 'Contact Sales',
            to: '/signup',
            variant: 'outline',
            color: 'neutral'
        },
        ui: {
            title: 'text-lg sm:text-xl font-extrabold text-default uppercase tracking-wider',
            price: 'text-3xl sm:text-5xl font-extrabold',
            billingCycle: 'text-lg text-muted'
        }
    }
] as any

export const testimonials = [
    {
        name: 'Sarah Jenkins',
        description: 'Medical Student',
        avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026624d',
        rating: 5,
        content: 'LearnFast has been a lifesaver. It breaks down my chaotic lecture notes into perfect study plans. My grades have never been better, and I spend half the time studying!'
    },
    {
        name: 'Marcus Chen',
        description: 'Computer Science Major',
        avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
        rating: 4,
        content: 'The AI creates quizzes that exactly match what was on my final. It felt like I was cheating, except I actually learned the material. Absolutely incredible tool.'
    },
    {
        name: 'Emily Rodriguez',
        description: 'Law Student',
        avatar: 'https://i.pravatar.cc/150?u=a04258114e29026702d',
        rating: 5,
        content: 'I\'ve always struggled with finding where to start studying for finals. The confidence-based roadmap tells me exactly where I need to focus my energy. 10/10!'
    }
]

export const faqs = [
    {
        label: 'How does the AI analysis process work?',
        content: 'Our AI processes your uploaded documents (PDFs, text, DOCX) and uses advanced natural language processing to extract key topics, concepts, and relationships, structuring them into a digestible learning path.'
    },
    {
        label: 'What file formats are supported?',
        content: 'We currently support PDF, DOCX, TXT, and direct text input. We\'re working on adding support for video and audio transcriptions soon.'
    },
    {
        label: 'Can I share my materials with other students?',
        content: 'Yes! If you are on the Team plan, you can create shared workspaces to collaborate with classmates. For Free and Pro users, study materials are private by default but can be exported.'
    },
    {
        label: 'Is my data secure and private?',
        content: 'Absolutely. We use enterprise-grade encryption for all uploaded materials. Your documents are only accessible to you and are never used to train public AI models without your explicit consent.'
    },
    {
        label: 'Can I cancel my subscription anytime?',
        content: 'Yes, you can cancel your subscription at any time from your account settings. You will retain access to Pro features until the end of your current billing cycle.'
    }
]

export const footerLinkGroups = [
    {
        title: 'Product',
        links: [
            { label: 'Features', to: '#features' },
            { label: 'Pricing', to: '#pricing' },
            { label: 'How it Works', to: '#how-it-works' },
            { label: 'FAQ', to: '#faq' }
        ]
    },
    {
        title: 'Company',
        links: [
            { label: 'About Us', to: '/comingsoon' },
            { label: 'Blog', to: '/comingsoon' },
            { label: 'Careers', to: '/comingsoon' },
            { label: 'Contact', to: '/comingsoon' }
        ]
    },
    {
        title: 'Legal',
        links: [
            { label: 'Privacy Policy', to: '/legal/privacy' },
            { label: 'Terms of Service', to: '/legal/terms' },
            { label: 'Cookie Policy', to: '/legal/cookies' }
        ]
    }
]
