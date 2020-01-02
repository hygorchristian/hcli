module.exports = {
  name: 'generate:duck',
  description: 'Cria um novo duck com as variáveis passadas e salva na pasta src/store/ducks',
  help: 'dd',
  run: async toolbox => {
    const { parameters, createDuck, createSaga, prompt } = toolbox
    const name = parameters.first

    const methods = {}

    const { items } = await prompt.ask([{
      type: 'checkbox',
      name: 'items',
      message: 'Quais métodos quer criar?',
      choices: ['Show', 'List', 'Create', 'Update', 'Delete'],
    }])

    items.forEach(method => {
      switch (method) {
        case 'Show':
          methods.item = true
          break
        case 'List':
          methods.list = true
          break
        case 'Create':
          methods.create = true
          break
        case 'Update':
          methods.update = true
          break
        case 'Delete':
          methods.delete = true
          break
      }
    })

    const addSaga = await prompt.confirm('Deseja adicionar um saga? (middleware)')

    if(addSaga){
      await createSaga(name, methods)
    }

    await createDuck(name, methods)
  }
}
