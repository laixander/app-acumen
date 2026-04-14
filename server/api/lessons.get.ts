import { db } from '../utils/mockDatabase'

export default defineEventHandler((event) => {
    const query = getQuery(event)
    const topicId = query.topicId

    if (topicId) {
        return db.lessons.filter(l => l.topicId === topicId)
    }

    return db.lessons
})
