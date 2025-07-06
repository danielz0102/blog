// eslint-disable-next-line no-unused-vars
export function handleError(err, req, res, next) {
  console.error(err)

  res.status(500).json({
    error: 'An unexpected error occurred',
  })
}
