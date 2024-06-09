import ePub, { type Book, type Rendition } from 'epubjs'
import type Locations from 'epubjs/types/locations'
import type Themes from 'epubjs/types/themes'
import { nextTick, ref, watch } from 'vue'
import { themeList } from './theme'
import { type Metadata, setMetadata } from './metadata'
import { getCurrentFontsize, getCurrentThemeIndex, setCurrentFontsize, setCurrentThemeIndex } from '@/helpers/storage'
import { debounce } from '@/helpers/utils'
import { type _NavItem, handleContents, handleSubContents } from '@/helpers/contents'

declare global{
  interface Window {
    book: _Book
  }
}
interface _Book extends Book {
  package: {
    metadata: Metadata
  }
}

let rendition: Rendition
let themes: Themes
let locations: Locations
export const bookLoading = ref(false)
export const contents = ref<_NavItem[]>()
export const totalPage = ref(0)
export const currentPage = ref(1)
export const currentPercentage = ref(0)
export const currentContent = ref<string>()

function getCurrentLocation() {
  const start = rendition.location?.start
  const end = rendition.location?.end
  currentPage.value = start.index + 1
  // @ts-expect-error percentage exists in fact
  let percentage = end.percentage
  if ((percentage === 0 && currentPage.value !== 1) || (percentage === 1 && currentPage.value !== totalPage.value))
    percentage = currentPage.value / totalPage.value
  currentPercentage.value = percentage
  handleSubContents(currentContent.value = start.href, start.cfi)
}
const _getCurrentLocation = debounce(getCurrentLocation, 200)

export function showEpub(input: string | Blob) {
  bookLoading.value = false
  // @ts-expect-error input may be the blob type
  const book = ePub(input) as _Book
  rendition = book.renderTo('reader', { flow: 'scrolled', width: '100%', height: '100%', spread: 'none' })
  rendition.display(0)
  window.book = book
  themes = rendition.themes
  registerThemes()
  setTheme(getCurrentThemeIndex())
  setFontsize(getCurrentFontsize())
  book.ready.then(() => {
    contents.value = handleContents(book.navigation.toc)
    setMetadata(book.package.metadata)
    book.locations.generate(150)
  }).then(() => {
    locations = book.locations
    totalPage.value = book.packaging.spine.length
    bookLoading.value = true
  })
  rendition.on('relocated', () => {
    _getCurrentLocation()
  })
}

export function jump(href: number | string) {
  // @ts-expect-error the display function type missing the union
  rendition?.display(href)
}

export function jumpByProgress(progress = 0) {
  const percentage = progress
  const location = percentage > 0 ? locations.cfiFromPercentage(percentage) : '0'
  jump(location)
}

export const currentThemeIndex = ref(-1)
function registerThemes() {
  themeList.forEach((theme) => {
    themes.register(theme.name, theme.style)
  })
}
export function setTheme(index: number) {
  if (index >= 0 && index < themeList.length && currentThemeIndex.value !== index) {
    setCurrentThemeIndex(currentThemeIndex.value = index)
    themes.select(themeList[index].name)
  }
}

const _setFontsize = debounce((fontsize: number) => {
  themes.fontSize(`${fontsize}px`)
}, 200)
export const currentFontsize = ref(0)
export function setFontsize(fontsize: number) {
  if (fontsize <= 0 && currentFontsize.value !== fontsize)
    return
  setCurrentFontsize(currentFontsize.value = fontsize)
  _setFontsize(fontsize)
}

export function resize() {
  // @ts-expect-error don't need parameters
  return rendition.resize()
}

export function handleHref(href: string) {
  if (href.startsWith('../'))
    return href.replace('../', '')
  return href
}

export function changeCurrentPage(page: number) {
  if (page <= 0 || page > totalPage.value || currentPage.value === page)
    return
  currentPage.value = page
  jump(page - 1)
}
export function prevPage() {
  changeCurrentPage(currentPage.value - 1)
}
export function nextPage() {
  changeCurrentPage(currentPage.value + 1)
}
