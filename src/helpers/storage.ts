function setStorage(key: string, value: string) {
  localStorage.setItem(key, value)
}
function getStorage(key: string) {
  return localStorage.getItem(key)
}

export function setStorageCurrentThemeIndex(index: number) {
  setStorage('current-theme-index', index.toString())
}
export function getStorageCurrentThemeIndex() {
  return Number(getStorage('current-theme-index')) || 0
}

export function setStorageCurrentFontsize(fontsize: number) {
  setStorage('current-fontsize', fontsize.toString())
}
export function getStorageCurrentFontsize() {
  return Number(getStorage('current-fontsize')) || 18
}
