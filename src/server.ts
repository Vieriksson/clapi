import * as express from 'express'
import * as passport from 'passport'
import { Client } from 'pg'
import { config } from './config'
import { createAuthRoutes } from './routes/auth.routes'
import { createUserRoutes } from './routes/users.routes'
import { authenticate, fakeAuthenticate } from './utils/auth.util'
import { handleErrors, logErrors } from './utils/error.util'
import { setupPassport } from './utils/passport.util'

const app = express()
const port = process.env.PORT || 3000
const db = new Client()

db.connect().then(() => {
  if (config.useFakeAuth) {
    app.use(fakeAuthenticate)
  } else {
    app.use(passport.initialize())
    setupPassport(passport, db)
    app.use('/auth', createAuthRoutes(passport))
    app.use(authenticate)
  }

  app.use('/users', createUserRoutes(db))

  app.use(logErrors)
  app.use(handleErrors)

  app.listen(port, () => console.log(`Listening to port: ${port}`))
})

// app.get('/me', (req, res) => res.json(req.user))
// app.get('/user', (req, res) => res.json(req.user))

// app.get('/items', (req, res) => res.json(req.user))
// app.get('/items/:id', (req, res) => res.json(req.user))
// app.post('/items', (req, res) => res.json(req.user))
// app.put('/items', (req, res) => res.json(req.user))
// app.delete('/items/:id', (req, res) => res.json(req.user))

// app.get('/groups', (req, res) => res.json(req.user))
// app.get('/groups/:id', (req, res) => res.json(req.user))
// app.post('/groups', (req, res) => res.json(req.user))
// app.put('/groups', (req, res) => res.json(req.user))
// app.delete('/groups/:id', (req, res) => res.json(req.user))
