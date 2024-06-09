<script setup lang="ts">
import { handleFileUpload } from '@/helpers/upload'
</script>

<template>
  <div>
    <input type="file" accept="application/epub+zip" @change="handleFileUpload">
  </div>
</template>
