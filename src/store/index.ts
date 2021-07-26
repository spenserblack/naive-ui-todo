import { InjectionKey, reactive } from 'vue';
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

export const mutations = {
  load: (state: State, todos: Array<TodoList>): void => {
    state.todos = reactive(todos);
  },
  addList: (state: State): void => {
    state.todos.push({ title: '', items: [] });
  },
  removeList: (state: State, index: number): void => {
    state.todos.splice(index, 1);
  },
  setTodoTitle: (state: State, { index, title }: { index: number, title: string }): void => {
    state.todos[index].title = title;
  },
  addTodoItem: (state: State, { index }: { index: number }): void => {
    state.todos[index].items.push({ description: '', done: false });
  },
  removeTodoItem: (state: State, { todoIndex, itemIndex }: {
    todoIndex: number, itemIndex: number
  }): void => {
    state.todos[todoIndex].items.splice(itemIndex, 1);
  },
  setTodoItemDescription: (state: State, { todoIndex, itemIndex, description }: {
    todoIndex: number, itemIndex: number, description: string
  }): void => {
    state.todos[todoIndex].items[itemIndex].description = description;
  },
  completeTodoItem: (state: State, { todoIndex, itemIndex }: {
    todoIndex: number, itemIndex: number
  }): void => {
    state.todos[todoIndex].items[itemIndex].done = true;
  },
  startTodoItem: (state: State, { todoIndex, itemIndex }: {
    todoIndex: number, itemIndex: number
  }): void => {
    state.todos[todoIndex].items[itemIndex].done = false;
  },
};

export const store = createStore<State>({
  state: {
    todos: [],
  },
  mutations,
  actions: {
  },
  modules: {
  },
});

export function useStore(): Store<State> {
  return baseUseStore(key);
}
