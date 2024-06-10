<script setup lang="ts">
import { ref } from 'vue'
import { upload } from '@/helpers/upload'

const fileInput = ref<HTMLInputElement | null>()
function _upload() {
  fileInput.value?.click()
}
</script>

<template>
  <div>
    <input ref="fileInput" type="file" accept="application/epub+zip" hidden @change="upload">
    <div bg-t-b c-t w-full h-10 border-2 border-solid border-t cursor-pointer f-c @click="_upload">
      Open Local Epub File
    </div>
  </div>
</template>
