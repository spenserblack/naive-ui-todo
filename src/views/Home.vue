<template lang="pug">
.home
  div(v-for="(todo, todoIndex) in todos")
    TodoList(:index="todoIndex")
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
import TodoList from '@/components/TodoList.vue';

export default defineComponent({
  name: 'Home',
  components: {
    TodoList, NButton, NDivider, NH2, NIcon, NSpace, AddIcon,
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
