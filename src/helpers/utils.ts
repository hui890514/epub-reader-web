export function debounce(f: Function, wait: number) {
  let timeoutId: ReturnType<typeof setTimeout> | null = null
  return function (this: any, ...args: any[]) {
	  if (timeoutId)
      clearTimeout(timeoutId)
	  timeoutId = setTimeout(() => f.apply(this, args), wait)
  }
}
