<template lang="pug">
NCard.todo(size="huge" hoverable)
  template(#header)
    NSpace.todo-header(justify="left")
      EditableText(
        :text="todo.title",
        @update:value="setTitle"
        tag="h2"
        size="large"
        inputPlaceholder="Please add a title"
      )
  template(#header-extra)
    NPopconfirm(@positive-click="onDelete" placement="top-end")
      template(#trigger)
        NButton(size="large" type="warning")
          template(#icon)
            NIcon: DeleteIcon
          | Delete
      | This will delete the whole to-do list.
  .items
    Item(
      v-for="item in incompleteItems"
      :todoIndex="index"
      :itemIndex="item.index"
      @delete="removeTodoItem"
      :key="`todo-item-${item.id}-not-done`"
    )
    Item(
      v-for="item in completeItems"
      :todoIndex="index"
      :itemIndex="item.index"
      @delete="removeTodoItem"
      :key="`todo-item-${item.id}-done`"
    )
  template(#footer)
    NSpace(justify="left")
      NButton(type="primary" @click="addTodoItem")
        template(#icon)
          NIcon: AddIcon
        | Add {{ todo.title }} Item
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from '@/store';
import {
  NButton, NCard, NH2, NIcon, NInput, NInputGroup, NPopconfirm, NSpace,
} from 'naive-ui';
import { Add as AddIcon, Checkmark as ConfirmIcon, Trash as DeleteIcon } from '@vicons/ionicons5';
import Item from './TodoItem.vue';
import EditableText from './EditableText.vue';

export default defineComponent({
  name: 'Todo List',
  components: {
    NButton,
    NCard,
    NH2,
    NIcon,
    NInput,
    NInputGroup,
    NPopconfirm,
    NSpace,
    AddIcon,
    ConfirmIcon,
    DeleteIcon,
    EditableText,
    Item,
  },
  props: {
    index: {
      type: Number,
      required: true,
    },
  },
  setup(props, { emit }) {
    const store = useStore();
    const todo = store.state.todos[props.index];

    return {
      todo: computed(() => todo),
      setTitle: (title: string) => store.commit('setTodoTitle', { index: props.index, title }),
      onDelete: () => emit('delete', props.index),
      addTodoItem: () => store.commit('addTodoItem', { index: props.index }),
      removeTodoItem: (itemIndex: number) => store.commit('removeTodoItem', {
        todoIndex: props.index,
        itemIndex,
      }),
      completeItems: computed(() => store.getters.completeItems(props.index)),
      incompleteItems: computed(() => store.getters.incompleteItems(props.index)),
    };
  },
});
</script>
