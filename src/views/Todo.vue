<template lang="pug">
.todo
  TodoList(:index="index" @delete="onDelete")
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from '@/store';
import TodoList from '@/components/TodoList.vue';

export default defineComponent({
  name: 'Todo',
  components: { TodoList },

  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();

    const index = computed(() => Number.parseInt(route.params.index as string, 10));

    return {
      index,
      onDelete: async (): Promise<void> => {
        const i = index.value;
        await router.replace({ name: 'Home' });
        store.commit('removeList', i);
      },
    };
  },
});
</script>
