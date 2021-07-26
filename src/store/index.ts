import { InjectionKey } from 'vue';
import { createStore, useStore as baseUseStore, Store } from 'vuex';

export interface TodoItem {
  description: string;
  done: boolean;
}

export interface TodoList {
  title: string;
  items: Array<TodoItem>;
}

export interface State {
  todos: Array<TodoList>;
}

export const key: InjectionKey<Store<State>> = Symbol('store');

export const store = createStore<State>({
  state: {
    todos: [],
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  },
});

export function useStore(): Store<State> {
  return baseUseStore(key);
}
