import * as bodyParser from 'body-parser'
import * as cloudinary from 'cloudinary'
import * as express from 'express'
import * as passport from 'passport'
import { Client } from 'pg'
import { config } from './config'
import { createAuthRoutes } from './routes/auth.routes'
import { createGroupsRoutes } from './routes/groups.routes'
import { createImagesRoutes } from './routes/images.routes'
import { createUserRoutes } from './routes/users.routes'
import { authenticate, fakeAuthenticate } from './utils/auth.util'
import { handleErrors, logErrors } from './utils/error.util'
import { setupPassport } from './utils/passport.util'

const app = express()
app.use(bodyParser.json())
const port = process.env.PORT || 3000
const db = new Client()

cloudinary.config({
  cloud_name: config.cloudinary.name,
  api_key: config.cloudinary.key,
  api_secret: config.cloudinary.secret
})

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
  app.use('/images', createImagesRoutes())

  app.use(logErrors)
  app.use(handleErrors)

  app.listen(port, () => console.log(`Listening to port: ${port}`))
})
