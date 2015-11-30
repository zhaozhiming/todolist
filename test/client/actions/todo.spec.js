import expect from 'expect';
import * as types from '../../../src/client/constants/ActionTypes';
import * as actions from '../../../src/client/actions/todos';

describe('todo actions', () => {
  it('add todo should create ADD_TODO action', () => {
    expect(actions.addTodo('Use Redux')).toEqual({
      type: types.ADD_TODO,
      text: 'Use Redux',
    });
  });
});
