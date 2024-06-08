<script setup lang="ts">
import { watch } from 'vue'
import { currentContent, handleHref, jump } from '@/helpers/reader'
import Contents from '@/components/Contents.vue'
import { type _NavItem, collapse, currentSubContent } from '@/helpers/contents'

const props = defineProps<{
  contents: _NavItem[] | undefined
  isChild?: boolean
}>()

function _jump(content: _NavItem) {
  content.isCollapsed === true && collapse(content)
  currentContent.value = content._href
  currentSubContent.value = content.parent ? content.href : ''
  jump(handleHref(content.href))
}

function _collapse(e: MouseEvent, content: _NavItem) {
  e.stopPropagation()
  collapse(content)
}

watch(() => currentContent.value || currentSubContent.value, () => {
  const dom = document.querySelector('.content-focus')
  // @ts-expect-error scrollIntoViewIfNeeded
  dom?.scrollIntoViewIfNeeded?.()
})
</script>

<template>
  <div :class="isChild ? 'child-contents ml-3' : 'contents'">
    <template v-for="(content, index) in props.contents" :key="index">
      <div
        f-r-n items-center justify-between h-10 c-t px-1 my-1
        border-1 border-dotted hover:border-t cursor-pointer
        :class="(!isChild && currentContent === content._href) || (isChild && currentSubContent === content.href) ? 'content-focus border-t border-solid' : 'border-t-b'"
        @click="_jump(content)"
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
      <Contents
        v-if="content.subitems?.length" v-show="!content.isCollapsed"
        :contents="content.subitems" :is-child="true"
      />
    </template>
  </div>
</template>

<style scoped>
.contents > div:first-child {
  margin-top: 0;
}
</style>
