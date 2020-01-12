module.exports = {
  name: 'generate:resource',
  description: 'Cria arquivos de recurso para o AdonisJS',
  run: async toolbox => {
    const { parameters, createResource } = toolbox
    const name = parameters.first
    let fields = []

    const rawFields = parameters.options.fields

    if (rawFields) {
      fields = rawFields.split(',').map(item => {
        const [field, type] = item.split(':')
        let test = null
        let testUpdate = null

        switch (type) {
          case 'string':
            test = "'teste'"
            testUpdate = "'teste-update'"
            break
          case 'text':
            test = "'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut porta egestas laoreet. Ut in ligula quis risus ultrices interdum.'"
            testUpdate = "'Nam mollis, leo eu lacinia venenatis, sapien elit elementum sapien, non sollicitudin augue arcu ac urna. Maecenas et convallis neque.'"
            break
          case 'integer':
            test = 123
            testUpdate = 321
            break
          case 'boolean':
            test = true
            testUpdate = false
            break
          case 'date':
            test = "'2020-01-09'"
            testUpdate = "'2021-01-09'"
            break
          case 'datetime':
            test = "'2020-01-09 22:29:54'"
            testUpdate = "'2021-01-09 22:29:54'"
            break
          default:
            test = null
            testUpdate = null
        }

        return { field, type, test, testUpdate }
      })
    }

    await createResource(name, fields)
  }
}
