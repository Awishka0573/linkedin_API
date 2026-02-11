import { env } from '../config/env.js'

const LINKEDIN_AUTH_URL = 'https://www.linkedin.com/oauth/v2/authorization'
const LINKEDIN_TOKEN_URL = 'https://www.linkedin.com/oauth/v2/accessToken'
const LINKEDIN_USERINFO_URL = 'https://api.linkedin.com/v2/userinfo'
const LINKEDIN_ASSETS_URL = 'https://api.linkedin.com/v2/assets?action=registerUpload'
const LINKEDIN_UGC_POST_URL = 'https://api.linkedin.com/v2/ugcPosts'
const LINKEDIN_EVENTS_URL = 'https://api.linkedin.com/rest/events'

export const createLinkedInAuthUrl = (state) => {
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: env.LINKEDIN_CLIENT_ID,
    redirect_uri: env.LINKEDIN_REDIRECT_URI,
    scope: 'openid profile email w_member_social rw_events r_events',
    prompt: 'select_account consent',
    max_age: 0,
    state,
  })

  return `${LINKEDIN_AUTH_URL}?${params.toString()}`
}

export const exchangeCodeForToken = async (code) => {
  const body = new URLSearchParams({
    grant_type: 'authorization_code',
    code,
    redirect_uri: env.LINKEDIN_REDIRECT_URI,
    client_id: env.LINKEDIN_CLIENT_ID,
    client_secret: env.LINKEDIN_CLIENT_SECRET,
  })

  const response = await fetch(LINKEDIN_TOKEN_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
  })

  if (!response.ok) {
    const errorText = await response.text()
    console.error('LinkedIn Token Exchange Error:', {
      status: response.status,
      error: errorText,
    })
    const error = new Error(`Token exchange failed: ${errorText}`)
    error.status = response.status
    throw error
  }

  return response.json()
}

export const fetchLinkedInUserInfo = async (accessToken) => {
  const response = await fetch(LINKEDIN_USERINFO_URL, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  if (!response.ok) {
    const errorText = await response.text()
    console.error('LinkedIn UserInfo Error:', {
      status: response.status,
      error: errorText,
    })
    const error = new Error(`Userinfo request failed: ${errorText}`)
    error.status = response.status
    throw error
  }

  return response.json()
}

export const registerUpload = async (accessToken, personUrn, mediaType) => {
  const recipe = mediaType === 'IMAGE' ? 'urn:li:digitalmediaRecipe:feedshare-image' : 'urn:li:digitalmediaRecipe:feedshare-video'

  const body = {
    registerUploadRequest: {
      recipes: [recipe],
      owner: personUrn,
      serviceRelationships: [
        {
          relationshipType: 'OWNER',
          identifier: 'urn:li:userGeneratedContent',
        },
      ],
    },
  }

  const response = await fetch(LINKEDIN_ASSETS_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      'X-RestLi-Protocol-Version': '2.0.0',
    },
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    const errorText = await response.text()
    console.error('LinkedIn Register Upload Error:', {
      status: response.status,
      error: errorText,
    })
    const error = new Error(`Media registration failed: ${errorText}`)
    error.status = response.status
    throw error
  }

  return response.json()
}

export const uploadMediaBinary = async (uploadUrl, accessToken, fileBuffer, mimeType) => {
  const response = await fetch(uploadUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': mimeType,
    },
    body: fileBuffer,
  })

  if (!response.ok) {
    const errorText = await response.text()
    console.error('LinkedIn Media Binary Upload Error:', {
      status: response.status,
      error: errorText,
    })
    const error = new Error(`Media binary upload failed: ${errorText}`)
    error.status = response.status
    throw error
  }

  return true
}

export const createPost = async (accessToken, personUrn, text, mediaAsset = null, mediaType = 'NONE') => {
  const body = {
    author: personUrn,
    lifecycleState: 'PUBLISHED',
    specificContent: {
      'com.linkedin.ugc.ShareContent': {
        shareCommentary: {
          text: text,
        },
        shareMediaCategory: mediaAsset ? mediaType : 'NONE',
      },
    },
    visibility: {
      'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC',
    },
  }

  if (mediaAsset) {
    body.specificContent['com.linkedin.ugc.ShareContent'].media = [
      {
        status: 'READY',
        description: {
          text: text.substring(0, 100),
        },
        media: mediaAsset,
        title: {
          text: 'Media Content',
        },
      },
    ]
  }

  const response = await fetch(LINKEDIN_UGC_POST_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      'X-RestLi-Protocol-Version': '2.0.0',
    },
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    const errorText = await response.text()
    console.error('LinkedIn API Error Details:', {
      status: response.status,
      error: errorText,
      personUrn
    })
    const error = new Error(`Post creation failed: ${errorText}`)
    error.status = response.status
    throw error
  }

  return response.json()
}

export const createLinkedInEvent = async (accessToken, eventData) => {
  const startTime = Number(eventData.eventSchedule?.start)
  const endTime = Number(eventData.eventSchedule?.end)

  if (isNaN(startTime) || isNaN(endTime)) {
    throw new Error('Invalid event schedule times provided.')
  }

  // Construct payload specifically for the versioned REST API as per docs
  const payload = {
    name: {
      localized: {
        'en_US': eventData.title
      },
      preferredLocale: {
        country: 'US',
        language: 'en'
      }
    },
    description: {
      localized: {
        'en_US': {
          text: eventData.description
        }
      },
      preferredLocale: {
        country: 'US',
        language: 'en'
      }
    },
    organizer: eventData.owner,
    startsAt: startTime,
    discoveryMode: eventData.visibility === 'PUBLIC' ? 'LISTED' : 'UNLISTED'
  }

  if (eventData.eventType === 'ONLINE') {
    payload.type = {
      online: {
        format: {
          external: {
            endsAt: endTime,
            url: eventData.onlineEventUrl
          }
        }
      }
    }
  } else {
    payload.type = {
      inPerson: {
        endsAt: endTime,
        address: {}, // Address would be added here
        url: '' // Optional URL for in-person events
      }
    }
  }

  console.log('Creating LinkedIn Event with 202601 REFINED payload:', JSON.stringify(payload, null, 2))

  const response = await fetch(LINKEDIN_EVENTS_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      'X-RestLi-Protocol-Version': '2.0.0',
      'LinkedIn-Version': '202601',
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    const errorText = await response.text()
    console.error('LinkedIn Create Event Error Detailed:', {
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries()),
      error: errorText,
      payload: payload
    })
    const error = new Error(`Event creation failed: ${errorText}`)
    error.status = response.status
    throw error
  }

  return response.json()
}
