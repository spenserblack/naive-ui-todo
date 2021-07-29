<template lang="pug">
NSpace(justify="left")
  NP {{ itemIndex }}
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { NP, NSpace } from 'naive-ui';

export default defineComponent({
  name: 'Todo Item',
  components: { NP, NSpace },
  props: {
    todoIndex: {
      type: Number,
      required: true,
    },
    itemIndex: {
      type: Number,
      required: true,
    },
  },
});
</script>
