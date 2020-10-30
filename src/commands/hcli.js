module.exports = {
  name: 'hcli',
  run: async toolbox => {
    const { print } = toolbox

    print.info('Welcome to hcli. Run command `hcli -h` to look the options')
  }
}
