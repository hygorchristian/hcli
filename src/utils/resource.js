const { snakeLowerCase, capitalizeFirstLetter } = require('../utils/helpers')
const pluralize = require('pluralize')

const getFilenames = (name) => {
  return {
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
}

const getPaths = (name) => {
  const fileNames = getFilenames(name)
  const classNames = getClassnames(name)

  return {
    migration: `database/migrations/${fileNames.migration}`,
    test: `test/functional/${fileNames.test}`,
    model: `app/Models/${fileNames.model}`,
    validatorCreate: `app/Validators/${fileNames.validator}/${classNames.validatorCreate}.js`,
    validatorUpdate: `app/Validators/${fileNames.validator}/${classNames.validatorUpdate}.js`,
    controller: `app/Validators/Http/${fileNames.controller}`,
    route: `routes/${fileNames.route}`,
    docsController: `docs/controllers/${fileNames.docs.controller}`,
    docsModel: `docs/models/${fileNames.docs.model}`
  }
}

const getTemplates = () => {
  return {
    migration: 'adonis/database/migrations/migration.js.ejs',
    test: 'adonis/test/functional/test.js.ejs',
    model: 'adonis/app/Models/model.js.ejs',
    validatorCreate: 'adonis/app/Validators/validator.js.ejs',
    validatorUpdate: 'adonis/app/Validators/validator.js.ejs',
    controller: 'adonis/app/Controllers/Http/controller.js.ejs',
    route: 'adonis/routes/route.js.ejs',
    docsController: 'adonis/docs/controllers/controller.yml.ejs',
    docsModel: 'adonis/docs/models/model.yml.ejs'
  }
}

const getClassnames = (name) => {
  return {
    migration: `${capitalizeFirstLetter(name)}Schema`,
    controller: `${capitalizeFirstLetter(name)}Controller`,
    model: capitalizeFirstLetter(name),
    validatorCreate: `Create${capitalizeFirstLetter(name)}`,
    validatorUpdate: `Update${capitalizeFirstLetter(name)}`
  }
}

const getNames = (name) => {
  const fileNames = getFilenames(name)
  const classNames = getClassnames(name)

  return {
    tableName: pluralize.plural(snakeLowerCase(name)),
    single: snakeLowerCase(name),
    plural: pluralize.plural(snakeLowerCase(name)),
    validatorUpdate: `${fileNames.validator}/${classNames.validatorUpdate}`,
    validatorCreate: `${fileNames.validator}/${classNames.validatorCreate}`,
    resource: capitalizeFirstLetter(name)
  }
}

const generate = (type, name, fields, toolbox) => {
  // ===========================================================================
  const fileNames = getFilenames(name)
  const classNames = getClassnames(name)
  const names = getNames(name)
  // ===========================================================================

  const filename = fileNames[type]
  const target = getPaths(name)[type]
  const template = getTemplates()[type]

  const props = {
    fileNames, classNames, names, fields
  }

  if (toolbox.filesystem.exists(target)) {
    toolbox.print.error(`O arquivo ${filename} já existe`)
    return
  }

  return toolbox.template.generate({ template, target, props })
}

module.exports = {
  generate
}
