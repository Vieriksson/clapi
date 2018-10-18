import * as express from 'express'
import * as request from 'supertest'
import * as usersDb from '../../database/users.db'
import { createUserRoutes } from '../users.routes'

const app = express()
app.use('/users', createUserRoutes())

describe('get user by id', () => {
  it('should get user by id', async () => {
    ;(usersDb.fetchUser as any) = async () => ({ id: '123' })

    const response = await request(app).get('/users/:123')

    expect(response.statusCode).toBe(200)
    expect(response.body.id).toBe('123')
  })
})
