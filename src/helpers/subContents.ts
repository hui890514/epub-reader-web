import { ref } from 'vue'
import { type _NavItem, currentContent } from './contents'

interface SubContentsMap {
  [key: string]: {
    isCalculated: boolean
    items: {
      [key: string]: number
    }
  }
}

const subContentsMap: SubContentsMap = {}
export function setSubContentsMap(content: _NavItem) {
  const items: SubContentsMap['key']['items'] = {}
  content.subitems.forEach((subContent) => {
    items[getPathTarget(subContent.href)] = -1
  })
  subContentsMap[content._href] = { isCalculated: false, items }
}
function getPathTarget(href: string) {
  return href.split('#')[1]
}

export const currentSubContent = ref('')
export function handleSubContents(href: string | undefined, cfi: string) {
  if (!href || !cfi)
    return
  if (subContentsMap[href] && !subContentsMap[href].isCalculated) {
    setTimeout(() => {
      calculateSubContent(href)
      subContentsMap[href].isCalculated = true
      setCurrentSubContent(href, cfi)
    }, 100)
  }
  else {
    setCurrentSubContent(href, cfi)
  }
}
function calculateSubContent(href: string) {
  const srcdoc = document.querySelector('iframe')?.srcdoc
  if (!srcdoc)
    return
  const dom = document.createElement('html')
  dom.innerHTML = srcdoc
  const subContents = subContentsMap[href].items
  let parentNode: Element | undefined
  let parentNodeArray: Array<Element> = []
  for (const subContent of Object.keys(subContents)) {
    if (!parentNode) {
      parentNode = (dom.querySelector(`#${subContent}`)?.parentNode) as Element
      parentNodeArray = Array.prototype.slice.call(parentNode.childNodes)
    }
    if (parentNode) {
      const node = parentNode.querySelector(`#${subContent}`)
      node && (subContents[subContent] = parentNodeArray.indexOf(node) + 1)
    }
  }
}
function setCurrentSubContent(href: string, cfi: string) {
  const subContentsObj = subContentsMap[href]
  if (!subContentsObj || !subContentsObj.isCalculated) {
    currentSubContent.value = ''
    return
  }
  const subContents = subContentsObj.items
  const subContentsKeys = Object.keys(subContents)
  const i = getIndexByCfi(cfi)
  let _i: number = -1
  for (const [index, subContent] of subContentsKeys.entries()) {
    if (subContents[subContent] <= i + 2)
      _i = index
    else
      break
  }
  currentSubContent.value = _i >= 0 ? `${currentContent.value}#${subContentsKeys[_i]}` : ''
}
function getIndexByCfi(cfi: string) {
  // epubcfi(/6/22[Eric-Jorgenson_The-Almanack-of-Naval-Ravikant_PRODUCTION_v102-9]
  // !/4[Eric-Jorgenson_The-Almanack-of-Naval-Ravikant_PRODUCTION_v102-9]
  // /2[_idContainer018]/16/1:290)
  // => 2
  return Number(cfi.split('/')[5]?.split('[')[0])
}
