import * as express from 'express'
import { TagsDb } from '../database/tags/tags.db'
import { safeRoute } from '../utils/routes.util'

export const createTagsRoutes = (tagsDb: TagsDb) => {
  const routes = express.Router()

  routes.get(
    '/',
    safeRoute(async (req, res) => {
      const { db } = req
      const tags = await tagsDb.fetchTags(db)
      res.json(tags)
    })
  )

  return routes
}
