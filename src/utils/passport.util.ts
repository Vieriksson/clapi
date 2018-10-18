import { PassportStatic } from 'passport'
import * as FacebookTokenStrategy from 'passport-facebook-token'
import { config } from '../config'
import { upsertFacebookUser } from '../database/users.db'

export const setupPassport = (passport: PassportStatic, db) => {
  passport.serializeUser(function(user, done) {
    done(null, user)
  })
  passport.deserializeUser(function(user, done) {
    done(null, user)
  })
  passport.use(
    new FacebookTokenStrategy(
      {
        clientID: config.facebook.id,
        clientSecret: config.facebook.secret
      },
      async (accessToken, refreshToken, profile, done) => {
        const facebookUser = {
          facebookId: profile.id,
          name: profile.name.givenName + ' ' + profile.name.familyName,
          email: profile.emails[0].value,
          photo: profile.photos[0].value
        }
        try {
          const user = await upsertFacebookUser(db, facebookUser)
          return done(null, user)
        } catch (err) {
          return done(err, null)
        }
      }
    )
  )
}
