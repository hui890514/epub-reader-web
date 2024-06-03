<script setup lang="ts">
import { currentThemeIndex, setTheme, themeList } from '@/components/reader'
</script>

<template>
  <div id="toolbar" class="h-full w-full px-1 flex flex-row flex-nowrap items-center justify-between">
    <div id="theme" class="flex flex-row flex-nowrap items-center">
      <div class="mr-1">
        Theme:
      </div>
      <template v-for="(theme, index) in themeList" :key="index">
        <div
          :class="currentThemeIndex === index ? 'border-solid border-black border-1' : 'hover:border-dotted hover:border-black hover:border-1'"
          class="w-8 h-8 flex flex-row flex-nowrap justify-center items-center cursor-pointer mr-1"
          @click="setTheme(index)"
        >
          <div class="w-4 h-4 border-solid border-black border-1 rounded-1px" :style="`background: ${theme.style.body.background}`" />
        </div>
      </template>
    </div>
    <div class="i-mdi:plus-box-outline w-6 h-6" />
    <div class="i-mdi:minus-box-outline w-6 h-6" />
    <div class="i-mdi:plus-box w-6 h-6 hover:border hover:border-black hover:border-2" />
    <div class="i-mdi:minus-box w-6 h-6" />
  </div>
</template>
