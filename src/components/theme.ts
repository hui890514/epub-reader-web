import { themeList } from '@/components/reader'

const rootStyle = document.documentElement.style

function setProperty(a: string, b: string) {
  rootStyle.setProperty(a, b)
}

export function changeThemeVariable(index = 0) {
  setProperty('--theme-color', themeList[index].style.body.color)
  setProperty('--theme-bg-color', themeList[index].style.body.background)
}
