import * as express from 'express'
import { PassportStatic } from 'passport'
import { generateToken, sendToken } from '../utils/jwt.util'

export const createAuthRoutes = (passport: PassportStatic) => {
  const routes = express.Router()

  routes.post(
    '/facebook',
    passport.authenticate('facebook-token'),
    (err, req, res, next) => {
      if (!req.user) {
        res.status(401).send()
      }
      next()
    },
    generateToken,
    sendToken
  )

  return routes
}
