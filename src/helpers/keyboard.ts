import { nextPage, prevPage } from '@/helpers/page'

export function registerKeyboardEvents() {
  document.addEventListener('keydown', handleKeyboardEvent)
}
export function unregisterKeyboardEvents() {
  document.removeEventListener('keydown', handleKeyboardEvent)
}

function handleKeyboardEvent(e: KeyboardEvent) {
  if (e.key === 'ArrowLeft')
    prevPage()
  else if (e.key === 'ArrowRight')
    nextPage()
}
