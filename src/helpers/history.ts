import { ref } from 'vue'
import { metadata } from './metadata'
import { type History, deleteAll, deleteBookAndHistory, getAllHistory, getBook, setBookAndHistory } from '@/helpers/database'
import { closeEpub, showEpub } from '@/helpers/reader'

export const historyList = ref<History[]>([])

export async function getHistoryList(open = false) {
  historyList.value = (await getAllHistory()).sort((a, b) => Number(b.date) - Number(a.date))
  const id = historyList.value[0]?.id
  open && id && metadata.value?.id !== id && showEpub(await _getBook(historyList.value[0].id))
}

export async function openHistory(history: History) {
  metadata.value?.id !== history.id && showEpub(await _getBook(history.id))
}

async function _getBook(id: string) {
  return (await getBook(id)).blob
}

export async function deleteHistory(history: History) {
  if (metadata.value?.id === history.id)
    closeEpub()
  await deleteBookAndHistory(history.id)
  await getHistoryList(true)
}

export async function addHistory(input: Blob) {
  await setBookAndHistory(metadata.value!, input)
  await getHistoryList()
}

export async function deleteAllHistory() {
  closeEpub()
  await deleteAll()
  await getHistoryList()
}
