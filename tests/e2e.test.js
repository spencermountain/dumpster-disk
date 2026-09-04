import { test, after } from 'node:test'
import assert from 'node:assert'
import { rmSync, readdirSync, statSync, readFileSync } from 'node:fs'
import path from 'node:path'
import makeFixture from 'dumpster-lib/fixture'
import dumpsterDisk from '../src/index.js'

const fixture = makeFixture(400)
after(() => rmSync(fixture.dir, { recursive: true, force: true }))
const base = { file: fixture.file, heartbeat: 0, lang: 'en', workers: 3, batchPageCount: 25, format: 'sm' }

const walk = (d) =>
  readdirSync(d).flatMap((f) => (statSync(path.join(d, f)).isDirectory() ? walk(path.join(d, f)) : [path.join(d, f)]))

test('encyclopedia mode writes one file per article', async () => {
  const outputDir = path.join(fixture.dir, 'enc')
  const stats = await dumpsterDisk({ ...base, outputDir, outputMode: 'encyclopedia' })
  const files = walk(outputDir)
  assert.equal(files.length, fixture.expect.articles.length)
  assert.equal(stats.written, files.length)
  const page = JSON.parse(readFileSync(files.find((f) => f.endsWith('Page_1.json')), 'utf8'))
  assert.equal(page.title, 'Page 1')
  assert.deepEqual(page.categories, ['Towns'])
})

test('ndjson mode writes one line per article', async () => {
  const outputDir = path.join(fixture.dir, 'nd')
  await dumpsterDisk({ ...base, outputDir, outputMode: 'ndjson' })
  const lines = readFileSync(path.join(outputDir, 'index.ndjson'), 'utf8').trim().split('\n')
  assert.equal(lines.length, fixture.expect.articles.length)
  const titles = lines.map((l) => JSON.parse(l).title).sort()
  assert.deepEqual(titles, fixture.expect.articles.slice().sort())
})
