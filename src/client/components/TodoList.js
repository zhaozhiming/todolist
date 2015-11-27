import React, { Component, PropTypes } from 'react';
import TodoItem from './TodoItem';
import Footer from './Footer';
import { SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED } from '../constants/TodoFilter';

class TodoList extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = { filter: SHOW_ALL};
  }

  filterResult() {
    const {filter} = this.state;
    switch (filter) {
    case SHOW_ALL:
      return () => true;
    case SHOW_ACTIVE:
      return todo => !todo.completed;
    case SHOW_COMPLETED:
      return todo => todo.completed;
    default:
      return () => true;
    }
  }

  handleShow(filter) {
    this.setState({filter});
  }

  render() {
    const { todos, actions } = this.props;
    const { completeAll } = actions;
    const filterMethod = this.filterResult();

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
