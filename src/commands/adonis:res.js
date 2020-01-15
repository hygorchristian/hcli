const { getTest, getTestUpdate, getMigrationRef } = require('../utils/strings')

module.exports = {
  name: 'adonis:res',
  description: 'Cria recursos do adonis passando um nome e um schema',
  run: async toolbox => {
    const { parameters, print, filesystem, createResource } = toolbox
    const schema = parameters.first

    if (!filesystem.exists(schema)) {
      print.error('O arquivo de schema não existe')
      return
    }

    const file = await filesystem.read(schema)
    const json = JSON.parse(file)

    const ResourceNames = Object.keys(json)

    for (let resource of ResourceNames) {
      const fields = []

      const fieldsNames = Object.keys(json[resource])
      for (let field of fieldsNames) {
        const attrs = json[resource][field]
        const res = {}

        res.field = field
        res.type = attrs.type
        res.required = attrs.required
        res.test = getTest(attrs.type)
        res.testUpdate = getTestUpdate(attrs.type)

        if (attrs.ref) {
          res.ref = {
            is_ref: true,
            resource: attrs.ref,
            migration_ref: getMigrationRef(attrs.ref)
          }
        }

        fields.push(res)
      }

      await createResource(resource, fields)

      print.success(fields)
    }
  }
}
