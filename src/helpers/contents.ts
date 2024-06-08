import type { NavItem } from 'epubjs/types/navigation'
import { handleHref as _handleHref, contents } from '@/helpers/reader'

export interface _NavItem extends NavItem {
  isCollapsed?: boolean
  _href: string
  subitems: _NavItem[]
}

function addIsCollapsed(contents: NavItem[]) {
  for (const content of contents as _NavItem[]) {
    if (content.subitems?.length) {
      content.isCollapsed = false
      addIsCollapsed(content.subitems)
    }
  }
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

export function addHref(contents: NavItem[]) {
  for (const content of contents as _NavItem[]) {
    content._href = _handleHref(handleHref(content.href))
    if (content.subitems?.length)
      addHref(content.subitems)
  }
}

export function handleContents(contents: NavItem[]) {
  addIsCollapsed (contents)
  addHref(contents)
  return contents as _NavItem[]
}
