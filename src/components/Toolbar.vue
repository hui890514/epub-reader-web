<script setup lang="ts">
import { currentThemeIndex, setTheme, themeList } from '@/components/reader'
</script>

<template>
  <div id="toolbar" class="wh-f px-1 f-r-n items-center justify-between">
    <div id="theme" class="f-r-n items-center">
      <div class="mr-1">
        Theme:
      </div>
      <template v-for="(theme, index) in themeList" :key="index">
        <div
          :class="currentThemeIndex === index ? 'border-1 border-black border-solid ' : 'hover:border-1 hover:border-black hover:border-dotted'"
          class="w-8 h-8 f-c cursor-pointer mr-1"
          @click="setTheme(index)"
        >
          <div :class="`w-4 h-4 border-1 border-black border-solid rounded-1px bg-${theme.name}`" />
        </div>
      </template>
    </div>
    <div class="i-mdi:plus-box-outline" />
    <div class="i-mdi:minus-box-outline" />
    <div class="i-mdi:plus-box hover:border-1 hover:border-black hover:border-solid" />
    <div class="i-mdi:minus-box" />
  </div>
</template>
