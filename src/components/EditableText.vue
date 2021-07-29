<template lang="pug">
span.editable-text
  component(
    v-if="!editing"
    :is="nTag"
    @click="editing = true"
    :strong="textStyle.strong"
    :italic="textStyle.italic"
    :underline="textStyle.underline"
    :delete="textStyle.delete"
    :code="textStyle.code"
    :depth="textDepth"
  ) {{ text }}
  NInputGroup(v-else)
    NInput(
      :size="size"
      :value="text"
      @update:value="$emit('update:value', $event)"
      @blur="editing = textEmpty"
      @keyup.enter="editing = textEmpty"
      clearable
      :placeholder="inputPlaceholder"
    )
    NButton(:size="size" type="success" @click="editing = textEmpty")
      template(#icon)
        NIcon: ConfirmIcon
      | Confirm
</template>

<script lang="ts">
import {
  defineComponent, computed, ref, PropType,
} from 'vue';
import {
  NButton, NH1, NH2, NH3, NH4, NH5, NH6, NIcon, NInput, NInputGroup, NP, NText,
} from 'naive-ui';
import { Checkmark as ConfirmIcon } from '@vicons/ionicons5';

interface TextStyle {
  strong: boolean;
  italic: boolean;
  underline: boolean;
  delete: boolean;
  code: boolean;
}

type TextDepth = 1 | 2 | 3 | '1' | '2' | '3';

export default defineComponent({
  name: 'Editable Text',
  components: {
    NButton, NH1, NH2, NH3, NH4, NH5, NH6, NIcon, NInput, NInputGroup, NP, NText, ConfirmIcon,
  },
  props: {
    tag: {
      type: String,
      default: 'text',
      validator: (value: string): boolean => [
        'text',
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'p',
      ].includes(value),
    },
    text: {
      type: String,
      required: true,
    },
    textStyle: {
      type: Object as PropType<TextStyle>,
      default: () => ({
        strong: false,
        italic: false,
        underline: false,
        delete: false,
        code: false,
      }),
    },
    textDepth: {
      type: [Number, String] as PropType<TextDepth>,
      default: 1,
    },
    size: {
      type: String,
      default: 'medium',
      validator: (value: string): boolean => ['tiny', 'small', 'medium', 'large'].includes(value),
    },
    inputPlaceholder: {
      type: String,
      default: 'Please input a value',
    },
  },
  setup(props) {
    return {
      textEmpty: computed((): boolean => !props.text),
      editing: ref(!props.text),
      nTag: computed((): string => `n-${props.tag}`),
    };
  },
});
</script>
