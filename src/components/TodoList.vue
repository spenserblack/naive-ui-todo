<template>
  <NCard size="huge" hoverable>
    <template #header>
      <NSpace justify="left">
        <EditableText
          :text="todo.title"
          @update:value="setTitle"
          tag="h2"
          size="large"
          inputPlaceholder="Please add a title"
        />
      </NSpace>
    </template>
    <template #header-extra>
      <NPopconfirm @positive-click="onDelete" placement="top-end">
        <template #trigger>
          <NButton size="large" type="warning">
            <template #icon>
              <NIcon><DeleteIcon /></NIcon>
            </template>
            Delete
          </NButton>
        </template>
        This will delete the whole to-do list.
      </NPopconfirm>
    </template>
    <div class="items">
      <Item
        v-for="item in incompleteItems"
        :todoIndex="index"
        :itemIndex="item.index"
        @delete="removeTodoItem"
        :key="`todo-${todo.id}-item-${item.id}-not-done`"
      />
      <Item
        v-for="item in completeItems"
        :todoIndex="index"
        :itemIndex="item.index"
        @delete="removeTodoItem"
        :key="`todo-${todo.id}-item-${item.id}-done`"
      />
    </div>
    <template #footer>
      <NSpace>
        <NButton type="primary" @click="addTodoItem">
          <template #icon>
            <NIcon><AddIcon /></NIcon>
          </template>
          Add {{ todo.title }} Item
        </NButton>
      </NSpace>
    </template>
  </NCard>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import {
  NButton, NCard, NIcon, NPopconfirm, NSpace,
} from 'naive-ui';
import { Add as AddIcon, Trash as DeleteIcon } from '@vicons/ionicons5';
import { useStore } from '@/store';
import Item from './TodoItem.vue';
import EditableText from './EditableText.vue';

export default defineComponent({
  name: 'Todo List',
  components: {
    NButton,
    NCard,
    NIcon,
    NPopconfirm,
    NSpace,
    AddIcon,
    DeleteIcon,
    EditableText,
    Item,
  },
  emits: ['delete'],
  props: {
    index: {
      type: Number,
      required: true,
    },
  },
  setup(props, { emit }) {
    const store = useStore();
    const todo = computed(() => store.state.todos[props.index]);

    return {
      todo,
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
