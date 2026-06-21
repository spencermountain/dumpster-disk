import { makeNestedHash, makeHashTwo } from './hash-paths.js'
import fs from 'fs'
import path from 'path'
import { sanitizeSegment, safeTitle, safeRelativePath } from './sanitize.js'

// recursively create any nested directories
const writeFile = function (file, json) {
  fs.mkdirSync(path.dirname(file), { recursive: true })
  fs.writeFileSync(file, JSON.stringify(json, null, 2))
}

const append = function (file, json) {
  fs.writeFileSync(file, json, { flag: 'a' })
}

// modes:  nested | flat | ndjson
const output = function (res, title, opts) {
  const { outputDir, outputMode } = opts
  let dir = outputDir
  if (outputMode === 'flat') {
    dir = path.join(dir, safeTitle(title) + '.json')
    writeFile(dir, res)
  } else if (outputMode === 'encyclopedia' || outputMode === 'encyclopedia-one') {
    const name = safeTitle(res.title)
    const c = sanitizeSegment(name.substring(0, 1).toLowerCase(), '__')
    dir = path.join(dir, c, name + '.json')
    writeFile(dir, res)
  } else if (outputMode === 'encyclopedia-two' || outputMode === 'encyclopedia-2') {
    const name = safeTitle(res.title)
    const c = sanitizeSegment(name.substring(0, 2).toLowerCase(), '__')
    dir = path.join(dir, c, name + '.json')
    writeFile(dir, res)
  } else if (outputMode === 'ndjson') {
    dir = path.join(dir, './index.ndjson')
    append(dir, JSON.stringify(res) + '\n')
  } else if (outputMode === 'hash-two') {
    const name = safeTitle(res.title)
    dir = path.join(dir, safeRelativePath(makeHashTwo(name)) + '.json')
    writeFile(dir, res)
  } else {
    // (nested hash)
    const name = safeTitle(title)
    dir = path.join(dir, safeRelativePath(makeNestedHash(name)) + '.json')
    writeFile(dir, res)
  }
}
export default output
