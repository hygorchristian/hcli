module.exports = {
  name: 'generate:page',
  description: 'Cria uma nova tela dentro de src/pages',
  run: async toolbox => {
    const { parameters, createComponent } = toolbox
    const name = parameters.first
    const lang = parameters.options.lang || 'ts'

    await createComponent('pages', { name, lang })
  }
}
