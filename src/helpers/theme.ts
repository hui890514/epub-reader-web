import { themeList } from '@/helpers/reader'

const rootStyle = document.documentElement.style

function setProperty(key: string, value: string) {
  rootStyle.setProperty(key, value)
}

export function changeThemeVariable(index = 0) {
  setProperty('--theme-color', themeList[index].style.body.color)
  setProperty('--theme-bg-color', themeList[index].style.body.background)
}
