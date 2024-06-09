import ePub, { type Book, type Rendition } from 'epubjs'
import type Locations from 'epubjs/types/locations'
import type Themes from 'epubjs/types/themes'
import { nextTick, ref, watch } from 'vue'
import { registerThemes, setFontsize, setTheme, themeList } from './theme'
import { type Metadata, setMetadata } from './metadata'
import { getCurrentLocation, setTotalPage } from './page'
import { getStorageCurrentFontsize, getStorageCurrentThemeIndex, setStorageCurrentFontsize, setStorageCurrentThemeIndex } from '@/helpers/storage'
import { debounce } from '@/helpers/utils'
import { type _NavItem, handleContents, handleSubContents } from '@/helpers/contents'

interface _Book extends Book {
  package: {
    metadata: Metadata
  }
}
declare global{
  interface Window {
    book: _Book
  }
}

let rendition: Rendition
export const bookLoading = ref(false)
export const contents = ref<_NavItem[]>()
export const currentContent = ref<string>()

export function jump(href: number | string) {
  // @ts-expect-error the display function type missing the union
  rendition?.display(href)
}

export function resize() {
  // @ts-expect-error don't need parameters
  return rendition.resize()
}

// todo
export function handleHref(href: string) {
  if (href.startsWith('../'))
    return href.replace('../', '')
  return href
}

export function showEpub(input: string | Blob) {
  bookLoading.value = false
  // @ts-expect-error input may be the blob type
  const book = ePub(input) as _Book
  window.book = book
  rendition = book.renderTo('reader', { flow: 'scrolled', width: '100%', height: '100%', spread: 'none' })
  rendition.display(0)
  registerThemes(rendition.themes)
  setTheme()
  setFontsize()
  book.ready.then(() => {
    contents.value = handleContents(book.navigation.toc)
    setMetadata(book.package.metadata)
    book.locations.generate(150)
  }).then(() => {
    setTotalPage(book.packaging.spine.length)
    bookLoading.value = true
  })
  rendition.on('relocated', () => {
    getCurrentLocation(rendition)
  })
}
