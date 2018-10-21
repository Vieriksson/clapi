import { Client } from 'pg'
import '../../../config'
import { createGuid } from '../../../utils/misc.util'
import { usersDb } from '../../users/users.db'
import { FacebookUser } from '../../users/users.types'
import { groupsDb } from '../groups.db'
import { Group } from '../groups.types'

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

    const userId = (await usersDb.createUserFromFacebook(db, newUser)).id

    const group = await groupsDb.createGroup(db, userId, newGroup)
    expect(group.name).toBe(newGroup.name)

    const fetchedGroup = await groupsDb.fetchGroup(db, group.id)
    expect(fetchedGroup.name).toBe(newGroup.name)

    const groupAfterUpdate = await groupsDb.updateGroup(db, group.id, updatedGroup)
    expect(groupAfterUpdate.name).toBe(updatedGroup.name)

    await groupsDb.deleteGroup(db, group.id)
    await usersDb.deleteUser(db, userId)
    await db.end()
  })
})
