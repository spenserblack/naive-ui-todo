<template>
  <NButton type="primary" :disabled="props.disabled" @click="download">
    <template #icon>
      <NIcon><YamlIcon /></NIcon>
    </template>
    <slot>Download</slot>
  </NButton>
</template>

<script setup lang="ts">
import { NButton, NIcon } from 'naive-ui';
import { CodeDownload as YamlIcon } from '@vicons/ionicons5';
import { saveAs } from 'file-saver';
import { dump as toYaml } from 'js-yaml';
import { useStore } from '@/store';

interface Props {
  disabled: boolean;
}

const store = useStore();

const props = withDefaults(defineProps<Props>(), { disabled: false });
const download = (): void => {
  const yaml = toYaml(store.getters.forYamlExport);
  const blob = new Blob([yaml], { type: 'text/yaml;charset=utf-8' });
  saveAs(blob, 'to-do.yaml');
};
</script>
