import * as expressJwt from 'express-jwt'
import { config } from '../config'

const devUser = {
  id: '18',
  facebookId: '10215954879920806',
  name: 'Viktor Eriksson',
  email: 'me@viktoreriksson.se',
  photo: 'https://graph.facebook.com/v2.6/10215954879920806/picture?type=large'
}

const getTokenFromHeader = headers => {
  if (headers && headers.authorization) {
    const parts = headers.authorization.split(' ')
    if (parts.length === 2) {
      return parts[1]
    }
  }
  return null
}

export const authenticate = expressJwt({
  secret: config.authSecret,
  getToken: req => getTokenFromHeader(req.headers)
})

export const fakeAuthenticate = (req, res, next: () => void) => {
  req.user = devUser
  next()
}
