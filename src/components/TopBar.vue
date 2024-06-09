<script setup lang="ts">
import { ref } from 'vue'
import { collapseAll, type panelName } from '@/helpers/contents'

defineProps<{
  isContentsHidden: boolean
  currentPanel: panelName
}>()
const emit = defineEmits<{
  toggleContentsHidden: []
}>()

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
      <div
        v-show="currentPanel === 'contents'" i-d title="collapse all" class="class-for-vim"
        @click="collapseAll(true)"
      >
        <div i-mdi:collapse-all-outline c-t />
      </div>
      <div
        v-show="currentPanel === 'contents'" i-d title="expand all" class="class-for-vim"
        @click="collapseAll(false)"
      >
        <div i-mdi:expand-all-outline c-t />
      </div>
      <div i-d title="full screen" @click="toggleFullScreen">
        <div v-if="!isFullScreen" i-mdi:fullscreen c-t />
        <div v-else i-mdi:fullscreen-exit c-t />
      </div>
      <div i-d title="hidden contents" class="class-for-vim" @click="emit('toggleContentsHidden')">
        <div v-if="!isContentsHidden" i-mdi:menu-open c-t />
      </div>
    </div>
  </div>
</template>
