import {expect} from 'chai';
import todos from '../../../src/client/reducers/todos';
import { ADD_TODO, COMPLETE_TODO, DELETE_TODO,
  COMPLETE_ALL, CLEAR_COMPLETED, UPDATE_TODO} from '../../../src/client/constants/ActionTypes';

function assertCompleteAll(givenState, expect1Complete, expect2Complete) {
  const state = todos(givenState, {type: COMPLETE_ALL});
  expect(state[0].completed).to.be.equal(expect1Complete);
  expect(state[1].completed).to.be.equal(expect2Complete);
}

describe('components', () => {
  describe('Header', () => {
    it('should add todo correctly', () => {
      const state = todos({}, {type: ADD_TODO, text: 'foo'});
      expect(state.length).to.be.equal(1);
      expect(state[0].text).to.be.equal('foo');
      expect(state[0].completed).to.be.equal(false);
    });

    it('should complete todo correctly', () => {
      let state = todos([{completed: false, id: 0}], {type: COMPLETE_TODO, id: 0});
      expect(state[0].completed).to.be.equal(true);
      state = todos([{completed: true, id: 0}], {type: COMPLETE_TODO, id: 0});
      expect(state[0].completed).to.be.equal(false);
    });

    it('should delete todo correctly', () => {
      const state = todos([{id: 0}, {id: 1}], {type: DELETE_TODO, id: 0});
      expect(state.length).to.be.equal(1);
      expect(state[0].id).to.be.equal(1);
    });

    it('should complete all correctly', () => {
      assertCompleteAll([{id: 0, completed: false}, {id: 1, completed: false}], true, true);
      assertCompleteAll([{id: 0, completed: false}, {id: 1, completed: true}], true, true);
      assertCompleteAll([{id: 0, completed: true}, {id: 1, completed: true}], false, false);
    });

    it('should clear complete correctly', () => {
      const state = todos([{completed: true}, {completed: false}], {type: CLEAR_COMPLETED});
      expect(state.length).to.be.equal(1);
    });

    it('should update todo correctly', () => {
      const state = todos([{id: 0, text: 'foo'}], {type: UPDATE_TODO, id: 0, text: 'bar'});
      expect(state[0].text).to.be.equal('bar');
    });
  });
});
