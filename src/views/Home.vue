<template>
  <NCard class="home">
    <NLayout class="lists" :native-scrollbar="false">
      <NLayoutContent>
        <TodoList
           v-for="(todo, todoIndex) in todos"
           :index="todoIndex"
           @delete="removeList"
           :key="`todo-list-${todo.id}`"
           :mainContentStyle="listContentStyle"
        />
        <NBackTop />
      </NLayoutContent>
    </NLayout>
    <template #action>
      <NButton type="primary" @click="addList">
        <template #icon>
          <NIcon><AddIcon /></NIcon>
        </template>
        Add List
      </NButton>
    </template>
  </NCard>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import {
  NBackTop,
  NButton,
  NCard,
  NIcon,
  NLayout,
  NLayoutContent,
} from 'naive-ui';
import { Add as AddIcon } from '@vicons/ionicons5';
import { useStore } from '@/store';
import TodoList from '@/components/TodoList.vue';

const store = useStore();

const todos = computed(() => store.state.todos);
const addList = () => store.commit('addList');
const removeList = (index: number) => store.commit('removeList', index);

const listContentStyle = {
  'max-height': '25vh',
};
</script>

<style lang="stylus">
.lists
  height 70vh
</style>
