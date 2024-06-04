<script setup lang="ts">
import { onMounted } from 'vue'
import { showEpub } from '@/helpers/reader'

const url = '/The Almanack of Naval Ravikant.epub'

onMounted(() => {
  showEpub(url)
})
</script>

<template>
  <div id="reader" overflow-hidden wh-f />
</template>
