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
const getPath = function (title, ext='json') {
  const hash = md5(title) // from whatever md5 library you use
  const encodedTitle = encodeURIComponent(title)
  let path = `${hash.substring(0, 1)}/${hash.substring(0, 2)}/${encodedTitle}.${ext}`
  return path
}
getPath('Boston (disambiguation)')
// 'f/f4/Boston%20(disambiguation).json'
```

### Options

- `outputDir` - the directory to write the files to
- `outputMode` - the mode to write the files in