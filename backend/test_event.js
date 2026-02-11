
import { fetchLinkedInUserInfo, createLinkedInEvent } from './src/services/linkedin.service.js'
import dotenv from 'dotenv'
dotenv.config()

async function test() {
    const token = 'YOUR_TOKEN_HERE' // I'll have to get this from a log or ask
    try {
        const info = await fetchLinkedInUserInfo(token)
        console.log('User info:', info)

        const eventData = {
            title: 'Test Event',
            description: 'This is a test event',
            owner: `urn:li:person:${info.sub}`,
            eventSchedule: {
                start: Date.now() + 86400000,
                end: Date.now() + 90000000
            },
            eventType: 'ONLINE',
            onlineEventUrl: 'https://example.com',
            visibility: 'PUBLIC'
        }

        const result = await createLinkedInEvent(token, eventData)
        console.log('Result:', result)
    } catch (err) {
        console.error('Test failed:', err)
    }
}
// test()
