<script setup lang="ts">
import type { NavItem } from 'epubjs/types/navigation'
import { jump } from '@/helpers/reader'
import Contents from '@/components/Contents.vue'

const props = defineProps<{
  contents: NavItem[] | undefined
  isChild?: boolean
}>()
</script>

<template>
  <div :class="isChild ? 'child-contents ml-3' : 'contents'">
    <template v-for="(content, index) in props.contents" :key="index">
      <div
        cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap c-t
        :title="content.label" @click="jump(content.href)"
      >
        {{ content.label }}
      </div>
      <Contents v-if="content.subitems?.length" :contents="content.subitems" :is-child="true" />
    </template>
  </div>
</template>
