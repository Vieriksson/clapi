import { itemQuery } from '../items.queries'

describe('createInsertItemQuery', () => {
  it('should create insert item query', () => {
    const userId = 123
    const item = {
      description: 'random'
    } as any

    const query = itemQuery.insertItem(userId, item)

    expect(query).toContain(`INSERT INTO items(user_id, description)`)
    expect(query).toContain(`('123', 'random')`)
  })
})

describe('createInsertTagsQuery', () => {
  it('should create tag query for each tag', () => {
    const itemId = 123
    const tags = ['MEN', 'CASUAL', 'SPREZZ']

    const query = itemQuery.insertItemTags(itemId, tags)

    expect(query).toContain(`INSERT INTO item_tags(item_id, tag)`)
    expect(query).toContain(`('123', 'MEN'),`)
    expect(query).toContain(`('123', 'CASUAL'),`)
    expect(query).toContain(`('123', 'SPREZZ')`)
  })
})

describe('createInsertImagesQuery', () => {
  it('should create image query for each tag', () => {
    const itemId = 123
    const images = ['url1', 'url2', 'url3']

    const query = itemQuery.insertItemImages(itemId, images)

    expect(query).toContain(`INSERT INTO item_images(item_id, url)`)
    expect(query).toContain(`('123', 'url1'),`)
    expect(query).toContain(`('123', 'url2'),`)
    expect(query).toContain(`('123', 'url3')`)
  })
})
