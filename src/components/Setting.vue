<script setup lang="ts">
import { changeThemeVariable } from '@/helpers/theme'
import { changeLayout, currentFontsize, currentLayout, currentThemeIndex, setFontsize, setTheme, themeList } from '@/helpers/reader'

function changeTheme(index: number) {
  changeThemeVariable(index)
  setTheme(index)
}
</script>

<template>
  <div id="layout" f-r-n items-center mb-3>
    <div c-t w-20>
      Layout:
    </div>
    <div
      w-8 h-8 f-c cursor-pointer mr-1 border-t
      :class="currentLayout === 'scrolled' ? 'border-1 border-solid' : 'hover:border-1 hover:border-dotted active:border-solid'"
      title="scroll"
      @click="changeLayout('scrolled')"
    >
      <div i-mdi:scroll-text-outline c-t />
    </div>
    <div
      w-8 h-8 f-c cursor-pointer mr-1 border-t
      title="page"
      :class="currentLayout === 'paginated' ? 'border-1 border-solid' : 'hover:border-1 hover:border-dotted active:border-solid'"
      @click="changeLayout('paginated')"
    >
      <div i-mdi:book-open-page-variant-outline c-t />
    </div>
  </div>
  <div id="theme" f-r-n items-center mb-3>
    <div c-t w-20>
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
  <div id="fontsize" f-r-n items-center mb-3>
    <div c-t w-20>
      Fontsize:
    </div>
    <div i-d class="class-for-vim" @click="setFontsize(currentFontsize - 2)">
      <div i-mdi:minus-box-outline c-t />
    </div>
    <div c-t w-8 f-c>
      {{ currentFontsize }}
    </div>
    <div i-d class="class-for-vim" @click="setFontsize(currentFontsize + 2)">
      <div i-mdi:plus-box-outline c-t />
    </div>
  </div>
</template>
