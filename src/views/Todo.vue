<template>
  <TodoList
    :index="index"
    :mainContentStyle="todoMainContentStyle"
    @delete="onDelete"
    :key="`todo-view-${index}`"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from '@/store';
import TodoList from '@/components/TodoList.vue';

const route = useRoute();
const router = useRouter();
const store = useStore();

const todoMainContentStyle = {
  height: '45vh',
};

const index = computed(() => Number.parseInt(route.params.index as string, 10));
const onDelete = async (): Promise<void> => {
  const i = index.value;
  await router.replace({ name: 'Home' });
  store.commit('removeList', i);
};
</script>

<script lang="ts">
export default {
  name: 'single-todo-list-view',
};
</script>
