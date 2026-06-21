import encodeTitle from './encodeTitle.js'

const UNSAFE = /[<>:"|?*\x00-\x1f/\\]/g
const RESERVED = /^(con|prn|aux|nul|com[1-9]|lpt[1-9])$/i

const sanitizeSegment = (segment, fallback = '__') => {
  let s = String(segment ?? '').replace(UNSAFE, '_').replace(/[. ]+$/, '').trim()
  if (!s || s === '.' || s === '..' || RESERVED.test(s)) return fallback
  return s.length > 255 ? s.slice(0, 255) : s
}

const safeTitle = (title) => sanitizeSegment(encodeTitle(title), '__')

const safeRelativePath = (relativePath) =>
  relativePath.split('/').map((part, i, parts) => {
    if (i === parts.length - 1 && part.includes('.')) {
      const dot = part.lastIndexOf('.')
      const base = sanitizeSegment(part.slice(0, dot), '__')
      const ext = part.slice(dot + 1).replace(UNSAFE, '')
      return ext ? `${base}.${ext}` : base
    }
    return sanitizeSegment(part, '__')
  }).join('/')

export { sanitizeSegment, safeTitle, safeRelativePath }
