import {ADD_TODO, COMPLETE_TODO, DELETE_TODO,
  COMPLETE_ALL, CLEAR_COMPLETED, UPDATE_TODO} from '../constants/ActionTypes';

export function addTodo(text) {
  return {type: ADD_TODO, text};
}

export function completeTodo(id) {
  return {type: COMPLETE_TODO, id};
}

export function deleteTodo(id) {
  return {type: DELETE_TODO, id};
}

export function completeAll() {
  return {type: COMPLETE_ALL};
}

export function clearCompleted() {
  return {type: CLEAR_COMPLETED};
}

export function updateTodo(id, text) {
  return {type: UPDATE_TODO, id, text};
}
