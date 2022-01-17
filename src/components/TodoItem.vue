<template>
  <NSpace justify="left">
    <NButton type="warning" size="tiny" @click="onDelete">
      <template #icon>
        <NIcon><DeleteIcon /></NIcon>
      </template>
    </NButton>
    <NCheckbox :disabled="!item.description" :checked="item.done" @update:checked="setCompleted" />
    <EditableText
      :text="item.description"
      @update:value="setDescription"
      inputPlaceholder="Please describe the to-do item"
      :textStyle="{ delete: item.done }"
      :textDepth="item.done ? 3 : 1"
    />
  </NSpace>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import {
  NButton, NCheckbox, NIcon, NSpace,
} from 'naive-ui';
import { Trash as DeleteIcon } from '@vicons/ionicons5';
import { useStore } from '@/store';
import EditableText from './EditableText.vue';

interface Props {
  todoIndex: number;
  itemIndex: number;
}

type Emits = {
  (e: 'delete', itemIndex: number): void,
};

const props = defineProps<Props>();

const emit = defineEmits<Emits>();

const store = useStore();
const item = computed(() => store.getters.numberedItems(props.todoIndex)[props.itemIndex]);
const setDescription = (description: string) => store.commit('setTodoItemDescription', {
  todoIndex: props.todoIndex,
  itemIndex: props.itemIndex,
  description,
});
const setCompleted = (done: boolean) => {
  const mutation = done ? 'completeTodoItem' : 'startTodoItem';
  store.commit(mutation, { todoIndex: props.todoIndex, itemIndex: props.itemIndex });
};
const onDelete = () => emit('delete', props.itemIndex);
</script>
