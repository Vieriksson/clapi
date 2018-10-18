import { safeRoute } from '../routes.util'

describe('safeRoute', () => {
  it('should call next if handler throws error', async () => {
    const routeHandler = async () => {
      throw { message: 'error' }
    }
    const next = jest.fn()

    await safeRoute(routeHandler)({}, {}, next)

    expect(next).toBeCalledTimes(1)
    expect(next.mock.calls[0][0].message).toBe('error')
  })

  it('should not call next if no error in handler', async () => {
    const routeHandler = async () => {}
    const next = jest.fn()

    await safeRoute(routeHandler)({}, {}, next)

    expect(next).toBeCalledTimes(0)
  })
})
