import { expect } from 'chai';
import {
  getters, IsItemValidType, AreItemsValidType, IsTodoValidType,
} from '@/store';

describe('store', () => {
  describe('getters', () => {
    describe('isValid', () => {
      const { isValid } = getters;

      it("should return false when a title isn't unique", () => {
        const state = {
          todos: [
            {
              title: 'foo',
              items: [],
            },
            {
              title: 'foo',
              items: [],
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
                { description: 'x', done: true },
                { description: 'y', done: false },
              ],
            },
            {
              title: 'baz',
              items: [
                { description: 'x', done: true },
                { description: 'y', done: false },
              ],
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
              items: [{ description: '', done: false }],
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
              items: [{ description: 'x', done: false }],
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
              items: [{ description: '', done: false }],
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
              items: [{ description: '', done: false }],
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
              items: [{ description: '', done: false }],
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
              items: [{ description: 'x', done: false }],
            },
          ],
        };

        expect(isItemValid(state)(0, 0)).to.be.true;
      });
    });
  });
});
