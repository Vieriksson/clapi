import * as dotenv from 'dotenv'

dotenv.config()

const inDevMode = process.env.NODE_ENV === 'development'

export const config = {
  useFakeAuth: inDevMode,
  authSecret: 'random-secret-should-take-care-of-later',
  facebook: {
    id: process.env.FACEBOOK_CLIENT_ID,
    secret: process.env.FACEBOOK_CLIENT_SECRET
  },
  cloudinary: {
    name: process.env.CLOUDINARY_NAME,
    key: process.env.CLOUDINARY_API_KEY,
    secret: process.env.CLOUDINARY_API_SECRET
  }
}
