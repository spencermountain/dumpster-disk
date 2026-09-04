import dumpster from 'dumpster-lib'
import writeFiles from './write.js'
import defaults from './defaults.js'

const dumpsterDisk = (options) => {
  options = Object.assign({}, defaults, options)
  const pool = dumpster(options)
  // our writes are synchronous, so each batch is on disk before the pool hands over the next
  pool.on('batch', (pages) => {
    writeFiles(pages, options)
  })
  return pool.done
}

export default dumpsterDisk
