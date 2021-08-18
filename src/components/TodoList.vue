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

<script setup lang="ts">
import { computed } from 'vue';
import {
  NButton, NCard, NIcon, NPopconfirm, NSpace,
} from 'naive-ui';
import { Add as AddIcon, Trash as DeleteIcon } from '@vicons/ionicons5';
import { useStore } from '@/store';
import Item from './TodoItem.vue';
import EditableText from './EditableText.vue';

interface Props {
  index: number;
}

type Emits = {
  (e: 'delete', index: number): void,
};

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const store = useStore();
const todo = computed(() => store.state.todos[props.index]);
const completeItems = computed(() => store.getters.completeItems(props.index));
const incompleteItems = computed(() => store.getters.incompleteItems(props.index));
const setTitle = (title: string) => store.commit('setTodoTitle', { index: props.index, title });
const onDelete = () => emit('delete', props.index);
const addTodoItem = () => store.commit('addTodoItem', { index: props.index });
const removeTodoItem = (itemIndex: number) => store.commit('removeTodoItem', {
  todoIndex: props.index,
  itemIndex,
});
</script>
