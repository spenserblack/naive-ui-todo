<template>
  <NConfigProvider :theme="theme">
    <NLayout id="main">
      <NLayoutHeader class="header">
        <NSpace vertical>
          <NSpace class="options" justify="end" size="small">
            <NText>Automatic saving is</NText>
            <NSwitch v-model:value="saveAutomatically">
              <template #checked>on</template>
              <template #unchecked>off</template>
            </NSwitch>
            <NButton type="primary" :loading="saving" :disabled="saving" @click="save">
              <template #icon>
                <NIcon><SaveIcon /></NIcon>
              </template>
              Save
            </NButton>
            <JsonDownloadButton :disabled="!isValid">Export JSON</JsonDownloadButton>
            <YamlDownloadButton :disabled="!isValid">Export YAML</YamlDownloadButton>
            <YamlUploadButton>Import YAML</YamlUploadButton>
            <NButton v-if="theme == null" @click="theme = darkTheme">
              <template #icon>
                <NIcon><MoonIcon /></NIcon>
              </template>
              Dark
            </NButton>
            <NButton v-else @click="theme = null">
              <template #icon>
                <NIcon><SunIcon /></NIcon>
              </template>
              Light
            </NButton>
          </NSpace>
          <NDivider />
          <NMenu
            :options="menuOptions"
            mode="horizontal"
            :value="activeKey"
            @update:value="onMenuUpdate"
          />
        </NSpace>
      </NLayoutHeader>
      <NLayoutContent class="body">
        <RouterView />
      </NLayoutContent>
      <NLayoutFooter class="footer">
        <NSpace class="footer-text" justify="end">
          <NA href="https://github.com/spenserblack/naive-ui-todo">
            <span><NIcon><GithubIcon /></NIcon> GitHub</span>
          </NA>
          <NDivider vertical />
          <NText italic type="info">v{{ version }}</NText>
        </NSpace>
      </NLayoutFooter>
    </NLayout>
  </NConfigProvider>
</template>

<script setup lang="ts">
import 'vfonts/Inter.css';
import {
  computed, h, ref, watch,
} from 'vue';
import {
  Add as AddIcon,
  LogoGithub as GithubIcon,
  Home as HomeIcon,
  List as ListIcon,
  Save as SaveIcon,
  Sunny as SunIcon,
  Moon as MoonIcon,
} from '@vicons/ionicons5';
import {
  NA,
  NButton,
  NConfigProvider,
  NDivider,
  NIcon,
  NLayout,
  NLayoutContent,
  NLayoutFooter,
  NLayoutHeader,
  NMenu,
  NSpace,
  NSwitch,
  NText,
  darkTheme,
} from 'naive-ui';
import { RouterLink, RouterView, useRouter } from 'vue-router';
import debounce from 'lodash.debounce';
import { useStore, TodoList } from './store';

import JsonDownloadButton from './components/buttons/DownloadJson.vue';
import YamlDownloadButton from './components/buttons/DownloadYaml.vue';
import YamlUploadButton from './components/buttons/UploadYaml.vue';
import naiveUiTodo from '../package.json';

const { version } = naiveUiTodo;
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

const store = useStore();
const router = useRouter();

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

router.beforeEach(({ fullPath, name, params }) => {
  if (name === 'Home') {
    return true;
  }
  if (name === 'Todo') {
    const todoIndex = Number.parseInt(params.index as string, 10);
    if (store.state.todos[todoIndex] == null) {
      console.warn('User attempted to access invalid route:', fullPath);
      return { replace: true, name: 'Home' };
    }
  }
  return true;
});
const rerouteLastItem = (): void => {
  router.push({ name: 'Todo', params: { index: store.state.todos.length - 1 } });
};

const maxTodoOptions = 10;
const menuHomeKey = 'todo__home';
const menuTodoKey = (id: number): string => `todo__${id}`;
const menuAddKey = 'todo__add';
const homeOption = {
  label: () => h(RouterLink, { to: { name: 'Home' } }, () => 'Home'),
  key: menuHomeKey,
  icon: () => h(NIcon, null, () => h(HomeIcon)),
};
const addOption = {
  label: () => h('span', null, 'Add List'),
  key: menuAddKey,
  icon: () => h(NIcon, null, () => h(AddIcon)),
};
const menuOptions = computed(() => {
  const todoOptions = store.state.todos.map(({ title, id }, index) => ({
    label: () => h(RouterLink, { to: { name: 'Todo', params: { index } } }, () => title),
    key: menuTodoKey(id),
    icon: () => h(NIcon, null, () => h(ListIcon)),
  }));
  if (todoOptions.length > maxTodoOptions) {
    return [
      homeOption,
      {
        label: 'To-Do Lists',
        key: 'todo__extra-lists',
        icon: () => h(NIcon, null, () => h(ListIcon)),
        children: todoOptions,
      },
      addOption,
    ];
  }
  return [homeOption, ...todoOptions, addOption];
});
const activeKey = computed((): string | null => {
  const currentRoute = router.currentRoute.value;
  switch (currentRoute.name) {
    case 'Home':
      return menuHomeKey;
    case 'Todo': {
      const todo = store.state.todos[Number.parseInt(currentRoute.params.index as string, 10)];
      return menuTodoKey(todo.id);
    }
    default:
      return null;
  }
});
const onMenuUpdate = (key: string): void => {
  if (key === menuAddKey) {
    store.commit('addList');
    rerouteLastItem();
  }
};

const theme = ref(darkTheme);
const isValid = computed(() => store.getters.isValid);
</script>

<style lang="stylus">
#app
  font-family v-sans, v-mono, Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  margin 0
  position absolute
  width 100vw
  height 100vh
  overflow hidden

  #main
    width 100vw
    height 100vh

    .options, .footer-text
      Padding = 1em
      padding-top Padding
      padding-right Padding
</style>

<style lang="stylus" scoped>
.header
  height 20%
.footer
  height 5%

.body
  height 75%
</style>
