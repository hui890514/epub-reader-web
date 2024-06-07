function setStorage(key: string, value: string) {
  localStorage.setItem(key, value)
}

function getStorage(key: string) {
  return localStorage.getItem(key)
}

export function setCurrentThemeIndex(index: number) {
  setStorage('current-theme-index', index.toString())
}

export function getCurrentThemeIndex() {
  return Number(getStorage('current-theme-index')) || 0
}

export function setCurrentFontsize(fontsize: number) {
  setStorage('current-fontsize', fontsize.toString())
}

export function getCurrentFontsize() {
  return Number(getStorage('current-fontsize')) || 18
}
