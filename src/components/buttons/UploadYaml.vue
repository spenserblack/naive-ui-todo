<template lang="pug">
NPopover(placement="top-end")
  template(#trigger)
    NUpload(
      :accept="acceptTypes"
      :showFileList="false"
      @change="onUploadChange"
    )
      NButton(type="primary")
        template(#icon)
          NIcon: UploadIcon
        slot Upload
  | This will #[NText(italic) overwrite] the current to-do lists.
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {
  NButton, NIcon, NPopover, NText, NUpload,
} from 'naive-ui';
import { CodeWorking as UploadIcon } from '@vicons/ionicons5';
import { useStore } from '@/store';

type OnChangeParam = {
  file: { file: File },
  [key: string]: unknown,
};

export default defineComponent({
  components: {
    NButton, NIcon, NPopover, NText, NUpload, UploadIcon,
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
