import type { UserSettings, UserProfile, UserPreferences, UserBilling } from '~/types/user'

export const useUser = () => {
    const user = useState<UserSettings>('user', () => ({
        profile: {
            fullName: 'Alex Johnson',
            email: 'alex@example.com',
            avatar: 'https://i.pravatar.cc/128?u=alex'
        },
        preferences: {
            learningPace: 'Intensive (10h/week)',
            privacyMode: true
        },
        billing: {
            plan: 'Pro',
            price: '$19/mo'
        }
    }))

    // Load from local storage on client side
    if (import.meta.client) {
        const saved = localStorage.getItem('user-settings')
        if (saved) {
            try {
                const parsed = JSON.parse(saved)
                Object.assign(user.value, parsed)
            } catch (e) {
                console.error('Failed to parse user settings', e)
            }
        }
    }

    const save = () => {
        if (import.meta.client) {
            localStorage.setItem('user-settings', JSON.stringify(user.value))
        }
    }

    const updateProfile = (profile: Partial<UserProfile>) => {
        user.value.profile = { ...user.value.profile, ...profile }
        save()
    }

    const updatePreferences = (preferences: Partial<UserPreferences>) => {
        user.value.preferences = { ...user.value.preferences, ...preferences }
        save()
    }

    const updateBilling = (billing: Partial<UserBilling>) => {
        user.value.billing = { ...user.value.billing, ...billing }
        save()
    }

    return {
        user,
        updateProfile,
        updatePreferences,
        updateBilling
    }
}
