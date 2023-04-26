const fs = require('fs')
const { JSDOM } = require('jsdom')
const yargs = require('yargs')

const argv = yargs(process.argv).argv

// const iconCategories = fs
//   .readdirSync('js2svg/node_modules/react-icons', { withFileTypes: true })
//   .filter((v) => !v.isFile() && v.name !== 'lib');
const iconCategories = [{ name: 'vsc' }, { name: 'wi' }];


for (const category of iconCategories) {
  const icons = require(`react-icons/${category.name}`)
  console.log(`Processing ${category.name} icons...`)

  for (const [iconName, iconFunc] of Object.entries(icons)) {
    const document = new JSDOM('<!DOCTYPE html><svg xmlns="http://www.w3.org/2000/svg"></svg>')
      .window.document;

    const icon = iconFunc()
    const svgEl = document.querySelector('svg');
    svgEl.setAttribute('viewBox', icon.props.attr.viewBox)

    if (Array.isArray(icon?.props?.children)) {
      for (const child of icon.props.children) {
        const el = document.createElement(child.type)
        el.setAttribute('d', child.props.d)
        svgEl.appendChild(el)
      }
    }

    fs.mkdirSync(`out/icons/${category.name}`, {recursive: true})
    fs.writeFileSync(`out/icons/${category.name}/` + iconName + '.svg', svgEl.outerHTML)
  }
}
