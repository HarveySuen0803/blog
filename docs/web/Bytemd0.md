# Bytemd

Install Bytemd

```shell
npm install @bytemd/vue-next

# Offical Plugins
npm install @bytemd/plugin-breaks
npm install @bytemd/plugin-frontmatter
npm install @bytemd/plugin-gemoji
npm install @bytemd/plugin-gfm
npm install @bytemd/plugin-highlight
npm install @bytemd/plugin-highlight-ssr
npm install @bytemd/plugin-math
npm install @bytemd/plugin-math-ssr
npm install @bytemd/plugin-medium-zoom
npm install @bytemd/plugin-mermaid

# Other Plugins
npm install juejin-markdown-themes
```

Use Bytemd

```vue
<script setup lang="ts">
import {Editor, Viewer} from '@bytemd/vue-next'
import gfm from '@bytemd/plugin-gfm'
import gemoji from '@bytemd/plugin-gemoji'
import highlight from '@bytemd/plugin-highlight'
import frontmatter from '@bytemd/plugin-frontmatter'
import mediumZoom from '@bytemd/plugin-medium-zoom'
import breaks from '@bytemd/plugin-breaks'
import 'bytemd/dist/index.css'
import 'juejin-markdown-themes/dist/juejin.min.css'
import {ref} from 'vue'

const mdPlugins = ref([
  gfm(),
  gemoji(),
  highlight(),
  frontmatter(),
  mediumZoom(),
  breaks()
])

interface Props {
  editorValue: string,
  onChange: (value: string) => void
}

const props = withDefaults(defineProps<Props>(), {
  editorValue: () => '',
  onChange: (value: string) => {}
})
</script>

<template>
  <Editor :value="props.editorValue" :plugins="mdPlugins" @change="props.onChange"/>
</template>
```