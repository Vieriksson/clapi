import * as bodyParser from 'body-parser'
import * as cloudinary from 'cloudinary'
import * as express from 'express'
import * as passport from 'passport'
import { Client } from 'pg'
import { cloudinaryClient } from './clients/cloudinary.client'
import { config } from './config'
import { groupsDb } from './database/groups/groups.db'
import { itemsDb } from './database/items/items.db'
import { tagsDb } from './database/tags/tags.db'
import { usersDb } from './database/users/users.db'
import { createAuthRoutes } from './routes/auth.routes'
import { createGroupsRoutes } from './routes/groups.routes'
import { createImagesRoutes } from './routes/images.routes'
import { createItemsRoutes } from './routes/items.routes'
import { createTagsRoutes } from './routes/tags.routes'
import { createUserRoutes } from './routes/users.routes'
import { authenticate, fakeAuthenticate } from './utils/auth.util'
import { handleErrors, logErrors } from './utils/error.util'
import { setupPassport } from './utils/passport.util'

const app = express()
app.use(bodyParser.json())
const port = process.env.PORT || 3000
const db = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true
})

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

  app.use('/users', createUserRoutes(usersDb))
  app.use('/groups', createGroupsRoutes(groupsDb))
  app.use('/images', createImagesRoutes(cloudinaryClient))
  app.use('/items', createItemsRoutes(itemsDb))
  app.use('/tags', createTagsRoutes(tagsDb))

  app.use(logErrors)
  app.use(handleErrors)

  app.listen(port, () => console.log(`Listening to port: ${port}`))
})
