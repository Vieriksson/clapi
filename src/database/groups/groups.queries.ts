import { Group } from './groups.db'

export const selectUserGroupsQuery = (userId: number) => `SELECT * FROM groups 
WHERE "userId"='${userId}'`

export const selectGroupQuery = (groupId: number) => `SELECT * FROM groups 
WHERE "id"='${groupId}'`

export const createGroupQuery = (
  userId: number,
  group: Group
) => `INSERT INTO groups("userId", "name", "description", "photo") 
values('${userId}', '${group.name}', '${group.description}', '${group.photo}')
RETURNING *`

export const updateGroupQuery = (groupId: number, group: Group) => `UPDATE groups
SET 
  "name"='${group.name}',
  "description"='${group.description}',
  "photo"='${group.photo}'
WHERE "id"='${groupId}'
RETURNING *`

export const deleteGroupQuery = (groupId: number) => `DELETE FROM groups
WHERE "id"='${groupId}'`
