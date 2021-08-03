<template lang="pug">
NUpload(
  :accept="acceptTypes"
  :showFileList="false"
  @change="onUploadChange"
)
  NButton(type="primary")
    template(#icon)
      NIcon: UploadIcon
    | Import
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from '@/store';
import { NButton, NIcon, NUpload } from 'naive-ui';
import { CodeWorking as UploadIcon } from '@vicons/ionicons5';

type OnChangeParam = {
  file: { file: File },
  [key: string]: unknown,
};

export default defineComponent({
  components: {
    NButton, NIcon, NUpload, UploadIcon,
  },
  setup() {
    const store = useStore();

    return {
      onUploadChange: async ({ file: { file } }: OnChangeParam): Promise<void> => {
        store.commit('loadFromYaml', await file.text());
      },
      acceptTypes: ['yml', 'yaml'].map((ext) => [
        `.${ext}`,
        `text/${ext}`,
        `text/x-${ext}`,
        `application/${ext}`,
        `application/x-${ext}`,
      ]).flat().join(','),
    };
  },
});
</script>
