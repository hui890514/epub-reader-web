import { nextPage, prevPage } from './page'

function handleKeyboardEvent(e: KeyboardEvent) {
  if (e.key === 'ArrowLeft')
    prevPage()
  else if (e.key === 'ArrowRight')
    nextPage()
}

export function registerKeyboardEvents() {
  document.addEventListener('keydown', handleKeyboardEvent)
}

export function unregisterKeyboardEvents() {
  document.removeEventListener('keydown', handleKeyboardEvent)
}
