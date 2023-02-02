const { build } = require('gluegun');

const printCommand = (t, command, description) => {
  const space = (size) => Array(Number(size)).fill(' ').join('').slice(0, -command.length);
  t.print.info(`  \x1b[36m${command}${space(25)}\x1b[39m${description}`);
};

const printHelper = async (toolbox) => {
  toolbox.print.warning('hcli helper\n');

  toolbox.print.success('Usage:');
  toolbox.print.info('  command [arguments] [options]\n');

  toolbox.print.success('Global Options:');
  printCommand(toolbox, '--version', 'Output the version number');
  printCommand(toolbox, '--help', 'Output the helper menu\n');

  toolbox.print.success('React & React Native Options:');
  printCommand(toolbox, 'react:component', 'Create a new react component with styles');
  printCommand(toolbox, 'react:screen', 'Create a new react screen with styles\n');

  toolbox.print.success('AdonisJS 4.0 Options:');
  printCommand(toolbox, 'adonis:res', 'Create a new adonis res with controller, model, routes and validation\n');
};

/**
 * Create the cli and kick it off
 */
async function run(argv) {
  // create a CLI runtime
  const cli = build()
    .brand('hcli')
    .src(__dirname)
    .plugins('./node_modules', { matching: 'hcli-*', hidden: true })
    .help({
      name: 'help',
      alias: 'h',
      dashed: true,
      run: (t) => printHelper(t),
    }) // provides default for help, h, --help, -h
    .version() // provides default for version, v, --version, -v
    .create();

  // and run it
  const toolbox = await cli.run(argv);

  // send it back (for testing, mostly)
  return toolbox;
}

module.exports = { run };
