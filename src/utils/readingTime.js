// Remove HTML tags and count words, assuming an average reading speed of 200 words per minute
export function getWordCount(html = '') {
  const text = html.replace(/<[^>]*>/g, ' ').trim()
  return text ? text.split(/\s+/).length : 0
}

export function calculateReadingTime(html = '') {
  const words = getWordCount(html)
  return words === 0 ? 0 : Math.max(1, Math.ceil(words / 200))
}