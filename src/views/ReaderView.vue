<script setup lang="ts">
import Toolbar from '@/components/Toolbar.vue'
import Contents from '@/components/Contents.vue'
import Reader from '@/components/Reader.vue'
import { contents } from '@/components/reader'
</script>

<template>
  <div id="reader-view" class="w-full h-full overflow-hidden box-border flex flex-col flex-nowrap border-2 border-solid border-black">
    <div class="w-full h-12.5 overflow-hidden border-0 border-b-2 border-solid border-black">
      <Toolbar />
    </div>
    <div class="flex flex-row flex-nowrap flex-1 overflow-hidden">
      <div class="w-75 border-0 border-r-2 border-solid border-black overflow-hidden overflow-y-auto p-2">
        <Contents :contents="contents" />
      </div>
      <div class="flex-1 overflow-auto p-2">
        <Reader />
      </div>
    </div>
  </div>
</template>
