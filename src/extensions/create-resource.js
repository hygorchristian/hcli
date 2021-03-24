const { generate } = require('../utils/resource');

module.exports = (toolbox) => {
  const { print } = toolbox;

  async function createResource(name, fields) {
    if (!name) {
      print.error('O nome deve ser informado.');
      return;
    }

    const types = [
      'migration',
      'test',
      'model',
      'validatorCreate',
      'validatorUpdate',
      'controller',
      'route',
      'docsController',
      'docsModel',
    ];

    for (const type of types) {
      await generate(type, name, fields, toolbox);
    }
  }

  toolbox.createResource = createResource;
};
