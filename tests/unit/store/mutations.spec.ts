import { expect } from 'chai';
import { mutations, TodoList } from '@/store';
import {
  doneIsNull, toDoIsNull, doneNotString, toDoNotString, valid,
} from './yaml';

describe('store', () => {
  describe('mutations', () => {
    describe('load', () => {
      const { load } = mutations;

      it('should load a new state for to-do lists', () => {
        const state = {
          todos: [
            { title: 'foo', items: [{ description: 'x', done: true, id: 1 }], id: 1 },
          ],
        };

        load(state, [{ title: 'bar', items: [{ description: 'y', done: false, id: 1 }], id: 1 }]);

        expect(state.todos).to.be.an('array').with.lengthOf(1);

        const todo = state.todos[0];
        expect(todo.title).to.equal('bar');
        expect(todo.items).to.be.an('array').with.lengthOf(1);

        const item = todo.items[0];
        expect(item.description).to.equal('y');
        expect(item.done).to.be.false;
      });
    });
    describe('loadFromImport', () => {
      const { loadFromImport } = mutations;

      it('should load a new state from the import/export format', () => {
        const state = { todos: [] };
        const jsonImport = {
          foo: {
            done: ['dx', 'dy'],
            'to do': ['ta', 'tb'],
          },
          bar: {
            done: [],
            'to do': ['---'],
          },
        };

        loadFromImport(state, jsonImport);

        const { todos } = state;
        expect(todos).to.be.an('array').with.lengthOf(2);

        const foo = todos.find(({ title }) => title === 'foo') as unknown as TodoList;
        const bar = todos.find(({ title }) => title === 'bar') as unknown as TodoList;
        expect(foo).to.be.an('object').and.to.have.all.keys('title', 'items', 'id');
        expect(bar).to.be.an('object').and.to.have.all.keys('title', 'items', 'id');
        expect(foo.id).to.not.equal(bar.id);
        expect(foo.items.find(({ description }) => description === 'dx'))
          .to.include({ done: true });
        expect(foo.items.find(({ description }) => description === 'dy'))
          .to.include({ done: true });
        expect(foo.items.find(({ description }) => description === 'ta'))
          .to.include({ done: false });
        expect(foo.items.find(({ description }) => description === 'tb'))
          .to.include({ done: false });
        expect(bar.items).to.be.an('array').with.lengthOf(1);
        expect(bar.items[0].description).to.equal('---');
        expect(bar.items[0].done).to.be.false;
      });
    });
    describe('loadFromYaml', () => {
      const { loadFromYaml } = mutations;

      it('should throw an error if the YAML parses to null', () => {
        const state = { todos: [] };
        expect(() => loadFromYaml(state, '~')).to.throw();
        expect(state.todos).to.be.an('array').with.lengthOf(0);
      });
      it('should throw an error if the YAML parses to a string', () => {
        const state = { todos: [] };
        expect(() => loadFromYaml(state, 'this is a string')).to.throw();
        expect(state.todos).to.be.an('array').with.lengthOf(0);
      });
      it('should throw an error if the YAML parses to a number', () => {
        const state = { todos: [] };
        expect(() => loadFromYaml(state, '1')).to.throw();
        expect(state.todos).to.be.an('array').with.lengthOf(0);
      });
      it('should throw an error if the YAML parses to undefined', () => {
        const state = { todos: [] };
        expect(() => loadFromYaml(state, '')).to.throw();
        expect(state.todos).to.be.an('array').with.lengthOf(0);
      });
      it('should throw an error if `done` is ever not an array', () => {
        const state = { todos: [] };
        expect(() => loadFromYaml(state, doneIsNull)).to.throw();
        expect(state.todos).to.be.an('array').with.lengthOf(0);
      });
      it('should throw an error if `to do` is ever not an array', () => {
        const state = { todos: [] };
        expect(() => loadFromYaml(state, toDoIsNull)).to.throw();
        expect(state.todos).to.be.an('array').with.lengthOf(0);
      });
      it('should throw an error if any `done` description not a string', () => {
        const state = { todos: [] };
        expect(() => loadFromYaml(state, doneNotString)).to.throw();
        expect(state.todos).to.be.an('array').with.lengthOf(0);
      });
      it('should throw an error if any `to do` description not a string', () => {
        const state = { todos: [] };
        expect(() => loadFromYaml(state, toDoNotString)).to.throw();
        expect(state.todos).to.be.an('array').with.lengthOf(0);
      });
      it('should load to-dos from valid YAML', () => {
        const state = { todos: [] };
        loadFromYaml(state, valid);

        const { todos } = state;
        expect(todos).to.be.an('array').with.lengthOf(2);

        const foo = todos.find(({ title }) => title === 'foo') as unknown as TodoList;
        const bar = todos.find(({ title }) => title === 'bar') as unknown as TodoList;
        expect(foo).to.be.an('object').and.to.have.all.keys('title', 'items', 'id');
        expect(bar).to.be.an('object').and.to.have.all.keys('title', 'items', 'id');
        expect(foo.id).to.not.equal(bar.id);
        expect(foo.items.find(({ description }) => description === 'a'))
          .to.include({ done: true });
        expect(foo.items.find(({ description }) => description === 'b'))
          .to.include({ done: true });
        expect(foo.items.find(({ description }) => description === 'c'))
          .to.include({ done: false });
        expect(bar.items).to.be.an('array').with.lengthOf(1);
        expect(bar.items[0].description).to.equal('d');
        expect(bar.items[0].done).to.be.false;
      });
    });
    describe('addList', () => {
      const { addList } = mutations;
      it('should add an empty list', () => {
        const state = { todos: [] };

        addList(state);

        expect(state.todos).to.have.lengthOf(1);
      });
    });

    describe('removeList', () => {
      const { removeList } = mutations;

      it('should remove a to-do list', () => {
        const state = {
          todos: [
            { title: 'foo', items: [], id: 1 },
            { title: 'bar', items: [], id: 2 },
          ],
        };

        removeList(state, 0);

        expect(state.todos).to.have.lengthOf(1);
        expect(state.todos[0].title).to.equal('bar');
      });
    });

    describe('setTodoTitle', () => {
      const { setTodoTitle } = mutations;

      it('should set title of a to-do list', () => {
        const state = { todos: [{ title: 'foo', items: [], id: 1 }] };

        setTodoTitle(state, { index: 0, title: 'bar' });

        expect(state.todos[0].title).to.equal('bar');
      });
    });

    describe('addTodoItem', () => {
      const { addTodoItem } = mutations;

      it('should add a to-do list item', () => {
        const state = { todos: [{ title: 'foo', items: [], id: 1 }] };

        addTodoItem(state, { index: 0 });

        expect(state.todos[0].items).have.lengthOf(1);
      });
    });

    describe('removeTodoItem', () => {
      const { removeTodoItem } = mutations;

      it('should remove a to-do list item', () => {
        const state = {
          todos: [
            {
              title: 'foo',
              items: [
                { description: 'bar', done: true, id: 1 },
                { description: 'baz', done: false, id: 2 },
              ],
              id: 1,
            },
          ],
        };

        removeTodoItem(state, { todoIndex: 0, itemIndex: 0 });

        const { items } = state.todos[0];
        expect(items).have.lengthOf(1);
        expect(items[0].description).to.equal('baz');
        expect(items[0].done).to.be.false;
      });
    });

    describe('setTodoItemDescription', () => {
      const { setTodoItemDescription } = mutations;

      it('should set the title of a to-do list item', () => {
        const state = {
          todos: [
            { title: 'foo', items: [{ description: 'bar', done: true, id: 1 }], id: 1 },
          ],
        };

        setTodoItemDescription(state, { todoIndex: 0, itemIndex: 0, description: 'baz' });

        const { description } = state.todos[0].items[0];
        expect(description).to.equal('baz');
      });
    });

    describe('completeTodoItem', () => {
      const { completeTodoItem } = mutations;

      it('should mark an item as complete', () => {
        const state = {
          todos: [
            { title: 'foo', items: [{ description: 'bar', done: false, id: 1 }], id: 1 },
          ],
        };

        completeTodoItem(state, { todoIndex: 0, itemIndex: 0 });

        const { done } = state.todos[0].items[0];
        expect(done).to.be.true;
      });
    });

    describe('startTodoItem', () => {
      const { startTodoItem } = mutations;

      it('should mark an item as incomplete', () => {
        const state = {
          todos: [
            { title: 'foo', items: [{ description: 'bar', done: true, id: 1 }], id: 1 },
          ],
        };

        startTodoItem(state, { todoIndex: 0, itemIndex: 0 });

        const { done } = state.todos[0].items[0];
        expect(done).to.be.false;
      });
    });
  });
});
