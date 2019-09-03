module.exports = toolbox => {
  const { filesystem, print, template } = toolbox;

  async function configRedux(){

    await template.generate({
      template: 'redux/index.js.ejs' ,
      target: 'src/store/index.js'
    })

    await template.generate({
      template: 'redux/index-duck.js.ejs' ,
      target: 'src/store/ducks/index.js'
    })

    await template.generate({
      template: 'redux/index-saga.js.ejs' ,
      target: 'src/store/sagas/index.js'
    })

    print.info(`A configuração do redux foi criada com sucesso, adicione o restante da configuração no seu ./App.js`)
  }

  toolbox.configRedux = configRedux
}