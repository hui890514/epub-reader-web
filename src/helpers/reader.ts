import ePub, { type Rendition } from 'epubjs'
import type { NavItem } from 'epubjs/types/navigation'
import type Locations from 'epubjs/types/locations'
import type Themes from 'epubjs/types/themes'
import { ref } from 'vue'
import { getCurrentFontsize, getCurrentThemeIndex, setCurrentFontsize } from '@/helpers/storage'
import { debounce } from '@/helpers/utils'

let rendition: Rendition
let themes: Themes
let locations: Locations
export const bookLoading = ref(false)
export const contents = ref<NavItem[]>()

export const totalPage = ref(0)
export const currentPage = ref(2)
function getCurrentPage() {
  currentPage.value = rendition.location?.start.index + 1
}
const _getCurrentPage = debounce(getCurrentPage, 200)
export function changeCurrentPage(page: number) {
  if (page <= 0 || page >= totalPage.value)
    return
  currentPage.value = page
  jump(page - 1)
}

export function showEpub(url: string) {
  bookLoading.value = false
  const book = ePub(url)
  rendition = book.renderTo('reader', { flow: 'scrolled', width: '100%', height: '100%' })
  rendition.display()
  window.book = book
  themes = rendition.themes
  registerThemes()
  setTheme(getCurrentThemeIndex())
  setFontsize(getCurrentFontsize())
  book.ready.then(() => {
    contents.value = book.navigation.toc
    book.locations.generate(150)
  }).then(() => {
    locations = book.locations
    totalPage.value = book.packaging.spine.length
    bookLoading.value = true
  })
  rendition.on('relocated', () => {
    _getCurrentPage()
  })
}

export function jump(href: number | string) {
  // @ts-expect-error the display function type missing the union
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

const _setFontsize = debounce((fontsize: number) => {
  themes.fontSize(`${fontsize}px`)
}, 200)
export const currentFontsize = ref(18)
export function setFontsize(fontsize = 18) {
  if (fontsize <= 0)
    return
  setCurrentFontsize(fontsize)
  currentFontsize.value = fontsize
  _setFontsize(fontsize)
}
