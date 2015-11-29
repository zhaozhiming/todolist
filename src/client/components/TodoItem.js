import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import TodoInput from './TodoInput';

class TodoItem extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {editing: false};
  }

  handleDoubleClick() {
    this.setState({editing: true});
  }

  handleSave(id, text) {
    this.props.actions.updateTodo(id, text);
    this.setState({editing: false});
  }

  renderTodo(todo, actions) {
    const { completeTodo, deleteTodo } = actions;
    let todoItem;
    if (this.state.editing) {
      todoItem = (
        <TodoInput editing placeholder="请录入..." actions={actions} text={todo.text}
          onSave={ (text) => this.handleSave(todo.id, text)}/>
      );
    } else {
      todoItem = (
        <div className="view">
          <input className="toggle" type="checkbox" checked={todo.completed}
            onChange={ () => completeTodo(todo.id)}/>
          <label onDoubleClick={this.handleDoubleClick.bind(this)} >
            {todo.text}
          </label>
          <button className="destroy" onClick={ () => deleteTodo(todo.id)}></button>
        </div>
      );
    }
    return todoItem;
  }

  render() {
    const { todo, actions } = this.props;
    return (
      <li className={classnames({
        completed: todo.completed,
        editing: this.state.editing,
      })}>
        {this.renderTodo(todo, actions)}
      </li>
    );
  }
}

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
};

export default TodoItem;
