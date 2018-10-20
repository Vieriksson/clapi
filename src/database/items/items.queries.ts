import { Item } from './items.db'

export const insertItemQuery = (userId: number, item: Item) =>
  `INSERT INTO items("userId", "description") VALUES ('${userId}', '${
    item.description
  }') RETURNING id`

export const insertItemTagsQuery = (itemId, tags) =>
  `INSERT INTO item_tags("itemId", "tagId") VALUES ` +
  tags.map(tag => `('${itemId}', '${tag}')`).join(',')

export const insertItemImagesQuery = (itemId, images) =>
  `INSERT INTO item_images("itemId", "url") VALUES ` +
  images.map(image => `('${itemId}', '${image}')`).join(',')

export const removeItemTagsQuery = itemId => `DELETE FROM item_tags WHERE "itemId"='${itemId}'`

export const removeItemImagesQuery = itemId => `DELETE FROM item_images WHERE "itemId"='${itemId}'`

export const removeItemQuery = itemId => `DELETE FROM items WHERE "id"='${itemId}'`

export const getItemQuery = itemId => `SELECT * FROM items WHERE "id"='${itemId}'`

export const getItemTagsQuery = itemId => `SELECT "tagId" FROM item_tags WHERE "itemId"='${itemId}'`

export const getItemImagesQuery = itemId =>
  `SELECT "url" FROM item_images WHERE "itemId"='${itemId}'`

export const getUserItemsQuery = userId => `SELECT id FROM items 
  WHERE "userId"='${userId}'`
