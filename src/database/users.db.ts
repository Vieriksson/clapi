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

export const fetchUsers = async db => {
  const query = {
    text: 'SELECT * FROM users'
  }
  const { rows } = await db.query(query)
  return rows
}

export const fetchUser = async (db, id): Promise<User> => {
  const query = {
    text: `SELECT * FROM users WHERE "id"='${id}' LIMIT 1`
  }
  const { rows } = await db.query(query)
  return rows[0]
}

export const createUserFromFacebook = async (db, user: FacebookUser): Promise<User> => {
  const { facebookId, name, email, photo } = user
  const query = {
    text: `INSERT INTO users("facebookId", "name", "email", "photo") 
    values('${facebookId}', '${name}', '${email}', '${photo}')
    RETURNING *`
  }
  const { rows } = await db.query(query)
  return rows[0]
}

export const deleteUser = async (db, id): Promise<User> => {
  const query = {
    text: `DELETE FROM users WHERE "id"='${id}'`
  }
  return await db.query(query)
}

const fetchUserByFacebookId = async (db, facebookId: string) => {
  const query = {
    text: `SELECT * FROM users WHERE "facebookId"='${facebookId}' LIMIT 1`
  }
  const { rows } = await db.query(query)
  return rows[0]
}

export const upsertFacebookUser = async (db, facebookUser: FacebookUser) => {
  const user = await fetchUserByFacebookId(db, facebookUser.facebookId)
  if (user) {
    // TODO: Update user
    return user
  } else {
    return createUserFromFacebook(db, facebookUser)
  }
}
