module.exports = {
  name: 'babbly:sentry',
  description: 'Arruma o sentry-config',
  alias: 's',
  run: async toolbox => {
    const { parameters, template } = toolbox
    const enable = parameters.options.enable
    const target = 'src/core/sentry-config.ts'

    const templateSentry = enable ? 'babbly/sentry-on.ts.ejs' : 'babbly/sentry-off.ts.ejs'

    await template.generate({
      template: templateSentry,
      target
    })
  }
}
