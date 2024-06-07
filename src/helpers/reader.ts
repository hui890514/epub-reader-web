import ePub, { type Book, type Rendition } from 'epubjs'
import type Locations from 'epubjs/types/locations'
import type Themes from 'epubjs/types/themes'
import { ref } from 'vue'
import { getCurrentFontsize, getCurrentLayout, getCurrentThemeIndex, setCurrentFontsize, setCurrentLayout, setCurrentThemeIndex } from '@/helpers/storage'
import { debounce } from '@/helpers/utils'
import { type _NavItem, addIsCollapsed } from '@/helpers/contents'

declare global{
  interface Window {
    book: Book
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
function getCurrentLocation() {
  currentPage.value = rendition.location?.start.index + 1
  // @ts-expect-error percentage exists in fact
  currentPercentage.value = rendition.location?.end.percentage
}
const _getCurrentLocation = debounce(getCurrentLocation, 200)
export function changeCurrentPage(page: number) {
  if (page <= 0 || page > totalPage.value)
    return
  currentPage.value = page
  jump(page - 1)
}

export type Layout = 'scrolled' | 'paginated'
export const currentLayout = ref(getCurrentLayout())
export function changeLayout(layout: Layout) {
  if (currentLayout.value !== layout) {
    setCurrentLayout(currentLayout.value = layout)
    rendition.flow(layout)
  }
}

export function showEpub(url: string) {
  bookLoading.value = false
  const book = ePub(url)
  rendition = book.renderTo('reader', { flow: currentLayout.value, width: '100%', height: '100%', spread: 'none' })
  rendition.display(0)
  window.book = book
  themes = rendition.themes
  registerThemes()
  setTheme(getCurrentThemeIndex())
  setFontsize(getCurrentFontsize())
  book.ready.then(() => {
    contents.value = addIsCollapsed(book.navigation.toc)
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

export const themeList = [
  {
    name: 'light',
    style: {
      body: {
        color: '#000',
        background: '#fff',
        padding: '0 12px 30px 12px !important',
      },
    },
  },
  {
    name: 'eye',
    style: {
      body: {
        color: '#000',
        background: '#ceeaba',
        padding: '0 12px 30px 12px !important',
      },
    },
  },
  {
    name: 'night',
    style: {
      body: {
        color: '#fff',
        background: '#000',
        padding: '0 12px 30px 12px !important',
      },
    },
  },
]
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

export function prev() {
  rendition.prev()
}
export function next() {
  rendition.next()
}

export function handleHref(href: string) {
  if (href.startsWith('../'))
    return href.replace('../', '')
  return href
}
