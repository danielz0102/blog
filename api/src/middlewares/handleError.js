// eslint-disable-next-line no-unused-vars
export function handleError(err, req, res, next) {
  console.error(err)

  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ error: 'Body is not valid JSON' })
  }

  res.status(500).json({
    error: 'An unexpected error occurred'
  })
}
