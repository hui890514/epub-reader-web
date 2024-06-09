import { ref } from 'vue'

export interface Metadata {
  title: string
  id: string
}
export const metadata = ref<Metadata>()
export function setMetadata() {
  metadata.value = window.book.package.metadata
  document.title = `Epub Reader | ${metadata.value.title}`
}
