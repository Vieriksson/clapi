export const safeRoute = routeHandler => (req, res, next) =>
  Promise.resolve(routeHandler(req, res, next)).catch(err => {
    next(err)
  })
