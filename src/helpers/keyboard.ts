import { changeCurrentPage, currentPage } from '@/helpers/reader'

function handleKeyboardEvent(e: KeyboardEvent) {
  if (e.key === 'ArrowLeft')
    changeCurrentPage(currentPage.value - 1)
  else if (e.key === 'ArrowRight')
    changeCurrentPage(currentPage.value + 1)
}

export function registerKeyboardEvents() {
  document.addEventListener('keydown', handleKeyboardEvent)
}

export function unregisterKeyboardEvents() {
  document.removeEventListener('keydown', handleKeyboardEvent)
}
