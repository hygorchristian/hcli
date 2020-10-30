module.exports = {
  name: 'react:component',
  description: 'Cria um novo componente dentro de src/components',
  run: async toolbox => {
    const { parameters, createComponent } = toolbox
    const name = parameters.first
    const { duck, saga } = parameters.options
    const lang = parameters.options.lang || 'ts'

    await createComponent('components', { name, duck, saga, lang })
  }
}
