import { expect } from 'chai';
import {
  getters,
  IsItemValidType,
  AreItemsValidType,
  IsTodoValidType,
  NumberedItems,
} from '@/store';

describe('store', () => {
  describe('getters', () => {
    describe('numberedItems', () => {
      const { numberedItems } = getters;
      it('should add a sequential duplicate count to each item', () => {
        const state = {
          todos: [
            {
              title: 'foo',
              id: 1,
              items: [
                {
                  description: 'a',
                  id: 1,
                  done: false,
                },
                {
                  description: 'b',
                  id: 2,
                  done: false,
                },
                {
                  description: 'a',
                  id: 3,
                  done: true,
                },
              ],
            },
          ],
        };

        const items = numberedItems(state)(0);

        expect(items).to.be.an('array').with.lengthOf(3);
        expect(items[0].duplicates).to.equal(0);
        expect(items[1].duplicates).to.equal(0);
        expect(items[2].duplicates).to.equal(1);
      });
    });
    describe('completeItems', () => {
      const { completeItems } = getters;

      it('should return only completed (done) items with the appropriate index', () => {
        const state = {
          todos: [
            {
              title: 'foo',
              id: 1,
              items: [
                {
                  description: 'a',
                  done: true,
                  id: 1,
                },
                {
                  description: 'b',
                  done: false,
                  id: 2,
                },
                {
                  description: 'c',
                  done: false,
                  id: 3,
                },
                {
                  description: 'd',
                  done: true,
                  id: 4,
                },
              ],
            },
          ],
        };

        const numberedItems = (() => state.todos[0].items) as unknown as NumberedItems;
        const items = completeItems(state, { numberedItems })(0);

        expect(items).to.have.lengthOf(2);
        expect(items[0].description).to.equal('a');
        expect(items[1].description).to.equal('d');
        expect(items[0].done).to.be.true;
        expect(items[1].done).to.be.true;
        expect(items[0].id).to.be.equal(1);
        expect(items[1].id).to.be.equal(4);
        expect(items[0].index).to.be.equal(0);
        expect(items[1].index).to.be.equal(3);
      });
    });
    describe('incompleteItems', () => {
      const { incompleteItems } = getters;

      it('should return only incomplete (done = false) items with the appropriate index', () => {
        const state = {
          todos: [
            {
              title: 'foo',
              id: 1,
              items: [
                {
                  description: 'a',
                  done: true,
                  id: 1,
                },
                {
                  description: 'b',
                  done: false,
                  id: 2,
                },
                {
                  description: 'c',
                  done: false,
                  id: 3,
                },
                {
                  description: 'd',
                  done: true,
                  id: 4,
                },
              ],
            },
          ],
        };

        const numberedItems = (() => state.todos[0].items) as unknown as NumberedItems;
        const items = incompleteItems(state, { numberedItems })(0);

        expect(items).to.have.lengthOf(2);
        expect(items[0].description).to.equal('b');
        expect(items[1].description).to.equal('c');
        expect(items[0].done).to.be.false;
        expect(items[1].done).to.be.false;
        expect(items[0].id).to.be.equal(2);
        expect(items[1].id).to.be.equal(3);
        expect(items[0].index).to.be.equal(1);
        expect(items[1].index).to.be.equal(2);
      });
    });
    describe('isValid', () => {
      const { isValid } = getters;

      it("should return false when a title isn't unique", () => {
        const state = {
          todos: [
            {
              title: 'foo',
              items: [],
              id: 1,
            },
            {
              title: 'foo',
              items: [],
              id: 2,
            },
          ],
        };

        expect(isValid(state, { isTodoValid: (() => true) as IsTodoValidType })).to.be.false;
      });

      it('should return true when all titles and descriptions are unique and not empty', () => {
        const state = {
          todos: [
            {
              title: 'foo',
              items: [
                { description: 'x', done: true, id: 1 },
                { description: 'y', done: false, id: 2 },
              ],
              id: 1,
            },
            {
              title: 'baz',
              items: [
                { description: 'x', done: true, id: 3 },
                { description: 'y', done: false, id: 4 },
              ],
              id: 2,
            },
          ],
        };

        expect(isValid(state, { isTodoValid: (() => true) as IsTodoValidType })).to.be.true;
      });

      it('should return true if there are no to-do lists', () => {
        const state = { todos: [] };
        expect(isValid(state, { isTodoValid: (() => false) as IsTodoValidType })).to.be.true;
      });
    });

    describe('isTodoValid', () => {
      const { isTodoValid } = getters;

      it('should return false when a title is empty', () => {
        const state = {
          todos: [
            {
              title: '',
              items: [],
              id: 1,
            },
          ],
        };

        const result = isTodoValid(state, { areItemsValid: (() => true) as AreItemsValidType })(0);
        expect(result).to.be.false;
      });

      it('should return false when one or more items are invalid', () => {
        const state = {
          todos: [
            {
              title: '',
              items: [{ description: '', done: false, id: 1 }],
              id: 1,
            },
          ],
        };

        const result = isTodoValid(state, { areItemsValid: (() => false) as AreItemsValidType })(0);
        expect(result).to.be.false;
      });

      it("should return true if title isn't empty and items are valid", () => {
        const state = {
          todos: [
            {
              title: 'foo',
              items: [{ description: 'x', done: false, id: 1 }],
              id: 1,
            },
          ],
        };

        const result = isTodoValid(state, { areItemsValid: (() => true) as AreItemsValidType })(0);
        expect(result).to.be.true;
      });
    });
    describe('areItemsValid', () => {
      const { areItemsValid } = getters;

      it('should return false if any item is invalid', () => {
        const state = {
          todos: [
            {
              title: 'foo',
              items: [{ description: '', done: false, id: 1 }],
              id: 1,
            },
          ],
        };

        const result = areItemsValid(state, { isItemValid: (() => false) as IsItemValidType })(0);
        expect(result).to.be.false;
      });

      it('should return true if all items are valid', () => {
        const state = {
          todos: [
            {
              title: 'foo',
              items: [{ description: '', done: false, id: 1 }],
              id: 1,
            },
          ],
        };

        const result = areItemsValid(state, { isItemValid: (() => true) as IsItemValidType })(0);
        expect(result).to.be.true;
      });

      it('should return true if there are no items', () => {
        const state = {
          todos: [
            {
              title: 'foo',
              items: [],
              id: 1,
            },
          ],
        };

        const result = areItemsValid(state, { isItemValid: (() => false) as IsItemValidType })(0);
        expect(result).to.be.true;
      });
    });
    describe('isItemValid', () => {
      const { isItemValid } = getters;

      it('should return false if description is empty', () => {
        const state = {
          todos: [
            {
              title: 'foo',
              items: [{ description: '', done: false, id: 1 }],
              id: 1,
            },
          ],
        };

        expect(isItemValid(state)(0, 0)).to.be.false;
      });

      it("should return true if description isn't empty", () => {
        const state = {
          todos: [
            {
              title: 'foo',
              items: [{ description: 'x', done: false, id: 1 }],
              id: 1,
            },
          ],
        };

        expect(isItemValid(state)(0, 0)).to.be.true;
      });
    });
    describe('forYamlExport', () => {
      const { forYamlExport } = getters;

      it('should convert to YAML that is human-readable', () => {
        const state = {
          todos: [
            {
              title: 'foo',
              items: [
                { description: 'add YAML getter', done: true, id: 1 },
                { description: 'test getter', done: true, id: 2 },
                { description: 'leave untested', done: false, id: 3 },
              ],
              id: 1,
            },
            {
              title: 'bar',
              items: [
                { description: 'lower bar', done: true, id: 4 },
                { description: 'pass bar exam', done: false, id: 5 },
              ],
              id: 2,
            },
          ],
        };

        const actual = forYamlExport(state);
        const expected = {
          foo: {
            done: ['add YAML getter', 'test getter'],
            'to do': ['leave untested'],
          },
          bar: {
            done: ['lower bar'],
            'to do': ['pass bar exam'],
          },
        };
        expect(actual).to.deep.equal(expected);
      });
    });
  });
  describe('nextTodoId', () => {
    const { nextTodoId } = getters;

    it('should return 1 if there are no to-do lists', () => {
      const state = { todos: [] };

      expect(nextTodoId(state)).to.equal(1);
    });

    it('should return 1 if the max id is 0', () => {
      const state = { todos: [{ title: 'foo', items: [], id: 0 }] };

      expect(nextTodoId(state)).to.equal(1);
    });

    it('should return 4 if the largest current id is 3', () => {
      const state = {
        todos: [
          {
            title: 'foo',
            items: [],
            id: 1,
          },
          {
            title: 'foo',
            items: [],
            id: 3,
          },
        ],
      };

      expect(nextTodoId(state)).to.equal(4);
    });
  });
  describe('nextItemId', () => {
    const { nextItemId } = getters;

    it('should return 1 if there are no items', () => {
      const state = {
        todos: [
          {
            title: 'foo',
            items: [],
            id: 1,
          },
        ],
      };

      expect(nextItemId(state)(0)).to.equal(1);
    });

    it('should return 1 if there are the max id is 0', () => {
      const state = {
        todos: [
          {
            title: 'foo',
            items: [{ description: 'a', id: 0, done: false }],
            id: 1,
          },
        ],
      };

      expect(nextItemId(state)(0)).to.equal(1);
    });

    it('should return 4 if the largest current id is 3', () => {
      const state = {
        todos: [
          {
            title: 'foo',
            items: [
              {
                description: 'a',
                done: false,
                id: 1,
              },
              {
                description: 'b',
                done: false,
                id: 3,
              },
            ],
            id: 1,
          },
        ],
      };

      expect(nextItemId(state)(0)).to.equal(4);
    });
  });
});
