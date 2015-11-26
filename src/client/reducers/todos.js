import {ADD_TODO} from '../constants/ActionTypes';

const initState = [
  {
    text: 'foo bar',
    completed: false,
  },
];

export default function todos(state = initState, action) {
  switch (action.type) {
  case ADD_TODO:
    return [
      ...state,
      {text: action.text, completed: false},
    ];
  default:
    return state;
  }
}
