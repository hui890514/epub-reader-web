<script setup lang="ts">
import type { NavItem } from 'epubjs/types/navigation'
import { reactive } from 'vue'
import { contents, jump } from '@/helpers/reader'
import Contents from '@/components/Contents.vue'

const props = defineProps<{
  contents: NavItem[] | undefined
  isChild?: boolean
}>()

interface CollapsedInfo {
  [key: string]: boolean
}
const collapsedInfo = reactive<CollapsedInfo>({})
if (contents.value && contents.value.length)
  contents.value.forEach((content, index) => content.subitems?.length && (collapsedInfo[index] = true))
function collapse(index: number) {
  collapsedInfo[index] = !collapsedInfo[index]
}

function _jump(href: string, index: number) {
  collapsedInfo[index] === true && collapse(index)
  jump(href)
}
</script>

<template>
  <div :class="isChild ? 'child-contents ml-3' : 'contents'">
    <template v-for="(content, index) in props.contents" :key="index">
      <div f-r-n items-center justify-between h-8 c-t>
        <div
          cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap c-t flex-1
          :title="content.label" @click="_jump(content.href, index)"
        >
          {{ content.label }}
        </div>
        <div v-if="content.subitems?.length" i-d flex-shrink-0>
          <div
            v-if="collapsedInfo[index]" class="i-mdi:keyboard-arrow-left" @click="collapse(index)"
          />
          <div
            v-else class="i-mdi:keyboard-arrow-down" @click="collapse(index)"
          />
        </div>
      </div>
      <Contents
        v-if="content.subitems?.length" v-show="!collapsedInfo[index]"
        :contents="content.subitems" :is-child="true"
      />
    </template>
  </div>
</template>
