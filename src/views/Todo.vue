<template>
  <NScrollbar id="scrollable-list">
    <TodoList :index="index" @delete="onDelete" :key="`todo-view-${index}`" />
    <NBackTop />
  </NScrollbar>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { NBackTop, NScrollbar } from 'naive-ui';
import { useStore } from '@/store';
import TodoList from '@/components/TodoList.vue';

const route = useRoute();
const router = useRouter();
const store = useStore();

const index = computed(() => Number.parseInt(route.params.index as string, 10));
const onDelete = async (): Promise<void> => {
  const i = index.value;
  await router.replace({ name: 'Home' });
  store.commit('removeList', i);
};
</script>

<style lang="stylus">
#scrollable-list
  height 80vh
</style>
