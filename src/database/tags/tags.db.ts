import { tagsQuery } from './tags.queries'

const fetchTags = async db => {
  const { rows } = await db.query(tagsQuery.selectTags())
  return rows
}

export const tagsDb = {
  fetchTags
}

export type TagsDb = typeof tagsDb
