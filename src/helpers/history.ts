import { ref } from 'vue'
import { metadata } from '@/helpers/metadata'
import { currentPercentage } from '@/helpers/page'
import { type History, deleteAllApi, deleteBookAndHistoryApi, getAllHistoryApi, getBookApi, setBookAndHistoryApi, setHistoryApi } from '@/helpers/database'
import { closeEpub, showEpub } from '@/helpers/reader'

export const historyList = ref<History[]>([])

export async function getHistoryList(open = false) {
  historyList.value = (await getAllHistoryApi()).sort((a, b) => Number(b.date) - Number(a.date))
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
  return (await getBookApi(id)).blob
}

export async function deleteHistory(history: History) {
  if (metadata.value?.id === history.id)
    closeEpub()
  await deleteBookAndHistoryApi(history.id)
  await getHistoryList(true)
}

export async function addHistory(input: Blob) {
  await setBookAndHistoryApi(metadata.value!, input)
  await getHistoryList()
}

export async function deleteAllHistory() {
  closeEpub()
  await deleteAllApi()
  await getHistoryList()
}

export async function updateHistory(percentage: number, cfi: string) {
  if (metadata.value?.id) {
    console.log(`%c update history: ${metadata.value.title} | ${percentage}`, 'background: #b4b4b3; color: white')
    return setHistoryApi({
      id: metadata.value.id,
      name: metadata.value.title,
      percentage,
      cfi,
      date: new Date(),
    })
  }
}
