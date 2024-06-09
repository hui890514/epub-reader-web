import { showEpub } from '@/helpers/reader'

export async function handleFileUpload(event: Event) {
  const file = await (event.target as HTMLInputElement).files![0].arrayBuffer()
  const blob = new Blob([file], { type: 'application/epub+zip' })
  showEpub(blob)
}
