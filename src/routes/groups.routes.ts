import * as express from 'express'
import { GroupsDb } from '../database/groups/groups.db'
import { toCamelCase } from '../utils/misc.util'
import { safeRoute } from '../utils/routes.util'

export const createGroupsRoutes = (groupsDb: GroupsDb) => {
  const routes = express.Router()

  routes.get(
    '/',
    safeRoute(async (req, res) => {
      const { db, user } = req
      const groups = await groupsDb.fetchUserGroups(db, user.id)
      res.json(toCamelCase(groups))
    })
  )

  routes.get(
    '/:id',
    safeRoute(async (req, res) => {
      const { db, params } = req
      const group = await groupsDb.fetchGroup(db, params.id)
      if (!group) {
        throw { status: 404, message: `Could not find group for id: ${params.id}` }
      }
      res.json(toCamelCase(group))
    })
  )

  routes.get(
    '/:id/members',
    safeRoute(async (req, res) => {
      const { db, params } = req
      const members = await groupsDb.fetchGroupMembers(db, params.id)
      res.json(toCamelCase(members))
    })
  )

  routes.post(
    '/',
    safeRoute(async (req, res) => {
      const { db, user, body } = req
      const group = await groupsDb.createGroup(db, user.id, body)
      res.json(group)
    })
  )

  routes.put(
    '/:id',
    safeRoute(async (req, res) => {
      const { db, body, params } = req
      const group = await groupsDb.updateGroup(db, params.id, body)
      res.json(group)
    })
  )

  routes.delete(
    '/:id',
    safeRoute(async (req, res) => {
      const { db, params } = req
      await groupsDb.deleteGroup(db, params.id)
      res.status(200).send()
    })
  )

  return routes
}
