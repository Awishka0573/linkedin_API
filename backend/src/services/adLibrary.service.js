import { env } from '../config/env.js'

const LINKEDIN_AD_LIBRARY_URL = 'https://api.linkedin.com/rest/adLibrary'

export const searchAdLibrary = async (accessToken, params = {}) => {
    // Construct query parameters for the FINDER 'criteria'
    // Based on standard LinkedIn patterns, 'q=criteria' is required.
    // We'll map common search fields to the expected criteria structure.

    // IMPLEMENTATION STRATEGY:
    // Previous attempts: 'searchKeywords' (400), 'criteria' (400).
    // Bare 'q=criteria' returned 200 OK (empty results).
    // This implies filters are optional or we missed the name.
    // Trying 'keywords' as it's the most standard simple search param.

    const queryParams = new URLSearchParams({
        q: 'criteria',
        keywords: params.keywords
    })

    // Example for adding more criteria if known, e.g. dates, companies
    // if (params.company) queryParams.append('company', params.company)

    const url = `${LINKEDIN_AD_LIBRARY_URL}?${queryParams.toString()}`

    console.log('Searching via:', url)

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
            'X-RestLi-Protocol-Version': '2.0.0',
            'LinkedIn-Version': '202503', // From user screenshot
        }
    })

    if (!response.ok) {
        const errorText = await response.text()
        console.error('LinkedIn Ad Library Search Error:', {
            status: response.status,
            statusText: response.statusText,
            error: errorText,
            url: url
        })
        const error = new Error(`Ad Library search failed: ${errorText}`)
        error.status = response.status
        throw error
    }

    return response.json()
}
