module.exports = {
  name: 'config:redux',
  description: 'Cria os arquivos de configuração do redux',
  run: async toolbox => {
    const { parameters, configRedux } = toolbox
    const name = parameters.first

    await configRedux()    
  }
}
