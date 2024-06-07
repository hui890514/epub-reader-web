function handleKeyboardEvent(e: KeyboardEvent) {
}

export function registerKeyboardEvents() {
  document.addEventListener('keydown', handleKeyboardEvent)
}

export function unregisterKeyboardEvents() {
  document.removeEventListener('keydown', handleKeyboardEvent)
}
