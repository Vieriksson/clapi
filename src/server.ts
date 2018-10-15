import * as bodyParser from 'body-parser'
import * as express from 'express'
import * as passport from 'passport'
import { Client } from 'pg'
import { config } from './config'
import { createAuthRoutes } from './routes/auth.routes'
import { createGroupsRoutes } from './routes/groups.routes'
import { createUserRoutes } from './routes/users.routes'
import { authenticate, fakeAuthenticate } from './utils/auth.util'
import { handleErrors, logErrors } from './utils/error.util'
import { setupPassport } from './utils/passport.util'

const app = express()
app.use(bodyParser.json())
const port = process.env.PORT || 3000
const db = new Client()

db.connect().then(() => {
  app.use((req: any, _, next) => {
    req.db = db
    next()
  })

  if (config.useFakeAuth) {
    app.use(fakeAuthenticate)
  } else {
    app.use(passport.initialize())
    setupPassport(passport, db)
    app.use('/auth', createAuthRoutes(passport))
    app.use(authenticate)
  }

  app.use('/users', createUserRoutes())
  app.use('/groups', createGroupsRoutes())

  app.use(logErrors)
  app.use(handleErrors)

  app.listen(port, () => console.log(`Listening to port: ${port}`))
})

// Image-picker -> set width, height, quality -> check size -> upload to cloudinary -> use url.
// app.get('/me', (req, res) => res.json(req.user))
// app.get('/user', (req, res) => res.json(req.user))

// app.get('/items', (req, res) => res.json(req.user))
// app.get('/items/:id', (req, res) => res.json(req.user))
// app.post('/items', (req, res) => res.json(req.user))
// app.put('/items', (req, res) => res.json(req.user))
// app.delete('/items/:id', (req, res) => res.json(req.user))
