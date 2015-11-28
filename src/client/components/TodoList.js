import React, { Component, PropTypes } from 'react';
import TodoItem from './TodoItem';
import Footer from './Footer';
import { SHOW_ALL } from '../constants/TodoFilter';

const FILTER_METHODS = {
  SHOW_ALL: () => true,
  SHOW_ACTIVE: todo => !todo.completed,
  SHOW_COMPLETED: todo => todo.completed,
};

class TodoList extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = { filter: SHOW_ALL};
  }

  handleShow(filter) {
    this.setState({filter});
  }

  render() {
    const { todos, actions } = this.props;
    const { completeAll } = actions;
    const {filter} = this.state;
    const filterMethod = FILTER_METHODS[filter];

    const filetredTodos = todos.filter(todo => filterMethod(todo));
    return (
      <section className="main">
        <input className="toggle-all" type="checkbox" onClick={ () => completeAll() }/>
        <ul className="todo-list">
          {filetredTodos.map(todo => <TodoItem key={todo.id} todo={todo} actions={actions} />)}
        </ul>
        <Footer todos={todos} actions={actions} onShow={this.handleShow.bind(this)} filter={this.state.filter}/>
      </section>
    );
  }
}

TodoList.propTypes = {
  todos: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
};

export default TodoList;
