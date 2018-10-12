import * as express from 'express'
import { fetchUser, fetchUsers } from '../database/users.db'
import { safeRoute } from '../utils/routes.util'

export const createUserRoutes = db => {
  const routes = express.Router()

  routes.get(
    '/',
    safeRoute(async (req, res) => {
      const users = await fetchUsers(db)
      res.json(users)
    })
  )

  routes.get(
    '/:id',
    safeRoute(async (req, res) => {
      const { id } = req.params
      const user = await fetchUser(db, id)
      res.json(user)
    })
  )

  return routes
}
