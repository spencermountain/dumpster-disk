import dumpsterDisk from './src/index.js'

console.log('dumpster-disk start')
await dumpsterDisk({
  project: 'wikipedia',
  lang: 'sw',
  format: 'text',
  chunkSize: 10,
  format: 'text',
  file: '/Volumes/4TB/wikipedia/swwiki-latest-pages-articles.xml'
})
console.log('dumpster-disk end')