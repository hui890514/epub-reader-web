<script setup lang="ts">
import { currentThemeIndex, setTheme, themeList } from '@/components/reader'
</script>

<template>
  <div id="toolbar" wh-f px-1 f-r-n items-center justify-between>
    <div id="theme" f-r-n items-center>
      <div mr-1>
        Theme:
      </div>
      <template v-for="(theme, index) in themeList" :key="index">
        <div
          :class="currentThemeIndex === index ? 'border-1 border-solid' : 'hover:border-1 hover:border-dotted'"
          w-8 h-8 f-c cursor-pointer mr-1 border-black
          @click="setTheme(index)"
        >
          <div :style="`background: ${theme.style.body.background}`" w-4 h-4 border-1 border-black border-solid rounded-1px />
        </div>
      </template>
    </div>
    <div i-mdi:plus-box-outline />
    <div i-mdi:minus-box-outline />
    <div i-mdi:plus-box />
    <div i-mdi:minus-box />
  </div>
</template>
