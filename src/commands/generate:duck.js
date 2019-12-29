module.exports = {
  name: 'generate:duck',
  description: 'Cria um novo duck com as variáveis passadas e salva na pasta src/store/ducks',
  help: 'dd',
  run: async toolbox => {
    const { parameters, createDuck, createSaga, prompt } = toolbox
    const name = parameters.first

    const addSaga = await prompt.confirm('Deseja adicionar um saga? (middleware)')

    if(addSaga){
      await createSaga(name)
    }

    await createDuck(name)
  }
}
