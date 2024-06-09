import { ref } from 'vue'
import { getStorageCurrentFontsize, getStorageCurrentThemeIndex, setStorageCurrentFontsize, setStorageCurrentThemeIndex } from '@/helpers/storage'
import { debounce } from '@/helpers/utils'

export const themeList = [
  {
    name: 'light',
    style: {
      body: {
        color: '#000',
        background: '#fff',
        padding: '0 20px 30px 20px !important',
      },
    },
  },
  {
    name: 'eye',
    style: {
      body: {
        color: '#000',
        background: '#ceeaba',
        padding: '0 20px 30px 20px !important',
      },
    },
  },
  {
    name: 'night',
    style: {
      body: {
        color: '#fff',
        background: '#000',
        padding: '0 20px 30px 20px !important',
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

export const currentThemeIndex = ref(-1)
export function registerThemes() {
  themeList.forEach((theme) => {
    window.book.rendition.themes.register(theme.name, theme.style)
  })
}
export function setTheme(index: number = getStorageCurrentThemeIndex()) {
  if (index >= 0 && index < themeList.length && currentThemeIndex.value !== index) {
    setStorageCurrentThemeIndex(currentThemeIndex.value = index)
    window.book.rendition.themes.select(themeList[index].name)
  }
}

export const currentFontsize = ref(0)
const _setFontsize = debounce((fontsize: number) => {
  window.book.rendition.themes.fontSize(`${fontsize}px`)
}, 200)
export function setFontsize(fontsize: number = getStorageCurrentFontsize()) {
  if (fontsize <= 0 && currentFontsize.value !== fontsize)
    return
  setStorageCurrentFontsize(currentFontsize.value = fontsize)
  _setFontsize(fontsize)
}
