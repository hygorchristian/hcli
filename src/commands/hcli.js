module.exports = {
  name: 'hcli',
  run: async toolbox => {
    const { print } = toolbox

    print.info('Welcome to your CLI')
  }
}
