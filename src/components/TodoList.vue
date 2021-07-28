<template lang="pug">
.todo
  NSpace(justify="center" vertical)
    NH2(v-if="!editing" @click="editing = true") {{ todo.title }}
    NInputGroup(v-else)
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
  NButton, NH2, NIcon, NInput, NInputGroup, NSpace,
} from 'naive-ui';
import { Checkmark as ConfirmIcon } from '@vicons/ionicons5';

export default defineComponent({
  name: 'Todo List',
  components: {
    NButton, NH2, NIcon, NInput, NInputGroup, NSpace, ConfirmIcon,
  },
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
