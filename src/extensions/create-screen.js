const lodash = require('lodash');

module.exports = (toolbox) => {
  const {
    filesystem, print, template: _template, config,
  } = toolbox;

  async function createRes({
    filename, template, target, props,
  }) {
    if (!filesystem.exists(filename)) {
      await _template.generate({
        template,
        target,
        props,
      });
      print.success(`The file ./${filename} was created`);
      return false; // has no errors
    }
    print.error(`The file ./${filename} already exists`);
    return true;
  }

  async function isReactNative() {
    const pack = await filesystem.read('package.json', 'json');
    return !!pack.dependencies['react-native'];
  }

  async function createComponent(folder, { name }) {
    if (!name) {
      print.error('O nome deve ser informado.');
      return;
    }

    const arr = name.split('/');
    const filename = arr[arr.length - 1];
    const camelname = lodash.camelCase(filename);

    const type = await isReactNative() ? 'native' : 'web';

    const { lang } = config;

    const res = {
      screen: {
        name,
        filename: `src/${folder}/${name}/${filename}.${lang}x`,
        template: `${type}/screen.${lang}.ejs`,
        target: `src/${folder}/${name}/${filename}.${lang}x`,
        props: { filename, camelname },
      },
      style: {
        name,
        filename: `src/${folder}/${name}/styles.${lang}`,
        template: `${type}/style.${lang}.ejs`,
        target: `src/${folder}/${name}/styles.${lang}`,
        props: {},
      },
      index: {
        name,
        filename: `src/${folder}/${name}/index.${lang}`,
        template: `${type}/screen-index.${lang}.ejs`,
        target: `src/${folder}/${name}/index.${lang}`,
        props: { filename, camelname },
      },
    };

    const errors = await Promise.all([
      await createRes(res.screen),
      await createRes(res.style),
      await createRes(res.index),
    ]);

    if (!errors.filter(Boolean).length) {
      print.success(`The ${folder.slice(0, -1)} ${filename} was created!`);
    }
  }

  toolbox.createScreen = createComponent;
};
