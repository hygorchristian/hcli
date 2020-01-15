const { snakeLowerCase, capitalizeFirstLetter  } = require('../utils/helpers')
var pluralize = require('pluralize')

module.exports = toolbox => {
  const { print, template, filesystem } = toolbox

  async function createResource (name, fields) {
    if (!name) {
      print.error('O nome deve ser informado.')
      return
    }

    const fileNames = {
      migration: `${Date.now()}_${snakeLowerCase(name)}_schema.js`,
      test: `${snakeLowerCase(name)}.spec.js`,
      model: `${capitalizeFirstLetter(name)}.js`,
      validator: `${capitalizeFirstLetter(name)}`,
      controller: `${capitalizeFirstLetter(name)}Controller.js`,
      route: `${capitalizeFirstLetter(name)}.js`,
      docs: {
        controller: `${snakeLowerCase(name)}.yml`,
        model: `${snakeLowerCase(name)}.yml`
      }
    }

    const classNames = {
      migration: `${capitalizeFirstLetter(name)}Schema`,
      controller: `${capitalizeFirstLetter(name)}Controller`,
      model: capitalizeFirstLetter(name),
      validatorCreate: `Create${capitalizeFirstLetter(name)}`,
      validatorUpdate: `Update${capitalizeFirstLetter(name)}`
    }

    const names = {
      tableName: pluralize.plural(snakeLowerCase(name)),
      single: snakeLowerCase(name),
      plural: pluralize.plural(snakeLowerCase(name)),
      validatorUpdate: `${fileNames.validator}/${classNames.validatorUpdate}`,
      validatorCreate: `${fileNames.validator}/${classNames.validatorCreate}`,
      resource: capitalizeFirstLetter(name)
    }

    if (!filesystem.exists(`app/Controllers/Http/${fileNames.controller}`)) {
      await template.generate({
        template: 'adonis/app/Controllers/Http/controller.js.ejs',
        target: `app/Controllers/Http/${fileNames.controller}`,
        props: { classNames, names, fields }
      })
    } else {
      print.error(`O arquivo ${fileNames.controller} já existe`)
    }

    if (!filesystem.exists(`app/Models/${fileNames.model}`)) {
      await template.generate({
        template: 'adonis/app/Models/model.js.ejs',
        target: `app/Models/${fileNames.model}`,
        props: { classNames }
      })
    } else {
      print.error(`O arquivo ${fileNames.model} já existe`)
    }

    if (!filesystem.exists(`app/Validators/${fileNames.validator}/${classNames.validatorCreate}.js`)) {
      await template.generate({
        template: 'adonis/app/Validators/validator.js.ejs',
        target: `app/Validators/${fileNames.validator}/${classNames.validatorCreate}.js`,
        props: { classNames, className: classNames.validatorCreate, fields }
      })
    } else {
      print.error(`O arquivo ${fileNames.validator}/${classNames.validatorCreate}.js já existe`)
    }

    if (!filesystem.exists(`app/Validators/${fileNames.validator}/${classNames.validatorUpdate}.js`)) {
      await template.generate({
        template: 'adonis/app/Validators/validator.js.ejs',
        target: `app/Validators/${fileNames.validator}/${classNames.validatorUpdate}.js`,
        props: { classNames, className: classNames.validatorUpdate, fields, create: true }
      })
    } else {
      print.error(`O arquivo ${fileNames.validator}/${classNames.validatorUpdate}.js já existe`)
    }

    if (!filesystem.exists(`routes/${fileNames.route}`)) {
      await template.generate({
        template: 'adonis/routes/route.js.ejs',
        target: `routes/${fileNames.route}`,
        props: { classNames, names }
      })
    } else {
      print.error(`O arquivo ${fileNames.route} já existe`)
    }

    if (!filesystem.exists(`database/migrations/${fileNames.migration}`)) {
      await template.generate({
        template: 'adonis/database/migrations/migration.js.ejs',
        target: `database/migrations/${fileNames.migration}`,
        props: { classNames, names, fields }
      })
    } else {
      print.error(`O arquivo ${fileNames.migration} já existe`)
    }

    if (!filesystem.exists(`test/functional/${fileNames.test}`)) {
      await template.generate({
        template: 'adonis/test/functional/test.js.ejs',
        target: `test/functional/${fileNames.test}`,
        props: { classNames, names, fields }
      })
    } else {
      print.error(`O arquivo ${fileNames.test} já existe`)
    }

    // Docs

    if (!filesystem.exists(`docs/controllers/${fileNames.docs.controller}`)) {
      await template.generate({
        template: 'adonis/docs/controllers/controller.yml.ejs',
        target: `docs/controllers/${fileNames.docs.controller}`,
        props: { classNames, names, fields }
      })
    } else {
      print.error(`O arquivo ${fileNames.docs.controller} já existe`)
    }

    if (!filesystem.exists(`docs/models/${fileNames.docs.model}`)) {
      await template.generate({
        template: 'adonis/docs/models/model.yml.ejs',
        target: `docs/models/${fileNames.docs.model}`,
        props: { classNames, names, fields }
      })
    } else {
      print.error(`O arquivo ${fileNames.docs.controller} já existe`)
    }
  }

  toolbox.createResource = createResource
}
