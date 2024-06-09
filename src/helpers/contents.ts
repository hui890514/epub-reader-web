import type { NavItem } from 'epubjs/types/navigation'
import { ref, watch } from 'vue'

export interface _NavItem extends NavItem {
  isCollapsed?: boolean
  _href: string
  subitems: _NavItem[]
}

export const contents = ref<_NavItem[]>()
export const currentContent = ref<string>()

function addIsCollapsed(content: _NavItem) {
  content.isCollapsed = false
}

export function collapse(content: _NavItem) {
  content.isCollapsed = !content.isCollapsed
}

export function collapseAll(isCollapsed: boolean, _contents = contents.value) {
  if (_contents?.length) {
    for (const content of _contents) {
      if (content.subitems?.length) {
        content.isCollapsed = isCollapsed
        collapseAll(isCollapsed, content.subitems)
      }
    }
  }
}

export type panelName = 'contents' | 'setting' | 'history'

function handleHref(href: string) {
  return href.split('#')[0]
}

function handleHref2(href: string) {
  return href.split('#')[1]
}

export function addHref(content: _NavItem) {
  content._href = _handleHref(handleHref(content.href))
}
export function setContents() {
  contents.value = _handleContents(window.book.navigation.toc)
}

export function _handleContents(contents: NavItem[]) {
  for (const content of contents as _NavItem[]) {
    addHref(content)
    if (content.subitems?.length) {
      addIsCollapsed(content)
      handleSubContentsMap(content)
      _handleContents(content.subitems)
    }
  }
  return contents as _NavItem[]
}

interface SubContentsMap {
  [key: string]: {
    isCalculated: boolean
    items: {
      [key: string]: number
    }
  }
}
const subContentsMap: SubContentsMap = {}
function handleSubContentsMap(content: _NavItem) {
  const items: SubContentsMap['key']['items'] = {}
  content.subitems.forEach((subContent) => {
    items[handleHref2(subContent.href)] = -1
  })
  subContentsMap[content._href] = { isCalculated: false, items }
}

export function handleSubContents(href: string | undefined, cfi: string) {
  if (!href || !cfi)
    return
  if (subContentsMap[href] && !subContentsMap[href].isCalculated) {
    setTimeout(() => {
      calculateSubContent(href)
      subContentsMap[href].isCalculated = true
      changeCurrentSubContent(href, cfi)
    }, 100)
  }
  else {
    changeCurrentSubContent(href, cfi)
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
export const currentSubContent = ref('')
function changeCurrentSubContent(href: string, cfi: string) {
  const subContentsObj = subContentsMap[href]
  if (!subContentsObj || !subContentsObj.isCalculated) {
    currentSubContent.value = ''
    return
  }
  const subContents = subContentsObj.items
  const subContentsKeys = Object.keys(subContents)
  const i = handleCfi(cfi)
  let _i: number = -1
  for (const [index, subContent] of subContentsKeys.entries()) {
    if (subContents[subContent] <= i + 2)
      _i = index
    else
      break
  }
  currentSubContent.value = _i >= 0 ? `${currentContent.value}#${subContentsKeys[_i]}` : ''
}

function handleCfi(cfi: string) {
  // epubcfi(/6/22[Eric-Jorgenson_The-Almanack-of-Naval-Ravikant_PRODUCTION_v102-9]
  // !/4[Eric-Jorgenson_The-Almanack-of-Naval-Ravikant_PRODUCTION_v102-9]
  // /2[_idContainer018]/16/1:290)
  // => 2
  return Number(cfi.split('/')[5]?.split('[')[0])
}

export function _handleHref(href: string) {
  if (href.startsWith('../'))
    return href.replace('../', '')
  return href
}
