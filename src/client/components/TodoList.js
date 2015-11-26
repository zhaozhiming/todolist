import React, { Component, PropTypes } from 'react';
import TodoItem from './TodoItem';

class TodoList extends Component {
  render() {
    const { todos } = this.props;
    return (
      <section className="main">
        <ul className="todo-list">
          {todos.map(todo => <TodoItem todo={todo}/>)}
        </ul>
      </section>
    );
  }
}

TodoList.propTypes = {
  todos: PropTypes.array.isRequired,
};

export default TodoList;