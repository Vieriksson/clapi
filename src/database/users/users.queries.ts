import { FacebookUser } from './users.types'

const selectUsers = () => `
  SELECT * FROM users`

const selectUser = (id: number) => `
  SELECT * FROM users 
  WHERE id='${id}' 
  LIMIT 1`

const insertFacebookUser = (
  user: FacebookUser
) => `INSERT INTO users(facebook_id, name, email, photo) 
VALUES ('${user.facebookId}', '${user.name}', '${user.email}', '${user.photo}')
RETURNING *`

const deleteUser = (id: number) => `
  DELETE FROM users 
  WHERE id='${id}'`

const selectUserByFacebookId = (facebookId: string) => `
  SELECT * FROM users 
  WHERE facebook_id='${facebookId}' 
  LIMIT 1`

export const userQuery = {
  selectUsers,
  selectUser,
  insertFacebookUser,
  deleteUser,
  selectUserByFacebookId
}
