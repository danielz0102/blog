export const formatDate = (dateString) =>
  new Date(dateString).toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
