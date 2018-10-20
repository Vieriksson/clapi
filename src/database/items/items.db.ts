import { Client } from 'pg'
import {
  getItemImagesQuery,
  getItemQuery,
  getItemTagsQuery,
  getUserItemsQuery,
  insertItemImagesQuery,
  insertItemQuery,
  insertItemTagsQuery,
  removeItemImagesQuery,
  removeItemQuery,
  removeItemTagsQuery
} from './items.queries'

export type Item = {
  id?: number
  userId?: number
  description: string
  images: string[]
  tags: number[]
}

const createItem = async (db: Client, userId: number, item: Item): Promise<number> => {
  await db.query('BEGIN')

  const { rows: itemRows } = await db.query(insertItemQuery(userId, item))
  const itemId = itemRows[0].id

  await db.query(insertItemTagsQuery(itemId, item.tags))
  await db.query(insertItemImagesQuery(itemId, item.images))
  await db.query('COMMIT')

  return itemId
}

const removeItem = async (db: Client, itemId: number): Promise<void> => {
  await db.query('BEGIN')
  await db.query(removeItemTagsQuery(itemId))
  await db.query(removeItemImagesQuery(itemId))
  await db.query(removeItemQuery(itemId))
  await db.query('COMMIT')
}

const getItem = async (db: Client, itemId: number): Promise<Item> => {
  const [{ rows: info }, { rows: tags }, { rows: images }] = await Promise.all([
    db.query(getItemQuery(itemId)),
    db.query(getItemTagsQuery(itemId)),
    db.query(getItemImagesQuery(itemId))
  ])

  return {
    ...info[0],
    tags: tags.map(tag => tag.tagId),
    images: images.map(image => image.url)
  }
}

const getUserItems = async (db: Client, userId: number): Promise<Item[]> => {
  const { rows } = await db.query(getUserItemsQuery(userId))
  const itemIds = rows.map(row => row.id)

  const getItemPromises = itemIds.map(itemId => getItem(db, itemId))

  const items = await Promise.all(getItemPromises)
  return items
}

export const itemsDb = {
  createItem,
  removeItem,
  getItem,
  getUserItems
}

export type ItemsDb = typeof itemsDb
