<template>
  <NCard class="home">
    <TodoList
      v-for="(todo, todoIndex) in todos"
      :index="todoIndex"
      @delete="removeList"
      :key="`todo-list-${todo.id}`"
    />
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
  NButton, NCard, NIcon,
} from 'naive-ui';
import { Add as AddIcon } from '@vicons/ionicons5';
import { useStore } from '@/store';
import TodoList from '@/components/TodoList.vue';

const store = useStore();

const todos = computed(() => store.state.todos);
const addList = () => store.commit('addList');
const removeList = (index: number) => store.commit('removeList', index);
</script>

<style lang="stylus">
</style>
