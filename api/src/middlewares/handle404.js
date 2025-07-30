export function handle404(req, res) {
  res.status(404).json({
    error: 'The requested resource was not found'
  })
}
