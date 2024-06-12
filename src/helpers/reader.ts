import { nextTick, ref, watch } from 'vue'
import ePub, { type Book, type Rendition } from 'epubjs'
import { addHistory } from './history'
import { setBookAndHistory } from '@/helpers/database'
import { registerThemes, setFontsize, setTheme } from '@/helpers/theme'
import { type Metadata, metadata, resetMetadata, setMetadata } from '@/helpers/metadata'
import { getCurrentLocation, resetPage, setTotalPage } from '@/helpers/page'
import { resetContents, setContents } from '@/helpers/contents'

declare global{
  interface Window {
    book: Book
  }
}

let rendition: Rendition

export const bookLoading = ref(false)

export function showEpub(input: string | Blob, needSave = false) {
  closeEpub()
  bookLoading.value = false
  // @ts-expect-error input may be the blob type
  const book = ePub(input)
  window.book = book
  rendition = book.renderTo('reader', { flow: 'scrolled', width: '100%', height: '100%', spread: 'none' })
  rendition.display(0)
  registerThemes()
  setTheme()
  setFontsize()
  book.ready.then(() => {
    setContents()
    setMetadata()
    if (needSave && metadata.value?.id && typeof input !== 'string')
      addHistory(input)
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
  return rendition?.resize()
}

export function closeEpub() {
  if (metadata.value?.id) {
    rendition.destroy()
    resetContents()
    resetMetadata()
    resetPage()
  }
}
