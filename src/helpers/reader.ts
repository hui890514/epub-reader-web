import ePub, { type Rendition } from 'epubjs'
import type { NavItem } from 'epubjs/types/navigation'
import type Locations from 'epubjs/types/locations'
import type Themes from 'epubjs/types/themes'
import { ref } from 'vue'
import { getCurrentFontsize, getCurrentThemeIndex, setCurrentFontsize } from '@/helpers/storage'

let rendition: Rendition
let themes: Themes
let locations: Locations
export const bookLoading = ref(false)
export const contents = ref<NavItem[]>()

export function showEpub(url: string) {
  bookLoading.value = false
  const book = ePub(url)
  rendition = book.renderTo('reader', { flow: 'scrolled', width: '100%', height: '100%' })
  rendition.display()
  themes = rendition.themes
  registerThemes()
  setTheme(getCurrentThemeIndex())
  setFontSize(getCurrentFontsize())
  book.ready.then(() => {
    contents.value = book.navigation.toc
    book.locations.generate(150)
  }).then(() => {
    locations = book.locations
    bookLoading.value = true
  })
}

export function prevPage() {
  rendition?.prev()
}
export function nextPage() {
  rendition?.next()
}
export function jump(href = '0') {
  rendition?.display(href)
}
export function jumpByProgress(progress = 0) {
  const percentage = progress / 100
  const location = percentage > 0 ? locations.cfiFromPercentage(percentage) : '0'
  jump(location)
}
export function getCurrentLocation() {
  return (rendition.currentLocation() as any)?.start?.cfi
}

export const themeList = [
  {
    name: 'light',
    style: {
      body: {
        color: '#000',
        background: '#fff',
        padding: '0 12px !important',
      },
    },
  },
  {
    name: 'eye',
    style: {
      body: {
        color: '#000',
        background: '#ceeaba',
        padding: '0 12px !important',
      },
    },
  },
  {
    name: 'night',
    style: {
      body: {
        color: '#fff',
        background: '#000',
        padding: '0 12px !important',
      },
    },
  },
]
export const currentThemeIndex = ref(0)
function registerThemes() {
  themeList.forEach((theme) => {
    themes.register(theme.name, theme.style)
  })
}
export function setTheme(index = 0) {
  currentThemeIndex.value = index
  themes.select(themeList[index].name)
}

export const fontSizeList = [12, 14, 16, 18, 20, 22, 24]
export const currentFontsize = ref(18)
export function setFontSize(fontsize = 18) {
  if (fontsize <= 0)
    return
  setCurrentFontsize(fontsize)
  currentFontsize.value = fontsize
  themes.fontSize(`${fontsize}px`)
}
