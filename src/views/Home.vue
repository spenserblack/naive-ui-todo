<template>
  <div class="home">
    <TodoList
      v-for="(todo, todoIndex) in todos"
      :index="todoIndex"
      @delete="removeList"
      :key="`todo-list-${todo.id}`"
    />
    <NDivider class="divider" />
    <NButton type="primary" @click="addList">
      <template #icon>
        <NIcon><AddIcon /></NIcon>
      </template>
      Add List
    </NButton>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import {
  NButton, NDivider, NIcon,
} from 'naive-ui';
import { Add as AddIcon } from '@vicons/ionicons5';
import { useStore } from '@/store';
import TodoList from '@/components/TodoList.vue';

export default defineComponent({
  name: 'Home',
  components: {
    TodoList, NButton, NDivider, NIcon, AddIcon,
  },
  setup() {
    const store = useStore();

    return {
      todos: computed(() => store.state.todos),
      addList: () => store.commit('addList'),
      removeList: (index: number) => store.commit('removeList', index),
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
