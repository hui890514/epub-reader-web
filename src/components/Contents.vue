<script setup lang="ts">
import { contents, jump } from './reader'
</script>

<template>
  <div id="contents">
    <div v-for="(content, index) in contents" :key="index">
      <span @click="jump(content.href)">{{ content.label }}</span>
      <template v-if="content.subitems?.length">
        <div v-for="(_content, _index) in content.subitems" :key="`${index}-${_index}`">
          <span @click="jump(_content.href)">{{ _content.label }}</span>
        </div>
      </template>
    </div>
  </div>
</template>
