import { Client } from 'pg'
import '../../config'
import { createGuid } from '../../utils/misc.util'
import { createUserFromFacebook, deleteUser, FacebookUser, fetchUser } from '../users.db'

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

    const userId = (await createUserFromFacebook(db, newUser)).id
    expect(userId).toBeDefined()

    const user = await fetchUser(db, userId)
    expect(user.name).toBe(newUser.name)

    await deleteUser(db, userId)

    const deletedUser = await fetchUser(db, userId)
    expect(deletedUser).toBeUndefined()

    await db.end()
  })
})
