import { ref } from 'vue'
import { metadata } from './metadata'
import { currentPercentage } from './page'
import { type History, deleteAll, deleteBookAndHistory, getAllHistory, getBook, setBookAndHistory, setHistory } from '@/helpers/database'
import { closeEpub, showEpub } from '@/helpers/reader'

export const historyList = ref<History[]>([])

export async function getHistoryList(open = false) {
  historyList.value = (await getAllHistory()).sort((a, b) => Number(b.date) - Number(a.date))
  const id = historyList.value[0]?.id
  open && id && metadata.value?.id !== id && _showEpub(historyList.value[0])
}

export async function openHistory(history: History) {
  metadata.value?.id !== history.id && _showEpub(history)
}

async function _showEpub(history: History) {
  showEpub(await _getBook(history.id), history.cfi)
  currentPercentage.value = history.percentage
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

export async function updateHistory(percentage: number, cfi: string) {
  if (metadata.value?.id) {
    console.log('update history', metadata.value.title, percentage)
    return setHistory({
      id: metadata.value.id,
      name: metadata.value.title,
      percentage,
      cfi,
      date: new Date(),
    })
  }
}
