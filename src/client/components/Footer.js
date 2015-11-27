import React, { Component, PropTypes } from 'react';

class Footer extends Component {
  render() {
    const { todos, actions } = this.props;
    const { clearCompleted } = actions;
    return (
      <footer className="footer">
        <span className="todo-count"><strong>{todos.length}</strong> item left</span>
        <ul className="filters">
          <li>
            <a className="selected" href="#/">All</a>
          </li>
          <li>
            <a href="#/active">Active</a>
          </li>
          <li>
            <a href="#/completed">Completed</a>
          </li>
        </ul>
        <button className="clear-completed" onClick={ () => clearCompleted() }>Clear completed</button>
      </footer>
    );
  }
}

Footer.propTypes = {
  todos: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
};

export default Footer;
