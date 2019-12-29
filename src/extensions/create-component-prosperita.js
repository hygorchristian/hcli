module.exports = toolbox => {
  const { print, template } = toolbox;

  async function createComponent(folder, name){
    if(!name){
      print.error('O nome deve ser informado.')
      return
    }

    const arr = name.split('/')
    const filename = arr[arr.length - 1]

    await template.generate({
      template: 'native/screen-prosperita.js.ejs' ,
      target: `src/${folder}/${name}/${name}.js`,
      props: { filename }
    })

    await template.generate({
      template: 'native/style-prosperita.js.ejs',
      target: `src/${folder}/${name}/styles.js`
    })

    await template.generate({
      template: 'native/screen-index.js.ejs',
      target: `src/${folder}/${name}/index.js`,
      props: { filename }
    })

    print.success(`A tela ${filename} foi criada`)
  }

  toolbox.createComponentProsperita = createComponent
}
