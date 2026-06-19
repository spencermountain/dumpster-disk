import writeFile from './output/index.js'



const writeFiles = (chunks, opts) => {
  for (let i = 0; i < chunks.length; i++) {
    writeFile(chunks[i], chunks[i].title, opts)
  }
}

export default writeFiles