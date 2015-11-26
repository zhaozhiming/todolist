const initState = {
  todos: [],
};

export default function todos(state = initState, action) {
  switch (action) {
  case 'ADD_TODO':
    return state;
  default:
    return state;
  }
}
