export interface UserProfile {
    fullName: string
    email: string
    avatar?: string
}

export interface UserPreferences {
    learningPace: string
    privacyMode: boolean
}

export interface UserBilling {
    plan: string
    price: string
}

export interface UserSettings {
    profile: UserProfile
    preferences: UserPreferences
    billing: UserBilling
}
