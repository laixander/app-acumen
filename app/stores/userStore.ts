import { defineStore } from 'pinia'
import type { UserSettings, UserProfile, UserPreferences, UserBilling } from '~/types/user'

export const useUserStore = defineStore('userStore', {
    state: () => ({
        profile: {
            fullName: 'Alex Johnson',
            email: 'alex@example.com',
            avatar: 'https://i.pravatar.cc/128?u=alex'
        } as UserProfile,
        preferences: {
            learningPace: 'Intensive (10h/week)',
            privacyMode: true
        } as UserPreferences,
        billing: {
            plan: 'Pro',
            price: '$19/mo'
        } as UserBilling
    }),

    actions: {
        updateProfile(profile: Partial<UserProfile>) {
            this.profile = { ...this.profile, ...profile }
        },
        updatePreferences(preferences: Partial<UserPreferences>) {
            this.preferences = { ...this.preferences, ...preferences }
        },
        updateBilling(billing: Partial<UserBilling>) {
            this.billing = { ...this.billing, ...billing }
        }
    },

    persist: { storage: persistedState.localStorage }
})
