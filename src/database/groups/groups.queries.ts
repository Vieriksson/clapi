import { Group } from './groups.types'

const selectUserGroups = (userId: number) => `
  SELECT * 
  FROM groups 
  WHERE user_id='${userId}'`

const selectGroup = (groupId: number) => `
  SELECT * 
  FROM groups 
  WHERE id='${groupId}'`

const insertGroup = (userId: number, group: Group) => `
  INSERT INTO groups(user_id, name, description, photo) 
  values('${userId}', '${group.name}', '${group.description}', '${group.photo}')
  RETURNING *`

const updateGroup = (groupId: number, group: Group) => `
  UPDATE groups
  SET name='${group.name}', description='${group.description}', photo='${group.photo}'
  WHERE id='${groupId}'
  RETURNING *`

const deleteGroup = (groupId: number) => `
  DELETE FROM groups
  WHERE id='${groupId}'`

const selectGroupMembers = (groupId: number) => `
  SELECT users.* 
  FROM group_members
    INNER JOIN users 
    ON users.id = group_members.user_id
  WHERE group_members.group_id='${groupId}'`

export const groupQuery = {
  selectUserGroups,
  selectGroup,
  insertGroup,
  updateGroup,
  deleteGroup,
  selectGroupMembers
}
