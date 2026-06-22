export default defineEventHandler((event) => {
    throw createError({
        statusCode: 404,
        statusMessage: 'Assessment not found on server. Ensure course is seeded locally.',
    })
})
