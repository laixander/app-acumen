export interface ChatQuote {
    text: string
    id: string
}

export interface ChatMessage {
    id: string
    role: 'user' | 'assistant'
    content: string
    quote?: ChatQuote
    attachment?: {
        name: string
        size: number
    }
    isPinned?: boolean
}
