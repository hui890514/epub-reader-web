<script setup lang="ts">
import { nextTick, ref, watch } from 'vue'
import { jump } from '@/helpers/reader'
import SubContents from '@/components/SubContents.vue'
import { type _NavItem, collapse, currentContent, jumpByContent } from '@/helpers/contents'

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

watch(() => currentContent.value, () => {
  parentContentFocusIndex.value = -1
  nextTick(() => {
    const doms = document.querySelectorAll('.content-focus')
    // @ts-expect-error use scrollIntoViewIfNeeded
    doms[doms.length - 1]?.scrollIntoViewIfNeeded?.()
  })
})
</script>

<template>
  <div class="contents-wrapper">
    <template v-for="(content, index) in props.contents" :key="index">
      <div
        f-r-n items-center justify-between h-10 c-t px-1 my-1
        border-1 border-dotted hover:border-t cursor-pointer
        :class="currentContent === content._href || parentContentFocusIndex === index ? 'content-focus border-t border-solid' : 'border-t-b'"
        @click="jumpByContent(content)"
      >
        <div
          overflow-hidden text-ellipsis whitespace-nowrap c-t flex-1
          :title="content.label"
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
