<template lang="pug">
NSpace(justify="left")
  NButton(type="warning" size="tiny" @click="onDelete")
    template(#icon)
      NIcon: DeleteIcon
  NCheckbox(:disabled="!item.description" :checked="item.done" @update:checked="setCompleted")
  EditableText(
    :text="item.description"
    @update:value="setDescription"
    inputPlaceholder="Please describe the to-do item"
    :textStyle="{ delete: item.done }"
    :textDepth="item.done ? 3 : 1"
  )
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from '@/store';
import {
  NButton, NCheckbox, NIcon, NSpace,
} from 'naive-ui';
import { Trash as DeleteIcon } from '@vicons/ionicons5';
import EditableText from './EditableText.vue';

export default defineComponent({
  name: 'Todo Item',
  components: {
    NButton, NCheckbox, NIcon, NSpace, DeleteIcon, EditableText,
  },
  emits: ['delete'],
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
  setup(props, { emit }) {
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
      onDelete: () => emit('delete', props.itemIndex),
    };
  },
});
</script>
