import { Client } from 'pg'

export type Group = {
  id?: number
  name: string
  description: string
  photo: string
}

export const fetchGroups = async (db: Client, userId: number) => {
  const query = {
    text: `SELECT * FROM groups 
      WHERE "userId"='${userId}'`
  }
  const { rows } = await db.query(query)
  return rows
}

export const fetchGroup = async (db: Client, groupId: number) => {
  const query = {
    text: `SELECT * FROM groups 
      WHERE "id"='${groupId}'`
  }
  const { rows } = await db.query(query)
  return rows[0]
}

export const createGroup = async (db, userId: number, group: Group): Promise<Group> => {
  const { name, description, photo } = group
  const query = {
    text: `INSERT INTO groups("userId", "name", "description", "photo") 
    values('${userId}', '${name}', '${description}', '${photo}')
    RETURNING *`
  }
  const { rows } = await db.query(query)
  return rows[0]
}

export const updateGroup = async (db, groupId: number, group: Group): Promise<Group> => {
  const { name, description, photo } = group
  const query = {
    text: `UPDATE groups
    SET 
      "name"='${name}',
      "description"='${description}',
      "photo"='${photo}'
    WHERE "id"='${groupId}'
    RETURNING *`
  }
  const { rows } = await db.query(query)
  return rows[0]
}

export const deleteGroup = async (db, groupId: number): Promise<void> => {
  const query = {
    text: `DELETE FROM groups
    WHERE "id"='${groupId}'
    RETURNING *`
  }
  await db.query(query)
}
