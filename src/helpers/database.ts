import { type IDBPDatabase, openDB } from 'idb'
import type { Metadata } from '@/helpers/metadata'

export interface Book {
  id: string
  blob: Blob
}
export interface History {
  id: string
  name: string
  percentage: number
  cfi: string
  date: Date
}

let db: IDBPDatabase
export async function init() {
  db = await openDB('epub-reader-web', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('book'))
        db.createObjectStore('book', { keyPath: 'id' })
      if (!db.objectStoreNames.contains('history'))
        db.createObjectStore('history', { keyPath: 'id' })
    },
  })
}

export async function getBook(id: string): Promise<Book> {
  return db.transaction('book', 'readonly').objectStore('book').get(id)
}

export async function getHistory(id: string): Promise<History> {
  return db.transaction('history', 'readonly').objectStore('history').get(id)
}
export async function setHistory(history: History) {
  return db.transaction('history', 'readwrite').objectStore('history').put(history)
}

export async function setBookAndHistory(metadata: Metadata, blob: Blob) {
  const t = db.transaction(['book', 'history'], 'readwrite')
  await t.objectStore('book').put({ id: metadata.id, blob })
  await t.objectStore('history').put({ id: metadata.id, name: metadata.title, percentage: 0, date: new Date(), cfi: '' })
}

export async function deleteBookAndHistory(id: string) {
  const t = db.transaction(['book', 'history'], 'readwrite')
  await t.objectStore('book').delete(id)
  await t.objectStore('history').delete(id)
}

export async function deleteAll() {
  const t = db.transaction(['book', 'history'], 'readwrite')
  await t.objectStore('book').clear()
  await t.objectStore('history').clear()
}

export async function getAllHistory() {
  const result: History[] = []
  let cursor = await db.transaction('history', 'readonly')
    .objectStore('history')
    .openCursor()
  while (cursor) {
    result.push(cursor.value)
    cursor = await cursor.continue()
  }
  return result
}

await init()
