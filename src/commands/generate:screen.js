module.exports = {
  name: 'generate:screen',
  description: 'Cria uma nova tela dentro de src/screens',
  run: async toolbox => {
    const { parameters, createComponent } = toolbox
    const name = parameters.first

    await createComponent('screens', name)    
  }
}
