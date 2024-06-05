<script setup lang="ts">
import { ref } from 'vue'
import { changeThemeVariable } from '@/helpers/theme'
import { changeCurrentPage, currentFontsize, currentPage, currentPercentage, currentThemeIndex, setFontsize, setTheme, themeList, totalPage } from '@/helpers/reader'
import { collapseAll } from '@/helpers/contents'

function changeTheme(index: number) {
  changeThemeVariable(index)
  setTheme(index)
}

const isFullScreen = ref(!!document.fullscreenElement)
function toggleFullScreen() {
  isFullScreen.value = !isFullScreen.value
  isFullScreen.value
    ? document.documentElement.requestFullscreen()
    : document.exitFullscreen()
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft')
    changeCurrentPage(currentPage.value - 1)
  else if (e.key === 'ArrowRight')
    changeCurrentPage(currentPage.value + 1)
})
</script>

<template>
  <div id="toolbar" wh-f px-1 f-r-n items-center justify-between>
    <div id="contents">
      <div @click="collapseAll(true)">
        collapse
      </div>
      <div @click="collapseAll(false)">
        collapse
      </div>
    </div>
    <div id="theme" f-r-n items-center>
      <div mr-1 c-t>
        Theme:
      </div>
      <template v-for="(theme, index) in themeList" :key="index">
        <div
          :class="currentThemeIndex === index ? 'border-1 border-solid' : 'hover:border-1 hover:border-dotted active:border-solid'"
          w-8 h-8 f-c cursor-pointer mr-1 border-t
          @click="changeTheme(index)"
        >
          <div :style="`background: ${theme.style.body.background}`" w-4 h-4 border-1 border-t border-solid rounded-1px />
        </div>
      </template>
    </div>
    <div id="fontsize" f-r-n items-center>
      <div mr-1 c-t>
        Fontsize:
      </div>
      <div i-d @click="setFontsize(currentFontsize - 2)">
        <div i-mdi:minus-box-outline c-t />
      </div>
      <div c-t w-8 f-c>
        {{ currentFontsize }}
      </div>
      <div i-d @click="setFontsize(currentFontsize + 2)">
        <div i-mdi:plus-box-outline c-t />
      </div>
    </div>
    <div id="page" f-r-n items-center>
      <div mr-1 c-t>
        Page:
      </div>
      <div i-d @click="changeCurrentPage(currentPage - 1)">
        <div i-mdi:chevron-double-left c-t />
      </div>
      <div c-t ml-1>
        {{ currentPage }}
      </div>
      <div c-t w-3 f-c>
        /
      </div>
      <div c-t mr-1>
        {{ totalPage }}
      </div>
      <div i-d @click="changeCurrentPage(currentPage + 1)">
        <div i-mdi:chevron-double-right c-t />
      </div>
    </div>
    <div id="percentage" f-r-n items-center justify-end w-12 c-t>
      <div c-t>
        {{ (currentPercentage * 100).toFixed(1) }}
      </div>
      <div c-t>
        %
      </div>
    </div>
    <div id="full-screen" f-r-n items-center justify-end c-t>
      <div i-d @click="toggleFullScreen">
        <div v-if="!isFullScreen" i-mdi:fullscreen c-t />
        <div v-else i-mdi:fullscreen-exit c-t />
      </div>
    </div>
  </div>
</template>
