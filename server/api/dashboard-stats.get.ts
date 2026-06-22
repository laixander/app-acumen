import { eventHandler } from 'h3'
import { MOCK_DASHBOARD_STATS, MOCK_RECOMMENDED_COURSES } from '~/constants/dashboard'

export default eventHandler(() => {
    return {
        stats: MOCK_DASHBOARD_STATS,
        recommendedCourses: MOCK_RECOMMENDED_COURSES
    }
})
