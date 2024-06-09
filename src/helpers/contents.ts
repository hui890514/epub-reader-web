import type { NavItem } from 'epubjs/types/navigation'
import { nextTick, ref, watch } from 'vue'
import { jump, resize } from '@/helpers/reader'

export interface _NavItem extends NavItem {
  isCollapsed?: boolean
  _href: string
  subitems: _NavItem[]
}

export const contents = ref<_NavItem[]>()
export function setContents() {
  contents.value = _setContents(window.book.navigation.toc)
}
function _setContents(contents: NavItem[]) {
  for (const content of contents as _NavItem[]) {
    addHref(content)
    if (content.subitems?.length) {
      addIsCollapsed(content)
      _setContents(content.subitems)
    }
  }
  return contents as _NavItem[]
}
function addHref(content: _NavItem) {
  content.href = removeRelativePath(content.href)
  content._href = (removeHrefTarget(content.href))
}
function removeRelativePath(href: string) {
  if (href.startsWith('../'))
    return href.replace('../', '')
  return href
}
function removeHrefTarget(href: string) {
  return href.split('#')[0]
}
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

export const currentContent = ref<string>('')

export const isContentsHidden = ref(false)
export function setContentsHidden(value: boolean, e?: MouseEvent) {
  e && e.stopPropagation()
  isContentsHidden.value = value
  nextTick(() => resize())
}

export function jumpByContent(content: _NavItem) {
  content.isCollapsed === true && collapse(content)
  currentContent.value = content._href
  jump((content.href))
}
