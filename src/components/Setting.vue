<script setup lang="ts">
import { currentFontsize, currentThemeIndex, setFontsize, setTheme, setThemeVariable, themeList } from '@/helpers/theme'

function changeTheme(index: number) {
  if (currentThemeIndex.value !== index) {
    setThemeVariable(index)
    setTheme(index)
  }
}
</script>

<template>
  <div pl-1>
    <div id="theme" f-r-n items-center mb-3 h-10>
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
    <div id="fontsize" f-r-n items-center mb-3 h-10>
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
  </div>
</template>
