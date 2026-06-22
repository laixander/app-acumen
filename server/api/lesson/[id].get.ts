export default defineEventHandler((event) => {
    throw createError({
        statusCode: 404,
        statusMessage: 'Lesson not found on server. Ensure course is seeded locally.',
    })
})
