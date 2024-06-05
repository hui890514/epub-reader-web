<script setup lang="ts">
import { reactive } from 'vue'
import { contents, jump } from '@/helpers/reader'
import Contents from '@/components/Contents.vue'
import { type _NavItem, collapse } from '@/helpers/contents'

const props = defineProps<{
  contents: _NavItem[] | undefined
  isChild?: boolean
}>()

function _jump(href: string, content: _NavItem) {
  content.isCollapsed === true && collapse(content)
  jump(href)
}
</script>

<template>
  <div :class="isChild ? 'child-contents ml-3' : 'contents'">
    <template v-for="(content, index) in props.contents" :key="index">
      <div f-r-n items-center justify-between h-8 c-t>
        <div
          cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap c-t flex-1
          :title="content.label" @click="_jump(content.href, content)"
        >
          {{ content.label }}
        </div>
        <div v-if="content.subitems?.length" i-d flex-shrink-0>
          <div
            v-if="content.isCollapsed" class="i-mdi:keyboard-arrow-left" @click="collapse(content)"
          />
          <div
            v-else class="i-mdi:keyboard-arrow-down" @click="collapse(content)"
          />
        </div>
      </div>
      <Contents
        v-if="content.subitems?.length" v-show="!content.isCollapsed"
        :contents="content.subitems" :is-child="true"
      />
    </template>
  </div>
</template>
