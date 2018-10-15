import { Client } from 'pg'
import '../../config'
import { createGuid } from '../../utils/misc.util'
import { createGroup, deleteGroup, fetchGroup, Group, updateGroup } from '../groups.db'
import { createUserFromFacebook, deleteUser, FacebookUser } from '../users.db'

describe('user', () => {
  it('shoulda cruda woulda', async () => {
    const db = new Client()
    await db.connect()

    const newUser: FacebookUser = {
      facebookId: createGuid(),
      name: 'test-user-name',
      email: 'test-user-email',
      photo: 'test-user-photo'
    }
    const newGroup: Group = {
      name: 'test-group-name',
      description: 'test-group-description',
      photo: 'test-group-photo'
    }
    const updatedGroup = { ...newGroup, name: 'test-group-name-2' }

    const userId = (await createUserFromFacebook(db, newUser)).id

    const group = await createGroup(db, userId, newGroup)
    expect(group.name).toBe(newGroup.name)

    const fetchedGroup = await fetchGroup(db, group.id)
    expect(fetchedGroup.name).toBe(newGroup.name)

    const groupAfterUpdate = await updateGroup(db, group.id, updatedGroup)
    expect(groupAfterUpdate.name).toBe(updatedGroup.name)

    await deleteGroup(db, group.id)
    await deleteUser(db, userId)
    await db.end()
  })
})
