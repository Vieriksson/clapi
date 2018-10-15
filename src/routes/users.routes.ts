import * as express from 'express'
import { fetchUser, fetchUsers } from '../database/users.db'
import { safeRoute } from '../utils/routes.util'

export const createUserRoutes = () => {
  const routes = express.Router()

  routes.get(
    '/',
    safeRoute(async (req, res) => {
      const { db } = req
      const users = await fetchUsers(db)
      res.json(users)
    })
  )

  routes.get(
    '/:id',
    safeRoute(async (req, res) => {
      const { db, params } = req
      const user = await fetchUser(db, params.id)
      res.json(user)
    })
  )

  return routes
}
