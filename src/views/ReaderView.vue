<script setup lang="ts">
import { nextTick, onUnmounted, ref } from 'vue'
import Contents from '@/components/Contents.vue'
import BottomBar from '@/components/BottomBar.vue'
import Setting from '@/components/Setting.vue'
import TopBar from '@/components/TopBar.vue'
import Reader from '@/components/Reader.vue'
import History from '@/components/History.vue'
import { contents, nextPage, prevPage, resize } from '@/helpers/reader'
import { registerKeyboardEvents, unregisterKeyboardEvents } from '@/helpers/keyboard'
import type { panelName } from '@/helpers/contents'

const isContentsHidden = ref(false)
function toggleContentsHidden(e: MouseEvent) {
  e && e.stopPropagation()
  isContentsHidden.value = !isContentsHidden.value
  nextTick(() => resize())
}

const currentPanel = ref<panelName>('contents')
function switchPanel(name: panelName) {
  currentPanel.value = name
}

registerKeyboardEvents()
onUnmounted(() => unregisterKeyboardEvents())

const isPageIconBorderHidden = ref(false)
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
        <History v-else-if="currentPanel === 'history'" />
      </div>
      <BottomBar
        h-10 border-0 border-t-2 border-solid border-t f-r-n justify-between
        :current-panel="currentPanel" @switch-panel="switchPanel"
      />
    </div>
    <div flex-1 overflow-hidden position-relative>
      <Reader />
      <div
        bg-transparent w-11 h-full position-absolute top-0 f-c cursor-pointer
        border-0 border-r-2 border-solid border-transparent hover:border-t hover:bg-t-b
        class="page-wrapper" @click="prevPage"
      >
        <div w-11 position-absolute top-0 f-c pt-1 invisible>
          <div
            v-show="isContentsHidden" i-d title="show contents"
            class="class-for-vim" @click="e => toggleContentsHidden(e)"
            @mouseenter="isPageIconBorderHidden = true" @mouseleave="isPageIconBorderHidden = false"
          >
            <div i-mdi:menu-close c-t />
          </div>
        </div>
        <div
          class="class-for-vim page-icon" invisible w-8 h-8 f-c cursor-pointer
          border-dotted border-t active:border-solid
          :class="isPageIconBorderHidden ? 'border-0' : 'border-1'"
        >
          <div i-mdi:chevron-double-left c-t />
        </div>
      </div>
      <div
        bg-transparent w-11 h-full position-absolute top-0 right-0 f-c cursor-pointer
        border-0 border-l-2 border-solid border-transparent hover:border-t hover:bg-t-b
        class="page-wrapper" @click="nextPage"
      >
        <div
          class="class-for-vim page-icon" invisible w-8 h-8 f-c cursor-pointer
          border-1 border-dotted border-t active:border-solid
        >
          <div i-mdi:chevron-double-right c-t />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.contents-wrapper::-webkit-scrollbar {
  display: none;
}
.page-wrapper:hover > div {
  visibility: visible;
}
.page-wrapper:active .page-icon {
  border-style: solid;
}
</style>
