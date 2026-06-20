import md5 from './md5.js'

//the wikimedia image url is a little silly:
//https://commons.wikimedia.org/wiki/Commons:FAQ#What_are_the_strangely_named_components_in_file_paths.3F
const makePath = function (title) {
  // remove spaces and things
  let hash = md5(title)
  let path = hash.substring(0, 1) + '/' + hash.substring(0, 2) + '/'
  title = encodeURIComponent(title)
  return path += title
}
export default makePath

// https://commons.wikimedia.org/w/api.php?action=query&titles=File:Bruce_Lee_as_Chen_Zhen_(4x5_cropped).jpg&prop=imageinfo&iiprop=url
// console.log(makePath("Spelterini_Blüemlisalp.jpg") === 'a/ae/Spelterini_Bl%C3%BCemlisalp.jpg')
// console.log(makePath("Bruce_Lee_as_Chen_Zhen_(4x5_cropped).jpg") === '1/1e/Bruce_Lee_as_Chen_Zhen_(4x5_cropped).jpg')


const getPath = function (title, ext = 'json') {
  const hash = md5(title) // from whatever md5 library you use
  const encodedTitle = encodeURIComponent(title)
  let path = `${hash.substring(0, 1)}/${hash.substring(0, 2)}/${encodedTitle}.${ext}`
  return path
}
console.log(getPath('Boston (disambiguation)'))