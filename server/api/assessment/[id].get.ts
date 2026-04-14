import { db } from '../../utils/mockDatabase'

export default defineEventHandler((event) => {
    const id = event.context.params?.id
    const assessment = db.assessments.find(a => a.id === id) || db.assessments.find(a => a.lessonId === id)
    
    if (!assessment) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Assessment not found',
        })
    }
    
    return assessment
})
