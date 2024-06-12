import { showEpub } from '@/helpers/reader'

export async function upload(event: Event) {
  const file = await (event.target as HTMLInputElement).files?.[0].arrayBuffer()
  if (file) {
    const blob = new Blob([file], { type: 'application/epub+zip' })
    showEpub(blob, '0', true)
  }
}
