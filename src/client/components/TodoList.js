import React, { Component, PropTypes } from 'react';
import TodoItem from './TodoItem';

class TodoList extends Component {

  render() {
    const { todos, actions } = this.props;
    const { completeAll } = actions;
    return (
      <section className="main">
        <input className="toggle-all" type="checkbox" onClick={ () => completeAll() }/>
        <ul className="todo-list">
          {todos.map(todo => <TodoItem key={todo.id} todo={todo} actions={actions} />)}
        </ul>
      </section>
    );
  }
}

TodoList.propTypes = {
  todos: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
};

export default TodoList;
