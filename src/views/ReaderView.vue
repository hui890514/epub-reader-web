<script setup lang="ts">
import Toolbar from '@/components/Toolbar.vue'
import Contents from '@/components/Contents.vue'
import ContentsPage from '@/components/ContentsPage.vue'
import ContentsToolbar from '@/components/ContentsToolbar.vue'
import Reader from '@/components/Reader.vue'
import { contents } from '@/helpers/reader'
</script>

<template>
  <div id="reader-view" wh-f overflow-hidden f-c-n border-2 border-solid border-t>
    <div w-full h-12.5 overflow-hidden border-0 border-b-2 border-solid border-t>
      <Toolbar />
    </div>
    <div f-r-n flex-1 overflow-hidden>
      <div
        w-75 border-0 border-r-2 border-solid border-t overflow-hidden f-c-n
      >
        <ContentsToolbar h-9 border-0 border-b-2 border-solid border-t p-1 f-r-n items-center justify-between />
        <div flex-1 overflow-auto p-1 class="contents-wrapper">
          <Contents :contents="contents" />
        </div>
        <ContentsPage h-9 border-0 border-t-2 border-solid border-t p-1 f-r-n items-center />
      </div>
      <div flex-1 overflow-hidden>
        <Reader />
      </div>
    </div>
  </div>
</template>

<style scoped>
.contents-wrapper::-webkit-scrollbar {
  display: none;
}
</style>
