export const logErrors = (err, req, res, next) => {
  console.error(err.stack)
  next(err)
}

export const handleErrors = (err, req, res, next) => {
  res.status(err.status || 500).send()
}
