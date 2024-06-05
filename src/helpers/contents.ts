import type { NavItem } from 'epubjs/types/navigation'

export interface _NavItem extends NavItem {
  isCollapsed?: boolean
  subitems: _NavItem[]
}

export function addIsCollapsed(contents: NavItem[]) {
  for (const content of contents as _NavItem[]) {
    if (content.subitems?.length)
      content.isCollapsed = false
  }
  return contents as _NavItem[]
}

export function collapse(content: _NavItem) {
  content.isCollapsed = !content.isCollapsed
}
