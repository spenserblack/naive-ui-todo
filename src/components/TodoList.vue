<template lang="pug">
.todo
  NSpace(justify="center" vertical)
    NH2(v-if="!editing" @click="editing = true") {{ todo.title }}
    NInput(
      v-else
      size="large"
      :value="todo.title"
      @update:value="setTitle"
      @blur="editing = titleEmpty"
      clearable
      placeholder="Please add a title"
    )
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue';
import { useStore } from '@/store';
import { NH2, NInput, NSpace } from 'naive-ui';

export default defineComponent({
  name: 'Todo List',
  components: { NH2, NInput, NSpace },
  props: {
    index: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();
    const todo = store.state.todos[props.index];

    return {
      todo: computed(() => todo),
      setTitle: (title: string) => store.commit('setTodoTitle', { index: props.index, title }),
      titleEmpty: computed((): boolean => !todo.title),
      editing: ref(!todo.title),
    };
  },
});
</script>
