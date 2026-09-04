import dumpster from 'dumpster-lib'
import writeFiles from './write.js'
import defaults from './defaults.js'

const dumpsterDisk = (options) => {
  options = Object.assign({}, defaults, options)
  const pool = dumpster(options)
  // writeFiles returns a promise, so the pool waits until a batch is on disk before handing over the next
  pool.on('batch', (pages) => writeFiles(pages, options))
  return pool.done
}

export default dumpsterDisk
