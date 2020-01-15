module.exports = {
  name: 'adonis:setup',
  description: 'Adiciona modulos e configurações ao adonis',
  run: async toolbox => {
    const { parameters, configRedux } = toolbox
    const name = parameters.first

    await configRedux()
  }
}
