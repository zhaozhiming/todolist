import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

class TodoItem extends Component {
  render() {
    return (
      <li className={classnames({
        completed: this.props.todo.completed,
      })}>
        <div className="view">
          <label>{this.props.todo.text}</label>
        </div>
      </li>
    );
  }
}

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
};

export default TodoItem;
