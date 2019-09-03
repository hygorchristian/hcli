module.exports = {
  name: 'zygor-cli',
  run: async toolbox => {
    const { print } = toolbox

    print.info('Welcome to your CLI')
  }
}
