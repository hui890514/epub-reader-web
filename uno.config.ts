import { defineConfig, presetIcons } from 'unocss'
import presetUno from '@unocss/preset-uno'
import { themeList } from './src/components/reader'

const themeColors = {}
for (const theme of themeList)
  themeColors[`${theme.name}`] = theme.style.body.background

export default defineConfig({
  presets: [
    presetUno(),
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
      ...themeColors,
    },
  },
})
