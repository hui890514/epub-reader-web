<script setup lang="ts">
import { nextTick, ref } from 'vue'
import Toolbar from '@/components/Toolbar.vue'
import Contents from '@/components/Contents.vue'
import ContentsPage from '@/components/ContentsPage.vue'
import ContentsToolbar from '@/components/ContentsToolbar.vue'
import Reader from '@/components/Reader.vue'
import { contents, resize } from '@/helpers/reader'

const isContentsHidden = ref(false)

function toggleContents() {
  isContentsHidden.value = !isContentsHidden.value
  nextTick(() => resize())
}
</script>

<template>
  <div id="reader-view" wh-f overflow-hidden f-c-n border-2 border-solid border-t>
    <div w-full h-12.5 overflow-hidden border-0 border-b-2 border-solid border-t>
      <Toolbar />
    </div>
    <div f-r-n flex-1 overflow-hidden>
      <div
        v-show="!isContentsHidden"
        w-75 border-0 border-r-2 border-solid border-t overflow-hidden f-c-n
      >
        <ContentsToolbar
          h-10 border-0 border-b-2 border-solid border-t p-1 f-r-n items-center justify-between
          :is-contents-hidden="isContentsHidden" @toggle-contents="toggleContents"
        />
        <div flex-1 overflow-auto p-1 class="contents-wrapper">
          <Contents :contents="contents" />
        </div>
        <ContentsPage h-10 border-0 border-t-2 border-solid border-t p-1 f-r-n items-center />
      </div>
      <div flex-1 overflow-hidden position-relative>
        <Reader />
        <div v-if="isContentsHidden" i-d title="show contents" position-absolute top-0.5 left-0.5 hover:bg-t-b @click="toggleContents">
          <div i-mdi:menu-close c-t />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.contents-wrapper::-webkit-scrollbar {
  display: none;
}
</style>
