import { currentLayout, next, prev } from '@/helpers/reader'

function handleKeyboardEvent(e: KeyboardEvent) {
  if (currentLayout.value === 'scrolled')
    return
  if (e.key === 'ArrowLeft')
    prev()
  else if (e.key === 'ArrowRight')
    next()
}

export function registerKeyboardEvents() {
  document.addEventListener('keydown', handleKeyboardEvent)
}

export function unregisterKeyboardEvents() {
  document.removeEventListener('keydown', handleKeyboardEvent)
}
