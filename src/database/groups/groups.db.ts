import { Client } from 'pg'
import { groupQuery } from './groups.queries'
import { Group } from './groups.types'

const fetchUserGroups = async (db: Client, userId: number) => {
  const { rows } = await db.query(groupQuery.selectUserGroups(userId))
  return rows
}

const fetchGroup = async (db: Client, groupId: number) => {
  const { rows } = await db.query(groupQuery.selectGroup(groupId))
  return rows[0]
}

const fetchGroupMembers = async (db, groupId: number): Promise<Group[]> => {
  const { rows } = await db.query(groupQuery.selectGroupMembers(groupId))
  return rows
}

const createGroup = async (db, userId: number, group: Group): Promise<Group> => {
  const { rows } = await db.query(groupQuery.insertGroup(userId, group))
  return rows[0]
}

const updateGroup = async (db, groupId: number, group: Group): Promise<Group> => {
  const { rows } = await db.query(groupQuery.updateGroup(groupId, group))
  return rows[0]
}

const deleteGroup = async (db, groupId: number): Promise<void> => {
  await db.query(groupQuery.deleteGroup(groupId))
}

export const groupsDb = {
  fetchUserGroups,
  fetchGroup,
  createGroup,
  updateGroup,
  deleteGroup,
  fetchGroupMembers
}

export type GroupsDb = typeof groupsDb
