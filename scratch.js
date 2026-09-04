import dumpsterDisk from './src/index.js'

const stats = await dumpsterDisk({
  // outputDir: '/Volumes/4TB/dumpster-disk',
  outputDir: '/Users/spencer/Desktop/dumpster',
  project: 'wikipedia',
  lang: 'sw',
  format: 'sm',
  batchPageCount: 100,
  outputMode: 'encyclopedia',
  file: '/Volumes/4TB/wikipedia/swwiki-latest-pages-articles.xml',
})
console.log('dumpster-disk end', stats)
