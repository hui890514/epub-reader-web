<script setup lang="ts">
import { ref } from 'vue'
import moment from 'moment'
import { upload } from '@/helpers/upload'
import { deleteHistory, getHistoryList, historyList, openHistory } from '@/helpers/history'
import { metadata } from '@/helpers/metadata'
import type { History } from '@/helpers/database'

const fileInput = ref<HTMLInputElement | null>()
function _upload() {
  fileInput.value?.click()
}

getHistoryList(true)

function _deleteHistory(e: Event, item: History) {
  e.stopPropagation()
  deleteHistory(item)
}
</script>

<template>
  <div f-c-n h-full overflow-hidden>
    <input ref="fileInput" type="file" accept="application/epub+zip" hidden @change="upload">
    <div
      bg-t-b c-t w-full h-10 border-2 border-solid border-t cursor-pointer f-c flex-shrink-0
      @click="_upload"
    >
      Open Local Epub File
    </div>
    <div flex-c-n mt-1 flex-1 h-full overflow-auto class="history-wrapper">
      <template v-for="item in historyList" :key="item.id">
        <div
          border-2 border-dotted border-t hover:border-solid cursor-pointer mb-1 pt-3 pl-3 pb-1 pr-1
          f-r-n justify-between
          :class="metadata?.id === item.id && 'border-solid'"
          @click="openHistory(item)"
        >
          <div flex-1 f-c-n justify-between pb-2>
            <div mb-2>
              {{ moment(item.date).format('YYYY-MM-DD HH:mm') }}
            </div>
            <div>
              {{ item.name }}
            </div>
          </div>
          <div flex-shrink-0 f-c-n justify-between items-center>
            <div>
              {{ item.percentage }}%
            </div>
            <div
              i-d title="delete" class="class-for-vim"
              @click="e => _deleteHistory(e, item)"
            >
              <div i-mdi:bookmark-remove-outline c-t />
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
.history-wrapper::-webkit-scrollbar {
  display: none;
}
</style>
