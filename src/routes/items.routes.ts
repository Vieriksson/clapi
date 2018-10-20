import * as express from 'express'
import { Item, ItemsDb } from '../database/items/items.db'
import { safeRoute } from '../utils/routes.util'

export const createItemsRoutes = (itemsDb: ItemsDb) => {
  const routes = express.Router()

  routes.get(
    '/',
    safeRoute(async (req, res) => {
      const { db, user } = req
      const items = await itemsDb.getUserItems(db, user.id)
      res.json(items)
    })
  )

  routes.get(
    '/:id',
    safeRoute(async (req, res) => {
      const { db, params } = req
      const item = await itemsDb.getItem(db, params.id)
      res.json(item)
    })
  )

  routes.post(
    '/',
    safeRoute(async (req, res) => {
      const { db, user } = req
      const item: Item = req.body
      if (!item.tags || item.tags.length === 0) {
        throw { status: 404, message: `Must include at least one tag` }
      }
      if (!item.images || item.images.length === 0) {
        throw { status: 404, message: `Must include at least one image` }
      }
      const itemId = await itemsDb.createItem(db, user.id, item)
      res.json(itemId)
    })
  )

  routes.delete(
    '/:id',
    safeRoute(async (req, res) => {
      const { db, params } = req
      const user = await itemsDb.removeItem(db, params.id)
      res.json(user)
    })
  )

  return routes
}
