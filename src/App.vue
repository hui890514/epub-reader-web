<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <RouterView />
</template>

<style>
*{
	box-sizing: border-box;
	margin: 0;
	padding: 0;
}
html, body, #app{
	width: 100%;
	height: 100%;
	overflow: hidden;
}
*::-webkit-scrollbar {
	display: none;
}
</style>