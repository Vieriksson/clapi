import { userQuery } from './users.queries'
import { FacebookUser, User } from './users.types'

const fetchUsers = async db => {
  const { rows } = await db.query(userQuery.selectUsers())
  return rows
}

const fetchUser = async (db, id): Promise<User> => {
  const { rows } = await db.query(userQuery.selectUser(id))
  return rows[0]
}

const deleteUser = async (db, id): Promise<User> => {
  return await db.query(userQuery.deleteUser(id))
}

const createUserFromFacebook = async (db, user: FacebookUser): Promise<User> => {
  const { rows } = await db.query(userQuery.insertFacebookUser(user))
  return rows[0]
}

const fetchUserByFacebookId = async (db, facebookId: string) => {
  const { rows } = await db.query(userQuery.selectUserByFacebookId(facebookId))
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
