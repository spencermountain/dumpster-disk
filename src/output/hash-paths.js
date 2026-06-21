import md5 from './md5.js'
import encodeTitle from './encodeTitle.js'

// https://commons.wikimedia.org/wiki/Commons:FAQ#What_are_the_strangely_named_components_in_file_paths.3F
const makeNestedHash = function (title, ext = 'json') {
  const hash = md5(title) // from whatever md5 library you use
  const encodedTitle = encodeTitle(title)
  return `${hash.substring(0, 1)}/${hash.substring(0, 2)}/${encodedTitle}.${ext}`
}
const makeHashTwo = function (title, ext = 'json') {
  const hash = md5(title) // from whatever md5 library you use
  const encodedTitle = encodeTitle(title)
  return `${hash.substring(0, 2)}/${encodedTitle}.${ext}`
}
export { makeNestedHash, makeHashTwo }

// https://commons.wikimedia.org/w/api.php?action=query&titles=File:Bruce_Lee_as_Chen_Zhen_(4x5_cropped).jpg&prop=imageinfo&iiprop=url
// console.log(makeMd5Path("Spelterini_Blüemlisalp.jpg"), 'a/ae/Spelterini_Bl%C3%BCemlisalp.jpg')
// console.log(makeMd5Path("Bruce_Lee_as_Chen_Zhen_(4x5_cropped).jpg") === '1/1e/Bruce_Lee_as_Chen_Zhen_(4x5_cropped).jpg')
// console.log(makeMd5Path('Boston (disambiguation)'))