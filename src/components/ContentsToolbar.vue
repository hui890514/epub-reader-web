<script setup lang="ts">
import { collapseAll } from '@/helpers/contents'
</script>

<template>
  <div>
    <div>
      Contents
    </div>
    <div f-r-n items-center>
      <div i-d title="collapse all" @click="collapseAll(true)">
        <div i-mdi:collapse-all-outline c-t />
      </div>
      <div i-d title="expand all" @click="collapseAll(false)">
        <div i-mdi:expand-all-outline c-t />
      </div>
    </div>
  </div>
</template>
