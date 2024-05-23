<script setup lang="ts">
import { onMounted } from 'vue'
import { getCurrentLocation, jump, jumpByProgress, nextPage, prevPage, showEpub } from './reader'

const url = '/Tools of Titans.epub'

onMounted(() => {
  showEpub(url)
})
</script>

<template>
  <div id="reader" />
  <button @click="nextPage">
    next
  </button>
  <button @click="prevPage">
    prev
  </button>
  <button @click="() => jump('epubcfi(/6/30!/4/12/8[Sec6]/8[Sec8]/2/2/1:0)')">
    jump
  </button>
  <button @click="() => jumpByProgress(50)">
    jumpByProgress
  </button>
  <button @click="() => { const a = getCurrentLocation();console.log(a) }">
    cl
  </button>
</template>
