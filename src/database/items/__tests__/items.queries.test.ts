import { insertItemImagesQuery, insertItemQuery, insertItemTagsQuery } from '../items.queries'

describe('createInsertItemQuery', () => {
  it('should create insert item query', () => {
    const userId = 123
    const item = {
      description: 'random'
    } as any

    const query = insertItemQuery(userId, item)

    expect(query).toContain(`INSERT INTO items("userId", "description") VALUES`)
    expect(query).toContain(`('123', 'random')`)
  })
})

describe('createInsertTagsQuery', () => {
  it('should create tag query for each tag', () => {
    const itemId = 123
    const tags = [123, 456, 789]

    const query = insertItemTagsQuery(itemId, tags)

    expect(query).toContain(`INSERT INTO item_tags("itemId", "tagId") VALUES`)
    expect(query).toContain(`('123', '123'),`)
    expect(query).toContain(`('123', '456'),`)
    expect(query).toContain(`('123', '789')`)
  })
})

describe('createInsertImagesQuery', () => {
  it('should create image query for each tag', () => {
    const itemId = 123
    const images = ['url1', 'url2', 'url3']

    const query = insertItemImagesQuery(itemId, images)

    expect(query).toContain(`INSERT INTO item_images("itemId", "url") VALUES`)
    expect(query).toContain(`('123', 'url1'),`)
    expect(query).toContain(`('123', 'url2'),`)
    expect(query).toContain(`('123', 'url3')`)
  })
})
