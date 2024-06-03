<script setup lang="ts">
import { onMounted } from 'vue'
import { showEpub } from './reader'

const url = '/The Almanack of Naval Ravikant.epub'

onMounted(() => {
  showEpub('reader', url)
})
</script>

<template>
  <div id="reader" />
</template>
