export const notFoundHandler = (req, res) => {
  res.status(404).json({ error: 'Not found' })
}

export const errorHandler = (err, req, res, next) => {
  console.error('API Error:', err)
  const status = err.status || 500
  res.status(status).json({ error: err.message || 'Server error' })
}
