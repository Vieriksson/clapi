import * as express from 'express'
import * as request from 'supertest'
import { createUserRoutes } from '../users.routes'

let app
beforeAll(() => {
  const usersDb = {
    fetchUser: async () => ({ id: '123' }),
    fetchUsers: async () => [{ id: '123' }, { id: '456' }]
  } as any

  const _app = express()
  _app.use('/users', createUserRoutes(usersDb))

  app = _app
})

describe('user routes', () => {
  it('should get user by id', async () => {
    const response = await request(app).get('/users/:123')

    expect(response.statusCode).toBe(200)
    expect(response.body.id).toBe('123')
  })

  it('should get users', async () => {
    const response = await request(app).get('/users')

    expect(response.statusCode).toBe(200)
    expect(response.body.length).toBe(2)
    expect(response.body[0].id).toBe('123')
    expect(response.body[1].id).toBe('456')
  })
})
