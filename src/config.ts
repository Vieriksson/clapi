const inDevMode = process.env.NODE_ENV === 'develop'

export const config = {
  useFakeAuth: inDevMode,
  facebookClientId: process.env.FACEBOOK_CLIENT_ID,
  facebookClientSecret: process.env.FACEBOOK_CLIENT_SECRET
}
