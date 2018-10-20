import { Client } from 'pg'
import {
  createGroupQuery,
  deleteGroupQuery,
  selectGroupQuery,
  selectUserGroupsQuery,
  updateGroupQuery
} from './groups.queries'

export type Group = {
  id?: number
  name: string
  description: string
  photo: string
}

const fetchUserGroups = async (db: Client, userId: number) => {
  const { rows } = await db.query(selectUserGroupsQuery(userId))
  return rows
}

const fetchGroup = async (db: Client, groupId: number) => {
  const { rows } = await db.query(selectGroupQuery(groupId))
  return rows[0]
}

const createGroup = async (db, userId: number, group: Group): Promise<Group> => {
  const { rows } = await db.query(createGroupQuery(userId, group))
  return rows[0]
}

const updateGroup = async (db, groupId: number, group: Group): Promise<Group> => {
  const { rows } = await db.query(updateGroupQuery(groupId, group))
  return rows[0]
}

const deleteGroup = async (db, groupId: number): Promise<void> => {
  await db.query(deleteGroupQuery(groupId))
}

export const groupsDb = {
  fetchUserGroups,
  fetchGroup,
  createGroup,
  updateGroup,
  deleteGroup
}

export type GroupsDb = typeof groupsDb
