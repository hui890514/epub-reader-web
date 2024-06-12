import { ref } from 'vue'

export interface Metadata {
  title: string
  id: string
}
export const metadata = ref<Metadata>()
export function setMetadata() {
  // @ts-expect-error pacakge exists
  const { identifier: id, title } = window.book.package.metadata
  metadata.value = { id, title }
  document.title = `Epub Reader | ${metadata.value.title}`
}
export function resetMetadata() {
  metadata.value = undefined
}
