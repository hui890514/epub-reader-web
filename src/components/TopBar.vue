<script setup lang="ts">
import { ref } from 'vue'
import { collapseAll, isContentsHidden, setContentsHidden } from '@/helpers/contents'
import { currentPanel } from '@/helpers/panel'
import { deleteAllHistory, getHistoryList } from '@/helpers/history'

const isFullScreen = ref(!!document.fullscreenElement)
function toggleFullScreen() {
  isFullScreen.value = !isFullScreen.value
  isFullScreen.value
    ? document.documentElement.requestFullscreen()
    : document.exitFullscreen()
}
</script>

<template>
  <div>
    <div c-t pl-1>
      {{ currentPanel.toLocaleUpperCase() }}
    </div>
    <div f-r-n items-center>
      <template v-if="currentPanel === 'contents'">
        <div
          i-d title="collapse all" class="class-for-vim"
          @click="collapseAll(true)"
        >
          <div i-mdi:collapse-all-outline c-t />
        </div>
        <div
          i-d title="expand all" class="class-for-vim"
          @click="collapseAll(false)"
        >
          <div i-mdi:expand-all-outline c-t />
        </div>
        <div v-if="!isContentsHidden" i-d title="hidden contents" class="class-for-vim" @click="setContentsHidden(true)">
          <div i-mdi:menu-open c-t />
        </div>
      </template>
      <div v-else-if="currentPanel === 'setting'" i-d title="full screen" @click="toggleFullScreen">
        <div v-if="!isFullScreen" i-mdi:fullscreen c-t />
        <div v-else i-mdi:fullscreen-exit c-t />
      </div>
      <template v-else>
        <div
          i-d title="reload" class="class-for-vim"
          @click="getHistoryList()"
        >
          <div i-mdi:reload c-t />
        </div>
        <div
          i-d title="delete all" class="class-for-vim"
          @click="deleteAllHistory()"
        >
          <div i-mdi:delete-outline c-t />
        </div>
      </template>
    </div>
  </div>
</template>
