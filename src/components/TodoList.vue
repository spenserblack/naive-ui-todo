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
    Item(v-for="(item, itemIndex) in todo.items" :todoIndex="index" :itemIndex="itemIndex")
  template(#footer)
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
    };
  },
});
</script>

<style lang="stylus">
.todo-header
  margin-left 10%
</style>
