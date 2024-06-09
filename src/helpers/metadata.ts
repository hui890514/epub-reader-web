import { ref } from 'vue'

export interface Metadata {
  title: string
  id: string
}

export const metadata = ref<Metadata>()
export function setMetadata(data: Metadata) {
  metadata.value = data
  document.title = `Epub Reader | ${data.title}`
}
