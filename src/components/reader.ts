import ePub, { type Rendition } from 'epubjs'
import type Locations from 'epubjs/types/locations'
import type Themes from 'epubjs/types/themes'
import { ref } from 'vue'

let rendition: Rendition
let themes: Themes
let locations: Locations
export const bookLoading = ref(false)
export const contents = ref({})

export function showEpub(url: string) {
  bookLoading.value = false
  const book = ePub(url)
  rendition = book.renderTo('reader', { flow: 'scrolled' })
  rendition.display()
  themes = rendition.themes
  registerThemes()
  setTheme()
  setFontSize()
  book.ready.then(() => {
    contents.value = book.navigation
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
    name: 'default',
    style: {
      body: {
        color: '#000',
        background: '#fff',
      },
    },
  },
  {
    name: 'eye',
    style: {
      body: {
        color: '#000',
        background: '#ceeaba',
      },
    },
  },
  {
    name: 'night',
    style: {
      body: {
        color: '#fff',
        background: '#000',
      },
    },
  },
  {
    name: 'gold',
    style: {
      body: {
        color: '#000',
        background: 'rgb(241, 236, 226)',
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
function setTheme(index = 0) {
  currentThemeIndex.value = index
  themes.select(themeList[index].name)
}

export const fontSizeList = [12, 14, 16, 18, 20, 22, 24]
export const currentFontsize = ref(16)
export function setFontSize(fontSize = 16) {
  currentFontsize.value = fontSize
  themes.fontSize(`${fontSize}px`)
}
