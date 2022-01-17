import { InjectionKey } from 'vue';
import { createStore, useStore as baseUseStore, Store } from 'vuex';
import { load as fromYaml } from 'js-yaml';

export interface TodoItem {
  description: string;
  done: boolean;
  id: number;
}

export interface TodoList {
  title: string;
  items: Array<TodoItem>;
  id: number;
}

export interface State {
  todos: Array<TodoList>;
}

export const key: InjectionKey<Store<State>> = Symbol('store');

interface DuplicateItem extends TodoItem {
  duplicates: number;
}

interface IndexedItem extends DuplicateItem {
  index: number;
}

export type IsItemValidType = (todoIndex: number, itemIndex: number) => boolean;
export type AreItemsValidType = (todoIndex: number) => boolean;
export type IsTodoValidType = (todoIndex: number) => boolean;
export type NumberedItems = (todoIndex: number) => Array<DuplicateItem>;

interface ForYaml {
  [key: string]: {
    done: Array<string>;
    ['to do']: Array<string>;
  };
}

const nextTodoId = (state: State): number => 1 + state.todos.reduce(
  (maxId: number, { id }) => (id > maxId ? id : maxId),
  0,
);
const nextItemId = (state: State) => (index: number): number => 1 + state.todos[index].items.reduce(
  (maxId: number, { id }) => (id > maxId ? id : maxId),
  0,
);

export const getters = {
  completeItems: (state: State, { numberedItems }: {
    numberedItems: NumberedItems,
  }) => (todoIndex: number): Array<IndexedItem> => (
    numberedItems(todoIndex)
      .map((item, index) => ({ index, ...item }))
      .filter(({ done }) => done)
  ),
  incompleteItems: (state: State, { numberedItems }: {
    numberedItems: NumberedItems,
  }) => (todoIndex: number): Array<IndexedItem> => (
    numberedItems(todoIndex)
      .map((item, index) => ({ index, ...item }))
      .filter(({ done }) => !done)
  ),
  numberedItems: (state: State): NumberedItems => {
    const numberedTodos = state.todos.map(({ items, ...todo }) => {
      const duplicateCounts: Map<string, number> = new Map();
      return {
        ...todo,
        items: items.map(({ description, ...item }) => {
          const duplicates = duplicateCounts.get(description) || 0;
          duplicateCounts.set(description, duplicates + 1);
          return { description, duplicates, ...item };
        }),
      };
    });
    return (todoIndex: number) => numberedTodos[todoIndex].items;
  },
  isItemValid: (state: State) => (todoIndex: number, itemIndex: number): boolean => (
    state.todos[todoIndex].items[itemIndex].description.length > 0
  ),
  areItemsValid: (state: State, { isItemValid }: {
    isItemValid: IsItemValidType,
  }) => (todoIndex: number): boolean => {
    const { items } = state.todos[todoIndex];
    return items.every((_item, itemIndex) => isItemValid(todoIndex, itemIndex));
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
  forYamlExport: (state: State): ForYaml => {
    const yaml: ForYaml = {};
    state.todos.forEach(({ title, items }) => {
      yaml[title] = {
        'to do': items.filter(({ done }) => !done).map(({ description }) => description),
        done: items.filter(({ done }) => done).map(({ description }) => description),
      };
    });
    return yaml;
  },
  nextTodoId,
  nextItemId,
};

const load = (state: State, todos: Array<TodoList>): void => {
  state.todos.splice(0, state.todos.length, ...todos);
};

const loadFromImport = (state: State, jsonImport: ForYaml): void => {
  let listId = 0;
  let itemId = 0;
  const todos = Object.entries(jsonImport)
    .map(([title, { done, 'to do': toDo }]) => {
      listId += 1;
      return {
        title,
        items: [
          toDo.map((description) => {
            itemId += 1;
            return { done: false, description, id: itemId };
          }),
          done.map((description) => {
            itemId += 1;
            return { done: true, description, id: itemId };
          }),
        ].flat(),
        id: listId,
      };
    });
  load(state, todos);
};

export const mutations = {
  load,
  loadFromImport,
  loadFromYaml: (state: State, yaml: string): void => {
    const obj = fromYaml(yaml);
    const typeError = new TypeError(`Does not parse to to-do object: ${yaml}`);
    switch (typeof obj) {
      case 'string':
      case 'number':
      case 'undefined':
        throw typeError;
      default:
    }
    if (obj === null) {
      throw typeError;
    }
    type narrowedType = ForYaml | Record<string, Record<string, unknown>>;
    const descriptionIsStr = (description: string): boolean => typeof description === 'string';
    Object.values(obj as narrowedType).forEach((list) => {
      if (!(Array.isArray(list.done) && Array.isArray(list['to do']))) {
        throw typeError;
      }
      const { done, 'to do': toDo } = list;
      if (!(done.every(descriptionIsStr) && toDo.every(descriptionIsStr))) {
        throw typeError;
      }
    });
    loadFromImport(state, obj as ForYaml);
  },
  addList: (state: State): void => {
    const id = nextTodoId(state);
    state.todos.push({ title: '', items: [], id });
  },
  removeList: (state: State, index: number): void => {
    state.todos.splice(index, 1);
  },
  setTodoTitle: (state: State, { index, title }: { index: number, title: string }): void => {
    state.todos[index].title = title;
  },
  addTodoItem: (state: State, { index }: { index: number }): void => {
    const id = nextItemId(state)(index);
    state.todos[index].items.push({ description: '', done: false, id });
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
