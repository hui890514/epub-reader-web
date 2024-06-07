<script setup lang="ts">
import { onMounted } from 'vue'
import { showEpub } from '@/helpers/reader'

// const url = '1.epub'
const url = '2.epub'

onMounted(() => {
  showEpub(url)
})
</script>

<template>
  <div id="reader" overflow-hidden wh-f />
</template>
