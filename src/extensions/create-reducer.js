const { capitalizeFirstLetter } = require('../utils/helpers')

module.exports = toolbox => {
  const { print, template } = toolbox

  async function createReducer ({ name }) {
    if (!name) {
      print.error('O nome deve ser informado.')
      return
    }

    const capitalizeName = capitalizeFirstLetter(name)

    await template.generate({
      target: `src/hooks/use${capitalizeName}.js`,
      template: 'native/useReducer.js.ejs',
      props: { capitalizeName }
    })

    print.success(`The hook use${capitalizeName} was created!`)
  }

  toolbox.createReducer = createReducer
}
