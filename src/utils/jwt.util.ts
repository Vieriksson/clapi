import * as jwt from 'jsonwebtoken'
import { config } from '../config'

export const createToken = user =>
  jwt.sign(user, config.authSecret, {
    expiresIn: 60 * 120
  })

export const generateToken = (req, res, next) => {
  req.token = createToken(req.user)
  next()
}

export const sendToken = (req, res) => {
  res.status(200).json(req.token)
}
