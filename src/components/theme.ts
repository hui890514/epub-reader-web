import { setCurrentThemeIndex } from '@/components/storage'
import { themeList } from '@/components/reader'

const rootStyle = document.documentElement.style

function setProperty(key: string, value: string) {
  rootStyle.setProperty(key, value)
}

export function changeThemeVariable(index = 0) {
  setCurrentThemeIndex(index)
  setProperty('--theme-color', themeList[index].style.body.color)
  setProperty('--theme-bg-color', themeList[index].style.body.background)
}
