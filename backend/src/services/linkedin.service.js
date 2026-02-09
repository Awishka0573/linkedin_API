import { env } from '../config/env.js'

const LINKEDIN_AUTH_URL = 'https://www.linkedin.com/oauth/v2/authorization'
const LINKEDIN_TOKEN_URL = 'https://www.linkedin.com/oauth/v2/accessToken'
const LINKEDIN_USERINFO_URL = 'https://api.linkedin.com/v2/userinfo'

export const createLinkedInAuthUrl = (state) => {
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: env.LINKEDIN_CLIENT_ID,
    redirect_uri: env.LINKEDIN_REDIRECT_URI,
    scope: 'openid profile email w_member_social',
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

export const createPost = async (accessToken, personUrn, text) => {
  const LINKEDIN_UGC_POST_URL = 'https://api.linkedin.com/v2/ugcPosts'

  const body = {
    author: personUrn,
    lifecycleState: 'PUBLISHED',
    specificContent: {
      'com.linkedin.ugc.ShareContent': {
        shareCommentary: {
          text: text,
        },
        shareMediaCategory: 'NONE',
      },
    },
    visibility: {
      'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC',
    },
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
