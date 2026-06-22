import { eventHandler } from 'h3'


export default eventHandler(() => {
    return {
        logs: MOCK_ACTIVITY_LOGS,
        sessions: MOCK_SESSION_LOGS
    }
})
