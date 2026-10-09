import test from 'tape'
import { rmSync, readdirSync, statSync, readFileSync } from 'node:fs'
import path from 'node:path'
import makeFixture from 'dumpster-lib/fixture'
import dumpsterDisk from '../src/index.js'

const fixture = makeFixture(400)
test.onFinish(() => rmSync(fixture.dir, { recursive: true, force: true }))
const base = { file: fixture.file, heartbeat: 0, silent: true, lang: 'en', workers: 3, batchPageCount: 25, format: 'sm' }

const walk = (d) =>
  readdirSync(d).flatMap((f) => (statSync(path.join(d, f)).isDirectory() ? walk(path.join(d, f)) : [path.join(d, f)]))

test('encyclopedia mode writes one file per article', async (t) => {
  const outputDir = path.join(fixture.dir, 'enc')
  const stats = await dumpsterDisk({ ...base, outputDir, outputMode: 'encyclopedia' })
  const files = walk(outputDir)
  t.equal(files.length, fixture.expect.articles.length, 'writes one file per article')
  t.equal(stats.written, files.length, 'written count matches files on disk')
  const page = JSON.parse(readFileSync(files.find((f) => f.endsWith('Page_1.json')), 'utf8'))
  t.equal(page.title, 'Page 1', 'preserves the article title')
  t.deepEqual(page.categories, ['Towns'], 'preserves article categories')
  t.end()
})

test('ndjson mode writes one line per article', async (t) => {
  const outputDir = path.join(fixture.dir, 'nd')
  await dumpsterDisk({ ...base, outputDir, outputMode: 'ndjson' })
  const lines = readFileSync(path.join(outputDir, 'index.ndjson'), 'utf8').trim().split('\n')
  t.equal(lines.length, fixture.expect.articles.length, 'writes one line per article')
  const titles = lines.map((l) => JSON.parse(l).title).sort()
  t.deepEqual(titles, fixture.expect.articles.slice().sort(), 'includes every article title')
  t.end()
})
