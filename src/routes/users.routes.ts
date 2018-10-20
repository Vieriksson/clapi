import * as express from 'express'
import { UsersDb } from '../database/users/users.db'
import { safeRoute } from '../utils/routes.util'

export const createUserRoutes = (usersDb: UsersDb) => {
  const routes = express.Router()

  routes.get(
    '/',
    safeRoute(async (req, res) => {
      const { db } = req
      const users = await usersDb.fetchUsers(db)
      res.json(users)
    })
  )

  routes.get(
    '/:id',
    safeRoute(async (req, res) => {
      const { db, params } = req
      const user = await usersDb.fetchUser(db, params.id)
      res.json(user)
    })
  )

  return routes
}
