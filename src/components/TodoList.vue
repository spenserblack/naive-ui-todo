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
      <NDivider vertical />
      <NPopover>
        <template #trigger>
          <NButton size="large" type="warning" secondary @click="clearDuplicates">
            <template #icon>
              <NIcon><FilterIcon /></NIcon>
            </template>
            Remove Duplicates
          </NButton>
        </template>
        <NText type="warning">
          Completed items will be kept over incomplete items
        </NText>
      </NPopover>
    </template>
    <NLayout class="todo-items">
      <NLayoutContent
        class="todo-items-content"
        ref="layout"
        :style="mainContentStyle"
        :native-scrollbar="false"
      >
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
          <NBackTop />
      </NLayoutContent>
      </NLayout>
    <template #action>
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
import { computed, ref } from 'vue';
import {
  NBackTop,
  NButton,
  NCard,
  NDivider,
  NIcon,
  NLayout,
  NLayoutContent,
  NPopconfirm,
  NPopover,
  NSpace,
  NText,
} from 'naive-ui';
import {
  Add as AddIcon,
  Filter as FilterIcon,
  Trash as DeleteIcon,
} from '@vicons/ionicons5';
import { useStore } from '@/store';
import Item from './TodoItem.vue';
import EditableText from './EditableText.vue';

interface Props {
  index: number;
  mainContentStyle?: Record<string, string | number>,
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

const layout = ref<null | typeof NLayout>(null);
const addTodoItem = async () => {
  await store.commit('addTodoItem', { index: props.index });
  if (layout.value != null) {
    layout.value.scrollTo({ position: 'bottom' });
  }
};
const removeTodoItem = (itemIndex: number) => store.commit('removeTodoItem', {
  todoIndex: props.index,
  itemIndex,
});
const clearDuplicates = () => store.commit('clearDuplicates', props.index);
</script>

<style lang="stylus">
.todo-items, .todo-items-content
  background none
</style>
