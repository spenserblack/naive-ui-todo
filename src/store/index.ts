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

export type IsItemValidType = (todoIndex: number, itemIndex: number) => boolean;
export type AreItemsValidType = (todoIndex: number) => boolean;
export type IsTodoValidType = (todoIndex: number) => boolean;

interface IndexedItem extends TodoItem {
  index: number;
}

export const getters = {
  completeItems: (state: State) => (todoIndex: number): Array<IndexedItem> => (
    state.todos[todoIndex].items
      .map(({ description, done }, index) => ({ description, done, index }))
      .filter(({ done }) => done)
  ),
  incompleteItems: (state: State) => (todoIndex: number): Array<IndexedItem> => (
    state.todos[todoIndex].items
      .map(({ description, done }, index) => ({ description, done, index }))
      .filter(({ done }) => !done)
  ),
  isItemValid: (state: State) => (todoIndex: number, itemIndex: number): boolean => (
    state.todos[todoIndex].items[itemIndex].description.length > 0
  ),
  areItemsValid: (state: State, { isItemValid }: {
    isItemValid: IsItemValidType,
  }) => (todoIndex: number): boolean => {
    const { items } = state.todos[todoIndex];
    const counts: Record<string, number | undefined> = {};

    return items.every(({ description }, itemIndex) => {
      counts[description] = (counts[description] || 0) + 1;
      return isItemValid(todoIndex, itemIndex) && (counts[description] as number) < 2;
    });
  },
  isTodoValid: (state: State, { areItemsValid }: {
    areItemsValid: AreItemsValidType,
  }) => (todoIndex: number): boolean => (
    state.todos[todoIndex].title.length > 0 && areItemsValid(todoIndex)
  ),
  isValid: (state: State, { isTodoValid }: { isTodoValid: IsTodoValidType }): boolean => {
    const counts: Record<string, number | undefined> = {};

    return state.todos.every(({ title }, todoIndex) => {
      counts[title] = (counts[title] || 0) + 1;
      return isTodoValid(todoIndex) && (counts[title] as number) < 2;
    });
  },
};

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
  getters,
  mutations,
  actions: {
  },
  modules: {
  },
});

export function useStore(): Store<State> {
  return baseUseStore(key);
}
