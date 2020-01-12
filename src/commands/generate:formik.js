const { mensagemFormik } = require('../utils/strings')

module.exports = {
  name: 'generate:formik',
  description: 'Cria arquivos de formik na pasta informada',
  run: async toolbox => {
    const { parameters, createFormik, print } = toolbox
    const path = parameters.first

    await createFormik(path)

    print.success(mensagemFormik)
  }
}
