<script setup lang="ts">
import { onMounted } from 'vue'
import { showEpub } from './reader'

const url = '/Tools of Titans.epub'

onMounted(() => {
  showEpub('reader', url)
})
</script>

<template>
  <div id="reader" />
</template>
