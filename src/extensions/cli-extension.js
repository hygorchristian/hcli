// add your CLI-specific functionality here, which will then be accessible
// to your commands
module.exports = async toolbox => {
  toolbox.foo = () => {
    toolbox.print.info('called foo extension')
  }

  // Lang config
  const DEFAULT_LANG = 'js'
  const hclirc = toolbox.filesystem.read('.hclirc', 'json')
  const configLang = hclirc && hclirc.lang

  // Path config
  const DEFAULT_COMPONENTS_PATH = ''
  const componentsPath = ''

  const DEFAULT_SCREENS_PATH = ''
  const screensPath = ''

  // enable this if you want to read configuration in from
  // the current folder's package.json (in a "hcli" property),
  // hcli.config.json, etc.
  toolbox.config = {
    ...toolbox.config,
    ...toolbox.config.loadConfig(process.cwd(), 'hcli'),
    lang: toolbox.parameters.options.lang || configLang || DEFAULT_LANG,
    componentsPath: componentsPath || DEFAULT_COMPONENTS_PATH,
    screensPath: screensPath || DEFAULT_SCREENS_PATH
  }
}
