import { Client } from 'pg'
import '../../../config'
import { Item, itemsDb } from '../items.db'

describe('item', () => {
  it('create and delete item', async () => {
    const db = new Client()
    await db.connect()

    const item: Item = {
      description: 'random',
      images: ['image1', 'image2'],
      tags: [1]
    }

    const itemId = await itemsDb.createItem(db, 1, item)
    await itemsDb.removeItem(db, itemId)

    await db.end()
  })
})
