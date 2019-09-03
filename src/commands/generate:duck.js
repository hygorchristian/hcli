module.exports = {
  name: 'generate:duck',
  description: 'Cria um novo duck com as variáveis passadas e salva na pasta src/store/ducks',
  help: 'dd',
  run: async toolbox => {
    const { parameters, createDuck } = toolbox
    const name = parameters.first

    await createDuck(name)
  }
}
