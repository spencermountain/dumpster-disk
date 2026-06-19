import dumpster from '/Users/spencer/mountain/dumpster-lib/src/index.js'
import writeFiles from './write.js'

const dumpsterDisk = (options) => {
  let p = new Promise((resolve, reject) => {
    // kick of the parsing process
    dumpster(options).on('chunk', (chunks) => {
      // each chunk we write to the filesystem
      writeFiles(chunks)
    }).on('end', () => {
      resolve()
    }).on('error', (error) => {
      reject(error)
    })
  })
  return p
}

export default dumpsterDisk