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

  it('complete todo should create COMPLETE_TODO action', () => {
    expect(actions.completeTodo(1)).toEqual({
      type: types.COMPLETE_TODO,
      id: 1,
    });
  });

  it('delete todo should create DELETE_TODO action', () => {
    expect(actions.deleteTodo(1)).toEqual({
      type: types.DELETE_TODO,
      id: 1,
    });
  });

  it('complete all should create COMPLETE_ALL action', () => {
    expect(actions.completeAll()).toEqual({
      type: types.COMPLETE_ALL,
    });
  });

  it('clear completed should create CLEAR_COMPLETED action', () => {
    expect(actions.clearCompleted()).toEqual({
      type: types.CLEAR_COMPLETED,
    });
  });

  it('update todo should create UPDATE_TODO action', () => {
    expect(actions.updateTodo(1, 'Use Redux')).toEqual({
      type: types.UPDATE_TODO,
      text: 'Use Redux',
      id: 1,
    });
  });
});
