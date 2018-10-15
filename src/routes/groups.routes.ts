import * as express from 'express'
import {
  createGroup,
  deleteGroup,
  fetchGroup,
  fetchGroups,
  updateGroup
} from '../database/groups.db'
import { safeRoute } from '../utils/routes.util'

export const createGroupsRoutes = () => {
  const routes = express.Router()

  routes.get(
    '/',
    safeRoute(async (req, res) => {
      const { db, user } = req
      const groups = await fetchGroups(db, user.id)
      res.json(groups)
    })
  )

  routes.get(
    '/:id',
    safeRoute(async (req, res) => {
      const { db, params } = req
      const group = await fetchGroup(db, params.id)
      if (!group) {
        throw { status: 404, message: `Could not find group for id: ${params.id}` }
      }
      res.json(group)
    })
  )

  routes.post(
    '/',
    safeRoute(async (req, res) => {
      const { db, user, body } = req
      const group = await createGroup(db, user.id, body)
      res.json(group)
    })
  )

  routes.put(
    '/:id',
    safeRoute(async (req, res) => {
      const { db, body, params } = req
      const group = await updateGroup(db, params.id, body)
      res.json(group)
    })
  )

  routes.delete(
    '/:id',
    safeRoute(async (req, res) => {
      const { db, params } = req
      await deleteGroup(db, params.id)
      res.status(200).send()
    })
  )

  return routes
}
