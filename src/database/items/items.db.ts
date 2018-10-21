import { Client } from 'pg'
import { itemQuery } from './items.queries'
import { Item } from './items.types'

const getItem = async (db: Client, itemId: number): Promise<Item> => {
  const [{ rows: info }, { rows: tags }, { rows: images }] = await Promise.all([
    db.query(itemQuery.selectItem(itemId)),
    db.query(itemQuery.selectItemTags(itemId)),
    db.query(itemQuery.selectItemImages(itemId))
  ])

  return {
    ...info[0],
    tags: tags.map(tag => tag.tagId),
    images: images.map(image => image.url)
  }
}

const getUserItems = async (db: Client, userId: number): Promise<Item[]> => {
  const { rows } = await db.query(itemQuery.selectUserItems(userId))
  const itemIds = rows.map(row => row.id)

  const getItemPromises = itemIds.map(itemId => getItem(db, itemId))

  const items = await Promise.all(getItemPromises)
  return items
}

const getFilteredItems = async (db: Client, userId: number, tags: string[]) => {
  let { rows } = await db.query(itemQuery.selectFriendsIems(userId))

  if (tags.length > 0) {
    rows = rows.filter(row => {
      const itemTags = row.tag_ids.split(',')
      return tags.every(tag => itemTags.includes(tag))
    })
  }

  return rows
}

const createItem = async (db: Client, userId: number, item: Item): Promise<number> => {
  await db.query('BEGIN')

  const { rows: itemRows } = await db.query(itemQuery.insertItem(userId, item))
  const itemId = itemRows[0].id

  await db.query(itemQuery.insertItemTags(itemId, item.tags))
  await db.query(itemQuery.insertItemImages(itemId, item.images))

  if (item.groupIds) {
    await db.query(itemQuery.insertItemGroups(itemId, item.groupIds))
  }

  await db.query('COMMIT')

  return itemId
}

const removeItem = async (db: Client, itemId: number): Promise<void> => {
  await db.query('BEGIN')
  await db.query(itemQuery.deleteItemTags(itemId))
  await db.query(itemQuery.deleteItemImages(itemId))
  await db.query(itemQuery.deleteItem(itemId))
  await db.query('COMMIT')
}

export const itemsDb = {
  createItem,
  removeItem,
  getItem,
  getUserItems,
  getFilteredItems
}

export type ItemsDb = typeof itemsDb
