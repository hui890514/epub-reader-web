<script setup lang="ts">
import Toolbar from '@/components/Toolbar.vue'
import Contents from '@/components/Contents.vue'
import Reader from '@/components/Reader.vue'
import { contents } from '@/components/reader'
</script>

<template>
  <div id="reader-view" wh-f overflow-hidden box-border f-c-n border-2 border-solid border-black>
    <div w-full h-12.5 overflow-hidden border-0 border-b-2 border-solid border-black>
      <Toolbar />
    </div>
    <div f-r-n flex-1 overflow-hidden>
      <div w-75 border-0 border-r-2 border-solid border-black overflow-hidden overflow-y-auto p-1>
        <Contents :contents="contents" />
      </div>
      <div flex-1 overflow-hidden>
        <Reader />
      </div>
    </div>
  </div>
</template>
