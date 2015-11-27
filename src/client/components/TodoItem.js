import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

class TodoItem extends Component {
  render() {
    const { todo, actions } = this.props;
    const { completeTodo, deleteTodo } = actions;
    return (
      <li className={classnames({
        completed: todo.completed,
      })}>
        <div className="view">
          <input className="toggle" type="checkbox" onClick={ () => completeTodo(todo.id)} />
          <label>{todo.text}</label>
          <button className="destroy" onClick={ () => deleteTodo(todo.id)}></button>
        </div>
      </li>
    );
  }
}

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
};

export default TodoItem;
