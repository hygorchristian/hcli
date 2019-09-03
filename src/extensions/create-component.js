module.exports = toolbox => {
  const { filesystem, print, template } = toolbox;

  async function isReactNative(){
    const package = await filesystem.read('package.json', 'json');
    return !!package.dependencies['react-native'];
  }

  async function createComponent(folder, name){
    if(!name){
      print.error('O nome deve ser informado.')
      return
    }

    const type = isReactNative() ? 'native' : 'web';

    await template.generate({
      template: `${type}/screen.js.ejs` ,
      target: `src/${folder}/${name}/${name}.js`,
      props: { name }
    })

    await template.generate({
      template: `${type}/style.js.ejs`,
      target: `src/${folder}/${name}/styles.js`
    })

    await template.generate({
      template: `${type}/screen-index.js.ejs`,
      target: `src/${folder}/${name}/index.js`,
      props: { name }
    })

    print.success(`A tela ${name} foi criada`)
  }

  toolbox.createComponent = createComponent
}