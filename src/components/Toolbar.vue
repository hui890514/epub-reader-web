<script setup lang="ts">
import { changeThemeVariable } from '@/helpers/theme'
import { changeCurrentPage, currentFontsize, currentPage, currentPercentage, currentThemeIndex, setFontsize, setTheme, themeList, totalPage } from '@/helpers/reader'

function changeTheme(index: number) {
  changeThemeVariable(index)
  setTheme(index)
}
</script>

<template>
  <div id="toolbar" wh-f px-1 f-r-n items-center justify-between>
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
    <div id="percentage" f-r-n items-center justify-end w-12>
      <div>{{ (currentPercentage * 100).toFixed(1) }}</div>
      <div>%</div>
    </div>
    <!-- <div class="i-mdi:stretch-to-page-outline w-1em h-1em" style="color: black;"></div> -->
  </div>
</template>
