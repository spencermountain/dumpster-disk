import test from 'tape'
import TapDance from 'tap-dancer'
import { pipeline } from 'node:stream'

const reporter = new TapDance()
reporter.on('complete', (results) => {
  if (!results.ok) process.exitCode = 1
})

pipeline(test.createStream(), reporter, process.stdout, (err) => {
  if (err) {
    process.stderr.write(`${err.stack || err}\n`)
    process.exitCode = 1
  }
})

await import('./e2e.test.js')
