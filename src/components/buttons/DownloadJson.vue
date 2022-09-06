<template>
  <NButton type="primary" :disabled="props.disabled" @click="download">
    <template #icon>
      <NIcon><JsonIcon /></NIcon>
    </template>
    <slot>Download</slot>
  </NButton>
</template>

<script setup lang="ts">
import { NButton, NIcon } from 'naive-ui';
import { CodeDownload as JsonIcon } from '@vicons/ionicons5';
import { saveAs } from 'file-saver';
import { useStore } from '@/store';

interface Props {
  disabled: boolean;
}

const store = useStore();

const props = withDefaults(defineProps<Props>(), { disabled: false });
const download = (): void => {
  const json = JSON.stringify(store.getters.forJsonExport);
  const blob = new Blob([json], { type: 'text/json;charset=utf-8' });
  saveAs(blob, 'to-do.json');
};
</script>
