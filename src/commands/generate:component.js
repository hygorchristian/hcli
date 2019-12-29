module.exports = {
  name: 'generate:component',
  description: 'Cria um novo componente dentro de src/components',
  run: async toolbox => {
    const { parameters, createComponent } = toolbox
    const name = parameters.first;
    const { duck, saga } = parameters.options;

    await createComponent('components', name, duck, saga)
  }
}
