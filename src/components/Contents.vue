<script setup lang="ts">
import { nextTick, ref, watch } from 'vue'
import SubContents from '@/components/SubContents.vue'
import { type _NavItem, collapse, currentContent, jumpByContent } from '@/helpers/contents'
import { currentSubContent } from '@/helpers/subContents'

const props = defineProps<{
  contents: _NavItem[] | undefined
}>()

function _collapse(e: MouseEvent, content: _NavItem) {
  e.stopPropagation()
  collapse(content)
}

const parentContentFocusIndex = ref(-1)
function focusParentContent(index: number) {
  parentContentFocusIndex.value = index
}

watch([currentContent, currentSubContent], () => {
  parentContentFocusIndex.value = -1
  nextTick(() => {
    const dom = document.querySelector('.content-focus')
    const dom2 = document.querySelector('.sub-content-focus')
    // @ts-expect-error use scrollIntoViewIfNeeded
    ;(dom2 || dom)?.scrollIntoViewIfNeeded?.()
  })
})

function isFocused(content: _NavItem, index: number) {
  if (currentContent.value === content._href || parentContentFocusIndex.value === index)
    return 'content-focus border-t border-solid'
  else
    return 'border-t-b'
}
</script>

<template>
  <div class="contents-wrapper">
    <template v-for="(content, index) in props.contents" :key="index">
      <div
        f-r-n items-center justify-between h-10 c-t px-1 my-1
        border-1 border-dotted hover:border-t cursor-pointer
        :class="isFocused(content, index)"
        @click="jumpByContent(content)"
      >
        <div
          overflow-hidden text-ellipsis whitespace-nowrap c-t flex-1
          :title="content.label.trim()"
        >
          {{ content.label }}
        </div>
        <div v-if="content.subitems?.length" i-d flex-shrink-0>
          <div v-if="content.isCollapsed" i-mdi:keyboard-arrow-left @click="e => _collapse(e, content)" />
          <div v-else i-mdi:keyboard-arrow-down @click="e => _collapse(e, content)" />
        </div>
      </div>
      <SubContents
        v-if="content.subitems?.length" v-show="!content.isCollapsed"
        :contents="content.subitems" :parent-index="index" @focus-parent-content="focusParentContent"
      />
    </template>
  </div>
</template>

<style scoped>
.contents-wrapper > div:first-child {
  margin-top: 0;
}
</style>
