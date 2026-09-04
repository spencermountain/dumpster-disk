import path from 'node:path'
import { makeNestedHash, makeHashTwo } from './hash-paths.js'
import { sanitizeSegment, safeTitle, safeRelativePath } from './sanitize.js'

// where a page's file goes, for each output mode:
//   nested-hash (default) | flat | encyclopedia | encyclopedia-two | hash-two
const pathFor = function (page, opts) {
  const { outputDir, outputMode } = opts
  const name = safeTitle(page.title)
  if (outputMode === 'flat') {
    return path.join(outputDir, name + '.json')
  } else if (outputMode === 'encyclopedia' || outputMode === 'encyclopedia-one') {
    const c = sanitizeSegment(name.substring(0, 1).toLowerCase(), '__')
    return path.join(outputDir, c, name + '.json')
  } else if (outputMode === 'encyclopedia-two' || outputMode === 'encyclopedia-2') {
    const c = sanitizeSegment(name.substring(0, 2).toLowerCase(), '__')
    return path.join(outputDir, c, name + '.json')
  } else if (outputMode === 'hash-two') {
    return path.join(outputDir, safeRelativePath(makeHashTwo(name)) + '.json')
  }
  // (nested hash)
  return path.join(outputDir, safeRelativePath(makeNestedHash(name)) + '.json')
}
export default pathFor
