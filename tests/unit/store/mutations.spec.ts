import { expect } from 'chai';
import { mutations } from '@/store';

describe('store', () => {
  describe('mutations', () => {
    describe('load', () => {
      const { load } = mutations;

      it('should load a new state for to-do lists', () => {
        const state = {
          todos: [
            { title: 'foo', items: [{ description: 'x', done: true }], id: 1 },
          ],
        };

        load(state, [{ title: 'bar', items: [{ description: 'y', done: false }], id: 1 }]);

        expect(state.todos).to.be.an('array').with.lengthOf(1);

        const todo = state.todos[0];
        expect(todo.title).to.equal('bar');
        expect(todo.items).to.be.an('array').with.lengthOf(1);

        const item = todo.items[0];
        expect(item.description).to.equal('y');
        expect(item.done).to.be.false;
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
                { description: 'bar', done: true },
                { description: 'baz', done: false },
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
            { title: 'foo', items: [{ description: 'bar', done: true }], id: 1 },
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
            { title: 'foo', items: [{ description: 'bar', done: false }], id: 1 },
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
            { title: 'foo', items: [{ description: 'bar', done: true }], id: 1 },
          ],
        };

        startTodoItem(state, { todoIndex: 0, itemIndex: 0 });

        const { done } = state.todos[0].items[0];
        expect(done).to.be.false;
      });
    });
  });
});
