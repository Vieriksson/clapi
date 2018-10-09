import * as dotenv from 'dotenv'
import * as express from 'express'
import passport from 'passport'
import { config } from './config'
import { checkFacebookToken, checkJwtDev, setupPassport } from './utils/auth.util'
import { errorHandler } from './utils/error.util'

dotenv.config()
const app = express()
const port = process.env.PORT || 3000

if (config.useFakeAuth) {
  app.use(checkJwtDev)
} else {
  setupPassport(passport)
  app.use(passport.initialize())
  app.use(checkFacebookToken(passport))
}

app.get('/me', (req, res) => res.json(req.user))
app.get('/user', (req, res) => res.json(req.user))

app.get('/items', (req, res) => res.json(req.user))
app.get('/items/:id', (req, res) => res.json(req.user))
app.post('/items', (req, res) => res.json(req.user))
app.put('/items', (req, res) => res.json(req.user))
app.delete('/items/:id', (req, res) => res.json(req.user))

app.get('/groups', (req, res) => res.json(req.user))
app.get('/groups/:id', (req, res) => res.json(req.user))
app.post('/groups', (req, res) => res.json(req.user))
app.put('/groups', (req, res) => res.json(req.user))
app.delete('/groups/:id', (req, res) => res.json(req.user))

app.use(errorHandler)

app.listen(port, () => console.log(`Listening to port: ${port}`))
