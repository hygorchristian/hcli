module.exports = {
  name: 'react:screen',
  description: 'Cria uma nova tela dentro de src/screens',
  run: async (toolbox) => {
    const { parameters, createScreen } = toolbox
    const name = parameters.first
    const hclirc = await toolbox.filesystem.read('.hclirc', 'json')
    const configLang = hclirc && hclirc.lang
    const lang = parameters.options.lang || configLang || 'js'

    await createScreen('screens', { name, lang })
  }
}
