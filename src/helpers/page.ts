import { ref } from 'vue'
import type { Rendition } from 'epubjs'
import { handleSubContents, subContentsMap } from './subContents'
import { jump } from '@/helpers/reader'
import { currentContent } from '@/helpers/contents'
import { debounce } from '@/helpers/utils'

export const totalPage = ref(0)
export const currentPage = ref(1)
export function setTotalPage() {
  totalPage.value = window.book.packaging.spine.length
}
export function setCurrentPage(page: number) {
  if (page <= 0 || page > totalPage.value || currentPage.value === page)
    return
  currentPage.value = page
  jump(page - 1)
}
export function prevPage() {
  setCurrentPage(currentPage.value - 1)
}
export function nextPage() {
  setCurrentPage(currentPage.value + 1)
}

export const currentPercentage = ref(0)
export function jumpByPercentage(percentage = 0) {
  const location = percentage > 0 ? window.book.locations.cfiFromPercentage(percentage) : '0'
  jump(location)
}

export const getCurrentLocation = debounce((rendition: Rendition) => {
  const start = rendition.location?.start
  const end = rendition.location?.end
  currentPage.value = start.index + 1
  // @ts-expect-error percentage exists in fact
  let percentage = end.percentage
  if ((percentage === 0 && currentPage.value !== 1) || (percentage === 1 && currentPage.value !== totalPage.value))
    percentage = currentPage.value / totalPage.value
  currentPercentage.value = percentage
  currentContent.value = start.href
  subContentsMap.value[start.href] && handleSubContents(start.href, start.cfi)
}, 200)

export function resetPage() {
  totalPage.value = 0
  currentPage.value = 1
  currentPercentage.value = 0
}
