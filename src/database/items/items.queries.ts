import { Item } from './items.types'

const insertItem = (userId: number, item: Item) => `
  INSERT INTO items(user_id, description) 
  VALUES ('${userId}', '${item.description}') 
  RETURNING id`

const insertItemTags = (itemId, tags) =>
  `INSERT INTO item_tags(item_id, tag_id) 
  VALUES ` + tags.map(tag => `('${itemId}', '${tag}')`).join(',')

const insertItemImages = (itemId, images) =>
  `INSERT INTO item_images(item_id, url) 
  VALUES ` + images.map(image => `('${itemId}', '${image}')`).join(',')

const insertItemGroups = (itemId, groupIds) =>
  `INSERT INTO group_items(item_id, url) 
  VALUES ` + groupIds.map(groupId => `('${groupId}', '${itemId}')`).join(',')

const deleteItemTags = itemId => `
  DELETE FROM item_tags 
  WHERE item_id='${itemId}'`

const deleteItemImages = itemId => `
  DELETE FROM item_images 
  WHERE item_id='${itemId}'`

const deleteItem = itemId => `
  DELETE FROM items 
  WHERE id='${itemId}'`

const selectItem = itemId => `
  SELECT * FROM items 
  WHERE id='${itemId}'`

const selectItemTags = itemId => `
  SELECT tag_id FROM item_tags 
  WHERE item_id='${itemId}'`

const selectItemImages = itemId => `
  SELECT url FROM item_images 
  WHERE item_id='${itemId}'`

const selectUserItems = userId => `
  SELECT id FROM items 
  WHERE user_id='${userId}'`

const selectFriendsIems = (userId: number) => `
  SELECT 
    items.*, 
    array_to_string(array_agg(distinct item_images.url), ',') as image_urls, 
    array_to_string(array_agg(distinct item_tags.tag_id), ',') as tag_ids
  FROM group_members
  JOIN group_items
    ON group_members.group_id = group_items.group_id
  JOIN items
    ON items.id = group_items.item_id
  JOIN item_tags
    ON items.id = item_tags.item_id
  JOIN item_images
    ON items.id = item_images.item_id
  WHERE group_members.user_id=${userId}
  GROUP BY items.id
`

export const itemQuery = {
  insertItem,
  insertItemTags,
  insertItemImages,
  insertItemGroups,
  deleteItemTags,
  deleteItemImages,
  deleteItem,
  selectItem,
  selectItemTags,
  selectItemImages,
  selectUserItems,
  selectFriendsIems
}
