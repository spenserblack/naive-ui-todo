<template lang="pug">
NSpace(justify="left")
  NCheckbox(:disabled="!item.description" :checked="item.done" @update:checked="setCompleted")
    EditableText(
      :text="item.description"
      @update:value="setDescription"
      inputPlaceholder="Please describe the to-do item"
    )
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from '@/store';
import { NCheckbox, NSpace } from 'naive-ui';
import EditableText from './EditableText.vue';

export default defineComponent({
  name: 'Todo Item',
  components: { NCheckbox, NSpace, EditableText },
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
  setup(props) {
    const store = useStore();
    const todo = store.state.todos[props.todoIndex];
    const item = todo.items[props.itemIndex];
    return {
      todo: computed(() => todo),
      item: computed(() => item),
      setDescription: (description: string) => store.commit('setTodoItemDescription', {
        todoIndex: props.todoIndex,
        itemIndex: props.itemIndex,
        description,
      }),
      setCompleted: (done: boolean) => {
        const mutation = done ? 'completeTodoItem' : 'startTodoItem';
        store.commit(mutation, { todoIndex: props.todoIndex, itemIndex: props.itemIndex });
      },
    };
  },
});
</script>
