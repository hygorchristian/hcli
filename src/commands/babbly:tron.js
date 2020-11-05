const { preppend } = require('../utils/file')

module.exports = {
  name: 'babbly:tron',
  description: '',
  run: async toolbox => {
    const { parameters, template, print } = toolbox
    const enable = parameters.options.enable

    const options = {
      enable: [
        {
          template: 'babbly/reactotron/config.enable.ts.ejs',
          target: 'src/config/ReactotronConfig.ts'
        },
        {
          template: 'babbly/reactotron/store.enable.ts.ejs',
          target: 'src/store/index.ts'
        },
        {
          template: 'babbly/reactotron/App.enable.tsx.ejs',
          target: 'App.tsx'
        }
      ],
      disable: [
        {
          template: 'babbly/reactotron/store.disable.ts.ejs',
          target: 'src/store/index.ts'
        },
        {
          template: 'babbly/reactotron/App.disable.tsx.ejs',
          target: 'App.tsx'
        }
      ]
    }

    const templates = enable ? options.enable : options.disable

    for (const temp of templates) {
      await template.generate({
        template: temp.template,
        target: temp.target
      })
    }

    print.success('Reactotron was instaled successfully! Install the dependencies:\n')
    print.info('yarn add url reactotron-react-native reactotron-redux reactotron-redux-saga\n')
  }
}
