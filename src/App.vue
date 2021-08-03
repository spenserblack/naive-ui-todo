<template lang="pug">
main(:class="{ dark: theme != null }")
  NConfigProvider(:theme="theme")
    NCard
      NSpace(justify="end")
        NButton(v-if="theme == null" @click="theme = darkTheme")
          template(#icon)
            NIcon: MoonIcon
          | Dark
        NButton(v-else @click="theme = null")
          template(#icon)
            NIcon: SunIcon
          | Light
      NSpace(justify="end")
        YamlDownloadButton(:disabled="!isValid") Export
        YamlUploadButton Import
      NSpace(justify="end")
        NText Automatic saving is
        NSwitch(v-model:value="saveAutomatically")
          template(#checked) on
          template(#unchecked) off
        NButton(type="primary" :loading="saving" :disabled="saving" @click="save")
          template(#icon)
            NIcon: SaveIcon
          | Save
    RouterView
</template>

<script lang="ts">
import 'vfonts/Inter.css';
import {
  defineComponent, computed, ref, watch,
} from 'vue';
import { Save as SaveIcon, Sunny as SunIcon, Moon as MoonIcon } from '@vicons/ionicons5';
import {
  NButton,
  NCard,
  NConfigProvider,
  NIcon,
  NSpace,
  NSwitch,
  NText,
  darkTheme,
} from 'naive-ui';
import debounce from 'lodash.debounce';
import { useStore, TodoList } from './store';
import YamlDownloadButton from './components/buttons/DownloadYaml.vue';
import YamlUploadButton from './components/buttons/UploadYaml.vue';

const makeKey = (subkey: string): string => `naive-todo__${subkey}`;
const todoKey = makeKey('todolist');
const saveKey = makeKey('autosave');

type LoadableThing = Array<TodoList> | boolean;
const loadValue = (key: string): undefined | LoadableThing => {
  const text = localStorage.getItem(key);
  if (text == null) {
    return undefined;
  }
  return JSON.parse(text);
};
const saveValue = (key: string, value: LoadableThing): void => {
  localStorage.setItem(key, JSON.stringify(value));
};
const saveTodos = (todos: Array<TodoList>): void => saveValue(todoKey, todos);
const saveAutoSave = (autoSave: boolean): void => saveValue(saveKey, autoSave);

const savedTodos = loadValue(todoKey) as Array<TodoList> | undefined;
const autoSave = loadValue(saveKey) as boolean | undefined;

export default defineComponent({
  components: {
    NButton,
    NCard,
    NConfigProvider,
    NIcon,
    NSpace,
    NSwitch,
    NText,
    SaveIcon,
    SunIcon,
    MoonIcon,
    YamlDownloadButton,
    YamlUploadButton,
  },
  setup() {
    const store = useStore();

    if (savedTodos != null) {
      store.commit('load', savedTodos);
    }

    const saveAutomatically = ref(autoSave ?? true);
    const todos = computed(() => store.state.todos);
    const saving = ref(false);
    const save = () => {
      saving.value = true;
      saveTodos(todos.value);
      setTimeout(() => {
        saving.value = false;
      }, 300);
    };
    const saveIfAutosave = debounce(() => {
      if (saveAutomatically.value) {
        save();
      }
    }, 1000);
    watch([todos.value, ...todos.value], saveIfAutosave);
    watch(saveAutomatically, () => saveAutoSave(saveAutomatically.value));

    return {
      darkTheme,
      theme: ref(darkTheme),
      isValid: computed(() => store.getters.isValid),
      saveAutomatically,
      saving,
      save,
      todos,
    };
  },
});
</script>

<style lang="stylus">
#app
  font-family v-sans, v-mono, Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  margin 0
  position fixed
  width 100vw
  height 100vh
</style>

<style lang="stylus" scoped>
  main
    mainWidth = 100%
    horizontalPadding = 1%
    width mainWidth - (horizontalPadding * 2)
    height 100%
    padding-left horizontalPadding
    padding-right horizontalPadding
    overflow auto

    &.dark
      background-color #111122
</style>
