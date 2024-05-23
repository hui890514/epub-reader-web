<script setup lang="ts">
import Toolbar from '@/components/Toolbar.vue'
import Contents from '@/components/Contents.vue'
import Reader from '@/components/Reader.vue'
</script>

<template>
  <div id="reader-view" class="w-full h-full overflow-hidden box-border flex flex-col flex-nowrap border-2 border-solid border-black">
    <Toolbar class="w-full h-12.5 overflow-hidden border-0 border-b-2 border-solid border-black" />
    <div class="flex flex-row flex-nowrap flex-1 overflow-hidden">
      <Contents class="w-75 border-0 border-r-2 border-solid border-black overflow-hidden overflow-y-auto p-2" />
      <Reader class="flex-1 overflow-auto p-2" />
    </div>
  </div>
</template>
