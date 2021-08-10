<template>
  <span class="editable-text">
    <DynamicText
      v-if="!editing"
      :tag="tag"
      @click="editing = true"
      :strong="textStyle.strong"
      :italic="textStyle.italic"
      :underline="textStyle.underline"
      :delete="textStyle.delete"
      :code="textStyle.code"
      :depth="textDepth"
    >
      {{ text }}
    </DynamicText>
    <NInputGroup v-else>
      <NInput
        :size="size"
        :value="text"
        @update:value="emit('update:value', $event)"
        @blur="editing = textEmpty"
        @keyup.enter="editing = textEmpty"
        clearable
        :placeholder="inputPlaceholder"
      />
      <NButton :size="size" type="success" @click="editing = textEmpty">
        <template #icon>
          <NIcon><ConfirmIcon /></NIcon>
        </template>
        Confirm
      </NButton>
    </NInputGroup>
  </span>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import {
  NButton, NIcon, NInput, NInputGroup,
} from 'naive-ui';
import { Checkmark as ConfirmIcon } from '@vicons/ionicons5';
import DynamicText, { TagProp, DepthProp } from './DynamicText';

interface TextStyleProp {
  strong: boolean;
  italic: boolean;
  underline: boolean;
  delete: boolean;
  code: boolean;
}

interface Props {
  tag?: TagProp;
  text: string;
  textStyle?: TextStyleProp;
  textDepth?: DepthProp;
  size?: 'tiny' | 'small' | 'medium' | 'large';
  inputPlaceholder?: string;
}

const props = withDefaults(defineProps<Props>(), {
  tag: 'text',
  textStyle: () => ({
    strong: false, italic: false, underline: false, delete: false, code: false,
  }),
  textDepth: 1,
  size: 'medium',
  inputPlaceholder: 'Please input a value',
});

const emit = defineEmits<{(e: 'update:value', value: string): void,
}>();

const textEmpty = computed((): boolean => !props.text);
const editing = ref(!props.text);
</script>
