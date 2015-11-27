import {ADD_TODO, COMPLETE_TODO, DELETE_TODO} from '../constants/ActionTypes';

export function addTodo(text) {
  return {type: ADD_TODO, text};
}

export function completeTodo(id) {
  return {type: COMPLETE_TODO, id};
}

export function deleteTodo(id) {
  return {type: DELETE_TODO, id};
}
