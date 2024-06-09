<script setup lang="ts">
import { type Ref, watch } from 'vue'
import { jump } from '@/helpers/reader'
import Contents from '@/components/Contents.vue'
import { type _NavItem, collapse, currentContent, jumpByContent } from '@/helpers/contents'
import { currentSubContent, jumpBySubContent, subContentsMap } from '@/helpers/subContents'

const props = defineProps<{
  contents: _NavItem[] | undefined
  parentIndex: number
}>()
const emit = defineEmits<{
  focusParentContent: [index: number]
}>()

function isFocused(content: _NavItem) {
  if (subContentsMap[content._href]) {
    if (currentSubContent.value === content.href && currentContent.value === content._href)
      return 'sub-content-focus border-t border-solid'
    else
      return 'border-t-b'
  }
  else if (currentContent.value === content._href) {
    emit('focusParentContent', props.parentIndex)
    return 'sub-content-focus border-t border-solid'
  }
  else {
    return 'border-t-b'
  }
}
</script>

<template>
  <div ml-3 class="contents-wrapper">
    <template v-for="(content, index) in props.contents" :key="index">
      <div
        f-r-n items-center justify-between h-10 c-t px-1 my-1
        border-1 border-dotted hover:border-t cursor-pointer
        :class="isFocused(content)"
        @click="jumpBySubContent(content)"
      >
        <div
          overflow-hidden text-ellipsis whitespace-nowrap c-t flex-1
          :title="content.label"
        >
          {{ content.label }}
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
.contents-wrapper > div:first-child {
  margin-top: 0;
}
</style>
