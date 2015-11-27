import {ADD_TODO, COMPLETE_TODO} from '../constants/ActionTypes';

const initState = [
  {
    text: 'foo bar',
    completed: false,
    id: 0,
  },
];

export default function todos(state = initState, action) {
  switch (action.type) {
  case ADD_TODO:
    return [
      ...state,
      {
        text: action.text,
        completed: false,
        id: new Date().getTime(),
      },
    ];
  case COMPLETE_TODO:
    return state.map(todo =>
      todo.id === action.id ?
        Object.assign({}, todo, { completed: !todo.completed }) : todo
    );
  default:
    return state;
  }
}
