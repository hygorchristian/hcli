const { filesystem } = require('gluegun')

const preppend = async (file, str) => {
  const data = await filesystem.readAsync(file)
  const added = `${str}\n\n${data}`
  await filesystem.writeAsync(file, added)
}

module.exports = { preppend }
