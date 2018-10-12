import * as dotenv from 'dotenv'
dotenv.config()

const inDevMode = process.env.NODE_ENV === 'development'

export const config = {
  useFakeAuth: inDevMode,
  facebookClientId: process.env.FACEBOOK_CLIENT_ID,
  facebookClientSecret: process.env.FACEBOOK_CLIENT_SECRET,
  authSecret: 'random-secret-should-take-care-of-later'
}
