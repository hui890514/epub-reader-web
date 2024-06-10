<script setup lang="ts">
import { currentPanel, setCurrentPanel } from '@/helpers/panel'
import { handleFileUpload } from '@/helpers/upload'

async function _handleFileUpload(e: Event) {
  await handleFileUpload(e) && setCurrentPanel('contents')
}
</script>

<template>
  <div>
    <input type="file" accept="application/epub+zip" @change="_handleFileUpload">
  </div>
</template>
