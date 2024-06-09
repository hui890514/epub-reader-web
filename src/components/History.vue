<script setup lang="ts">
import type { panelName } from '@/helpers/contents'
import { handleFileUpload } from '@/helpers/upload'

const emit = defineEmits<{
  switchPanel: [panel: panelName]
}>()

async function _handleFileUpload(e: Event) {
  await handleFileUpload(e) && emit('switchPanel', 'contents')
}
</script>

<template>
  <div>
    <input type="file" accept="application/epub+zip" @change="_handleFileUpload">
  </div>
</template>
