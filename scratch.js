import dumpsterDisk from './src/index.js'

await dumpsterDisk({
  // outputDir: '/Volumes/4TB/dumpster-disk',
  outputDir: '/Users/spencer/Desktop/dumpster',
  project: 'wikipedia',
  // lang: 'sw',
  lang: 'simple',
  format: 'text',
  chunkSize: 10,
  format: 'sm',
  outputMode: 'encyclopedia',
  // file: '/Volumes/4TB/wikipedia/swwiki-latest-pages-articles.xml'
  file: '/Volumes/4TB/wikipedia/simplewiki-latest-pages-articles.xml'
})
console.log('dumpster-disk end')
