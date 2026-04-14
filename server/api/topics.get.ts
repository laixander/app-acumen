import { db } from '../utils/mockDatabase'

export default defineEventHandler((event) => {
    return db.topics
})
