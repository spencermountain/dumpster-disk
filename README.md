<div align="center">
  <img height="15px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>
  <div><b>dumpster-disk</b></div>
  <img src="https://user-images.githubusercontent.com/399657/68222691-6597f180-ffb9-11e9-8a32-a7f38aa8bded.png"/>
  <div>parse a wikipedia dump into JSON files</div>
  <div><code>npm install dumpster-disk</code></div>
  <div align="center">
    <sub>
      by
      <a href="https://spencermounta.in/">Spencer Kelly</a> and
      <a href="https://github.com/spencermountain/dumpster-lib/graphs/contributors">
        contributors
      </a>
    </sub>
  </div>
  <img height="22px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>
</div>

<div align="center">
  <div>
    <a href="https://npmjs.org/package/dumpster-lib">
    <img src="https://img.shields.io/npm/v/dumpster-lib.svg?style=flat-square" />
  </a>
  <a href="https://codecov.io/gh/spencermountain/dumpster-lib">
    <img src="https://codecov.io/gh/spencermountain/dumpster-lib/branch/master/graph/badge.svg" />
  </a>
  <a href="https://bundlephobia.com/result?p=dumpster-lib">
    <img src="https://img.shields.io/bundlephobia/min/dumpster-lib"/>
  </a>
  </div>
  <div align="center">
    <sub>
     <a href="https://github.com/spencermountain/dumpster-disk">dumpster-disk</a> • <a href="https://github.com/spencermountain/dumpster-duck">dumpster-duck</a>  • <a href="https://github.com/spencermountain/dumpster-dip">dumpster-dip</a> • <a href="https://github.com/spencermountain/dumpster-dive">dumpster-dive</a>
    </sub>
  </div>
</div>

<!-- spacer -->
<img height="25px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>


### Usage

```js
import dumpsterDisk from './src/index.js'

await dumpsterDisk({
  file: '~/Downloads/simplewiki-latest-pages-articles.xml',
  outputDir: '~/Desktop/dumpster',
  chunkSize: 10,
  format: 'sm', // 'sm', 'md', 'lg', 'html', 'text'...
  outputMode: 'encyclopedia', // 'hash', 'flat', 'nested', 'encyclopedia', 'encyclopedia-two', 'ndjson'
})
```

### Output Modes
Writing millions of files to one directory can cause some computers to crash. 

For this reason, people have come up with clever ways to split files into subdirectories evenly. We support a few of these modes:

- `flat` - write each page to a single directory (not recommended)
- `encyclopedia-one` - write each page to a directory based on the first letter of the title
- `encyclopedia-two` - write each page to a directory based on the first two letters of the title

- `hash-two` - write each page to a directory based the first two characters of the MD5 hash of the title
- `hash-nested` (default) - write each page to two nested directories, based on the first, and then the first two characters of the MD5 hash of the title
- `ndjson` - write each page to a single file, in newline-delimited JSON format

Some old filesystems (like FAT32) are limited to 65k files per directory. English wikipedia has 7m pages plus a few million redirects, so even 2-character directories will hit this limit.

For this reason, [Wikipedia itself](https://commons.wikimedia.org/wiki/Commons:FAQ#What_are_the_strangely_named_components_in_file_paths.3F) uses the `hash-nested` mode, so we do too. It cleverly gives an even distribution of files across directories.

Its is opaque though - to retreive file from the filename, you'll need a quick function:
```js
import { createHash } from 'node:crypto'

const getPath = function (title, ext='json') {
  const hash = createHash('md5').update(title, 'utf8').digest('hex')
  const encodedTitle = encodeURIComponent(title)
  return `${hash.substring(0, 1)}/${hash.substring(0, 2)}/${encodedTitle}.${ext}`
}
getPath('Boston (disambiguation)')
// 'f/f4/Boston%20(disambiguation).json'
```

### Options

- `outputDir` - the directory to write the files to
- `outputMode` - the mode to write the files in