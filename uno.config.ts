import { defineConfig, presetAttributify, presetIcons } from 'unocss'
import presetUno from '@unocss/preset-uno'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({ scale: 1.5 }),
  ],
  shortcuts: [{
    'f-c': 'flex flex-row flex-nowrap justify-center items-center',
    'f-r-n': 'flex flex-row flex-nowrap',
    'f-c-n': 'flex flex-col flex-nowrap',
    'wh-f': 'w-full h-full',
    'i-d': 'w-8 h-8 f-c cursor-pointer hover:border-1 hover:border-dotted hover:border-t active:border-solid',
  }],
  theme: {
    colors: {
      't': 'var(--theme-color)',
      't-b': 'var(--theme-bg-color)',
    },
  },
})
