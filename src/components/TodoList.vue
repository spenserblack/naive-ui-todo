<template lang="pug">
NCard.todo(size="huge" hoverable)
  NSpace(justify="center" vertical)
    NH2(v-if="!editing" @click="editing = true") {{ todo.title }}
    NInputGroup(v-else)
      NPopconfirm(@positive-click="onDelete" placement="top-start")
        template(#trigger)
          NButton(size="large" type="warning")
            template(#icon)
              NIcon: DeleteIcon
            | Delete
        | This will delete the whole to-do list.
      NInput(
        size="large"
        :value="todo.title"
        @update:value="setTitle"
        @blur="editing = titleEmpty"
        @keyup.enter="editing = titleEmpty"
        clearable
        placeholder="Please add a title"
      )
      NButton(size="large" type="success" @click="editing = titleEmpty")
        template(#icon)
          NIcon: ConfirmIcon
        | Confirm
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue';
import { useStore } from '@/store';
import {
  NButton, NCard, NH2, NIcon, NInput, NInputGroup, NPopconfirm, NSpace,
} from 'naive-ui';
import { Checkmark as ConfirmIcon, Trash as DeleteIcon } from '@vicons/ionicons5';

export default defineComponent({
  name: 'Todo List',
  components: {
    NButton, NCard, NH2, NIcon, NInput, NInputGroup, NPopconfirm, NSpace, ConfirmIcon, DeleteIcon,
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
      titleEmpty: computed((): boolean => !todo.title),
      editing: ref(!todo.title),
      onDelete: () => emit('delete', props.index),
    };
  },
});
</script>
