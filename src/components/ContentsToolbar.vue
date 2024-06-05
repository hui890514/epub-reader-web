<script setup lang="ts">
import { collapseAll } from '@/helpers/contents'

defineProps<{
  isContentsHidden: boolean
}>()
defineEmits(['toggleContents'])
</script>

<template>
  <div>
    <div c-t>
      Contents
    </div>
    <div f-r-n items-center>
      <div i-d title="collapse all" @click="collapseAll(true)">
        <div i-mdi:collapse-all-outline c-t />
      </div>
      <div i-d title="expand all" @click="collapseAll(false)">
        <div i-mdi:expand-all-outline c-t />
      </div>
      <div i-d title="hidden contents" @click="$emit('toggleContents')">
        <div v-if="!isContentsHidden" i-mdi:menu-open c-t />
      </div>
    </div>
  </div>
</template>
