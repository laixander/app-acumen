export default defineEventHandler((event) => {
    throw createError({
        statusCode: 404,
        statusMessage: 'Assessment not found on server. Ensure topic is seeded locally.',
    })
})
