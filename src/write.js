import fs from 'node:fs/promises'
import path from 'node:path'
import pathFor from './output/index.js'

const CONCURRENCY = 32 // files in-flight at once
const made = new Set() // directories we've already created

const ensureDir = async (dir) => {
  if (!made.has(dir)) {
    await fs.mkdir(dir, { recursive: true })
    made.add(dir)
  }
}

// run fn over every item, with at most `limit` in-flight at once
const eachLimit = async (items, limit, fn) => {
  let i = 0
  const lane = async () => {
    while (i < items.length) {
      await fn(items[i++])
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, lane))
}

// write one batch of pages. resolves once they're all on disk,
// which is when the pool hands over the next batch.
const writeFiles = async (pages, opts) => {
  if (opts.outputMode === 'ndjson') {
    // one append per batch, so lines never interleave
    await ensureDir(opts.outputDir)
    const lines = pages.map((p) => JSON.stringify(p)).join('\n') + '\n'
    await fs.appendFile(path.join(opts.outputDir, 'index.ndjson'), lines)
    return
  }
  await eachLimit(pages, CONCURRENCY, async (page) => {
    const file = pathFor(page, opts)
    await ensureDir(path.dirname(file))
    await fs.writeFile(file, JSON.stringify(page, null, 2))
  })
}
export default writeFiles
