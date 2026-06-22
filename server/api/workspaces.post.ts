import { eventHandler, readBody } from 'h3'


export default eventHandler(async (event) => {
    const body = await readBody(event)
    const userProfile = body.userProfile || {}
    return generateMockWorkspaces(userProfile)
})
