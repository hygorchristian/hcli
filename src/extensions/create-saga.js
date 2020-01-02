const { capitalizeFirstLetter, snakeUpperCase, replaceInFile } = require('../utils/helpers')

module.exports = toolbox => {
  const { print, template, filesystem } = toolbox

  async function createSaga (name, methods) {
    if (!name) {
      print.error('O nome deve ser informado.')
      return
    }

    const arr = name.split('/')
    const relPath = arr.slice(0, arr.length - 1).join("/") + "/";
    const filename = arr[arr.length - 1]

    const Name = capitalizeFirstLetter(filename)
    const NAME = snakeUpperCase(filename)

    await template.generate({
      template: `store/sagas/saga.js.ejs`,
      target: `src/store/sagas/${name}.js`,
      props: {
        name: filename,
        Name,
        NAME,
        path: name,
        methods
      }
    })

    const target = `src/store/sagas/${relPath}index.js`
    const indexExists = await filesystem.exists(target)

    if (!indexExists) {
      await template.generate({
        template: `store/sagas/index.js.ejs`,
        target
      })
    }

    const keys = Object.keys(methods);

    let imports = 'import { '
    let calls = ''

    keys.forEach(key => {
      imports += `${key}${Name}, `
      calls += '    takeLatest(' + Name + 'Types.' + NAME;
      calls += '_' + key.toUpperCase()
      calls += '_REQUEST, ' + key + Name + '),\n'
    })

    imports += `} from './${filename}';`

    replaceInFile(
      target,
      [
        {
          target: '// import-types',
          data: `import { ${Name}Types } from '~/store/ducks/${name}';`
        },
        {
          target: '// import-saga',
          data: imports
        },
        {
          target: '// saga',
          data: calls
        }
      ]
    )

    print.success(`O saga ${filename} foi criado com sucesso!`)
  }

  toolbox.createSaga = createSaga
}
