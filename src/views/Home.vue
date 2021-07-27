<template lang="pug">
.home
  .todo(v-for="todo in todos")
    NSpace(justify="center")
      NH2 {{ todo.title }}
  NDivider.divider
  NButton(type="primary" @click="addList")
    template(#icon)
      NIcon: AddIcon
    | Add List
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from '@/store';
import {
  NButton, NDivider, NH2, NIcon, NSpace,
} from 'naive-ui';
import { Add as AddIcon } from '@vicons/ionicons5';

export default defineComponent({
  name: 'Home',
  components: {
    NButton, NDivider, NH2, NIcon, NSpace, AddIcon,
  },
  setup() {
    const store = useStore();

    return {
      todos: computed(() => store.state.todos),
      isValid: computed(() => store.getters.isValid),
      addList: () => store.commit('addList'),
    };
  },
});
</script>

<style lang="stylus">
.divider
  horizontalPadding = 1vw

  padding-left horizontalPadding
  padding-right horizontalPadding
</style>
