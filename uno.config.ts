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
  }],
  theme: {
    colors: {
    },
  },
})
