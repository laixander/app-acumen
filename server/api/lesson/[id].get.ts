import { db } from '../../utils/mockDatabase'

export default defineEventHandler((event) => {
    const id = event.context.params?.id
    const lesson = db.lessonContents.find(l => l.id === id)
    
    if (!lesson) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Lesson not found',
        })
    }

    const assessment = db.assessments.find(a => a.lessonId === id)
    
    return {
        ...lesson,
        assessmentId: assessment?.id
    }
})
