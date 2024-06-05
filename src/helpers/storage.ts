import type { Layout } from '@/helpers/reader'

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

export function setCurrentLayout(layout: Layout) {
  setStorage('current-layout', layout)
}

export function getCurrentLayout() {
  return (getStorage('current-layout') || 'scrolled') as Layout
}
