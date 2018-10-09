import * as FacebookTokenStrategy from 'passport-facebook-token'
import { config } from '../config'

const devUser = {
  facebookId: '10215954879920806',
  name: 'Viktor Eriksson',
  email: 'me@viktoreriksson.se',
  photo: 'https://graph.facebook.com/v2.6/10215954879920806/picture?type=large'
}

export const checkJwtDev = (req, res, next: () => void) => {
  req.user = devUser
  next()
}

export const checkFacebookToken = passport => (req, res, next) => {
  passport.authenticate('facebook-token', (err, user) => {
    if (err) {
      if (err.oauthError) {
        var oauthError = JSON.parse(err.oauthError.data)
        res.status(401).send(oauthError.error.message)
      } else {
        res.send(err)
      }
    } else {
      req.user = user
      next()
    }
  })(req, res, next)
}

export const setupPassport = passport =>
  passport.use(
    new FacebookTokenStrategy(
      {
        clientID: config.facebookClientId,
        clientSecret: config.facebookClientSecret
      },
      async (accessToken, refreshToken, profile, done) => {
        const facebookUser = {
          facebookId: profile.id,
          name: profile.name.givenName + ' ' + profile.name.familyName,
          email: profile.emails[0].value,
          photo: profile.photos[0].value
        }
        return done(null, facebookUser)
      }
    )
  )
