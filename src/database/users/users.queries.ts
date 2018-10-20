import { FacebookUser } from './users.db'

export const selectUsersQuery = () => 'SELECT * FROM users'

export const selectUserQuery = (id: number) => `SELECT * FROM users WHERE "id"='${id}' LIMIT 1`

export const insertFacebookUserQuery = (
  user: FacebookUser
) => `INSERT INTO users("facebookId", "name", "email", "photo") 
values('${user.facebookId}', '${user.name}', '${user.email}', '${user.photo}')
RETURNING *`

export const deleteUserQuery = (id: number) => `DELETE FROM users WHERE "id"='${id}'`

export const selectUserByFacebookIdQuery = (facebookId: string) =>
  `SELECT * FROM users WHERE "facebookId"='${facebookId}' LIMIT 1`
