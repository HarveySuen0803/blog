import fs from 'fs'
import path from 'path'

const DIR_PATH = path.resolve()
const WHITE_LIST = [
  'index.md',
  'node_modules',
  'assets',
  'public',
  'utils',
  '.vitepress',
  '.idea',
  '.vscode'
]

const isDirectory = (path) => fs.lstatSync(path).isDirectory()

const intersections = (arr1, arr2) => Array.from(new Set(arr1.filter((item) => !new Set(arr2).has(item))))

function getList(params, path1, pathname) {
  const res = []
  for (let file in params) {
    const dir = path.join(path1, params[file])
    const isDir = isDirectory(dir)
    if (isDir) {
      const files = fs.readdirSync(dir)
      res.push({
        text: params[file],
        collapsible: true,
        items: getList(files, dir, `${pathname}/${params[file]}`)
      })
    } else {
      const name = path.basename(params[file])
      const suffix = path.extname(params[file])
      if (suffix !== '.md') {
        continue
      }
      res.push({
        text: name,
        link: `${pathname}/${name}`
      })
    }
  }
  res.map((item) => {
    item.text = item.text.replace(/\.md$/, '')
  })
  return res
}

export const getSidebar = (pathname) => {
  const dirPath = path.join(DIR_PATH, pathname)
  const files = fs.readdirSync(dirPath)
  const items = intersections(files, WHITE_LIST)
  return getList(items, dirPath, pathname)
}

export const getAllSidebar = () => {
  const rootPath = path.resolve(__dirname, "../docs")
  const directories = fs.readdirSync(rootPath).filter(file => {
    return fs.statSync(path.join(rootPath, file)).isDirectory()
  })
  
  let sidebarConfig = {}
  directories.forEach(directory => {
    const dirPath = path.join("docs", directory)
    sidebarConfig[`/${dirPath}/`] = getSidebar(`${dirPath}`)
  })
  
  return sidebarConfig
}
