const initState = {
  todos: [
    {
      text: 'foo bar',
      completed: false,
    },
  ],
};

export default function todos(state = initState, action) {
  switch (action.type) {
  case 'ADD_TODO':
    const result = Object.assign({}, state, {
      todos: [
        ...state.todos,
        {text: action.text, completed: false},
      ]});
    return result;
  default:
    return state;
  }
}
