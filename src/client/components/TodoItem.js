import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

class TodoItem extends Component {
  render() {
    const { todo, completeTodo } = this.props;
    return (
      <li className={classnames({
        completed: todo.completed,
      })}>
        <div className="view">
          <input className="toggle" type="checkbox" onClick={ () => completeTodo(todo.id)} />
          <label>{todo.text}</label>
          <button className="destroy" onClick={ () => completeTodo(todo.id)}></button>
        </div>
      </li>
    );
  }
}

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  completeTodo: PropTypes.func.isRequired,
};

export default TodoItem;
