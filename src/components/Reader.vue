<script setup lang="ts">
import { onMounted } from 'vue'
import { showEpub } from './reader'

const url = '/The Almanack of Naval Ravikant.epub'

onMounted(() => {
  showEpub(url)
})
</script>

<template>
  <div id="reader" class="overflow-hidden w-full h-full" />
</template>
