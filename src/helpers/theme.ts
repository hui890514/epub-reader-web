import { ref } from 'vue'
import type Themes from 'epubjs/types/themes'
import { getStorageCurrentFontsize, getStorageCurrentThemeIndex, setStorageCurrentFontsize, setStorageCurrentThemeIndex } from './storage'
import { debounce } from './utils'

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

const rootStyle = document.documentElement.style
function setProperty(key: string, value: string) {
  rootStyle.setProperty(key, value)
}
export function setThemeVariable(index: number = getStorageCurrentThemeIndex()) {
  setProperty('--theme-color', themeList[index].style.body.color)
  setProperty('--theme-bg-color', themeList[index].style.body.background)
}

let themes: Themes
export const currentThemeIndex = ref(-1)
export function registerThemes(_themes: Themes) {
  themes = _themes
  themeList.forEach((theme) => {
    themes.register(theme.name, theme.style)
  })
}
export function setTheme(index: number = getStorageCurrentThemeIndex()) {
  if (index >= 0 && index < themeList.length && currentThemeIndex.value !== index) {
    setStorageCurrentThemeIndex(currentThemeIndex.value = index)
    themes.select(themeList[index].name)
  }
}

export const currentFontsize = ref(0)
const _setFontsize = debounce((fontsize: number) => {
  themes.fontSize(`${fontsize}px`)
}, 200)
export function setFontsize(fontsize: number = getStorageCurrentFontsize()) {
  if (fontsize <= 0 && currentFontsize.value !== fontsize)
    return
  setStorageCurrentFontsize(currentFontsize.value = fontsize)
  _setFontsize(fontsize)
}
