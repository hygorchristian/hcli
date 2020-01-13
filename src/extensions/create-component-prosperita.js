module.exports = toolbox => {
  const { print, template, filesystem } = toolbox

  async function createComponent (folder, name) {
    if (!name) {
      print.error('O nome deve ser informado.')
      return
    }

    const arr = name.split('/')
    const filename = arr[arr.length - 1]

    if (!filesystem.exists(`src/${folder}/${name}/${name}.js`)) {
      await template.generate({
        template: 'native/screen-prosperita.js.ejs',
        target: `src/${folder}/${name}/${name}.js`,
        props: { filename }
      })
    } else {
      print.error(`O arquivo /${name}/${name}.js já existe`)
    }

    if (!filesystem.exists(`src/${folder}/${name}/styles.js`)) {
      await template.generate({
        template: 'native/style-prosperita.js.ejs',
        target: `src/${folder}/${name}/styles.js`
      })
    } else {
      print.error(`O arquivo /${name}/styles.js já existe`)
    }

    if (!filesystem.exists(`src/${folder}/${name}/index.js`)) {
      await template.generate({
        template: 'native/screen-index.js.ejs',
        target: `src/${folder}/${name}/index.js`,
        props: { filename }
      })
    } else {
      print.error(`O arquivo /${name}/index.js já existe`)
    }

    print.success(`A tela ${filename} foi criada`)
  }

  toolbox.createComponentProsperita = createComponent
}
