module.exports = toolbox => {
  const { filesystem, print, template } = toolbox;

  async function isReactNative(){
    const package = await filesystem.read('package.json', 'json');
    return !!package.dependencies['react-native'];
  }

  async function createComponent(folder, name, duck, saga){
    if(!name){
      print.error('O nome deve ser informado.')
      return
    }

    const arr = name.split('/')
    const filename = arr[arr.length - 1]

    const type = await isReactNative() ? 'native' : 'web';

    await template.generate({
      template: `${type}/screen.js.ejs` ,
      target: `src/${folder}/${name}/${filename}.js`,
      props: { filename }
    })

    await template.generate({
      template: `${type}/style.js.ejs`,
      target: `src/${folder}/${name}/styles.js`
    })

    await template.generate({
      template: `${type}/screen-index.js.ejs`,
      target: `src/${folder}/${name}/index.js`,
      props: { filename }
    })

    print.success(`A tela ${filename} foi criada`)
  }

  toolbox.createComponent = createComponent
}
