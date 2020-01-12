module.exports = toolbox => {
  const { print, template } = toolbox

  async function createFormik (name) {
    if (!name) {
      print.error('O nome deve ser informado.')
      return
    }

    await template.generate({
      template: 'formik/initialValues.js.ejs',
      target: `src/${name}/initialValues.js`
    })

    await template.generate({
      template: 'formik/validationSchema.js.ejs',
      target: `src/${name}/validationSchema.js`
    })
  }

  toolbox.createFormik = createFormik
}
