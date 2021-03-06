import {
  defineComponent,
  h,
  PropType,
} from 'vue';
import {
  NH1,
  NH2,
  NH3,
  NH4,
  NH5,
  NH6,
  NP,
  NText,
} from 'naive-ui';

export type TagProp = 'text' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
export const tagProp = {
  type: String as PropType<TagProp>,
  default: 'text',
};

export const strongProp = {
  type: Boolean as PropType<boolean>,
  default: false,
};
export const italicProp = {
  type: Boolean as PropType<boolean>,
  default: false,
};
export const underlineProp = {
  type: Boolean as PropType<boolean>,
  default: false,
};
export const deleteProp = {
  type: Boolean as PropType<boolean>,
  default: false,
};
export const codeProp = {
  type: Boolean as PropType<boolean>,
  default: false,
};

export type DepthProp = 1 | 2 | 3 | '1' | '2' | '3';
export const depthProp = {
  type: [String, Number] as PropType<DepthProp>,
  default: 1,
};

type TextComponents = typeof NH1 | typeof NH2 | typeof NH3 | typeof NH4 | typeof NH5 | typeof NH6;
const headerRecord: Record<Exclude<TagProp, 'p' | 'text'>, TextComponents> = {
  h1: NH1,
  h2: NH2,
  h3: NH3,
  h4: NH4,
  h5: NH5,
  h6: NH6,
};

export default defineComponent({
  name: 'DynamicNaiveText',
  props: {
    tag: tagProp,
    depth: depthProp,
    strong: strongProp,
    italic: italicProp,
    underline: underlineProp,
    delete: deleteProp,
    code: codeProp,
  },
  render() {
    const {
      depth, strong, italic, underline, code,
    } = this;
    const { default: defaultSlot } = this.$slots;

    switch (this.tag) {
      case 'text':
        return h(
          NText,
          {
            strong,
            italic,
            underline,
            delete: this.delete,
            code,
            depth,
          },
          defaultSlot,
        );
      case 'p':
        return h(NP, { depth }, defaultSlot);
      default:
    }
    return h(headerRecord[this.tag], null, defaultSlot);
  },
});
