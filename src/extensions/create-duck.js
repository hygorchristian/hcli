const { capitalizeFirstLetter } = require('../utils/helpers')

module.exports = toolbox => {
  const { print, template } = toolbox;

  async function createDuck(name){

    if(!name){
      print.error('O nome deve ser informado.')
      return
    }

    await template.generate({
      template: `redux/ducks/duck.js.ejs`,
      target: `src/store/ducks/${name}.js`,
      props: {
        name,
        capital: capitalizeFirstLetter(name)
      }
    })

    print.success(`A tela ${name} foi criada, insira o seguinte código no arquivo src/store/ducks/index.js:\n\nimport { ${capitalizeFirstLetter(name)}Reducers } from './${name}';\n\n`)
  }

  toolbox.createDuck = createDuck
}
