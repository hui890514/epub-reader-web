export function debounce<F extends (...args: Parameters<F>) => ReturnType<F>>(f: F, wait: number) {
  let timeoutId: ReturnType<typeof setTimeout>
  return (...args: Parameters<F>): void => {
    timeoutId && clearTimeout(timeoutId)
	  timeoutId = setTimeout(() => f(...args), wait)
  }
}
