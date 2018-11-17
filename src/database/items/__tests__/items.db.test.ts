import { Client } from 'pg'
import '../../../config'
import { itemsDb } from '../items.db'
import { Item } from '../items.types'

describe('item', () => {
  it('create and delete item', async () => {
    const db = new Client()
    await db.connect()

    const item: Item = {
      description: 'random',
      images: ['image1', 'image2'],
      tags: ['MEN']
    }

    const itemId = await itemsDb.createItem(db, 1, item)
    await itemsDb.removeItem(db, itemId)

    await db.end()
  })
})
