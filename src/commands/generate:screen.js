module.exports = {
  name: 'generate:screen',
  description: 'Cria uma nova tela dentro de src/screens',
  run: async toolbox => {
    const { parameters, createScreen } = toolbox
    const name = parameters.first
    const lang = parameters.options.lang || 'ts'

    await createScreen('screens', { name, lang })
  }
}
