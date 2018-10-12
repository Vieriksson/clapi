// import { Client } from 'pg'
// import '../../config'
// import { createGuid } from '../../utils/misc.util'
// import { createUser, deleteUser, fetchUser, User } from '../users.db'

// describe('user', () => {
//   it('should create, fetch and remove user', async () => {
//     const db = new Client()
//     await db.connect()

//     const name = 'janne josefsson'

//     const newUser: User = {
//       facebookId: createGuid(),
//       name,
//       email: 'janne@janne.se',
//       photo: 'random-photo-url'
//     }

//     const userId = (await createUser(db, newUser)).id
//     expect(userId).toBeDefined()

//     const user = await fetchUser(db, userId)
//     expect(user.name).toBe(name)

//     await deleteUser(db, userId)

//     const deletedUser = await fetchUser(db, userId)
//     expect(deletedUser).toBeUndefined()
//   })
// })
