<template lang="pug">
NButton(type="primary" :disabled="disabled" @click="download")
  template(#icon)
    NIcon: YamlIcon
  slot Download
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { NButton, NIcon } from 'naive-ui';
import { CodeDownload as YamlIcon } from '@vicons/ionicons5';
import { saveAs } from 'file-saver';
import { dump as toYaml } from 'js-yaml';
import { useStore } from '@/store';

export default defineComponent({
  name: 'Download Yaml Button',
  components: { NButton, NIcon, YamlIcon },
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const store = useStore();

    return {
      download: () => {
        const yaml = toYaml(store.getters.forYamlExport);
        const blob = new Blob([yaml], { type: 'text/yaml;charset=utf-8' });
        saveAs(blob, 'to-do.yaml');
      },
    };
  },
});
</script>
