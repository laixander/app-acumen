export default defineEventHandler((event) => {
    throw createError({
        statusCode: 404,
        statusMessage: 'Lesson not found on server. Ensure topic is seeded locally.',
    })
})
