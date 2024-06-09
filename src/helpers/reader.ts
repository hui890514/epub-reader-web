import ePub, { type Book, type Rendition } from 'epubjs'
import type Locations from 'epubjs/types/locations'
import type Themes from 'epubjs/types/themes'
import { nextTick, ref, watch } from 'vue'
import { registerThemes, setFontsize, setTheme, themeList } from './theme'
import { type Metadata, setMetadata } from './metadata'
import { getCurrentLocation, setTotalPage } from './page'
import { getStorageCurrentFontsize, getStorageCurrentThemeIndex, setStorageCurrentFontsize, setStorageCurrentThemeIndex } from '@/helpers/storage'
import { debounce } from '@/helpers/utils'
import { type _NavItem, contents, setContents } from '@/helpers/contents'

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

export function showEpub(input: string | Blob) {
  bookLoading.value = false
  // @ts-expect-error input may be the blob type
  const book = ePub(input) as _Book
  window.book = book
  rendition = book.renderTo('reader', { flow: 'scrolled', width: '100%', height: '100%', spread: 'none' })
  rendition.display(0)
  registerThemes()
  setTheme()
  setFontsize()
  book.ready.then(() => {
    setContents()
    setMetadata()
    book.locations.generate(150)
  }).then(() => {
    setTotalPage()
    bookLoading.value = true
  })
  rendition.on('relocated', () => {
    getCurrentLocation(rendition)
  })
}

export function jump(href: number | string) {
  // @ts-expect-error the display function type missing the union
  rendition?.display(href)
}

export function resize() {
  // @ts-expect-error don't need parameters
  return rendition.resize()
}
