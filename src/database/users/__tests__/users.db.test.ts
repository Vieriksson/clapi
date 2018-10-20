import { Client } from 'pg'
import '../../../config'
import { createGuid } from '../../../utils/misc.util'
import { FacebookUser, usersDb } from '../users.db'

describe('user', () => {
  it('shoulda cruda woulda, but its to laaate', async () => {
    const db = new Client()
    await db.connect()

    const newUser: FacebookUser = {
      facebookId: createGuid(),
      name: 'janne josefsson',
      email: 'janne@janne.se',
      photo: 'random-photo-url'
    }

    const userId = (await usersDb.createUserFromFacebook(db, newUser)).id
    expect(userId).toBeDefined()

    const user = await usersDb.fetchUser(db, userId)
    expect(user.name).toBe(newUser.name)

    await usersDb.deleteUser(db, userId)

    const deletedUser = await usersDb.fetchUser(db, userId)
    expect(deletedUser).toBeUndefined()

    await db.end()
  })
})
