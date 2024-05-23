<script setup lang="ts">
import { contents } from './reader'

console.log(contents.value)
</script>

<template>
  <div id="contents">
    <template v-for="(content, index) in contents" :key="index">
      <div>{{ content.label }}</div>
    </template>
  </div>
</template>
