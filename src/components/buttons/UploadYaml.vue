<template>
  <NPopover placement="top-end">
    <span>This will <NText italic>overwrite</NText> the current to-do lists.</span>
    <template #trigger>
      <NUpload :accept="acceptTypes" :showFileList="false" @change="onUploadChange">
        <NButton type="primary">
          <template #icon>
            <NIcon><UploadIcon /></NIcon>
          </template>
          <slot>Upload</slot>
        </NButton>
      </NUpload>
    </template>
  </NPopover>
</template>

<script setup lang="ts">
import {
  NButton, NIcon, NPopover, NText, NUpload,
} from 'naive-ui';
import { CodeWorking as UploadIcon } from '@vicons/ionicons5';
import { useStore } from '@/store';

type OnChangeParam = {
  file: { file: File },
  [key: string]: unknown,
};

const store = useStore();

const onUploadChange = async ({ file: { file } }: OnChangeParam): Promise<void> => {
  store.commit('loadFromYaml', await file.text());
};

const acceptTypes = ['yml', 'yaml'].map((ext) => [
  `.${ext}`,
  `text/${ext}`,
  `text/x-${ext}`,
  `application/${ext}`,
  `application/x-${ext}`,
]).flat().join(',');
</script>
