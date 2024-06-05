<script setup lang="ts">
import { nextTick, onUnmounted, ref } from 'vue'
import Contents from '@/components/Contents.vue'
import BottomBar from '@/components/BottomBar.vue'
import Setting from '@/components/Setting.vue'
import TopBar from '@/components/TopBar.vue'
import Reader from '@/components/Reader.vue'
import { contents, resize } from '@/helpers/reader'
import { registerKeyboardEvents, unregisterKeyboardEvents } from '@/helpers/keyboard'
import type { panelName } from '@/helpers/contents'

const isContentsHidden = ref(false)
function toggleContentsHidden() {
  isContentsHidden.value = !isContentsHidden.value
  nextTick(() => resize())
}

const currentPanel = ref<panelName>('contents')
function switchPanel(name: panelName) {
  currentPanel.value = name
}

registerKeyboardEvents()
onUnmounted(() => unregisterKeyboardEvents())
</script>

<template>
  <div id="reader-view" wh-f overflow-hidden f-r-n border-2 border-solid border-t>
    <div
      v-show="!isContentsHidden"
      w-75 border-0 border-r-2 border-solid border-t overflow-hidden f-c-n
    >
      <TopBar
        h-10 border-0 border-b-2 border-solid border-t p-1 f-r-n items-center justify-between
        :current-panel="currentPanel" :is-contents-hidden="isContentsHidden"
        @toggle-contents-hidden="toggleContentsHidden"
      />
      <div flex-1 overflow-auto p-1 class="contents-wrapper">
        <Contents v-show="currentPanel === 'contents'" :contents="contents" />
        <Setting v-if="currentPanel === 'setting'" />
      </div>
      <BottomBar
        h-10 border-0 border-t-2 border-solid border-t f-r-n justify-between
        :current-panel="currentPanel" @switch-panel="switchPanel"
      />
    </div>
    <div flex-1 overflow-hidden position-relative>
      <Reader />
      <div v-if="isContentsHidden" i-d title="show contents" position-absolute top-0.5 left-0.5 hover:bg-t-b @click="toggleContentsHidden">
        <div i-mdi:menu-close c-t />
      </div>
    </div>
  </div>
</template>

<style scoped>
.contents-wrapper::-webkit-scrollbar {
  display: none;
}
</style>
