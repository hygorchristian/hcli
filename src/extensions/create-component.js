module.exports = (toolbox) => {
  const { filesystem, print, template: _template } = toolbox

  async function createRes ({
    name, filename, template, target, props
  }) {
    if (!filesystem.exists(filename)) {
      await _template.generate({
        template,
        target,
        props
      })
      print.success(`The file ./${filename} was created`)
      return false
    } else {
      print.error(`The file ./${filename} already exists`)
      return true
    }
  }

  async function isReactNative () {
    const pack = await filesystem.read('package.json', 'json')
    return !!pack.dependencies['react-native']
  }

  async function createComponent (folder, { name, lang }) {
    if (!name) {
      print.error('The arg name is required: hcli react:component Name')
      return
    }

    const arr = name.split('/')
    const filename = arr[arr.length - 1]

    const type = await isReactNative() ? 'native' : 'web'

    const res = {
      screen: {
        name,
        filename: `src/${folder}/${name}/index.${lang}`,
        template: `${type}/component.${lang}.ejs`,
        target: `src/${folder}/${name}/${filename}.${lang}x`,
        props: { filename }
      },
      style: {
        name,
        filename: `src/${folder}/${name}/styles.${lang}`,
        template: `${type}/style.${lang}.ejs`,
        target: `src/${folder}/${name}/styles.${lang}`,
        props: {}
      },
      index: {
        name,
        filename: `src/${folder}/${name}/index.${lang}`,
        template: `${type}/screen-index.${lang}.ejs`,
        target: `src/${folder}/${name}/index.${lang}`,
        props: { filename }
      }
    }

    const e1 = await createRes(res.screen)
    const e2 = await createRes(res.style)
    const e3 = await createRes(res.index)
    const errors = e1 || e2 || e3

    if (!errors) {
      print.success(`The ${folder.slice(0, -1)} ${filename} was created!`)
    }
  }

  toolbox.createComponent = createComponent
}
