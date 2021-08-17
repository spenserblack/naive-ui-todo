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
  NText(v-if="item.duplicates > 0" depth="2") ({{ item.duplicates }})
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import {
  NButton, NCheckbox, NIcon, NSpace, NText,
} from 'naive-ui';
import { Trash as DeleteIcon } from '@vicons/ionicons5';
import { useStore } from '@/store';
import EditableText from './EditableText.vue';

export default defineComponent({
  name: 'Todo Item',
  components: {
    // Naive UI
    NButton,
    NCheckbox,
    NIcon,
    NSpace,
    NText,
    // ionicons5
    DeleteIcon,
    // Custom
    EditableText,
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
    return {
      todo: computed(() => todo),
      item: computed(() => store.getters.numberedItems(props.todoIndex)[props.itemIndex]),
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
