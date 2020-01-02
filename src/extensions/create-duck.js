const { capitalizeFirstLetter, snakeUpperCase, replaceInFile } = require('../utils/helpers')
const crypto = require('crypto')

module.exports = toolbox => {
  const { print, template, filesystem } = toolbox;

  async function createDuck (name, methods) {
    if (!name) {
      print.error('O nome deve ser informado.')
      return
    }

    const arr = name.split('/')
    const relPath = arr.slice(0, arr.length - 1).join('/') + '/';
    const filename = arr[arr.length - 1]

    const Name = capitalizeFirstLetter(filename)
    const NAME = snakeUpperCase(filename)

    await template.generate({
      template: `store/ducks/duck.js.ejs`,
      target: `src/store/ducks/${name}.js`,
      props: {
        name: filename,
        Name,
        NAME,
        random: crypto.randomBytes(8).toString('hex').toUpperCase(),
        methods
      }
    })

    const target = `src/store/ducks/${relPath}index.js`
    const indexExists = await filesystem.exists(target)

    if (!indexExists) {
      await template.generate({
        template: 'store/ducks/index.js.ejs',
        target
      })
    }

    replaceInFile(
      target,
      [
        {
          target: '// import',
          data: `import { ${capitalizeFirstLetter(filename)}Reducer as ${filename} } from './${filename}';`
        },
        {
          target: '// reducer',
          data: `  ${filename},`
        }
      ]
    )

    print.success(`O duck ${filename} foi criado com sucesso!`)
  }

  toolbox.createDuck = createDuck
}
