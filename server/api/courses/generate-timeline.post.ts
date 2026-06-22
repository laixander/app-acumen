import { eventHandler, readBody } from 'h3'


export default eventHandler(async (event) => {
    const body = await readBody(event)
    const { courseId, courseTitle } = body

    if (!courseId || !courseTitle) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Missing courseId or courseTitle'
        })
    }

    const { baseLessons, baseContents, baseAssessments } = generateBaseLessonsForCourse(courseId, courseTitle)

    const { newTimeline, newAssessments, newContents } = injectAssessmentsIntoTimeline(
        courseId,
        courseTitle,
        baseLessons,
        0, // completedCount
        baseLessons.length, // totalCount
        false, // isCourseComplete
        baseAssessments // predefinedAssessments
    )

    // Combine base contents with assessment contents
    const allContents = [...baseContents, ...newContents]

    return {
        timeline: newTimeline,
        assessments: newAssessments,
        contents: allContents
    }
})
