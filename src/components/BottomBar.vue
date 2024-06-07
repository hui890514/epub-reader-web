<script setup lang="ts">
import { currentPage, currentPercentage, nextPage, prevPage, totalPage } from '@/helpers/reader'
import type { panelName } from '@/helpers/contents'

defineProps<{ currentPanel: panelName }>()
defineEmits(['switchPanel'])
</script>

<template>
  <div>
    <div id="panel" f-r-n items-center c-t flex-shrink-0 p-1>
      <div
        w-8 h-8 f-c cursor-pointer mr-1 border-t
        :class="currentPanel === 'contents' ? 'border-1 border-solid' : 'hover:border-1 hover:border-dotted active:border-solid'"
        title="contents"
        @click="$emit('switchPanel', 'contents')"
      >
        <div i-mdi:menu c-t />
      </div>
      <div
        w-8 h-8 f-c cursor-pointer mr-1 border-t
        :class="currentPanel === 'setting' ? 'border-1 border-solid' : 'hover:border-1 hover:border-dotted active:border-solid'"
        title="setting"
        @click="$emit('switchPanel', 'setting')"
      >
        <div i-mdi:settings-outline c-t />
      </div>
      <div
        w-8 h-8 f-c cursor-pointer mr-1 border-t
        :class="currentPanel === 'history' ? 'border-1 border-solid' : 'hover:border-1 hover:border-dotted active:border-solid'"
        title="history"
        @click="$emit('switchPanel', 'history')"
      >
        <div i-mdi:history c-t />
      </div>
    </div>
    <div id="line" border-0 border-r-2 border-solid border-t />
    <div f-r-n items-center justify-end c-t p-1>
      <div id="page" f-r-n items-center justify-center w-30>
        <div i-d class="class-for-vim" @click="prevPage">
          <div i-mdi:chevron-double-left c-t />
        </div>
        <div c-t ml-1>
          {{ currentPage }}
        </div>
        <div c-t w-3 f-c>
          /
        </div>
        <div c-t mr-1>
          {{ totalPage }}
        </div>
        <div i-d class="class-for-vim" @click="nextPage">
          <div i-mdi:chevron-double-right c-t />
        </div>
      </div>
      <div id="percentage" f-r-n items-center justify-center w-12 c-t>
        <div c-t>
          {{ (currentPercentage * 100).toFixed(1) }}
        </div>
        <div c-t>
          %
        </div>
      </div>
    </div>
  </div>
</template>
