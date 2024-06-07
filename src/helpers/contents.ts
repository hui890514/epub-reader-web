import type { NavItem } from 'epubjs/types/navigation'
import { contents } from '@/helpers/reader'

export interface _NavItem extends NavItem {
  isCollapsed?: boolean
  subitems: _NavItem[]
}

export function addIsCollapsed(contents: NavItem[]) {
  for (const content of contents as _NavItem[]) {
    if (content.subitems?.length) {
      content.isCollapsed = false
      addIsCollapsed(content.subitems)
    }
  }
  return contents as _NavItem[]
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
