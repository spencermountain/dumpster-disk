const writeFile = function (chunk) {
  console.log(chunk)
}

const writeFiles = (chunks) => {
  for (let i = 0; i < chunks.length; i++) {
    writeFile(chunks[i])
  }
}

export default writeFiles