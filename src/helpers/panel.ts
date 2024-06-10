import { ref } from 'vue'

export type panelName = 'contents' | 'setting' | 'history'

export const currentPanel = ref<panelName>('history')
export function setCurrentPanel(name: panelName) {
  currentPanel.value = name
}
