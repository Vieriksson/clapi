import {
  deleteUserQuery,
  insertFacebookUserQuery,
  selectUserByFacebookIdQuery,
  selectUserQuery,
  selectUsersQuery
} from './users.queries'

export type User = {
  id: number
  facebookId: string
  name: string
  email: string
  photo: string
}

export type FacebookUser = {
  facebookId: string
  name: string
  email: string
  photo: string
}

const fetchUsers = async db => {
  const { rows } = await db.query(selectUsersQuery())
  return rows
}

const fetchUser = async (db, id): Promise<User> => {
  const { rows } = await db.query(selectUserQuery(id))
  return rows[0]
}

const createUserFromFacebook = async (db, user: FacebookUser): Promise<User> => {
  const { rows } = await db.query(insertFacebookUserQuery(user))
  return rows[0]
}

const deleteUser = async (db, id): Promise<User> => {
  return await db.query(deleteUserQuery(id))
}

const fetchUserByFacebookId = async (db, facebookId: string) => {
  const { rows } = await db.query(selectUserByFacebookIdQuery(facebookId))
  return rows[0]
}

const upsertFacebookUser = async (db, facebookUser: FacebookUser) => {
  const user = await fetchUserByFacebookId(db, facebookUser.facebookId)
  if (user) {
    // TODO: Update user
    return user
  } else {
    return createUserFromFacebook(db, facebookUser)
  }
}

export const usersDb = {
  fetchUsers,
  fetchUser,
  createUserFromFacebook,
  deleteUser,
  upsertFacebookUser
}

export type UsersDb = typeof usersDb
